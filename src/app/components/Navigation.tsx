"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg font-semibold">
          My App
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </nav>
  )
}