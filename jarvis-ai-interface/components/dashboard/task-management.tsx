"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createNote, deleteNote, deleteAllNotes } from "@/actions/note-actions"
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  content: string
  createdAt: Date
}

interface TaskManagementProps {
  initialNotes: Note[]
}

export default function TaskManagement({ initialNotes }: TaskManagementProps) {
  const { toast } = useToast()
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [newNote, setNewNote] = useState("")
  const [viewingNotes, setViewingNotes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim() || isSubmitting) return

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("content", newNote)

    const result = await createNote(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      // Optimistically update the UI
      const newNoteObj = {
        id: Date.now().toString(), // Temporary ID
        content: newNote,
        createdAt: new Date(),
      }

      setNotes([newNoteObj, ...notes])
      setNewNote("")
      setViewingNotes(true)

      toast({
        title: "Success",
        description: "Note created successfully!",
      })
    }

    setIsSubmitting(false)
  }

  const handleDeleteNote = async (id: string) => {
    const result = await deleteNote(id)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      // Optimistically update the UI
      setNotes(notes.filter((note) => note.id !== id))

      toast({
        title: "Success",
        description: "Note deleted successfully!",
      })
    }
  }

  const handleClearAllNotes = async () => {
    const result = await deleteAllNotes()

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      // Optimistically update the UI
      setNotes([])
      setViewingNotes(false)

      toast({
        title: "Success",
        description: "All notes cleared successfully!",
      })
    }
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
            <form onSubmit={handleAddNote} className="flex gap-2">
              <Input
                placeholder="Add a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                disabled={isSubmitting}
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                <Plus className="h-4 w-4 mr-2" /> Create Note
              </Button>
              <Button
                type="button"
                onClick={() => setViewingNotes(!viewingNotes)}
                variant="outline"
                className="border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
              >
                <Eye className="h-4 w-4 mr-2" /> View Notes
              </Button>
              <Button
                type="button"
                onClick={handleClearAllNotes}
                variant="outline"
                className="border-gray-700 hover:border-red-500 hover:bg-red-500/10"
                disabled={notes.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" /> Clear All
              </Button>
            </form>

            {viewingNotes && (
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
              >
                {notes.length === 0 ? (
                  <p className="text-gray-400 col-span-full text-center py-8">
                    No notes yet. Create your first note above.
                  </p>
                ) : (
                  notes.map((note) => (
                    <motion.div key={note.id} variants={item}>
                      <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <CardContent className="p-4 relative">
                          <p className="text-gray-200">{note.content}</p>
                          <p className="text-xs text-gray-400 mt-2">{new Date(note.createdAt).toLocaleString()}</p>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </div>
        </CardContent>
      </motion.div>
    </section>
  )
}

