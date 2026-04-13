import { useMemo, useState } from 'react'
import './index.css'
import { LandingPage } from './pages/LandingPage'
import { PaperDashboard } from './pages/PaperDashboard'
import { PaperReader } from './pages/PaperReader'
import { usePapers } from './hooks/usePapers'
import { api } from './services/api'
import type { Analysis, ChatMessage, Paper } from './types/paper'

type View = 'landing' | 'dashboard' | 'reader'

function App() {
  const { papers, loading, reload } = usePapers()
  const [view, setView] = useState<View>('landing')
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [citationPage, setCitationPage] = useState<number>()
  const [error, setError] = useState('')

  const title = useMemo(() => (selectedPaper ? `PaperLens • ${selectedPaper.title}` : 'PaperLens'), [selectedPaper])

  const openReader = async (paper: Paper) => {
    setSelectedPaper(paper)
    setView('reader')
    setError('')
    setChatMessages([])
    try {
      setAnalysis(await api.getAnalysis(paper.id))
    } catch {
      setAnalysis(null)
    }
  }

  const importPaper = async (source: string) => {
    try {
      await api.importPaper(source)
      await reload()
    } catch {
      setError('Failed to import paper. Please verify authentication/backend availability.')
    }
  }

  const runAnalysis = async () => {
    if (!selectedPaper) return
    try {
      setAnalysis(await api.runAnalysis(selectedPaper.id))
    } catch {
      setError('Analysis failed. Check backend logs and uploaded content.')
    }
  }

  const askQuestion = async (question: string) => {
    if (!selectedPaper) return
    setChatMessages((messages) => [...messages, { role: 'user', message: question }])
    try {
      const response = await api.chat(selectedPaper.id, question)
      setChatMessages((messages) => [
        ...messages,
        { role: 'assistant', message: response.answer || 'Not stated in the paper', citations: response.cited_pages },
      ])
    } catch {
      setChatMessages((messages) => [...messages, { role: 'assistant', message: 'Not stated in the paper' }])
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-4">
      <header className="mb-4 rounded-xl bg-white p-4 shadow">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          <nav className="flex gap-2">
            <button onClick={() => setView('landing')} className="rounded bg-slate-100 px-3 py-1">
              Landing
            </button>
            <button onClick={() => setView('dashboard')} className="rounded bg-slate-100 px-3 py-1">
              Dashboard
            </button>
            {selectedPaper && (
              <button onClick={() => setView('reader')} className="rounded bg-slate-100 px-3 py-1">
                Reader
              </button>
            )}
          </nav>
        </div>
        {view === 'reader' && (
          <button onClick={runAnalysis} className="mt-3 rounded bg-indigo-600 px-3 py-2 text-white">
            Run analysis
          </button>
        )}
      </header>

      {loading && <p className="mb-3 text-sm text-slate-500">Loading papers…</p>}
      {error && <p className="mb-3 rounded bg-rose-100 p-2 text-sm text-rose-700">{error}</p>}

      {view === 'landing' && <LandingPage papers={papers} onImport={importPaper} onOpen={openReader} />}
      {view === 'dashboard' && <PaperDashboard papers={papers} onOpen={openReader} />}
      {view === 'reader' && selectedPaper && (
        <PaperReader
          paper={selectedPaper}
          analysis={analysis}
          messages={chatMessages}
          citationPage={citationPage}
          onAsk={askQuestion}
          onSelectCitation={setCitationPage}
        />
      )}
    </main>
  )
}

export default App
