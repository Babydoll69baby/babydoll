import { prisma } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(Date.now() + 3600 * 1000) // 1 hour

  const existingToken = await prisma.verificationToken.findFirst({
    where: { identifier: email },
  })

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  })

  return verificationToken
}

