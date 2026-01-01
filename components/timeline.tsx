import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  SiReact,
  SiPython,
  SiDjango,
  SiRedis,
  SiCelery,
  SiPostgresql,
  SiGooglegemini,
  SiVuedotjs,
  SiDocker,
  SiMongodb,
  SiAmazons3,
  SiJenkins,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

type TechKey =
  | "react"
  | "python"
  | "java"
  | "django"
  | "redis"
  | "celery"
  | "postgres"
  | "gemini"
  | "vue"
  | "docker"
  | "mongo"
  | "s3"
  | "jenkins";

const iconMap: Record<TechKey, any> = {
  react: SiReact,
  python: SiPython,
  java: FaJava,
  django: SiDjango,
  redis: SiRedis,
  celery: SiCelery,
  postgres: SiPostgresql,
  gemini: SiGooglegemini,
  vue: SiVuedotjs,
  docker: SiDocker,
  mongo: SiMongodb,
  s3: SiAmazons3,
  jenkins: SiJenkins,
};

const techNames: Record<TechKey, string> = {
  react: "React",
  python: "Python",
  java: "Java",
  django: "Django",
  redis: "Redis",
  celery: "Celery",
  postgres: "PostgreSQL",
  gemini: "Gemini",
  vue: "Vue.js",
  docker: "Docker",
  mongo: "MongoDB",
  s3: "Amazon S3",
  jenkins: "Jenkins",
};

interface ExperienceItem {
  company: string;
  designation: string;
  date: string;
  description: string;
  logo: string;
  href: string;
  tech?: TechKey[];
}

export const Timeline = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences: ExperienceItem[] = [
    {
      company: "Indian Kanoon",
      designation: "Software Developer",
      date: "April 2025 - Present",
      description: `Built <a href="https://indiankanoon.org/prism/" target="_blank" class="underline hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">Prism</a> from scratch.`,
      logo: "/images/logos/indiankanoon.png",
      href: "https://indiankanoon.org/",
      tech: ["python", "django", "react", "redis", "celery", "postgres", "gemini"],
    },
    {
      company: "Chargebee",
      designation: "Software Engineer Intern",
      date: "Sept 2024 - April 2025",
      description: "Refined large-scale data migration systems and optimized database interactions.",
      logo: "/images/logos/chargebee.jpg",
      href: "https://www.chargebee.com/",
      tech: ["java", "vue", "postgres", "docker"],
    },
    {
      company: "AiDash",
      designation: "Software Engineer Intern",
      date: "Jan 2024 - Sept 2024",
      description: "Designed scalable APIs and data retrieval frameworks.",
      logo: "/images/logos/aidash.jpg",
      href: "https://www.linkedin.com/company/aidash/",
      tech: ["java", "python", "django", "mongo", "postgres", "s3", "docker", "jenkins"],
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mb-0">
      <h1 className="text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 py-2 mt-2 ml-6 md:ml-0">
        <span className="link--elara">Experiences</span>
      </h1>
      <div className="hidden md:block absolute right-6 w-[53rem] h-px bg-(--pattern-fg) my-[0.4] opacity-90 dark:opacity-15"></div>

      <div className="flex flex-col gap-4 px-4 md:px-0 my-6">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            className="group relative rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200 border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800"
          >
            {/* Main Row */}
            <div
              className="flex items-start gap-4 p-4 cursor-pointer"
              onClick={() => toggleExpand(idx)}
            >
              {/* Logo */}
              <div className="relative shrink-0 mt-1 z-10">
                <Link
                  href={exp.href}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="block rounded-full transition-transform hover:scale-110 active:scale-95"
                >
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    width={48}
                    height={48}
                    className="rounded-full object-cover size-12 border border-neutral-200 dark:border-neutral-700 bg-white"
                  />
                </Link>
              </div>

              {/* Content Container */}
              <div className="flex flex-col md:flex-row md:justify-between flex-1 gap-2 md:gap-4">
                {/* Left Side: Company & Designation */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 font-custom tracking-wide">
                    {exp.company}
                  </h3>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 font-custom2">
                    {exp.designation}
                  </p>
                </div>

                {/* Right Side: Date & Arrow */}
                <div className="flex items-center justify-between md:justify-end gap-4 mt-1 md:mt-0">
                  <span className="text-sm text-neutral-500 dark:text-neutral-500 font-custom2 whitespace-nowrap">
                    {exp.date}
                  </span>
                  <div className={`p-1 rounded-full bg-transparent group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-all duration-200 ${expandedIndex === idx ? 'rotate-180' : ''}`}>
                    <ChevronDown size={16} className="text-neutral-500 dark:text-neutral-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <div
              className={`
                grid transition-all duration-300 ease-in-out
                ${expandedIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
              `}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 md:pl-20 md:pr-4">
                  {/* Tech Stack */}
                  {exp.tech && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.tech.map((key) => {
                        const Icon = iconMap[key];
                        const uniqueId = `${exp.company}-${key}`;

                        return (
                          <div
                            key={key}
                            className="group/tech relative cursor-pointer"
                            onMouseEnter={() => setHoveredTech(uniqueId)}
                            onMouseLeave={() => setHoveredTech(null)}
                          >
                            <Icon
                              className="w-4 h-4 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            />
                            {hoveredTech === uniqueId && (
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20">
                                <div className="relative bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-[10px] font-medium px-2 py-1 rounded-md shadow-lg whitespace-nowrap border border-neutral-200 dark:border-neutral-700">
                                  {techNames[key]}
                                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-100 dark:bg-neutral-800 rotate-45 border-b border-r border-neutral-200 dark:border-neutral-700"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Description */}
                  <ul className="list-disc pl-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-300 font-custom2 leading-relaxed">
                    {exp.description
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((point, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
