"use server"

import { prisma } from "@/lib/db"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const noteSchema = z.object({
  content: z.string().min(1, "Note content is required"),
})

export async function createNote(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const validatedFields = noteSchema.safeParse({
    content: formData.get("content"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { content } = validatedFields.data

  await prisma.note.create({
    data: {
      content,
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
  return { success: "Note created successfully!" }
}

export async function getNotes() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return []
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return notes
}

export async function deleteNote(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  // Check if note belongs to user
  const note = await prisma.note.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  })

  if (!note) {
    return { error: "Note not found" }
  }

  await prisma.note.delete({
    where: {
      id,
    },
  })

  revalidatePath("/dashboard")
  return { success: "Note deleted successfully!" }
}

export async function deleteAllNotes() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  await prisma.note.deleteMany({
    where: {
      userId: session.user.id,
    },
  })

  revalidatePath("/dashboard")
  return { success: "All notes deleted successfully!" }
}

