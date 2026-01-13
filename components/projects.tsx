"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Github, X } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiCloudflare,
  SiNodedotjs,
  SiGoland,
  SiBun,
} from "react-icons/si";

type TechKey =
  | "next"
  | "ts"
  | "react"
  | "three"
  | "cloud"
  | "node"
  | "go"
  | "bun";

interface Project {
  title: string;
  src: string;
  video?: string;
  thumbVideo?: string; // New field for video thumbnail
  description: string;
  tech: TechKey[];
  github: string;
  live?: string;
}

const iconMap: Record<TechKey, any> = {
  next: SiNextdotjs,
  ts: SiTypescript,
  react: SiReact,
  three: SiThreedotjs,
  cloud: SiCloudflare,
  node: SiNodedotjs,
  go: SiGoland,
  bun: SiBun,
};

const techNames: Record<TechKey, string> = {
  next: "Next.js",
  ts: "TypeScript",
  react: "React",
  three: "Three.js",
  cloud: "Cloudflare",
  node: "Node.js",
  go: "Go",
  bun: "Bun",
};

const Projects = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const projects: Project[] = [
    {
      title: "Gostman",
      src: "/images/project3.png",
      video: "/videos/gostman.mp4",
      thumbVideo: "/videos/gostman.mp4",
      description: "A native, privacy-first API client built with Wails (Go + React). 10x lighter than Postman with native support for REST, GraphQL, and WebSockets. 100% local and private.",
      tech: ["go", "react"],
      github: "https://github.com/krockxz/gostman",
      live: "https://gostman.vercel.app/",
    },
    {
      title: "Un-Nexted",
      src: "/images/un-nexted.png",
      description: "De-mystifying the meta-framework. A raw implementation of Next.js core features like SSR, hydration, and file-system routing from scratch, revealing the magic behind modern web frameworks.",
      tech: ["bun", "react", "ts"],
      github: "https://github.com/krockxz/Un-nexted",
    },
  ];

  return (
    <div className="mt-8">
      {/* Subtitle */}
      <p
        className="
          font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-4 py-[7px]
           text-sm inline-block
          bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border
        "
      >
        I love crafting production-grade software that solves real problems.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-7">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: idx * 0.12,
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="
              relative group overflow-hidden rounded-xl
              border border-neutral-200 dark:border-neutral-800
              bg-white dark:bg-black
              hover:shadow-md
              transition-all duration-300
              flex flex-col h-full
            "
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0 pointer-events-none
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
                bg-[radial-gradient(circle_at_50%_130%,rgba(0,0,0,0.08),transparent_70%)]
                dark:bg-[radial-gradient(circle_at_50%_130%,rgba(255,255,255,0.10),transparent_75%)]
              "
            />

            {/* IMAGE / VIDEO THUMBNAIL */}
            <div className="relative w-full h-44 overflow-hidden shrink-0">
              {project.thumbVideo ? (
                <video
                  src={project.thumbVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0 || (idx === 1 && projects[0].thumbVideo !== undefined)}
                  className="object-cover"
                />
              )}

              {/* Black tint overlay */}
              <div
                className="
                  absolute inset-0 
                  bg-black/0 
                  group-hover:bg-black/10
                  transition-all duration-500
                "
              />

              {/* PLAY BUTTON - Only if video exists */}
              {project.video && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveVideo(project.video!)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveVideo(project.video!);
                    }
                  }}
                  className="
                    absolute inset-0 z-20 flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300 ease-out cursor-pointer
                  "
                  aria-label={`Play video for ${project.title}`}
                >
                  <div
                    className="
                      h-12 w-12 bg-white/90 dark:bg-black/75 rounded-full 
                      flex items-center justify-center shadow-md backdrop-blur-md
                    "
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      className='w-6 h-6 text-black dark:text-white'
                    >
                      <path d='M5.25 5.653v12.694c0 .856.926 1.39 1.668.958l11.1-6.347a1.125 1.125 0 000-1.916L6.918 4.695c-.742-.432-1.668.102-1.668.958z' />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col flex-grow">

              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-custom font-semibold text-neutral-900 dark:text-neutral-50">
                  {project.title}
                </h2>

                <div className="flex gap-3">
                  {project.live && (
                    <button
                      onClick={() => window.open(project.live, "_blank")}
                      className="opacity-75 hover:opacity-100 transition cursor-pointer"
                      aria-label={`View live site for ${project.title}`}
                    >
                      <Globe
                        size={16}
                        className="text-neutral-700 dark:text-neutral-300"
                      />
                    </button>
                  )}
                  <button
                    onClick={() => window.open(project.github, "_blank")}
                    className="opacity-75 hover:opacity-100 transition cursor-pointer"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <Github
                      size={16}
                      className="text-neutral-700 dark:text-neutral-300"
                    />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed tracking-wide font-custom2">
                {project.description}
              </p>

              {/* TECH STACK */}
              <p className="text-xs text-neutral-500 font-medium mb-2 font-custom2 mt-auto">
                Tech Stack
              </p>

              <div className="flex gap-3 flex-wrap">
                {project.tech.map((key) => {
                  const Icon = iconMap[key];
                  const uniqueId = `${project.title}-${key}`;

                  return (
                    <div
                      key={key}
                      className="relative cursor-pointer"
                      onMouseEnter={() => setHoveredTech(uniqueId)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <Icon
                        className="w-5 h-5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                        aria-label={techNames[key]}
                      />

                      {hoveredTech === uniqueId && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20" role="tooltip">
                          <div className="relative bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-[10px] font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap border border-neutral-200 dark:border-neutral-700">
                            {techNames[key]}

                            {/* Arrow */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-100 dark:bg-neutral-800 rotate-45 border-b border-r border-neutral-200 dark:border-neutral-700"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black rounded-xl overflow-hidden w-[90%] max-w-3xl shadow-xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 p-2 bg-neutral-200 dark:bg-neutral-700 rounded-full cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                aria-label="Close video modal"
              >
                <X size={20} className="text-neutral-900 dark:text-neutral-100" />
              </button>

              <video
                src={activeVideo}
                className="w-full h-auto"
                controls
                autoPlay
              />

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
