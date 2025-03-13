"use server"

import { prisma } from "@/lib/db"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const settingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  accentColor: z.enum(["blue", "purple", "green", "red", "orange"]),
  notifications: z.boolean().optional(),
  voiceEnabled: z.boolean().optional(),
  defaultStocks: z.array(z.string()).optional(),
  defaultCryptos: z.array(z.string()).optional(),
})

export async function updateSettings(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const validatedFields = settingsSchema.safeParse({
    theme: formData.get("theme"),
    accentColor: formData.get("accentColor"),
    notifications: formData.get("notifications") === "on",
    voiceEnabled: formData.get("voiceEnabled") === "on",
    defaultStocks: formData.getAll("defaultStocks").map((stock) => stock.toString()),
    defaultCryptos: formData.getAll("defaultCryptos").map((crypto) => crypto.toString()),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { theme, accentColor, notifications, voiceEnabled, defaultStocks, defaultCryptos } = validatedFields.data

  await prisma.settings.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      theme,
      accentColor,
      notifications: notifications ?? true,
      voiceEnabled: voiceEnabled ?? true,
      defaultStocks: defaultStocks ?? [],
      defaultCryptos: defaultCryptos ?? [],
    },
    create: {
      userId: session.user.id,
      theme,
      accentColor,
      notifications: notifications ?? true,
      voiceEnabled: voiceEnabled ?? true,
      defaultStocks: defaultStocks ?? [],
      defaultCryptos: defaultCryptos ?? [],
    },
  })

  revalidatePath("/settings")
  return { success: "Settings updated successfully!" }
}

export async function getSettings() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  const settings = await prisma.settings.findUnique({
    where: {
      userId: session.user.id,
    },
  })

  return settings
}

