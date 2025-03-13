"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic, Play, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import TimeDisplay from "./time-display"

interface HeaderProps {
  userName: string
}

export default function Header({ userName }: HeaderProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real app, this would trigger voice recognition
  }

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking)
    // In a real app, this would trigger text-to-speech
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-8 mt-8"
    >
      <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Hello, {userName}
              </h1>
              <p className="text-gray-300 mt-2 text-lg">How can I assist you today?</p>
            </div>

            <TimeDisplay />
          </motion.div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 transition-all duration-300 ${
                isListening
                  ? "bg-blue-500 text-white border-blue-400"
                  : "bg-gray-800/50 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
              }`}
              onClick={toggleListening}
            >
              <Mic className={`h-5 w-5 ${isListening ? "animate-pulse" : ""}`} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={`rounded-full h-12 w-12 transition-all duration-300 ${
                isSpeaking
                  ? "bg-purple-500 text-white border-purple-400"
                  : "bg-gray-800/50 border-gray-700 hover:border-purple-500 hover:bg-purple-500/10"
              }`}
              onClick={toggleSpeaking}
            >
              <Play className={`h-5 w-5 ${isSpeaking ? "animate-pulse" : ""}`} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12 bg-gray-800/50 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

