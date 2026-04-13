import type { Analysis, Paper } from '../types/paper'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('paperlens_token')
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${BASE_URL}${path}`, { ...init, headers })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response.json() as Promise<T>
}

export const api = {
  register: (email: string, password: string) =>
    request<{ access_token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<{ access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  listPapers: () => request<Paper[]>('/papers'),
  importPaper: (source: string) =>
    request<Paper>('/papers/import', { method: 'POST', body: JSON.stringify({ source }) }),
  runAnalysis: (paperId: number) => request<Analysis>(`/analysis/run/${paperId}`, { method: 'POST' }),
  getAnalysis: (paperId: number) => request<Analysis>(`/analysis/${paperId}`),
  chat: (paperId: number, question: string) =>
    request<{ answer: string; cited_pages: number[]; confidence: number }>(`/chat/${paperId}`, {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),
}
