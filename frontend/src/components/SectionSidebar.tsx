interface Props {
  sections: string[]
}

export function SectionSidebar({ sections }: Props) {
  return (
    <aside className="rounded-xl bg-white p-3 shadow">
      <h4 className="font-semibold">Paper outline</h4>
      <ul className="mt-2 space-y-2 text-sm">
        {sections.map((section) => (
          <li key={section} className="rounded bg-slate-100 px-2 py-1">
            {section}
          </li>
        ))}
      </ul>
    </aside>
  )
}
