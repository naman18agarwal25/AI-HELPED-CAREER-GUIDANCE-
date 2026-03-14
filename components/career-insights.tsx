"use client"

import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts"

const salaryData = [
  { role: "Software Engineer", salary: 120 },
  { role: "Data Scientist", salary: 115 },
  { role: "Product Manager", salary: 130 },
  { role: "UX Designer", salary: 95 },
  { role: "Marketing Manager", salary: 90 },
]

const skillsData = [
  { skill: "Technical", value: 85 },
  { skill: "Creative", value: 70 },
  { skill: "Analytical", value: 90 },
  { skill: "Leadership", value: 75 },
  { skill: "Communication", value: 80 },
  { skill: "Problem Solving", value: 88 },
]

export function CareerInsights() {
  return (
    <section id="careers" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Career Insights
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Data-driven career exploration
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Explore career paths with comprehensive data on salaries, required
            skills, and market demand.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Average Salaries by Role
                </CardTitle>
                <CardDescription>
                  Annual salary in thousands (USD)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryData} layout="vertical">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#262626"
                        horizontal={true}
                        vertical={false}
                      />
                      <XAxis
                        type="number"
                        stroke="#a3a3a3"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        dataKey="role"
                        type="category"
                        stroke="#a3a3a3"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        width={120}
                      />
                      <Bar
                        dataKey="salary"
                        fill="#ffffff"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Skills Assessment
                </CardTitle>
                <CardDescription>
                  Your skill profile analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skillsData}>
                      <PolarGrid stroke="#262626" />
                      <PolarAngleAxis
                        dataKey="skill"
                        stroke="#a3a3a3"
                        fontSize={12}
                      />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke="#ffffff"
                        fill="#ffffff"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 grid gap-6 md:grid-cols-3"
        >
          {topCareers.map((career, index) => (
            <Card key={index} className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-foreground">
                    {career.title}
                  </CardTitle>
                  <Badge variant="secondary">{career.match}% Match</Badge>
                </div>
                <CardDescription>{career.field}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Skill Alignment
                      </span>
                      <span className="text-foreground">{career.skills}%</span>
                    </div>
                    <Progress value={career.skills} className="h-1.5" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Interest Match
                      </span>
                      <span className="text-foreground">
                        {career.interest}%
                      </span>
                    </div>
                    <Progress value={career.interest} className="h-1.5" />
                  </div>
                  <div className="pt-2 text-sm text-muted-foreground">
                    Avg. Salary: ${career.salary}K/year
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const topCareers = [
  {
    title: "Software Engineer",
    field: "Technology",
    match: 95,
    skills: 92,
    interest: 88,
    salary: 120,
  },
  {
    title: "Data Scientist",
    field: "Analytics",
    match: 88,
    skills: 85,
    interest: 90,
    salary: 115,
  },
  {
    title: "Product Manager",
    field: "Business",
    match: 82,
    skills: 78,
    interest: 85,
    salary: 130,
  },
]
