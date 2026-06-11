"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { TechKey } from "@/lib/tech-icons";
import { TechIconTooltip } from "@/components/ui/tech-icon-tooltip";

interface ExperienceItem {
  company: string;
  designation: string;
  date: string;
  description: string;
  logo: string;
  logoWidth?: number;
  logoHeight?: number;
  href?: string;
  tech?: TechKey[];
}

export const Timeline = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences: ExperienceItem[] = [
    {
      company: "CollectEdge",
      designation: "Software Development Engineer",
      date: "March 2026 - Present",
      description: `Scaled Rust microservices to 50K+ daily messages across 10+ queues because voice bots and WhatsApp campaigns don't wait politely.
Built an AI call analytics platform that listens, transcribes, and judges your sentiment so humans don't have to scrub through calls.
Shipped a predictive dialer that knows who to call and when, and a credit risk engine scoring in under 100ms because nobody likes being on hold.`,
      logo: "/images/logos/collectedge.jpeg",
      href: "https://www.collectedge.in/",
      logoWidth: 199,
      logoHeight: 36,
      tech: ["rust", "flutter", "aws", "react", "postgres"],
    },
    {
      company: "Indian Kanoon",
      designation: "Software Developer",
      date: "April 2025 - Feb 2026",
      description: `Built <a href="https://indiankanoon.org/prism/" target="_blank" class="underline hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">Prism</a> from scratch.
Teaching AI to be a lawyer so humans don't have to read 5,000 documents manually.
Scaled the system to handle 5,000+ concurrent users without the server filing a lawsuit against me.`,
      logo: "/images/logos/indian_kanoon_logo.jpeg",
      href: "https://indiankanoon.org/",
      tech: ["python", "django", "react", "redis", "celery", "postgres", "gemini"],
    },
    {
      company: "Chargebee",
      designation: "Software Engineer Intern",
      date: "Sept 2024 - April 2025",
      description: `Refined large-scale data migration systems and optimized database interactions.
Moved 2 million records closer to their new home, reducing query time by 45% because nobody likes waiting.
Built a validation system that stops bad data at the door, saving 500k subscriptions from an identity crisis.`,
      logo: "/images/logos/chargebee.jpg",
      href: "https://www.chargebee.com/",
      tech: ["java", "vue", "postgres", "docker"],
    },
    {
      company: "AiDash",
      designation: "Software Engineer Intern",
      date: "Jan 2024 - Sept 2024",
      description: `Designed scalable APIs and data retrieval frameworks.
Decomposed a massive monolith into microservices because code needs personal space too.
Optimized SQL pagination so fast it feels like the data was always there.`,
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
      <h1 className="text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 py-2">
        <span className="link--elara">Experiences</span>
      </h1>
      <div className="hidden md:block absolute right-6 left-0 h-px bg-[var(--pattern-fg)] my-0.5 opacity-90 dark:opacity-15"></div>

      <div className="flex flex-col gap-4 px-4 md:px-0 my-6">
        {experiences.map((exp, idx) => (
          <div
            key={exp.company}
            className="group relative rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200 border border-transparent hover:border-neutral-100 dark:hover:border-neutral-800"
          >
            {/* Main Row */}
            <div
              className="flex items-start gap-4 p-4 cursor-pointer"
              onClick={() => toggleExpand(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleExpand(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expandedIndex === idx}
            >
              {/* Logo */}
              <div className="relative shrink-0 mt-1 z-10">
                {exp.href ? (
                  <Link
                    href={exp.href}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="block"
                  >
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={exp.logoWidth ?? 48}
                      height={exp.logoHeight ?? 48}
                      className="size-12 rounded-lg object-contain"
                    />
                  </Link>
                ) : (
                    <Image
                      src={exp.logo}
                      alt={exp.company}
                      width={exp.logoWidth ?? 48}
                      height={exp.logoHeight ?? 48}
                      className="size-12 rounded-lg object-contain"
                    />
                )}
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
                  {exp.tech && <div className="mb-3"><TechIconTooltip tech={exp.tech} size="sm" scope={exp.company} /></div>}

                  {/* Description */}
                  <ul className="list-disc pl-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-300 font-custom2 leading-relaxed">
                    {exp.description
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((point, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{ __html: point }}
                        />
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
