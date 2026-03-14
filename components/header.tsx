"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Compass, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">CareerAI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="#careers"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Explore Careers
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/chat">
            <Button variant="ghost" size="sm">
              AI Counselor
            </Button>
          </Link>
          <Link href="/assessment">
            <Button size="sm">Start Assessment</Button>
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#careers"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Explore Careers
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Link href="/chat">
                <Button variant="ghost" size="sm" className="w-full">
                  AI Counselor
                </Button>
              </Link>
              <Link href="/assessment">
                <Button size="sm" className="w-full">Start Assessment</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
