import Container from "@/components/containers";
import PageBorder from "@/components/ui/page-border";
import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { getSingleBlog } from "@/util/mdx_clean";
import type { BlogMeta } from "@/util/mdx_clean";
import remarkGfm from "remark-gfm";
import { getMDXComponents } from "@/mdx-components";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { data } = await getSingleBlog(slug);
    return {
      title: data.title ? `${data.title} | Kunal` : "Blog | Kunal",
      description: data.description ?? "Reading a blog...",
    };
  } catch {
    return { title: "Blog | Kunal", description: "Reading a blog..." };
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SingleBlogPage({ params }: PageProps) {
  // `params` may be a Promise in some Next versions; await to unwrap it safely
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  let content: string;
  let frontmatter: BlogMeta = {};
  try {
    const res = await getSingleBlog(slug);
    content = res.content;
    frontmatter = res.data || {};
  } catch {
    notFound();
  }

  if (frontmatter.externalUrl) {
    redirect(frontmatter.externalUrl);
  }

  return (
    <Container className="min-h-screen px-8 pt-24 md:p-20 md:pb-10 font-custom2 tracking-tight">
      <PageBorder side="right" />
      <PageBorder side="left" />
      <h1 className="text-neutral-900 dark:text-neutral-50 text-4xl font-custom font-bold  md:text-5xl">
        {frontmatter.title ?? slug}
      </h1>

      {frontmatter.date ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-right mt-2">{frontmatter.date}</p>
      ) : null}

      {frontmatter.image ? (
        <div className="my-6 mx-auto max-w-3xl" >
          <Image
            src={frontmatter.image.startsWith("/public") ? frontmatter.image.replace("/public", "") : frontmatter.image}
            alt={frontmatter.title ?? ""}
            width={1200}
            height={600}
            className="w-full h-auto rounded-xl object-cover shadow-xl"
          />
        </div>
      ) : null}

      <div className="prose tracking-normal font-custom2 mx-auto">
        <MDXRemote
          source={content}
          components={getMDXComponents({})}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark-dimmed",
                    keepBackground: true,
                  },
                ],
              ],
            },
          }}
        />
      </div>
    </Container>
  );
}
