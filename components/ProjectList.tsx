'use client'

import React from 'react'
import Link from 'next/link'

interface Project {
  title: string
  description: string
  year: string
  href: string
}

const projects: Project[] = [
  {
    title: "SJSU BAJA Website",
    description: "An interactive, design focused website to showcase the SJSU BAJA team",
    year: "2025",
    href: "https://sjsu-baja-sae.vercel.app/"
  },
  {
    title: "Supermemory Chat",
    description: "An IMessage style chat app with AI-powered assistants and memory.",
    year: "2025",
    href: "https://supermemory.chat/"
  },
  {
    title: "Micrograd",
    description: "A simple implementation of backpropagation in Python",
    year: "2025",
    href: "https://github.com/Omm2005/micrograd"
  },
  {
    title: "Digit Recognizer",
    description: "A simple implementation of a digit recognizer using PyTorch",
    year: "2025",
    href: "https://github.com/Omm2005/Digit-Recognizer"
  },
  {
    title: "Degrees of Separation",
    description: "A python code that finds the degree of seperation.",
    year: "2025",
    href: "https://github.com/Omm2005/degrees"
  },
  {
    title: "Minimal Design Blog",
    description: "An Attempt to create minimalistic blog design with smooth animations.",
    year: "2024",
    href: "https://minimal-blog-omm.vercel.app/"
  },
  {
    title: "MCEC Website",
    description: "First attempt to create smooth designed website.",
    year: "2024",
    href: "https://mcec.vercel.app/"
  },
  {
    title: "Big Bot",
    description: "PID controlled autonomous robot for VEXU competition.",
    year: "2024",
    href: "https://github.com/Omm2005/BigBot2023"
  },
  {
    title: "Poet This",
    description: "A twitter bot and website that generates beautify images of tweets.",
    year: "2023",
    href: "https://x.com/DhravyaShah/status/1636092953121943552"
  }
]

import { motion } from 'motion/react'
import { EncryptedText } from './ui/encrypted-text'

export default function ProjectList() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {projects.map((project, index) => (
        <Link
          key={index}
          href={project.href}
          target="_blank"
          className="group flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 w-full rounded-2xl px-4 py-4 transition-colors hover:bg-muted/70"
        >
          <div className="w-full sm:w-auto sm:whitespace-nowrap whitespace-normal min-w-0" suppressHydrationWarning>
            <EncryptedText className="text-foreground font-medium mr-2 text-sm" text={project.title}  />
            <EncryptedText className="text-muted-foreground text-sm" text={project.description} />
          </div>
          
          <div className="hidden sm:block flex-1 relative h-px self-center">
            <div className="absolute inset-0 bg-border group-hover:bg-foreground/50 transition-colors" />
            <motion.div
              initial={{ scaleX: 0, opacity: 1 }}
              whileInView={{ scaleX: [0, 1, 1], opacity: [1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ 
                duration: 2, 
                times: [0, 0.5, 1],
                ease: "easeInOut", 
                delay: index * 0.1
              }}
              className="absolute inset-0 bg-foreground origin-left"
            />
          </div>
          <span className="text-muted-foreground group-hover:text-foreground tabular-nums transition-colors text-sm">
            {project.year}
          </span>
        </Link>
      ))}
    </div>
  )
}
