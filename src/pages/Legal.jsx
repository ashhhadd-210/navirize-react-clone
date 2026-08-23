import Seo from '../components/Seo.jsx'
import { legalPages, brand } from '../data/site.js'

/**
 * Legal pages, measured on the original at 1920:
 * a single 760px column centred on the page (x=580), "Last updated" 16px
 * #666 at y=180, the title 40px black, a 16px #666 lede, a 1px #e3e3e3 rule,
 * then 32px section headings with 16px #666 body copy and real bullets.
 */
export default function Legal({ which }) {
  const page = legalPages[which]

  return (
    <>
      <Seo title={`${brand.name} - ${page.title}`} description={page.intro} />

      <div className="shell">
        <div className="legal">
          <p className="legal__updated slidein">{page.updated}</p>
          <h1 className="legal__title slidein" style={{ '--slide-delay': '0.12s' }}>{page.title}</h1>
          <p className="legal__lede">{page.intro}</p>
          <hr className="legal__rule" />

          {page.sections.map((sec) => (
            <section className="legal__sec" key={sec.heading}>
              <h2 className="legal__h">{sec.heading}</h2>
              {sec.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {sec.list ? (
                <ul className="legal__list">
                  {sec.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </>
  )
}
