"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopHeader } from "@/components/top-header"
import { GSAPProvider } from "@/components/gsap-provider"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import SignInPage from "./auth/signin/page"

const inter = Inter({ subsets: ["latin"] })

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, loading,user } = useAuth()
  const pathname = usePathname()
  const isAuthPage = pathname === "/auth/signin" || pathname === "/auth/signup" || pathname === "/auth/forgot-password"

  // TEMPORARILY DISABLED FOR TESTING - Skip authentication checks
  /*
  if (loading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen items-center justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        </body>
      </html>
    )
  }

  if (user === null && !isAuthPage) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <SignInPage/>
        </body>
      </html>
    )
  }
  */

  return (
    <html lang="en">
      <body className={inter.className}>
        <GSAPProvider>
          {isAuthPage ? (
            <main className="flex-1">{children}</main>
          ) : (
            <SidebarProvider defaultOpen={true}>
              <div className="min-h-screen flex w-full bg-gray-50">
                <AppSidebar />
                <SidebarInset className="flex-1 flex flex-col min-w-0">
                  <TopHeader />
                  <main className="flex-1">{children}</main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          )}
        </GSAPProvider>
        <Toaster />
      </body>
    </html>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </AuthProvider>
  )
}
