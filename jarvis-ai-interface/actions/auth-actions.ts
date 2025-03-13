"use server"

import { prisma } from "@/lib/db"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { signIn } from "next-auth/react"
import { generateVerificationToken } from "@/lib/tokens"
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/mail"

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function register(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { name, email, password } = validatedFields.data

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: { email: ["Email already in use"] } }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      settings: {
        create: {
          theme: "dark",
          accentColor: "blue",
        },
      },
    },
  })

  // Create verification token
  const verificationToken = await generateVerificationToken(email)

  // Send verification email
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: "Confirmation email sent!" }
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function login(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    return { error: { _form: ["Invalid credentials"] } }
  }
}

const resetSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function resetPassword(formData: FormData) {
  const validatedFields = resetSchema.safeParse({
    email: formData.get("email"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { email } = validatedFields.data

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Return success even if user doesn't exist for security
    return { success: "If your email is registered, you will receive a reset link" }
  }

  // Generate reset token
  const resetToken = await generateVerificationToken(email)

  // Send reset email
  await sendPasswordResetEmail(resetToken.email, resetToken.token)

  return { success: "Reset email sent!" }
}

const newPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  token: z.string(),
})

export async function setNewPassword(formData: FormData) {
  const validatedFields = newPasswordSchema.safeParse({
    password: formData.get("password"),
    token: formData.get("token"),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { password, token } = validatedFields.data

  // Find token
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verificationToken) {
    return { error: { _form: ["Invalid or expired token"] } }
  }

  // Check if token is expired
  const now = new Date()
  if (now > verificationToken.expires) {
    return { error: { _form: ["Token has expired"] } }
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: verificationToken.identifier },
  })

  if (!user) {
    return { error: { _form: ["User not found"] } }
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Update user password
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  })

  // Delete token
  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  })

  return { success: "Password updated successfully!" }
}

