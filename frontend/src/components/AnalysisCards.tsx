import type { Analysis } from '../types/paper'
import { confidenceBadge } from '../utils/format'

interface Props {
  analysis: Analysis | null
}

const fields: Array<keyof Pick<Analysis, 'problem_gap' | 'motivation' | 'hypothesis' | 'methodology' | 'main_finding' | 'limitations'>> = [
  'problem_gap',
  'motivation',
  'hypothesis',
  'methodology',
  'main_finding',
  'limitations',
]

export function AnalysisCards({ analysis }: Props) {
  if (!analysis) {
    return <div className="rounded-xl bg-white p-3 text-sm text-slate-500 shadow">Run analysis to see structured answers.</div>
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.map((field) => (
        <article key={field} className="rounded-xl bg-white p-3 shadow">
          <div className="flex items-center justify-between">
            <h5 className="font-semibold capitalize">{field.replace('_', ' ')}</h5>
            <span className="rounded bg-slate-100 px-2 py-1 text-xs">{confidenceBadge(analysis.confidence_score)}</span>
          </div>
          <p className="mt-2 text-sm">{analysis[field] || 'Not stated in the paper'}</p>
          <p className="mt-2 text-xs text-slate-500">Evidence: Extracted from analysis run</p>
          <p className="text-xs text-slate-500">Page: from cited chunks</p>
        </article>
      ))}
    </div>
  )
}
