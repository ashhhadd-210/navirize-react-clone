/**
 * The up-right arrow, taken from the original's own SVG sprite (symbol
 * svg318331668, viewBox 0 0 16 16). It is a FILLED glyph with rounded ends,
 * not the thin stroked chevron this used to draw — which is the difference
 * the client spotted on the buttons.
 */
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
      <path d="M 13.667 1.583 L 4 1.583 C 3.586 1.583 3.25 1.919 3.25 2.333 C 3.25 2.747 3.586 3.083 4 3.083 L 11.856 3.083 L 1.803 13.136 C 1.51 13.429 1.51 13.904 1.803 14.197 C 2.096 14.49 2.571 14.49 2.864 14.197 L 12.917 4.144 L 12.917 12 C 12.917 12.414 13.252 12.75 13.667 12.75 C 14.081 12.75 14.417 12.414 14.417 12 L 14.417 2.333 C 14.417 1.919 14.081 1.583 13.667 1.583 Z" fill="currentColor" />
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

/**
 * The real Navirize wordmark, lifted from the original as vector art.
 *
 * This used to be the string "ᑎAVIRIZE" — letterspaced type standing in for
 * the logo, opening with U+144E CANADIAN SYLLABICS TI because it happens to
 * look like the mark's angular N. That character sits outside every Manrope
 * subset, so the one glyph fell back to a system face and never matched the
 * letters beside it.
 *
 * The original ships the whole wordmark as a single SVG path (Framer serves it
 * as a data-URI background on a div sized 143x26). Inlined here so it costs no
 * request, scales cleanly, and takes its colour from the surrounding text.
 */
export function Wordmark({ className = 'nav__wordmark' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 142.409 25.36"
      width="143"
      height="26"
      fill="currentColor"
      role="img"
      aria-label="Navirize"
      focusable="false"
    >
      <path d="M 2.348 0 L 2.348 2.337 C 15.497 2.337 2.7 25.36 15.849 25.36 L 15.849 23.023 C 2.935 23.023 15.732 0 2.348 0 Z M 0.147 23.023 L 2.201 23.023 C 2.282 23.023 2.348 22.958 2.348 22.877 L 2.348 2.337 L 0 2.337 L 0 22.877 C 0 22.958 0.066 23.023 0.147 23.023 Z M 15.849 23.023 L 18.197 23.023 L 18.197 2.484 C 18.197 2.403 18.132 2.337 18.05 2.337 L 15.996 2.337 C 15.915 2.337 15.849 2.403 15.849 2.484 Z M 34.546 2.454 L 25.359 23.023 L 27.53 23.023 L 35.41 5.107 L 35.583 5.107 L 42.21 23.023 L 44.378 23.023 L 35.182 2.454 Z M 54.035 23.023 L 44.848 2.454 L 47.019 2.454 L 54.899 20.37 L 55.071 20.37 L 61.699 2.454 L 63.867 2.454 L 54.671 23.023 Z M 72.437 2.454 L 70.441 2.454 L 70.441 23.023 L 72.437 23.023 Z M 104.136 2.454 L 102.14 2.454 L 102.14 23.023 L 104.136 23.023 Z M 111.508 2.454 L 111.508 3.857 L 123.928 2.988 L 110.733 22.439 L 110.733 23.023 L 126.418 23.023 L 126.418 21.527 L 113.105 22.439 L 126.286 2.988 L 126.286 2.454 L 111.508 2.454 Z M 81.594 2.455 L 81.594 23.023 L 83.59 23.023 L 83.59 3.156 L 85.116 3.156 C 89.06 2.974 90.137 5.228 90.047 7.48 C 89.963 9.586 89.225 11.695 85.116 11.804 L 85.116 12.271 C 86.173 12.271 89.695 12.388 90.987 17.881 C 91.419 19.719 92.043 21.153 93.1 22.205 L 93.102 22.207 C 93.941 22.79 94.277 23.023 96.927 23.023 L 96.927 22.836 C 96.551 22.836 94.245 22.439 93.217 18.232 C 92.189 14.024 89.93 12.622 87.934 12.201 L 87.934 12.038 C 94.391 10.986 93.217 2.454 86.525 2.455 Z M 133.369 2.411 L 133.369 23.023 L 142.409 23.023 L 142.409 21.597 C 142.409 21.597 140.847 21.766 139.474 21.971 C 137.125 22.322 135.388 22.439 135.388 22.439 L 135.388 12.561 L 142.056 12.972 L 142.056 11.57 L 135.388 11.979 L 135.388 3.015 C 135.482 2.922 140.061 3.506 142.409 3.857 L 142.409 2.411 Z" />
    </svg>
  )
}
