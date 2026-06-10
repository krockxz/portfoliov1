import Container from "@/components/containers";
import Socials from "@/components/socials";
import Separator from "@/components/separator";
import { getGithubData } from "@/lib/github";
import PageBorder from "@/components/ui/page-border";

import dynamic from "next/dynamic";

const Projects = dynamic(() => import("@/components/projects"));
const Timeline = dynamic(() => import("@/components/timeline"));
const GithubGraph = dynamic(() => import("@/components/githubgraph"));
const Skills = dynamic(() => import("@/components/skills"));
const GetInTouch = dynamic(() => import("@/components/get-in-touch"));

export default async function Home() {
  const githubData = await getGithubData();

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-8 pt-24 md:p-20 md:pb-10 mx-auto">

        <PageBorder side="right" />
        <PageBorder side="left" />

        {/* ---------------------------------------- */}
        {/* HEADING + SOCIALS (FIXED SAME LINE) */}
        {/* ---------------------------------------- */}

        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">Kunal Roy Choudhury</span>
          </h1>

          <Socials />
        </div>

        {/* ---------------------------------------- */}
        {/* SUBTEXT */}
        {/* ---------------------------------------- */}

        <div className="text-secondary font-custom2 text-s mt-1">
          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold font-custom">⚀ </span>
            <span className="text-neutral-700 dark:text-neutral-300">Turning caffeine into production-ready code</span>
          </p>

          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold">⚁ </span>
            <span className="text-neutral-700 dark:text-neutral-300">Backend systems architect who occasionally touches the frontend (when necessary)</span>
          </p>

          <p>
            <span className="text-neutral-950 dark:text-neutral-100 font-semibold">⚂ </span>
            <span className="text-neutral-700 dark:text-neutral-300">
              Building AI tools and debugging why the LLM thinks it's a poet
            </span>
          </p>
        </div>

        <Separator fullWidth className="my-3" />



        <Projects />

        <Separator />


        <Timeline />



        <GithubGraph data={githubData} />

        <Separator className="mt-12" />

        <Skills />

        <Separator className="mt-4" />

        <GetInTouch />


      </Container>
    </div>
  );
}