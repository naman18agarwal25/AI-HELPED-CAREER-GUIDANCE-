"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-card py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-background p-8 text-center md:p-16"
        >
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Ready to discover your ideal career?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Join thousands of professionals who have found their perfect career
            path with CareerAI. Start your free assessment today.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/assessment">
              <Button size="lg" className="gap-2">
                Start Free Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg">
                Chat with AI
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
