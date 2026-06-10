
import Container from "@/components/containers";
import Separator from "@/components/separator";
import PageBorder from "@/components/ui/page-border";
import { getAllBlogs } from "@/util/mdx_clean";
import type { Metadata } from "next";
import Link from 'next/link';
import { ArrowRight, ExternalLink } from "lucide-react";
import { SiMedium } from "react-icons/si";

export const metadata: Metadata = {
  title: "Blog | Kunal",
  description: "Thoughts on software engineering, web development, and technology",
};

export default async function BlogIndex() {
  const posts = await getAllBlogs();

  return (

    <Container className="min-h-screen px-8 pt-24 md:p-20 md:pb-10 relative mx-auto">
      <PageBorder side="right" />
      <PageBorder side="left" />
      <div className="max-w-4xl mx-auto ">

        {/* Header */}
        <div className="mb-3">
          <h1 className="text-3xl text-neutral-900 dark:text-neutral-50 md:text-3xl font-bold font-custom tracking-tight ">
            <span className="link--elara">All blogs</span></h1>

          <p className="text-s text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1 tracking-tight font-custom2 max-w-xl">
            I am a software engineer with a passion for building scalable
            and efficient systems. I spend my days crafting backend infrastructure
            while tinkering with ideas after hours.
          </p>
        </div>
        <Separator />

        {/* Blog Posts List */}
        <div className="flex flex-col gap-4 mt-8">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={p.externalUrl ?? `/blog/${p.slug}`}
              {...(p.externalUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative overflow-hidden rounded-xl 
                        border border-neutral-200 dark:border-neutral-800/50
                        bg-transparent
                        p-5 md:p-6
                        transition-all duration-300 
                        hover:bg-white dark:hover:bg-neutral-900/40
                        hover:shadow-sm dark:hover:shadow-none
                        hover:border-neutral-300/50 dark:hover:border-neutral-700/50"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                    <h2 className="text-lg md:text-xl font-bold font-custom text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                      {p.title ?? p.slug}
                    </h2>

                    {p.externalUrl && (
                      <SiMedium className="w-4 h-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
                    )}

                    {/* Arrow for mobile, visible inline with title */}
                    <ArrowRight className="w-4 h-4 text-neutral-400 md:hidden -rotate-45" />
                  </div>

                  {p.description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-custom2 leading-relaxed line-clamp-2 max-w-2xl">
                      {p.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-1">
                  {p.date && (
                    <time className="text-xs font-medium text-neutral-400 dark:text-neutral-500 font-custom2 uppercase tracking-widest whitespace-nowrap">
                      {new Date(p.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  )}

                  {/* Arrow for desktop, slides up from bottom */}
                  <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>{p.externalUrl ? "Read on Medium" : "Read"}</span>
                    {p.externalUrl ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </Container>
  );
}
