import { generateText, Output } from 'ai'
import { z } from 'zod'

export const maxDuration = 60

const questionSchema = z.object({
  question: z.string().describe('The assessment question to ask'),
  options: z.array(z.object({
    text: z.string().describe('The option text'),
    value: z.string().describe('A short identifier for this option'),
  })).describe('4 multiple choice options'),
  category: z.string().describe('The category this question belongs to: interests, skills, values, or workstyle'),
})

const careerRecommendationSchema = z.object({
  careers: z.array(z.object({
    title: z.string().describe('Career title'),
    matchScore: z.number().describe('Match percentage 0-100'),
    description: z.string().describe('Brief description of the career'),
    whyGoodFit: z.string().describe('Why this career matches the user profile'),
    averageSalary: z.string().describe('Average salary range'),
    educationRequired: z.string().describe('Typical education requirements'),
    keySkills: z.array(z.string()).describe('3-5 key skills needed'),
    growthOutlook: z.string().describe('Job market outlook'),
    nextSteps: z.array(z.string()).describe('3 actionable next steps'),
  })).describe('Top 5 career recommendations'),
  profileSummary: z.object({
    strengths: z.array(z.string()).describe('Identified strengths'),
    interests: z.array(z.string()).describe('Key interest areas'),
    workStyle: z.string().describe('Preferred work style summary'),
    values: z.array(z.string()).describe('Core career values'),
  }),
})

export async function POST(req: Request) {
  const { action, answers, currentQuestionIndex, previousQuestions } = await req.json()

  if (action === 'generate-question') {
    const questionNumber = currentQuestionIndex + 1
    const previousQuestionsContext = previousQuestions?.length 
      ? `Previous questions asked: ${previousQuestions.join(', ')}. DO NOT repeat these topics.`
      : ''

    const categoryFocus = questionNumber <= 3 ? 'interests' 
      : questionNumber <= 6 ? 'skills'
      : questionNumber <= 9 ? 'values'
      : 'workstyle'

    const { output } = await generateText({
      model: 'openai/gpt-4o',
      output: Output.object({ schema: questionSchema }),
      prompt: `Generate career assessment question #${questionNumber} of 12.
      
Focus on category: ${categoryFocus}

${previousQuestionsContext}

Create a unique, insightful question that helps understand the person's career preferences.
Make it conversational and engaging, not clinical.
The options should be diverse and reveal different personality traits or preferences.

For interests: Ask about activities, subjects, or topics they enjoy
For skills: Ask about abilities, tasks they excel at, or natural talents  
For values: Ask about what matters most in work (impact, security, creativity, etc.)
For workstyle: Ask about preferred work environment, team dynamics, pace, etc.`,
    })

    return Response.json({ question: output })
  }

  if (action === 'generate-results') {
    const answersContext = answers.map((a: { question: string; answer: string }, i: number) => 
      `Q${i + 1}: ${a.question}\nAnswer: ${a.answer}`
    ).join('\n\n')

    const { output } = await generateText({
      model: 'openai/gpt-4o',
      output: Output.object({ schema: careerRecommendationSchema }),
      prompt: `Based on this career assessment, provide personalized career recommendations.

Assessment Responses:
${answersContext}

Analyze the responses to understand:
1. Their interests and passions
2. Natural skills and abilities
3. Core values in work
4. Preferred work style and environment

Then recommend 5 careers that would be excellent matches, ordered by match score.
Be specific and practical in your recommendations.
Consider both traditional and emerging career paths.
Include a mix of career levels (entry to senior).`,
    })

    return Response.json({ results: output })
  }

  return Response.json({ error: 'Invalid action' }, { status: 400 })
}
