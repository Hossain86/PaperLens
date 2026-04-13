export const confidenceBadge = (score: number) => {
  if (score >= 0.75) return 'High'
  if (score >= 0.4) return 'Medium'
  return 'Low'
}
