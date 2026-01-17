
export interface PR {
    id: number;
    title: string;
    url: string;
    repository: {
        nameWithOwner: string;
    };
    state: string;
    createdAt: string;
    mergedAt?: string;
    closedAt?: string;
}

export interface GithubData {
    merged: PR[];
    open: PR[];
    closed: PR[];
}

export async function getGithubData(): Promise<GithubData> {
    const query = `query {
    merged: search(query: "author:krockxz type:pr is:merged", type: ISSUE, first: 12) {
      edges {
        node {
          ... on PullRequest {
            id
            title
            url
            repository {
              nameWithOwner
            }
            state
            createdAt
            mergedAt
            closedAt
          }
        }
      }
    }
    open: search(query: "author:krockxz type:pr is:open", type: ISSUE, first: 12) {
      edges {
        node {
          ... on PullRequest {
            id
            title
            url
            repository {
              nameWithOwner
            }
            state
            createdAt
            mergedAt
            closedAt
          }
        }
      }
    }
    closed: search(query: "author:krockxz type:pr is:closed is:unmerged", type: ISSUE, first: 12) {
      edges {
        node {
          ... on PullRequest {
            id
            title
            url
            repository {
              nameWithOwner
            }
            state
            createdAt
            mergedAt
            closedAt
          }
        }
      }
    }
  }`;

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN || ""}`,
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        const json = await response.json();

        if (json.errors) {
            console.error("GitHub API Errors:", json.errors);
            return { merged: [], open: [], closed: [] };
        }

        const processEdges = (edges: any[]) => {
            if (!edges) return [];
            const prs = edges.map((edge: any) => edge.node);
            // Sort by date (newest first)
            return prs.sort((a: PR, b: PR) => {
                const dateA = new Date(b.mergedAt || b.closedAt || b.createdAt).getTime();
                const dateB = new Date(a.mergedAt || a.closedAt || a.createdAt).getTime();
                return dateA - dateB;
            });
        };

        return {
            merged: processEdges(json.data?.merged?.edges),
            open: processEdges(json.data?.open?.edges),
            closed: processEdges(json.data?.closed?.edges),
        };
    } catch (error) {
        console.error("Failed to fetch PRs:", error);
        return { merged: [], open: [], closed: [] };
    }
}
