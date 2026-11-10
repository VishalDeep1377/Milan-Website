import { ArrowUpRight } from 'lucide-react'

interface AnnouncementBarProps {
  onExploreClick: () => void
}

export function AnnouncementBar({ onExploreClick }: AnnouncementBarProps) {
  return (
    <div className="announcement" role="region" aria-label="Festival announcement">
      <span className="live-dot" aria-hidden="true" />
      <span>THE CAMPUS IS ABOUT TO COME ALIVE</span>
      <span className="announce-sep">/</span>
      <span>MILAN 2026</span>
      <a
        href="#events"
        onClick={(e) => {
          e.preventDefault()
          onExploreClick()
        }}
        aria-label="Explore the festival lineup"
      >
        EXPLORE THE LINEUP <ArrowUpRight size={12} aria-hidden="true" />
      </a>
    </div>
  )
}
