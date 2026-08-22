import { useState } from 'react'
import { ArrowDown } from './icons.jsx'

/**
 * The Services block. On the original the four group titles render at 40/56
 * with a 1px rule between them and a down-arrow at the right edge, while the
 * 24 child items sit in the DOM inside a clipped, zero-height container —
 * i.e. a collapsed accordion. Expanding is reconstructed here.
 *
 * The open/close used to be a motion library animating `height: auto`. It is
 * now the CSS grid `0fr -> 1fr` transition, which gets the same auto-height
 * easing with no library and no JS measuring pass. The panel stays mounted, so
 * `visibility` on the clip keeps collapsed items out of the tab order and away
 * from screen readers — the job the old unmount-on-close did.
 */
export default function Accordion({ groups }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="acc">
      {groups.map((group, i) => {
        const isOpen = openIndex === i
        const panelId = `acc-panel-${i}`
        return (
          <div className="acc__item" key={group.title}>
            <button
              type="button"
              className="acc__btn"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              {group.title}
              <ArrowDown />
            </button>

            <div id={panelId} className="acc__panel" data-open={isOpen ? 'true' : 'false'}>
              <div className="acc__panel-clip">
                <ul className="acc__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
