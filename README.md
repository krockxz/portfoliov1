# Portfolio Website

A modern, responsive, and fast developer portfolio built using Next.js, Tailwind CSS, TypeScript, Framer Motion, MDX, and GitHub API integration.
Features include blog support, project pages, contribution graph, SEO optimization, and a clean minimal design.

---

## Live Demo

[kunalrc.vercel.app](https://kunalrc.vercel.app/)

---

## Features

- **Next.js App Router** architecture
- **Tailwind CSS** with Shadcn UI
- **MDX** support for blogs and project pages
- **GitHub Contribution Graph** integration
- **GitHub API** integration to fetch repositories
- **Framer Motion** animations
- **SEO** and Open Graph metadata
- Fully responsive and accessible

---

## Tech Stack

| Technology | Description |
|------------|-------------|
| Next.js    | React framework for production |
| TypeScript | Static typing |
| Tailwind CSS | Utility-first styling |
| Shadcn UI  | Accessible UI components |
| MDX        | Markdown with React support |
| Framer Motion | Animation library |
| GitHub API | Dynamic repo fetching |
| Vercel     | Deployment platform |

---

## Getting Started

### Prerequisites

- Node.js or Bun installed on your machine.
- A GitHub Personal Access Token (for fetching pinned repositories).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/krockxz/Portfoliov1.git
   cd Portfoliov1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up Environment Variables:**

   Create a `.env` file in the root directory:

   ```env
   # Required for GitHub API repo fetching
   GITHUB_TOKEN="your_github_personal_access_token"
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

Deploy to **Vercel** for the best experience.

> **Note:** After deploying, remember to set the `GITHUB_TOKEN` in your Vercel Project Settings > Environment Variables.

---

## License

This project is licensed under the MIT License.
