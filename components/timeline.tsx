import React, { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import {
  SiNextdotjs,
  SiTypescript,
  SiReact,
  SiThreedotjs,
  SiPrisma,
  SiCloudflare,
  SiLangchain,
  SiNodedotjs,
  SiPython,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";

type TechKey =
  | "next"
  | "ts"
  | "react"
  | "three"
  | "prisma"
  | "cloud"
  | "langchain"
  | "node"
  | "python"
  | "java"
  | "aws";

const iconMap: Record<TechKey, any> = {
  next: SiNextdotjs,
  ts: SiTypescript,
  react: SiReact,
  three: SiThreedotjs,
  prisma: SiPrisma,
  cloud: SiCloudflare,
  langchain: SiLangchain,
  node: SiNodedotjs,
  python: SiPython,
  java: FaJava,
  aws: FaAws,
};

const techNames: Record<TechKey, string> = {
  next: "Next.js",
  ts: "TypeScript",
  react: "React",
  three: "Three.js",
  prisma: "Prisma",
  cloud: "Cloudflare",
  langchain: "LangChain",
  node: "Node.js",
  python: "Python",
  java: "Java",
  aws: "AWS",
};

type Data = {
  title: string;
  href?: string;
  content: {
    title: string;
    description: string;
    src: string;
    href: string;
    tech?: TechKey[];
  }[];
};

export const Timeline = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const data: Data[] = [
    {
      title: "Indian Kanoon",
      href: "https://indiankanoon.org/",
      content: [
        {
          title: "Software Developer (April 2025 - Present)",
          description: `
            Building high-performance document processing pipelines and integrating AI into the legal search engine.
            Focusing on accelerating the digitization of regional law archives and improving search accuracy for millions of users.
          `,
          src: "/images/kunal.jpg",
          href: "https://indiankanoon.org/",
          tech: ["python", "node"],
        },
      ],
    },
    {
      title: "Internships",
      href: "",
      content: [
        {
          title: "Software Engineer Intern @ Chargebee (Sept 2024 - April 2025)",
          description: `
            Refined large-scale data migration systems and optimized database interactions.
            Developed automated validation tools to ensure billing accuracy and performance across global customer environments.
          `,
          src: "/images/kunal.jpg",
          href: "https://www.chargebee.com/",
          tech: ["java", "cloud"],
        },
        {
          title: "Software Engineer Intern @ AiDash (Jan 2024 - Sept 2024)",
          description: `
            Designed scalable APIs and data retrieval frameworks.
            Implemented efficient paging and filtering logic for massive datasets, ensuring smooth data access for enterprise utility management.
          `,
          src: "/images/kunal.jpg",
          href: "https://www.linkedin.com/company/aidash/",
          tech: ["python", "aws"],
        },
      ],
    }
  ];

  return (
    <div>
      <h1 className=" text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 pb-2 mt-2">
        <span className="link--elara">Experiences</span>
      </h1>

      <div className="pl-6">
        {data.map((year, idx) => (

          <div key={year.title} className=" relative">
            {year.href ? (
              <Link
                href={year.href}
                target="_blank"
                className="text-neutral-900 dark:text-neutral-50 font-custom font-semibold py-1 tracking-wide text-lg hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors "
              >
                <div className="absolute right-[-56] w-212 h-px bg-(--pattern-fg) border border-dashed opacity-15 dark:opacity-15  "></div>


                <div className="py-3">
                  {year.title}
                </div>
              </Link>
            ) : (
              <p className="text-neutral-900 dark:text-neutral-50 font-custom font-semibold py-1 tracking-wide text-lg mt-2">
                {year.title}
              </p>
            )}

            {year.content.map((item, idx) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 text-neutral-700 dark:text-neutral-300 font-custom2 text-sm md:text-s mt-3 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{item.title}</h3>
                  <ul className="py-5 list-disc pl-6">
                    {item.description
                      .toString()
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                  </ul>

                  {/* 🔹 Icons Updated to match Skills style with Tooltip */}
                  {item.tech && (
                    <div className="flex flex-wrap gap-3 py-3">
                      {item.tech.map((key) => {
                        const Icon = iconMap[key];
                        // Create a unique ID for each instance to avoid conflicts if same tech appears multiple times
                        const uniqueId = `${item.title}-${key}`;

                        return (
                          <div
                            key={key}
                            className="group relative cursor-pointer"
                            onMouseEnter={() => setHoveredTech(uniqueId)}
                            onMouseLeave={() => setHoveredTech(null)}
                          >
                            <Icon
                              className="w-5 h-5 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors"
                            />

                            {hoveredTech === uniqueId && (
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
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
                  )}
                </div>

                <Image
                  src={item.src}
                  alt={item.title}
                  width={200}
                  height={120}
                  className="rounded-full size-10 self-start md:self-auto"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
