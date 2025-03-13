import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import TaskManagement from "@/components/dashboard/task-management"
import FinancialDashboard from "@/components/dashboard/financial-dashboard"
import CodeGenerator from "@/components/dashboard/code-generator"
import AiAvatar from "@/components/ai-avatar"
import { getNotes } from "@/actions/note-actions"
import { getSettings } from "@/actions/settings-actions"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const notes = await getNotes()
  const settings = await getSettings()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <DashboardHeader user={session.user} settings={settings} />

        <div className="fixed right-10 top-32 z-50 hidden lg:block">
          <AiAvatar scrollY={0} />
        </div>

        <main className="py-10 space-y-24">
          <TaskManagement initialNotes={notes} />
          <FinancialDashboard settings={settings} />
          <CodeGenerator />
        </main>

        <footer className="py-8 mt-16 mb-8">
          <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 mr-3 flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <p className="text-gray-400">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-medium">
                    JARVIS AI Assistant
                  </span>{" "}
                  • © {new Date().getFullYear()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-sm text-gray-500">Logged in as {session.user.email}</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

