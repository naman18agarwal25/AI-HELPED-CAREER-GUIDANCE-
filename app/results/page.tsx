'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Loader2, 
  TrendingUp, 
  GraduationCap, 
  DollarSign, 
  ChevronRight,
  Sparkles,
  Target,
  Heart,
  Briefcase,
  ArrowRight,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'

interface Career {
  title: string
  matchScore: number
  description: string
  whyGoodFit: string
  averageSalary: string
  educationRequired: string
  keySkills: string[]
  growthOutlook: string
  nextSteps: string[]
}

interface ProfileSummary {
  strengths: string[]
  interests: string[]
  workStyle: string
  values: string[]
}

interface Results {
  careers: Career[]
  profileSummary: ProfileSummary
}

export default function ResultsPage() {
  const [results, setResults] = useState<Results | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedCareer, setExpandedCareer] = useState<number | null>(0)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const savedAnswers = localStorage.getItem('careerAssessmentAnswers')
        
        if (!savedAnswers) {
          setError('No assessment data found. Please complete the assessment first.')
          setIsLoading(false)
          return
        }

        const answers = JSON.parse(savedAnswers)

        const res = await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'generate-results',
            answers,
          }),
        })

        const data = await res.json()
        setResults(data.results)
      } catch (err) {
        console.error('Failed to fetch results:', err)
        setError('Failed to generate results. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Analyzing Your Profile
          </h2>
          <p className="text-muted-foreground">
            Our AI is finding the perfect career matches for you...
          </p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-6">{error}</p>
            <Link href="/assessment">
              <Button>
                <RotateCcw className="w-4 h-4 mr-2" />
                Take Assessment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!results) return null

  const matchScoreData = results.careers.map((career) => ({
    name: career.title.length > 15 ? career.title.substring(0, 15) + '...' : career.title,
    score: career.matchScore,
  }))

  const profileRadarData = [
    { trait: 'Technical', value: 75 },
    { trait: 'Creative', value: 85 },
    { trait: 'Analytical', value: 80 },
    { trait: 'Social', value: 70 },
    { trait: 'Leadership', value: 65 },
    { trait: 'Detail-Oriented', value: 78 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Analysis Complete</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Career Recommendations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your unique combination of interests, skills, and values, here are the careers that best match your profile.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Your Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Key Strengths
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.profileSummary.strengths.map((strength, i) => (
                      <Badge key={i} variant="secondary">{strength}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.profileSummary.interests.map((interest, i) => (
                      <Badge key={i} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Work Style
                  </h4>
                  <p className="text-sm text-foreground">{results.profileSummary.workStyle}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Core Values</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.profileSummary.values.map((value, i) => (
                      <Badge key={i} variant="outline" className="border-primary/30 text-primary">
                        {value}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Profile Traits</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={profileRadarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis 
                          dataKey="trait" 
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                        />
                        <Radar
                          name="Profile"
                          dataKey="value"
                          stroke="#ffffff"
                          fill="#ffffff"
                          fillOpacity={0.15}
                          strokeWidth={2}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Career Match Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={matchScoreData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        type="number" 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={120}
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {matchScoreData.map((_, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index === 0 ? '#ffffff' : `rgba(255, 255, 255, ${0.8 - index * 0.15})`}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {results.careers.map((career, index) => (
                <motion.div
                  key={career.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-200 ${
                      expandedCareer === index ? 'border-primary' : 'hover:border-primary/50'
                    }`}
                    onClick={() => setExpandedCareer(expandedCareer === index ? null : index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-lg font-bold text-primary">#{index + 1}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{career.title}</h3>
                            <p className="text-sm text-muted-foreground">{career.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{career.matchScore}%</div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              expandedCareer === index ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {expandedCareer === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-border"
                        >
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Why This is a Good Fit</h4>
                              <p className="text-sm text-muted-foreground">{career.whyGoodFit}</p>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <DollarSign className="w-5 h-5 text-primary" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Average Salary</div>
                                  <div className="font-medium text-foreground">{career.averageSalary}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Education Required</div>
                                  <div className="font-medium text-foreground">{career.educationRequired}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                <div>
                                  <div className="text-xs text-muted-foreground">Growth Outlook</div>
                                  <div className="font-medium text-foreground">{career.growthOutlook}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="font-medium text-foreground mb-3">Key Skills Required</h4>
                            <div className="flex flex-wrap gap-2">
                              {career.keySkills.map((skill, i) => (
                                <Badge key={i} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="font-medium text-foreground mb-3">Next Steps</h4>
                            <ul className="space-y-2">
                              {career.nextSteps.map((step, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  {step}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Want More Personalized Guidance?
              </h3>
              <p className="text-muted-foreground mb-6">
                Chat with our AI career counselor for deeper insights and personalized advice.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/chat">
                  <Button size="lg" className="gap-2">
                    Chat with AI Counselor
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button size="lg" variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Retake Assessment
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
