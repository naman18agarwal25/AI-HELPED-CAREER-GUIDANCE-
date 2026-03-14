"use client"

import { motion } from "framer-motion"
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  Lightbulb,
} from "lucide-react"

export function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Features
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Everything you need to find your path
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Our AI-powered platform analyzes your unique profile to deliver
            personalized career guidance and actionable insights.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-muted-foreground/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze your skills, interests, and personality to provide accurate career matches.",
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    description:
      "Receive tailored career suggestions based on your unique profile, with detailed explanations for each recommendation.",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description:
      "Stay informed with real-time job market trends, salary data, and growth projections for your recommended careers.",
  },
  {
    icon: Users,
    title: "Career Comparisons",
    description:
      "Compare multiple career paths side-by-side to make informed decisions about your professional future.",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description:
      "Get customized education and skill development recommendations to help you reach your career goals.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Steps",
    description:
      "Receive a clear roadmap with specific actions you can take today to move toward your ideal career.",
  },
]
