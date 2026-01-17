import Container from "@/components/containers";
import Socials from "@/components/socials";
import { getGithubData } from "@/lib/github";

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
      <Container className="min-h-[200vh] px-8 pt-24 md:p-20 md:pb-10 mx-auto">

        {/* RIGHT BORDER */}
        <div
          className="absolute right-0 top-0 h-full w-6 border-x border-x-[var(--pattern-fg)] opacity-80 dark:opacity-12
          bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
          bg-[length:10px_10px] bg-fixed"
        > </div>

        {/* LEFT BORDER */}
        <div
          className="absolute left-0 top-0 h-full w-6 border-x border-x-[var(--pattern-fg)] opacity-80 dark:opacity-12
          bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]
          bg-[length:10px_10px] bg-fixed"
        ></div>

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

        <div className="hidden md:block absolute right-6 left-0 h-px bg-[var(--pattern-fg)] my-3 opacity-90 dark:opacity-15"></div>



        <Projects />

        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15"></div>


        <Timeline />



        <GithubGraph data={githubData} />

        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15 mt-12"></div>

        <Skills />

        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15 mt-4"></div>

        <GetInTouch />


      </Container>
    </div>
  );
}