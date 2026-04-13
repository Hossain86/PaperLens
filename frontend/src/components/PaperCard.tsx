import type { Paper } from '../types/paper'

interface Props {
  paper: Paper
  onOpen: (paper: Paper) => void
}

export function PaperCard({ paper, onOpen }: Props) {
  return (
    <button onClick={() => onOpen(paper)} className="w-full rounded-xl bg-white p-4 text-left shadow hover:bg-slate-50">
      <h4 className="font-semibold">{paper.title}</h4>
      <p className="text-sm text-slate-600">{paper.authors || 'Unknown authors'}</p>
      <p className="mt-2 text-xs text-slate-500">{new Date(paper.created_at).toLocaleString()}</p>
    </button>
  )
}
