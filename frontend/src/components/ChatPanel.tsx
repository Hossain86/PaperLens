import { useState } from 'react'
import type { ChatMessage } from '../types/paper'
import { CitationHighlight } from './CitationHighlight'

interface Props {
  messages: ChatMessage[]
  onAsk: (question: string) => Promise<void>
  onSelectCitation: (page: number) => void
}

export function ChatPanel({ messages, onAsk, onSelectCitation }: Props) {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    try {
      await onAsk(question)
      setQuestion('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="rounded-xl bg-white p-3 shadow">
      <h4 className="font-semibold">AI assistant</h4>
      <div className="mt-3 max-h-72 space-y-3 overflow-auto pr-1">
        {messages.map((message, index) => (
          <article key={index} className="rounded border border-slate-200 p-2 text-sm">
            <p className="font-semibold capitalize">{message.role}</p>
            <p className="mt-1">{message.message}</p>
            <CitationHighlight pages={message.citations ?? []} onSelect={onSelectCitation} />
          </article>
        ))}
      </div>
      <form onSubmit={submit} className="mt-3 space-y-2">
        <input
          className="w-full rounded border border-slate-300 px-3 py-2"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask about the paper"
        />
        <button className="rounded bg-indigo-600 px-3 py-2 text-white" disabled={loading}>
          {loading ? 'Thinking…' : 'Ask'}
        </button>
      </form>
    </section>
  )
}
