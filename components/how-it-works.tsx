"use client"

import { motion } from "framer-motion"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-card py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            How It Works
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Your journey to the perfect career
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Our streamlined process makes discovering your ideal career simple
            and effective.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-xl font-bold text-foreground">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="absolute top-6 left-14 hidden h-px w-full bg-border md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const steps = [
  {
    title: "Take the Assessment",
    description:
      "Answer questions about your skills, interests, values, and work preferences. The assessment takes about 10-15 minutes to complete.",
  },
  {
    title: "Get AI Analysis",
    description:
      "Our AI processes your responses and compares them against thousands of career profiles to find your best matches.",
  },
  {
    title: "Explore Your Matches",
    description:
      "Review your personalized career recommendations with detailed insights, salary data, and actionable next steps.",
  },
]
