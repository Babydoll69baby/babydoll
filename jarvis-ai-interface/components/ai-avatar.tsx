"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

interface AiAvatarProps {
  scrollY: number
}

export default function AiAvatar({ scrollY }: AiAvatarProps) {
  const controls = useAnimation()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10
      const y = (e.clientY / window.innerHeight - 0.5) * 10

      controls.start({
        x: x,
        y: y,
        transition: { type: "spring", stiffness: 50, damping: 20 },
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [controls])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: { x: number; y: number; radius: number; color: string; velocity: number }[] = []

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 255, ${Math.random() * 0.5 + 0.3})`,
        velocity: Math.random() * 0.5 + 0.2,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circular gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Move particles
        particle.y -= particle.velocity

        // Reset particles that go off screen
        if (particle.y < -particle.radius) {
          particle.y = canvas.height + particle.radius
          particle.x = Math.random() * canvas.width
        }
      })

      // Draw waveform
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)

      for (let i = 0; i < canvas.width; i++) {
        const amplitude = 20 * Math.sin(Date.now() / 500 + i / 30)
        ctx.lineTo(i, canvas.height / 2 + amplitude)
      }

      ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      animate={controls}
      className="relative w-40 h-40 rounded-full overflow-hidden"
      style={{
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
        transform: `translateY(${scrollY * 0.05}px)`,
      }}
    >
      <canvas ref={canvasRef} width={160} height={160} className="absolute inset-0" />
    </motion.div>
  )
}

