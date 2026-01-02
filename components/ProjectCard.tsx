// app/projects/components/ProjectCard.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, Calendar } from 'lucide-react'

interface Project {
  id: number
  title: string
  date: string
  description: string
  technologies: string[]
  image: string
  githubUrl: string | null
  liveUrl: string | null
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const svgRef = useRef<SVGSVGElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const frameRef = useRef(0)
  const boltsGroupRef = useRef<SVGGElement>(null)

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Animate electricity effect
  useEffect(() => {
    if (!svgRef.current) return

    const turbulenceBase = svgRef.current.querySelector('#turbulenceBase') as SVGElement
    const turbulenceIrregular = svgRef.current.querySelector('#turbulenceIrregular') as SVGElement

    if (!turbulenceBase || !turbulenceIrregular) return

    const animateElectricity = () => {
      frameRef.current += 0.005

      if (turbulenceBase) {
        turbulenceBase.setAttribute(
          'baseFrequency',
          `0.05 ${0.05 + Math.sin(frameRef.current) * 0.03}`
        )
      }

      if (turbulenceIrregular) {
        turbulenceIrregular.setAttribute(
          'baseFrequency',
          `0.1 ${0.3 + Math.cos(frameRef.current * 0.5) * 0.1}`
        )
      }

      animationFrameRef.current = requestAnimationFrame(animateElectricity)
    }

    animateElectricity()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Create lightning bolts
  useEffect(() => {
    if (!boltsGroupRef.current) return

    const neonColors = [
      '#0ff',
      '#0f0',
      '#f0f',
      '#ff0',
      '#ff00ff',
      '#ff5500',
      '#00ffff',
      '#00ff88',
      '#ff0088',
    ]

    const createBolt = () => {
      const w = 320
      const h = 480
      const startX = 20 + Math.random() * (w - 40)
      const startY = 10
      const endX = 20 + Math.random() * (w - 40)
      const endY = 400 + Math.random() * 70
      const segments = 6 + Math.floor(Math.random() * 4)

      let points = [{ x: startX, y: startY }]
      for (let i = 1; i < segments; i++) {
        const t = i / segments
        points.push({
          x: startX + (endX - startX) * t + (Math.random() - 0.5) * 80,
          y: startY + (endY - startY) * t + (Math.random() - 0.5) * 60,
        })
      }
      points.push({ x: endX, y: endY })

      let d = `M ${points[0].x} ${points[0].y}`
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`
      }

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', d)
      path.setAttribute('class', 'bolt')
      path.style.stroke = neonColors[Math.floor(Math.random() * neonColors.length)]
      path.style.fill = 'none'
      path.style.strokeWidth = '2.5'
      path.style.strokeLinecap = 'round'
      path.style.strokeLinejoin = 'round'
      path.style.filter = 'drop-shadow(0 0 10px currentColor)'
      path.style.opacity = '0'
      path.style.pointerEvents = 'none'

      return path
    }

    const flashBolt = () => {
      if (!boltsGroupRef.current) return

      const bolt = createBolt()
      boltsGroupRef.current.appendChild(bolt)

      const len = bolt.getTotalLength()
      bolt.style.strokeDasharray = len.toString()
      bolt.style.strokeDashoffset = len.toString()
      bolt.style.opacity = '1'

      const animation = bolt.animate(
        [
          { strokeDashoffset: len, opacity: 1 },
          { strokeDashoffset: 0, opacity: 1 },
          { strokeDashoffset: -len * 0.5, opacity: 0 },
        ],
        { duration: 400, easing: 'ease-in-out' }
      )

      animation.onfinish = () => {
        try {
          if (boltsGroupRef.current && bolt.parentNode) {
            boltsGroupRef.current.removeChild(bolt)
          }
        } catch (e) {
          // Ignore errors
        }
      }
    }

    const interval = setInterval(flashBolt, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <motion.div
      className="group relative bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-cyan-500/50 cursor-pointer h-[480px] flex flex-col justify-end"
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.15)',
      }}
    >
      <Link href={`/projects/${project.id}`} className="absolute inset-0 z-40" aria-label={`View details for ${project.title}`} />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title} project`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Electric Border SVG */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        viewBox="0 0 320 480"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`rainbowGradient-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgb(215, 215, 215)', stopOpacity: 1 }} />
            <stop offset="15%" style={{ stopColor: 'rgb(255, 127, 0)', stopOpacity: 1 }} />
            <stop offset="30%" style={{ stopColor: 'rgb(255, 255, 0)', stopOpacity: 1 }} />
            <stop offset="45%" style={{ stopColor: 'rgb(91, 149, 91)', stopOpacity: 1 }} />
            <stop offset="60%" style={{ stopColor: 'rgb(87, 96, 103)', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: 'rgb(75, 0, 130)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(226, 115, 19)', stopOpacity: 1 }} />
          </linearGradient>

          <filter id={`baseElectricFilter-${project.id}`}>
            <feTurbulence
              id="turbulenceBase"
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves={3}
              seed={2}
              result="noiseBase"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noiseBase"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id={`irregularElectricFilter-${project.id}`}>
            <feTurbulence
              id="turbulenceIrregular"
              type="fractalNoise"
              baseFrequency="0.1 0.3"
              numOctaves={4}
              seed={10}
              result="noiseIrregular"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noiseIrregular"
              scale={45}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter id={`glow-${project.id}`}>
            <feGaussianBlur stdDeviation={8} result="blur1" />
            <feGaussianBlur in="blur1" stdDeviation={12} result="blur2" />
            <feGaussianBlur in="blur2" stdDeviation={18} result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="4"
          y="4"
          width="312"
          height="472"
          rx="24"
          fill="none"
          stroke={`url(#rainbowGradient-${project.id})`}
          strokeWidth={3}
          filter={`url(#baseElectricFilter-${project.id}) url(#glow-${project.id})`}
        />

        <rect
          x="4"
          y="4"
          width="312"
          height="472"
          rx="24"
          fill="none"
          stroke={`url(#rainbowGradient-${project.id})`}
          strokeWidth={2}
          filter={`url(#irregularElectricFilter-${project.id}) url(#glow-${project.id})`}
        />

        <g ref={boltsGroupRef} id="bolts" />
      </svg>

      {/* Content */}
      <div className="relative z-30 p-6 space-y-4">
        {/* Links Overlay (Top Right) */}
        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {project.githubUrl && (
            <button
              onClick={(e) => handleLinkClick(e, project.githubUrl!)}
              className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white"
              aria-label="View on GitHub"
              suppressHydrationWarning
            >
              <Github size={18} />
            </button>
          )}
          {project.liveUrl && (
            <button
              onClick={(e) => handleLinkClick(e, project.liveUrl!)}
              className="p-2.5 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 rounded-full hover:bg-cyan-500/40 hover:scale-110 transition-all text-cyan-300"
              aria-label="View live demo"
              suppressHydrationWarning
            >
              <ExternalLink size={18} />
            </button>
          )}
        </div>

        {/* Title and Date */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-xs font-medium text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded-md border border-cyan-500/20 backdrop-blur-sm">
              <Calendar size={12} className="mr-1.5" />
              {project.date}
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight drop-shadow-lg">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full text-xs font-medium backdrop-blur-sm group-hover:border-cyan-500/30 group-hover:text-cyan-200 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 rounded-full text-xs font-medium backdrop-blur-sm">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
    </motion.div>
  )
}
