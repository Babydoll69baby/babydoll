"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import TaskManagement from "@/components/task-management"
import RealTimeUpdates from "@/components/real-time-updates"
import CodeGenerator from "@/components/code-generator"
import Footer from "@/components/footer"
import AiAvatar from "@/components/ai-avatar"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [userName, setUserName] = useState("Tony Stark")

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-5 pointer-events-none" />

      <motion.div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Header userName={userName} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="fixed right-10 top-32 z-50 hidden lg:block"
        >
          <AiAvatar scrollY={scrollY} />
        </motion.div>

        <main className="py-10 space-y-24">
          <TaskManagement />
          <RealTimeUpdates />
          <CodeGenerator />
        </main>

        <Footer />
      </div>
    </div>
  )
}

