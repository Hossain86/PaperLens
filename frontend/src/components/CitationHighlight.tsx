interface Props {
  pages: number[]
  onSelect: (page: number) => void
}

export function CitationHighlight({ pages, onSelect }: Props) {
  if (pages.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onSelect(page)}
          className="rounded bg-indigo-50 px-2 py-1 text-xs text-indigo-700"
        >
          p.{page}
        </button>
      ))}
    </div>
  )
}
