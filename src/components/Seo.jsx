import { useEffect } from 'react'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, name, key] = selector.match(/\[(name|property)="([^"]+)"\]/) || []
    if (name && key) el.setAttribute(name, key)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Minimal head manager. Every route sets its own title + description —
 * the original site shipped /contact with the unreplaced template title
 * ("Pearl Framer Template"), which this makes hard to do by accident.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title
      setMeta('meta[property="og:title"]', 'content', title)
    }
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', window.location.origin + window.location.pathname)
  }, [title, description])

  return null
}
