interface Props {
  pdfPath: string
  highlightedPage?: number
}

export function PDFViewer({ pdfPath, highlightedPage }: Props) {
  return (
    <div className="rounded-xl bg-white p-3 shadow">
      <div className="mb-2 text-xs text-slate-500">Citation page: {highlightedPage ?? 'None selected'}</div>
      {pdfPath.toLowerCase().endsWith('.pdf') ? (
        <iframe title="PDF" src={pdfPath} className="h-[600px] w-full rounded border" />
      ) : (
        <div className="flex h-[600px] items-center justify-center rounded border text-sm text-slate-500">
          Imported source: {pdfPath}
        </div>
      )}
    </div>
  )
}
