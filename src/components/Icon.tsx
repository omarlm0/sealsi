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
  | 'phone'
  | 'mail'
  | 'whatsapp'
  | 'copy'
  | 'alert'

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
  phone: <path d="M6.6 3h2.8l1.6 4-2 1.3a13 13 0 0 0 5.7 5.7l1.3-2 4 1.6v2.8a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z" />,
  mail: <path d="M3 5h18v14H3V5Zm0 1 9 7 9-7" />,
  whatsapp: (
    <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.4-4.8a8.5 8.5 0 1 1 16-4Zm-8.5-6.2a6.2 6.2 0 0 0-5.2 9.6l-.8 2.6 2.7-.7a6.2 6.2 0 1 0 3.3-11.5Zm3.5 7.9c-.2.5-1 .9-1.4 1-.4.1-.9.1-1.4-.1a10 10 0 0 1-3.1-2.1 8 8 0 0 1-1.5-2.3c-.2-.5 0-1 .2-1.3l.5-.5c.1-.2.3-.2.5-.1l1.2 1.7c.1.2.1.4 0 .6l-.5.6c-.1.2-.2.3 0 .6.3.6.8 1.1 1.3 1.5.4.3.7.4.9.5.2 0 .4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.3.3.3.5 0 .1 0 .3-.1.4Z" />
  ),
  copy: <path d="M8 8h12v13H8V8Zm-4 8H3V3h12v2" />,
  alert: <path d="M12 3 2 20h20L12 3Zm0 6v5m0 3h.01" />,
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
