import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import Reveal from '../components/Reveal.jsx'
import TwoTone from '../components/TwoTone.jsx'
import { ArrowUpRight } from '../components/icons.jsx'
import { brand, budgets, headings } from '../data/site.js'

const EMPTY = {
  name: '',
  email: '',
  company: '',
  /* the original's select is `required` with no placeholder — it sits on
     the first range by default */
  budget: '€2,000 – €10,000',
  details: '',
  website: '', // honeypot
}

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please tell us your name.'
  if (!v.email.trim()) e.email = 'Please add an email so we can reply.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'That email address does not look right.'
  if (v.details.trim().length < 10)
    e.details = 'A sentence or two about the project helps a lot.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const update = (k) => (ev) => {
    setValues((v) => ({ ...v, [k]: ev.target.value }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (values.website) {
      setStatus('sent')
      return
    }
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = document.querySelector('[aria-invalid="true"]')
      if (first) first.focus()
      return
    }
    setStatus('sending')
    // No backend in this clone — swap for your endpoint:
    // await fetch('/api/inquiry', { method: 'POST', body: JSON.stringify(values) })
    await new Promise((r) => setTimeout(r, 700))
    setStatus('sent')
    setValues(EMPTY)
  }

  return (
    <>
      <Seo
        title="Navirize - Contact"
        description="Tell us about your business, your goals, and where you want to go next. We’ll get back to you with a thoughtful response."
      />

      <Reveal className="shell contact">
        {/* ---- left: heading, lede, details ---- */}
        <Reveal>
          <p className="pagehead__label label--grey">
            Contact
          </p>
          <TwoTone as="h1" stagger className="display slidein" {...headings.contactHero} />

          <p className="body--lg contact__lede">
            Tell us about your business, your goals, and where you want to go
            next. We’ll get back to you with a thoughtful response.
          </p>

          <div className="contact__meta">
            <div>
              <p className="contact__k">Get in touch</p>
              <a className="contact__mail" href={`mailto:${brand.email}`}>
                {brand.email}
                <ArrowUpRight />
              </a>
            </div>
            <div>
              <p className="contact__k">Location</p>
              <p>Based in {brand.country}. Working Globally.</p>
            </div>
          </div>
        </Reveal>

        {/* ---- right: inquiry form ---- */}
        <div>
          <form className="form" onSubmit={onSubmit} noValidate>
            <label className="field">
              <span className="field__label">Name</span>
              <input
                className="field__input"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                value={values.name}
                onChange={update('name')}
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              {errors.name && (
                <span className="field__error" id="err-name">
                  {errors.name}
                </span>
              )}
            </label>

            <label className="field">
              <span className="field__label">Email</span>
              <input
                className="field__input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={values.email}
                onChange={update('email')}
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && (
                <span className="field__error" id="err-email">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="field">
              <span className="field__label">Company / Brand</span>
              <input
                className="field__input"
                type="text"
                name="company"
                autoComplete="organization"
                placeholder="Where you work"
                value={values.company}
                onChange={update('company')}
              />
            </label>

            <label className="field">
              <span className="field__label">Project budget</span>
              <select
                className="field__select"
                name="budget"
                value={values.budget}
                onChange={update('budget')}
                aria-invalid={errors.budget ? 'true' : undefined}
                aria-describedby={errors.budget ? 'err-budget' : undefined}
              >
                {budgets.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <span className="field__error" id="err-budget">
                  {errors.budget}
                </span>
              )}
            </label>

            <label className="field">
              <span className="field__label">Project details</span>
              <textarea
                className="field__area"
                name="details"
                placeholder="Tell me about your goals, timeline, and scope…"
                value={values.details}
                onChange={update('details')}
                aria-invalid={errors.details ? 'true' : undefined}
                aria-describedby={errors.details ? 'err-details' : undefined}
              />
              {errors.details && (
                <span className="field__error" id="err-details">
                  {errors.details}
                </span>
              )}
            </label>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={values.website}
              onChange={update('website')}
              style={{
                position: 'absolute',
                left: '-9999px',
                width: 1,
                height: 1,
                opacity: 0,
              }}
            />

            <button
              className="btn btn--dark btn--block"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send inquiry'}
            </button>

            <div role="status" aria-live="polite">
              {status === 'sent' && (
                <p className="form__status">
                  Thanks — your inquiry is in. We’ll come back to you with a
                  considered response.
                </p>
              )}
            </div>
          </form>
        </div>
      </Reveal>
    </>
  )
}
