"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Note {
  id: string
  content: string
  date: Date
}

export default function TaskManagement() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: "Research quantum computing applications", date: new Date() },
    { id: "2", content: "Review Mark 42 suit schematics", date: new Date() },
    { id: "3", content: "Call Pepper about the Stark Expo", date: new Date() },
  ])
  const [newNote, setNewNote] = useState("")
  const [viewingNotes, setViewingNotes] = useState(false)

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now().toString(), content: newNote, date: new Date() }])
      setNewNote("")
    }
  }

  const clearAllNotes = () => {
    setNotes([])
    setViewingNotes(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
      >
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Task Management & Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="flex flex-col space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <Button onClick={addNote} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> Create Note
              </Button>
              <Button
                onClick={() => setViewingNotes(!viewingNotes)}
                variant="outline"
                className="border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
              >
                <Eye className="h-4 w-4 mr-2" /> View Notes
              </Button>
              <Button
                onClick={clearAllNotes}
                variant="outline"
                className="border-gray-700 hover:border-red-500 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4 mr-2" /> Clear All
              </Button>
            </div>

            {viewingNotes && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
              >
                {notes.map((note) => (
                  <motion.div key={note.id} variants={item}>
                    <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <CardContent className="p-4">
                        <p className="text-gray-200">{note.content}</p>
                        <p className="text-xs text-gray-400 mt-2">{note.date.toLocaleString()}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </CardContent>
      </motion.div>
    </section>
  )
}

