import type { Analysis, ChatMessage, Paper } from '../types/paper'
import { AnalysisCards } from '../components/AnalysisCards'
import { ChatPanel } from '../components/ChatPanel'
import { FigureViewer } from '../components/FigureViewer'
import { NotesPanel } from '../components/NotesPanel'
import { PDFViewer } from '../components/PDFViewer'
import { SectionSidebar } from '../components/SectionSidebar'

interface Props {
  paper: Paper
  analysis: Analysis | null
  messages: ChatMessage[]
  citationPage: number | undefined
  onAsk: (question: string) => Promise<void>
  onSelectCitation: (page: number) => void
}

export function PaperReader({
  paper,
  analysis,
  messages,
  citationPage,
  onAsk,
  onSelectCitation,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-[220px_1fr_320px]">
        <SectionSidebar sections={['Abstract', 'Introduction', 'Methods', 'Results', 'Discussion', 'Conclusion']} />
        <PDFViewer pdfPath={paper.pdf_path} highlightedPage={citationPage} />
        <div className="space-y-3">
          <ChatPanel messages={messages} onAsk={onAsk} onSelectCitation={onSelectCitation} />
          <NotesPanel />
          <FigureViewer />
        </div>
      </div>
      <AnalysisCards analysis={analysis} />
    </div>
  )
}
