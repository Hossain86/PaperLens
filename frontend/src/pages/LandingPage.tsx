import type { Paper } from '../types/paper'
import { PaperCard } from '../components/PaperCard'
import { UploadBox } from '../components/UploadBox'

interface Props {
  papers: Paper[]
  onImport: (source: string) => Promise<void>
  onOpen: (paper: Paper) => void
}

export function LandingPage({ papers, onImport, onOpen }: Props) {
  return (
    <div className="space-y-4">
      <UploadBox onImport={onImport} />
      <section>
        <h3 className="mb-2 text-lg font-semibold">Recent papers</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {papers.slice(0, 4).map((paper) => (
            <PaperCard key={paper.id} paper={paper} onOpen={onOpen} />
          ))}
        </div>
      </section>
    </div>
  )
}
