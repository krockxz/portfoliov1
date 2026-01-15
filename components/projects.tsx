
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
  poster?: string;     // Static poster image (AVIF, ~30KB)
  video?: string;      // Full quality video (loads on click)
  thumbVideo?: string; // Preview video (loads on hover)
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
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video', src: string } | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMedia(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);



  const projects: Project[] = [
    {
      title: "Gostman",
      src: "/images/project3.png",
      poster: "/images/gostman-poster.avif",
      video: "/videos/gostman-full.mp4",
      thumbVideo: "/videos/gostman-preview.mp4",
      description: "A native, privacy-first API client built with Wails (Go + React). 10x lighter than Postman with native support for REST, GraphQL, and WebSockets. 100% local and private.",
      tech: ["go", "react"],
      github: "https://github.com/krockxz/gostman",
      live: "https://gostman.vercel.app/",
    },
    {
      title: "Un-Nexted",
      src: "/images/un-nexted.avif",
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
            <div
              className="relative w-full h-44 overflow-hidden shrink-0 cursor-pointer"
              style={{ aspectRatio: '16/9' }} // Lock aspect ratio to prevent CLS
              onMouseEnter={() => project.thumbVideo && setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => {
                if (project.thumbVideo) {
                  setActiveMedia({ type: 'video', src: project.video || project.thumbVideo });
                } else {
                  setActiveMedia({ type: 'image', src: project.src });
                }
              }}
            >
              {/* Show poster or regular image by default */}
              {!hoveredProject || hoveredProject !== project.title ? (
                <Image
                  src={project.poster || project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  className="object-cover"
                />
              ) : (
                /* Load preview video only on hover */
                <video
                  src={project.thumbVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}

              {/* Subtle hover overlay */}
              <div
                className="
                  absolute inset-0
                  bg-black/0
                  group-hover:bg-black/5
                  transition-all duration-300
                "
              />
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
                  const uniqueId = `${project.title} -${key} `;

                  return (
                    <button
                      key={key}
                      type="button"
                      className="relative cursor-pointer bg-transparent border-0 p-0"
                      onMouseEnter={() => setHoveredTech(uniqueId)}
                      onMouseLeave={() => setHoveredTech(null)}
                      onFocus={() => setHoveredTech(uniqueId)}
                      onBlur={() => setHoveredTech(null)}
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
                    </button>
                  );
                })}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMedia(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black rounded-xl overflow-hidden w-[90%] max-w-5xl shadow-xl"
            >
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-3 right-3 p-2 bg-neutral-200 dark:bg-neutral-700 rounded-full cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={20} className="text-neutral-900 dark:text-neutral-100" />
              </button>

              {activeMedia.type === 'video' ? (
                <video
                  src={activeMedia.src}
                  className="w-full h-auto"
                  controls
                  autoPlay
                />
              ) : (
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <Image
                    src={activeMedia.src}
                    alt="Project preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
