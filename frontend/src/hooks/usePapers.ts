import { useEffect, useState } from 'react'
import { api } from '../services/api'
import type { Paper } from '../types/paper'

export function usePapers() {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      setPapers(await api.listPapers())
    } catch {
      setPapers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  return { papers, loading, reload: load }
}
