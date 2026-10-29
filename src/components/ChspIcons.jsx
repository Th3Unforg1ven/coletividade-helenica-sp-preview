// Original CHSP pictograms: stepped joins echo the Greek meander.
// Decorative by default: the surrounding link or button supplies its own label.
function ChspIcon({ size = 24, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
      {...props}
    >
      {children}
    </svg>
  )
}

export function EncontroIcon(props) {
  return (
    <ChspIcon {...props}>
      <circle cx="6.25" cy="5.25" r="2.25" fill="currentColor" stroke="none" />
      <circle cx="17.75" cy="5.25" r="2.25" fill="currentColor" stroke="none" />
      <path d="M2.5 20v-5.25a4 4 0 0 1 4-4H8v4h4" />
      <path d="M21.5 20v-5.25a4 4 0 0 0-4-4H16v4h-4" />
      <path d="M6.25 17v3h11.5v-3M10 20v-2.5h4V20" />
    </ChspIcon>
  )
}

export function DocumentoIcon(props) {
  return (
    <ChspIcon {...props}>
      <path d="M14.5 2.5H5v19h14V7l-4.5-4.5ZM14 2.5v5h5" />
      <path d="M8 11h8M8 14h5M8 17h3v2h3v-2h2" />
    </ChspIcon>
  )
}

export function LivroIcon(props) {
  return (
    <ChspIcon {...props}>
      <path d="M12 5.5C9.5 3.5 6 3 2.5 3.5v15c3.5-.5 7 0 9.5 2 2.5-2 6-2.5 9.5-2v-15c-3.5-.5-7 0-9.5 2ZM12 6v14" />
      <path d="M5.5 7.5h3v2h1.25M15 8h3.5M5.5 12.5l4 .75M15 12.5h3.5" />
    </ChspIcon>
  )
}

export function CalendarioIcon(props) {
  return (
    <ChspIcon {...props}>
      <path d="M3 5h18v16H3ZM3 9h18M7 2.5v5M17 2.5v5" />
      <path d="M6.5 12.5h2v2h-2ZM11 12.5h2v2h-2ZM6.5 17h2M11 17h2" />
      <path d="m17.5 12.5 2 2-2 2-2-2 2-2Z" fill="currentColor" stroke="none" />
    </ChspIcon>
  )
}
