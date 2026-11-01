import type { ReactNode } from 'react'

export type IconName =
  | 'arrow'
  | 'bag'
  | 'box'
  | 'plus'
  | 'minus'
  | 'check'
  | 'menu'
  | 'close'
  | 'spark'
  | 'grid'
  | 'message'
  | 'shield'

const PATHS: Record<IconName, ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  bag: <path d="M5 7h14l1 14H4L5 7Z M9 8V6a3 3 0 0 1 6 0v2" />,
  box: <path d="m3 7 9-4 9 4v11l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v11M7 5l9 4" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  spark: <path d="M12 2c1 6 4 9 10 10-6 1-9 4-10 10C11 16 8 13 2 12 8 11 11 8 12 2Z" />,
  grid: <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />,
  message: <path d="M4 4h16v12H9l-5 4V4Zm4 4h8M8 12h5" />,
  shield: <path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5l8-3Zm-4 9 3 3 5-6" />,
}

type IconProps = {
  name: IconName
  className?: string
}

export function Icon({ name, className = '' }: IconProps) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
