'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

interface Question {
  question: string
  options: { text: string; value: string }[]
  category: string
}

interface Answer {
  question: string
  answer: string
  category: string
}

const TOTAL_QUESTIONS = 12

export default function AssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const fetchQuestion = async () => {
    setIsLoading(true)
    setSelectedOption(null)
    
    try {
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-question',
          currentQuestionIndex: currentIndex,
          previousQuestions,
        }),
      })
      
      const data = await res.json()
      setCurrentQuestion(data.question)
    } catch (error) {
      console.error('Failed to fetch question:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (currentIndex < TOTAL_QUESTIONS && !isComplete) {
      fetchQuestion()
    }
  }, [currentIndex])

  const handleAnswer = async (option: { text: string; value: string }) => {
    if (!currentQuestion || selectedOption) return
    
    setSelectedOption(option.value)
    
    const newAnswer: Answer = {
      question: currentQuestion.question,
      answer: option.text,
      category: currentQuestion.category,
    }
    
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)
    setPreviousQuestions([...previousQuestions, currentQuestion.question])
    
    setTimeout(() => {
      if (currentIndex + 1 >= TOTAL_QUESTIONS) {
        setIsComplete(true)
        localStorage.setItem('careerAssessmentAnswers', JSON.stringify(updatedAnswers))
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }, 500)
  }

  const progress = ((currentIndex + (isComplete ? 1 : 0)) / TOTAL_QUESTIONS) * 100

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      interests: 'Exploring Your Interests',
      skills: 'Discovering Your Skills',
      values: 'Understanding Your Values',
      workstyle: 'Defining Your Work Style',
    }
    return labels[category] || 'Career Assessment'
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Assessment Complete!</h1>
          <p className="text-muted-foreground mb-8">
            Great job! We&apos;ve analyzed your responses and prepared personalized career recommendations just for you.
          </p>
          <Link href="/results">
            <Button size="lg" className="gap-2">
              View Your Results
              <Sparkles className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {TOTAL_QUESTIONS}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Generating your next question...</p>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-4">
                  {getCategoryLabel(currentQuestion.category)}
                </span>
                <h2 className="text-2xl font-semibold text-foreground leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                        selectedOption === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                            selectedOption === option.value
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-muted-foreground/30'
                          }`}
                        >
                          {selectedOption === option.value ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              {String.fromCharCode(65 + index)}
                            </span>
                          )}
                        </div>
                        <span className="text-foreground">{option.text}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
