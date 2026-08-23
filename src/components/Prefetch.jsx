import { useEffect } from 'react'
import { projects, aboutMedia, img } from '../data/site.js'

/**
 * Warms the image cache for the routes a visitor is likely to open next.
 *
 * Screencasting the deployed site's home -> projects transition showed the
 * project cards riding the page fade as empty grey frames: /projects picks
 * the 1024 variant of each image while home had cached different buckets,
 * so the cards' images downloaded DURING the transition. The original never
 * shows this because its recordings ran with a warm HTTP cache.
 *
 * Runs once, after load + idle, desktop only, and skips visitors who asked
 * to save data.
 */
export default function Prefetch() {
  useEffect(() => {
    if (window.innerWidth < 768) return
    if (navigator.connection && navigator.connection.saveData) return

    const urls = [
      // /projects grid: all four cards at the 1024 bucket
      ...projects.map((p) => img(p.image, 1024)),
      // case-study heroes render from the 2048 bucket
      ...projects.map((p) => img(p.image, 2048)),
      // about page: the top media pair + full-width bands
      ...aboutMedia.map((m) => img(m.src, 2048)),
    ]

    let idle = 0
    const start = () => {
      idle = 0
      for (const u of urls) {
        const im = new Image()
        im.decoding = 'async'
        try {
          im.fetchPriority = 'low'
        } catch {
          /* older browsers */
        }
        im.src = u
      }
    }
    const onLoad = () => {
      idle = window.requestIdleCallback
        ? requestIdleCallback(start, { timeout: 4000 })
        : setTimeout(start, 1500)
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => {
      window.removeEventListener('load', onLoad)
      if (idle) (window.cancelIdleCallback || clearTimeout)(idle)
    }
  }, [])

  return null
}
