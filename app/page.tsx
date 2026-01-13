"use client";

import { useState } from "react";

import Container from "@/components/containers";

import dynamic from "next/dynamic";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { SiX } from "react-icons/si";

const Projects = dynamic(() => import("@/components/projects"));
const Timeline = dynamic(() => import("@/components/timeline"));
const GithubGraph = dynamic(() => import("@/components/githubgraph"), { ssr: false });
const Skills = dynamic(() => import("@/components/skills"));
const GetInTouch = dynamic(() => import("@/components/get-in-touch"));

export default function Home() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socials = [
    {
      name: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/krockxz", "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open("https://www.linkedin.com/in/kunal-roy-choudhury-7407211a7/", "_blank"),
    },
    {
      name: "X",
      icon: SiX,
      action: () => window.open("https://x.com/kunalgoesbyken", "_blank"),
    },
    {
      name: "Email",
      icon: Mail,
      action: () => (window.location.href = "mailto:kunalrc.workmail7@gmail.com"),
    },
    {
      name: "Resume",
      icon: FileText,
      action: () => window.open("/resume.pdf", "_blank"),
    },
  ];

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

          <div className="flex flex-wrap gap-4 sm:justify-end">
            {socials.map((social) => (
              <div
                key={social.name}
                className="relative cursor-pointer group"
                onMouseEnter={() => setHoveredSocial(social.name)}
                onMouseLeave={() => setHoveredSocial(null)}
                onClick={social.action}
              >
                <social.icon
                  size={20}
                  className="text-neutral-900 dark:text-neutral-50 opacity-70 hover:opacity-100 transition"
                />
                {hoveredSocial === social.name && (
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-[10px] font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap border border-neutral-200 dark:border-neutral-700">
                      {social.name}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-100 dark:bg-neutral-800 rotate-45 border-t border-l border-neutral-200 dark:border-neutral-700"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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

        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] my-3 opacity-90 dark:opacity-15"></div>



        <Projects />

        <br />
        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15"></div>


        <Timeline />



        <GithubGraph />

        <br />
        <br />
        <br />
        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15"></div>

        <Skills />
        <br />
        <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-[var(--pattern-fg)] opacity-90 dark:opacity-15"></div>

        <GetInTouch />


      </Container>
    </div>
  );
}