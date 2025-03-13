"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

export default function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date as Day, Month Date, Year
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get timezone
  const getTimezone = (date: Date) => {
    return (
      date
        .toLocaleDateString("en-US", {
          timeZoneName: "short",
        })
        .split(", ")[1] || ""
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-500/20"
    >
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-blue-400" />
        <div>
          <div className="text-xl font-mono text-blue-300">{formatTime(currentTime)}</div>
          <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:gap-2">
            <span>{formatDate(currentTime)}</span>
            <span className="hidden sm:inline">•</span>
            <span>{getTimezone(currentTime)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

