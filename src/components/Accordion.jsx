import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown } from './icons.jsx'

/**
 * The Services block. On the original the four group titles render at 40/56
 * with a 1px rule between them and a down-arrow at the right edge, while the
 * 24 child items sit in the DOM inside a clipped, zero-height container —
 * i.e. a collapsed accordion. Expanding is reconstructed here.
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

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  className="acc__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                >
                  <ul className="acc__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
