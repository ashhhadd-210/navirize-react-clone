import Seo from '../components/Seo.jsx'
import RiseIn from '../components/RiseIn.jsx'
import { legalPages, brand } from '../data/site.js'

export default function Legal({ which }) {
  const page = legalPages[which]

  return (
    <>
      <Seo title={`${brand.name} - ${page.title}`} description={page.intro} />

      <div className="shell pagehead">
        <RiseIn delay={0.15}>
          <p className="label label--grey pagehead__label">{page.updated}</p>
          <h1 className="display">{page.title}</h1>
          <p className="body--lg grey pagehead__lede">{page.intro}</p>
        </RiseIn>

        <div className="legal">
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
