import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import { getSettings } from "@/actions/settings-actions"
import ProfileForm from "@/components/profile/profile-form"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const settings = await getSettings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <DashboardHeader user={session.user} settings={settings} />

        <main className="py-10">
          <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <h1 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Profile
            </h1>

            <ProfileForm user={session.user} />
          </div>
        </main>
      </div>
    </div>
  )
}

