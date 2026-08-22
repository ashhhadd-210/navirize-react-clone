export function ArrowUpRight({ size = 16, className = 'btn__arrow' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 12 12 4M12 4H5.5M12 4v6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowDown({ size = 22, className = 'acc__chev' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M11 3.5v15M11 18.5 5 12.5M11 18.5l6-6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Stylised wordmark — the original ships this as vector art. */
export function Wordmark() {
  return <span aria-hidden="true">ᑎAVIRIZE</span>
}
