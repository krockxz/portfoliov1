import React from 'react'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { SiX } from 'react-icons/si'
import Container from './containers'

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/krockxz',
      icon: Github
    },
    {
      name: 'X',
      url: 'https://x.com/kunalgoesbyken',
      icon: SiX
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kunal-roy-choudhury-7407211a7/',
      icon: Linkedin
    },
  ]

  return (
    <footer className="w-full bg-neutral-50 dark:bg-neutral-950">
      <Container className="flex flex-col items-center justify-between gap-4 py-2  sm:flex-row border border-neutral-200 dark:border-neutral-800">
        {/* Built with love by Kunal Roy Choudhury removed */}
        <div className="flex items-center gap-4 ml-9">
          {socialLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 dark:text-neutral-50 opacity-70 hover:opacity-100 transition cursor-pointer "
                aria-label={`Visit ${link.name} profile`}
              >
                <IconComponent size={15} />
              </Link>
            )
          })}
        </div>
      </Container>
    </footer>
  )
}

export default Footer;