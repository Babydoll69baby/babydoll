"use client"

import { motion } from "framer-motion"
import { Settings, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="py-8 mt-16 mb-8"
    >
      <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-500 mr-3 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <p className="text-gray-400">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-medium">
                Powered by AI
              </span>{" "}
              • © {new Date().getFullYear()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-gray-800/50 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-gray-800/50 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-gray-800/50 border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

