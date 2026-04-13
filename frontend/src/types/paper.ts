export interface Paper {
  id: number
  title: string
  authors: string
  year: number | null
  abstract: string
  pdf_path: string
  created_at: string
}

export interface Analysis {
  title: string
  authors: string
  year: number | null
  TLDR: string
  problem_gap: string
  motivation: string
  hypothesis: string
  methodology: string
  main_finding: string
  limitations: string
  confidence_score: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  message: string
  citations?: number[]
}
