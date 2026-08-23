// All copy + content extracted from the original Navirize site.
// Centralised so pages stay presentational and content is editable in one place.

const CDN = 'https://framerusercontent.com/images'

/**
 * Framer's CDN resizes via `scale-down-to`, and only accepts the buckets
 * 512 / 1024 / 2048 / 4096. The `?width=` param this build used previously is
 * silently ignored: every image came back at its full original size — the home
 * page pulled 5.9 MB of PNG where 183 KB was needed. The same URL also
 * content-negotiates, so a browser sending `Accept: image/webp` gets WebP back
 * for free.
 */
const BUCKETS = [512, 1024, 2048]

/** One resized URL. `bucket` must be one of BUCKETS (or 4096). */
export const img = (src, bucket = 1024) => `${src}?scale-down-to=${bucket}`

/** A full srcset across the buckets, so the browser picks by `sizes`. */
export const imgSrcSet = (src, buckets = BUCKETS) =>
  buckets.map((b) => `${img(src, b)} ${b}w`).join(', ')

export const brand = {
  name: 'Navirize',
  legalName: 'Navirize OÜ',
  registryCode: '17326987',
  country: 'Estonia',
  email: 'contact@navirize.com',
  year: 2026,
  tagline: 'Luxury Web & Brand Design',
}

export const nav = [
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
]

export const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const footerLegal = [
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
]

export const socials = [
  { label: 'Threads', href: 'https://www.threads.com/@navirizedesign' },
  { label: 'Instagram', href: 'https://www.instagram.com/navirizedesign/' },
]

export const projects = [
  {
    slug: 'yachting-perfection-branding',
    category: 'Branding',
    title: 'Yachting Perfection Branding',
    image: CDN + '/JNziGdwpvT1dypSYFfqgibRKDzg.png',
    alt: 'Yachting Perfection brand identity system applied across print and signage',
    industry: 'Yacht Finishing',
    service: 'Branding',
    code: 'Y-S26',
    lede: 'Reengineering Yacht Finishing: A Minimal, Precision-Driven Brand System.',
    intro: [
      'Yachting Perfection was designed to reposition yacht finishing through precision, restraint, and controlled perception.',
      'The project combined competitive analysis, client personas, strategic positioning, and a minimal identity system to create a brand that feels composed, detail-aware, and uncompromising in standards.',
      'The challenge was to establish a distinctive presence within a competitive market where many businesses relied on similar visual cues and inconsistent brand presentation. Beyond creating recognition, the objective was to build a brand system capable of communicating expertise, craftsmanship, and trust before a client ever experienced the work itself.',
      'Rather than relying on expected luxury aesthetics or decorative elements, the identity was intentionally designed to stand apart through clarity, structure, and refinement.',
    ],
    thinkingTitle: 'The Thinking: Designing Through Structure Rather Than Decoration.',
    thinkingLede:
      'In a service where clients often judge quality before seeing results, perception becomes a competitive advantage.',
    thinking: [
      'Research revealed an opportunity to differentiate Yachting Perfection from competitors that relied heavily on conventional marine aesthetics. Instead of communicating luxury through excess, the brand was designed to communicate confidence through sharp simplicity.',
      'Client personas, archetypes, and positioning work helped define a personality built around control, standards, and restraint. This foundation informed every decision throughout the brand identity system.',
      'Typography was selected to balance structure with sophistication, combining geometric clarity with subtle refinement. A restrained palette of charcoal, linen, teak, and taupe was chosen to reflect the materials, environments, and craftsmanship associated with high-end yacht finishing.',
      'Together, these elements created a system designed to feel calm, deliberate, and highly controlled, reflecting the standards behind the work itself.',
    ],
    outcomeTitle:
      'The Outcome: A Brand Designed To Feel As Precise As The Work It Represents.',
    outcomeLede:
      'The final identity positions Yachting Perfection as the reference point for properly finished vessels.',
    outcome: [
      'Across print, apparel, signage, and digital applications, the system maintains a consistent sense of craftsmanship, professionalism, and control. Every component was designed to reinforce the same message: meticulous work deserves equally meticulous presentation.',
      'The restrained visual language allows the brand to stand apart without relying on visual noise or exaggerated luxury cues. Instead, quality is communicated through clarity, consistency, and attention to detail.',
      'The result is a cohesive identity that feels considered, trustworthy, and enduring, creating a brand experience that mirrors the standards of the work it represents.',
    ],
  },
  {
    slug: 'sea-coat-innovations-rebranding',
    category: 'Rebranding',
    title: 'Sea Coat Innovations Rebrand',
    image: CDN + '/36ebhuReKLJLW1mQ1K9y3E.png',
    alt: 'Sea Coat Innovations rebranded identity and collateral',
    industry: 'Marine Coatings',
    service: 'Rebranding',
    code: 'SCI-R26',
    lede: 'Repositioning A Marine Coatings Specialist Through Clarity And Structure.',
    intro: [
      'Sea Coat Innovations needed an identity that matched the technical depth of its work without inheriting the visual clutter common to the marine coatings category.',
      'The rebrand started with positioning: defining who the company serves, what it refuses to compromise on, and how that should be visible before a single conversation takes place.',
      'The existing presentation under-sold the engineering rigour behind the service. Recognition was inconsistent across touchpoints, and the visual language did little to separate the company from lower-specification competitors.',
    ],
    thinkingTitle: 'The Thinking: Engineering Confidence Into The Visual System.',
    thinkingLede: 'Technical credibility is a design problem before it is a messaging problem.',
    thinking: [
      'We mapped the competitive field and found near-uniform reliance on literal marine imagery. The opportunity was to signal precision instead of place.',
      'A tightened wordmark, a disciplined grid, and a narrow palette gave the brand room to look specialised rather than decorative.',
      'Every application was drawn from the same core system so the brand reads consistently whether it appears on a datasheet, a hull, or a proposal.',
    ],
    outcomeTitle: 'The Outcome: A Brand That Reads As Specification, Not Decoration.',
    outcomeLede: 'Sea Coat Innovations now presents with the same rigour it applies to its coatings.',
    outcome: [
      'The identity carries cleanly across technical documentation, site signage, apparel, and digital surfaces.',
      'Sales conversations begin from a position of credibility, with the brand doing the qualifying work up front.',
      'The system is documented and extensible, so new applications stay on-brand without re-design.',
    ],
  },
  {
    slug: 'sea-coat-innovations-web-design',
    category: 'Web Development',
    title: 'SCI Web Development',
    image: CDN + '/bkxge54AeEa17yhNnT1IAJuSY.png',
    alt: 'Sea Coat Innovations website design shown across desktop and mobile',
    industry: 'Marine Coatings',
    service: 'Web Design & Development',
    code: 'SCI-W26',
    lede: 'Translating A Precision Brand Into A Precision Web Experience.',
    intro: [
      'With the rebrand in place, the website had to carry the same discipline into an interactive medium.',
      'The brief was not a brochure site. It was a qualification tool: explain a technical service clearly, establish authority quickly, and route serious enquiries to contact.',
      'Structure came first. Content was sequenced around the questions prospects actually ask, in the order they ask them.',
    ],
    thinkingTitle: 'The Thinking: Structure, Restraint, And Motion With Purpose.',
    thinkingLede: 'Every interaction had to justify itself against clarity and speed.',
    thinking: [
      'Layouts were built on a consistent grid so the eye always knows where to land next.',
      'Motion was used to guide attention through the narrative, never to decorate it. Transitions are short, directional, and consistent.',
      'Performance was treated as a design constraint from the first wireframe rather than a cleanup task at the end.',
    ],
    outcomeTitle: 'The Outcome: A Site That Performs As Precisely As It Looks.',
    outcomeLede: 'The result is a fast, composed experience that mirrors the brand system exactly.',
    outcome: [
      'The site holds its structure from large desktop down to small mobile without losing hierarchy.',
      'Technical depth is accessible without overwhelming a first-time visitor.',
      'Enquiries arrive better qualified because the experience filters as it informs.',
    ],
  },
  {
    slug: 'greenleaf-branding',
    category: 'Branding',
    title: 'Greenleaf Branding',
    image: CDN + '/GY6hce8X6ibwBntqsP7QtjGysM.png',
    alt: 'Greenleaf brand identity and packaging applications',
    industry: 'Sustainable Goods',
    service: 'Branding',
    code: 'GL-S26',
    lede: 'A Considered Identity For A Brand Built On Restraint.',
    intro: [
      'Greenleaf needed an identity that communicated care and quality without leaning on the visual clichés of its category.',
      'The work covered positioning, verbal identity, and a complete visual system designed to hold up across packaging and digital use.',
      'The objective was longevity: a brand that would still feel considered several years from launch.',
    ],
    thinkingTitle: 'The Thinking: Quiet Confidence Over Category Signalling.',
    thinkingLede: 'Standing out sometimes means saying less, more precisely.',
    thinking: [
      'We stepped away from the expected palette and let typography and spacing carry the brand personality.',
      'Verbal identity was defined alongside the visual system so tone and appearance reinforce each other.',
      'Packaging, digital, and print applications were designed from one set of rules to keep the brand coherent as it scales.',
    ],
    outcomeTitle: 'The Outcome: A Brand That Feels Intentional At Every Scale.',
    outcomeLede: 'Greenleaf now reads as premium without ever announcing it.',
    outcome: [
      'The identity is legible and distinctive from shelf distance down to a product label.',
      'A documented system lets the team extend the brand without diluting it.',
      'The result is a presence that earns trust through consistency rather than claims.',
    ],
  },
]

export const perceptionImages = [
  {
    src: CDN + '/aS6cnNIDBR8m6S9tdsTc1JzobKQ.png',
    alt: 'Brand identity detail from a Navirize project',
  },
  {
    src: CDN + '/kvUQRdKdwtc2nGTBb0HVgkrF9d4.png',
    alt: 'Printed brand collateral from a Navirize project',
  },
  {
    src: CDN + '/nzcEwWNd2BYorZihm5TRWzuvSS8.png',
    alt: 'Packaging detail from a Navirize brand system',
  },
]

export const services = [
  {
    title: 'Branding',
    items: [
      'Logo Design',
      'Brand Systems',
      'Visual Identity',
      'Art Direction',
      'Verbal Identity',
      'Perception Design',
    ],
  },
  {
    title: 'Web Design',
    items: [
      'Experience Design',
      'Prototyping',
      'User Interface',
      'Interaction Design',
      'Responsive Development',
      'Product Innovation',
    ],
  },
  {
    title: 'Motion & Animation',
    items: [
      'Motion Systems',
      'Motion Identity',
      'Scroll Experiences',
      'Transition Design',
      'Storytelling',
      'Motion Graphics',
    ],
  },
  {
    title: 'Strategy',
    items: [
      'Positioning',
      'Market Fit',
      'Competitive Analysis',
      'User Psycology', // sic — matches the original site's label verbatim
      'Creative Direction',
      'Differentiation',
    ],
  },
]

export const whyUs = [
  {
    title: 'Seamless Experiences',
    body: 'Every interaction is brainstormed for clarity, ease, and a visually refined journey.',
  },
  {
    title: 'Web Design, Elevated',
    body: 'We create high-end, custom websites that look beautiful while expressing your brand’s essence.',
  },
  {
    title: 'Spotlighting Your Competitive Advantage',
    body: 'We analyze competitors, identify opportunities for differentiation, and position your brand where it can create the greatest impact.',
  },
  {
    title: 'A Brand-Centric Approach',
    body: 'We align every detail with your brand’s vision, ensuring a cohesive and impactful presence.',
  },
  {
    title: 'Effortless Performance',
    body: 'Speed, responsiveness, and engagement are at the core of every site we build.',
  },
]

export const process = [
  {
    step: '01',
    title: 'Project Onboarding',
    body: 'We gather information, study your context, and extract the details needed to move forward with focus and precision.',
  },
  {
    step: '02',
    title: 'Research & Strategy',
    body: 'We study your landscape to uncover patterns, define positioning, and shape how the brand should look, sound, and communicate.',
  },
  {
    step: '03',
    title: 'Creative Direction',
    body: 'We translate insights into visual direction by exploring moodboards, colors, typography, and references to define your brand’s unique creative foundation.',
  },
  {
    step: '04',
    title: 'Design & Development',
    body: 'This is where everything comes together. We fuse visuals, layout, and behavior into a system that’s strong, seamless, and unmistakably yours.',
  },
  {
    step: '05',
    title: 'Refinement & Handoff',
    body: 'Finalize, document, and hand off. You leave with a brand and/or website ready to launch with confidence.',
  },
  {
    step: '06',
    title: 'Ongoing Support',
    body: 'After handoff, we remain onboard. For a short period, we’re available to fine-tune, solve edge cases, and ensure everything runs smoothly.',
  },
]

export const budgets = [
  '€2,000 – €10,000',
  '€10,000 – €20,000',
  '€20,000 – €30,000',
  '€30,000 – €40,000',
  '€40,000 – €50,000+',
]

/**
 * Two-tone headings. On the original each of these is a SINGLE heading where
 * the opening clause is #000 and the trailing clause is #969696 — the break
 * falls mid-sentence in several places, so it is authored explicitly.
 */
export const headings = {
  hero: {
    black: 'We design how people feel about what they see.',
    grey: 'Your presence, shaped with intention and conviction.',
  },
  perception: {
    black: 'How a brand looks influences what it’s worth.',
    grey: 'Explore how perception influences value.',
  },
  story: {
    black: 'Built from ambition, shaped through experience, and driven by a',
    grey: 'refusal to settle for ordinary.',
  },
  projectsHero: { black: 'Designing Success', grey: '' },
  projectsStory: {
    black: 'Every project reflects a way of thinking.',
    grey: 'This is where it comes from.',
  },
  aboutHero: {
    black: 'Raising the standard of the',
    grey: 'digital experience.',
  },
  // Solid black on the original — not a two-tone heading. ("feel" -> "feels"
  // is the one grammar fix carried into the clone.)
  aboutLede:
    'Navirize combines strategy, psychology, and design to create work that feel timeless, intentional, and world-class.',
  mission1: {
    black:
      'Our mission is to redefine digital aesthetics with precision, clarity, and premium craftsmanship.',
    grey: '',
  },
  mission2: {
    black: 'Navirize is built on the philosophy that great design is both',
    grey: 'minimal and impactful.',
  },
  whyUs: {
    black: 'Every project begins with a simple question:',
    grey: 'How should this brand be remembered?',
  },
  // Grey span measured on the original: it starts at "every", with "so" black.
  process: {
    black: 'Our process is built for momentum, organization and precision, so',
    grey: 'every phase leads into the next with purpose.',
  },
  aboutWork: {
    black: 'See how we’ve helped brands communicate with greater',
    grey: 'clarity, confidence, and authority.',
  },
  contactHero: { black: 'Get in touch', grey: '' },
}

/** Chrome "N" brand mark, centred between the last section and the footer. */
export const marks = {
  n: CDN + '/aS6cnNIDBR8m6S9tdsTc1JzobKQ.png',
}

/** Full-width media on the About page, in document order. */
export const aboutMedia = [
  { src: CDN + '/ChHwGRGWftA0bmGXYg8N6WIDUps.png', alt: 'Greenleaf storefront design shown on a laptop' },
  { src: CDN + '/K2ZGuFbKgw2r7UF9pnODGqaWmM.png', alt: 'Brand identity applied across printed collateral' },
  { src: CDN + '/jXfcJ7wn9Z2cBbALUPhWaoOLnE.png', alt: 'Detail of a Navirize brand system in use' },
  { src: CDN + '/Fb9napFJSLsRRSCi2vSLeoUhI.png', alt: 'Navirize project presentation detail' },
]

/** Case-study galleries, scraped per project page. */
export const galleries = {
  'yachting-perfection-branding': [
    '0rvWx4y21Xsgbi7s9eMwTeTAs4',
    '2szIkBRbUrvTHlk5lcW0cfXUzRc',
    '8OiWWgkSiEEtqnkrc9n7ykJ6oNo',
    'DqYXGhRIpb2bfRtDD4TDkbsvFg',
    'HlsaiQzvcEkb1kNRMGYT7GGkdo',
    'Iw7GJ21IrQHCLAvRG7hfvKMzD5s',
    'NNUyHspB9ScKbwkPTgP8V9ggLk8',
    'TLUHWFOn8zER8JBF9Sn2ecKBjE',
    'WTyTGBko1pDNa9rkW1K0aIaA1w',
    'fhgsm0GxjrwSgHkya9riOvAVFk',
  ],
  'sea-coat-innovations-rebranding': [
    '2eowcXdHQz5LoMiykjlLfhJHu2U',
    '7ixGVTVNCrrz7o6OcINKiIB2DU',
    'Aj3YeuKJuFCrur4VGH8FDRS3eQw',
    'BM5YDwE0p1omb0EDo6npcbgQ40',
    'LI5kTSx5rbrz2fqVDPwKWbhKs',
    'OStks2GFfwxumqT0JXHWcDkUtY',
    'VhPfWJpUZgL0MhSaFqesw0vvZYM',
    'XznPnUqTQUdZdCjCu2YNVm4diI',
  ],
  'sea-coat-innovations-web-design': [
    '1oEouVxBZ7GChSJKsyDJHRwvgpA',
    '2xZrSVRmq11tS6U2oowHWDjoMs',
    '4nqiMu94wpxr0I6b4xqXHs3Cfs',
    '7JQLvWnwzLYmudSCkYrt2HWcI0',
    '8cl6oW0WBLvqI0N9Q1y6gENzNV4',
    'O4w1pWUrBMjFYRW76QFxR4fd0',
    'QXKkcAufXELLFEveg9djQ1bAX4',
    'XW3b1Hi1uVkZKp4PT3JEBQZs',
    'Zgv25kUxk1x89Flozw6wiGZWsI',
    'rubXvYQwZsvJj74DrUkB03lMhyc',
  ],
  'greenleaf-branding': [
    '2nElq9dFmQIyXPkOPgKOh7xNm60',
    '5PEZVL3czCvkBaMAOV2jxdkl3U',
    'FFiW23IIgw3Od1Eurzn8sGqtxI',
    'P6aoGkHV5EjWggw0x1R7ylCw4D8',
    'QWhjasyGEDoftOBEcMw4KbeZYVs',
    'VVHFddpAkz3dylRWxwMbPtuYoeQ',
    'Wh5W2D8fxbmDwv43oQ6D9M8yVc',
    'eMa1aJJIgDJzeres6QGRcrPC0',
    'pO7kLOIljdF0KL2Rf2M9B7A0K6I',
  ],
}

export const galleryUrl = (id) => CDN + '/' + id + '.png'

export const legalPages = {
  terms: {
    title: 'Terms & Conditions',
    updated: 'Last updated · 28 June 2026',
    intro:
      'These terms govern your access to and use of the Navirize OÜ website and services. By using our site, you agree to these terms. Please read them carefully.',
    sections: [
      {
        heading: '1. Acceptance of terms',
        body: [
          'By accessing or using this website, you confirm that you accept these terms and agree to comply with them. If you do not agree, you should not use our website or services.',
        ],
      },
      {
        heading: '2. Use of our website',
        body: ['You may use our website for lawful purposes only. You agree not to:'],
        list: [
          'Use the site in any way that breaches applicable laws or regulations.',
          'Attempt to gain unauthorised access to our systems or networks.',
          'Introduce malicious code or otherwise interfere with the site’s operation.',
        ],
      },
      {
        heading: '3. Intellectual property',
        body: [
          'All content on this website, including text, design, graphics, and logos, is owned by or licensed to Navirize OÜ. You may not reproduce, distribute, or reuse it without our written permission.',
        ],
      },
      {
        heading: '4. Services & projects',
        body: [
          'Any services or projects we provide are subject to a separate agreement. Nothing on this website constitutes a binding offer, and project details, timelines, and pricing are confirmed in writing before work begins.',
        ],
      },
      {
        heading: '5. Limitation of liability',
        body: [
          'Our website is provided on an “as is” basis. To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or inability to use, this website.',
        ],
      },
      {
        heading: '6. Third-party links',
        body: [
          'Our website may contain links to external sites that we do not control. We are not responsible for the content, policies, or practices of any third-party websites.',
        ],
      },
      {
        heading: '7. Changes to these terms',
        body: [
          'We may revise these terms from time to time. The latest version will always be posted on this page with an updated “last updated” date above.',
        ],
      },
      {
        heading: '8. Governing law',
        body: [
          'These terms are governed by the laws of Estonia, and any disputes will be subject to the exclusive jurisdiction of the Estonian courts.',
        ],
      },
      {
        heading: '9. Contact us',
        body: ['Questions about these terms? Reach us at contact@navirize.com.'],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated · 28 June 2026',
    intro:
      'Your privacy matters to us. This page explains what information we collect, why we collect it, and how we use it. We believe in being transparent about how your data is handled, and we’ll never sell your personal information.',
    sections: [
      {
        heading: '1. Information we collect',
        body: ['We only collect what we need to operate our website and respond to you. This may include:'],
        list: [
          'Contact details you share with us, such as your name and email address.',
          'Usage data like pages visited, referring links, and approximate location.',
          'Technical information including browser type, device, and IP address.',
        ],
      },
      {
        heading: '2. How we use your information',
        body: [
          'We use the information we collect to respond to enquiries, improve our website and services, keep our platform secure, and meet our legal obligations. We never sell your personal data.',
        ],
      },
      {
        heading: '3. Cookies & analytics',
        body: [
          'Our site uses cookies and similar technologies to understand how visitors interact with our content. You can control or disable cookies through your browser settings at any time.',
        ],
      },
      {
        heading: '4. Sharing your data',
        body: [
          'We may share data with trusted service providers who help us run our website, always under agreements that keep your information confidential. We may also disclose data where required by law.',
        ],
      },
      {
        heading: '5. Data retention & security',
        body: [
          'We keep personal data only for as long as necessary and apply appropriate technical and organisational measures to protect it against loss, misuse, or unauthorised access.',
        ],
      },
      {
        heading: '6. Your rights',
        body: ['Depending on where you live, you may have the right to:'],
        list: [
          'Access the personal data we hold about you.',
          'Request corrections to or deletion of your data.',
          'Object to or restrict certain processing.',
          'Withdraw your consent at any time.',
        ],
      },
      {
        heading: '7. Changes to this policy',
        body: [
          'We may update this policy from time to time. Any changes will be posted on this page with a revised “last updated” date above.',
        ],
      },
      {
        heading: '8. Contact us',
        body: [
          'If you have questions about this policy or how we handle your data, reach us at contact@navirize.com.',
        ],
      },
    ],
  },
}

/**
 * Case-study copy, scraped verbatim from each project page of the original
 * (innerText, so paragraph breaks survive). Three sections per project:
 * a 64px lede, then two 32px-titled sections whose prefixes ("The Thinking:",
 * "The Outcome:") are part of the heading text itself on the original.
 */

/**
 * Which gallery image goes in which slot, read off each live project page in
 * document order. The alphabetical `galleries` lists above scrambled these —
 * the client's "images are all over the place" was exactly this.
 *   band1 -> full-width after the intro     pair1 -> two-up after band1
 *   band2 -> full-width after The Thinking  pair2 -> two-up after band2
 *   ticker -> the closing marquee, in its measured order
 */
export const caseMedia = {
  'yachting-perfection-branding': {
    band1: 'NNUyHspB9ScKbwkPTgP8V9ggLk8',
    pair1: ['TLUHWFOn8zER8JBF9Sn2ecKBjE', 'HlsaiQzvcEkb1kNRMGYT7GGkdo'],
    band2: 'Iw7GJ21IrQHCLAvRG7hfvKMzD5s',
    pair2: ['fhgsm0GxjrwSgHkya9riOvAVFk', 'WTyTGBko1pDNa9rkW1K0aIaA1w'],
    ticker: ['0rvWx4y21Xsgbi7s9eMwTeTAs4', '8OiWWgkSiEEtqnkrc9n7ykJ6oNo', '2szIkBRbUrvTHlk5lcW0cfXUzRc', 'DqYXGhRIpb2bfRtDD4TDkbsvFg'],
  },
  'sea-coat-innovations-rebranding': {
    band1: 'Aj3YeuKJuFCrur4VGH8FDRS3eQw',
    pair1: ['OStks2GFfwxumqT0JXHWcDkUtY', '2eowcXdHQz5LoMiykjlLfhJHu2U'],
    band2: 'LI5kTSx5rbrz2fqVDPwKWbhKs',
    pair2: ['VhPfWJpUZgL0MhSaFqesw0vvZYM', '7ixGVTVNCrrz7o6OcINKiIB2DU'],
    ticker: ['BM5YDwE0p1omb0EDo6npcbgQ40', '7ixGVTVNCrrz7o6OcINKiIB2DU', 'K2ZGuFbKgw2r7UF9pnODGqaWmM', 'XznPnUqTQUdZdCjCu2YNVm4diI'],
  },
  'sea-coat-innovations-web-design': {
    band1: '8cl6oW0WBLvqI0N9Q1y6gENzNV4',
    pair1: ['QXKkcAufXELLFEveg9djQ1bAX4', 'rubXvYQwZsvJj74DrUkB03lMhyc'],
    band2: '4nqiMu94wpxr0I6b4xqXHs3Cfs',
    pair2: ['7JQLvWnwzLYmudSCkYrt2HWcI0', 'O4w1pWUrBMjFYRW76QFxR4fd0'],
    ticker: ['1oEouVxBZ7GChSJKsyDJHRwvgpA', 'XW3b1Hi1uVkZKp4PT3JEBQZs', 'Zgv25kUxk1x89Flozw6wiGZWsI', '2xZrSVRmq11tS6U2oowHWDjoMs'],
  },
  'greenleaf-branding': {
    band1: 'QWhjasyGEDoftOBEcMw4KbeZYVs',
    pair1: ['2nElq9dFmQIyXPkOPgKOh7xNm60', 'P6aoGkHV5EjWggw0x1R7ylCw4D8'],
    band2: 'VVHFddpAkz3dylRWxwMbPtuYoeQ',
    pair2: ['pO7kLOIljdF0KL2Rf2M9B7A0K6I', 'Wh5W2D8fxbmDwv43oQ6D9M8yVc'],
    ticker: ['FFiW23IIgw3Od1Eurzn8sGqtxI', 'pO7kLOIljdF0KL2Rf2M9B7A0K6I', 'eMa1aJJIgDJzeres6QGRcrPC0', '5PEZVL3czCvkBaMAOV2jxdkl3U'],
  },
}

export const caseStudies = {
  'yachting-perfection-branding': {
    lede: 'Reengineering Yacht Finishing: A Minimal, Precision-Driven Brand System.',
    intro: [
      'Yachting Perfection was designed to reposition yacht finishing through precision, restraint, and controlled perception.',
      'The project combined competitive analysis, client personas, strategic positioning, and a minimal identity system to create a brand that feels composed, detail-aware, and uncompromising in standards.',
      'The challenge was to establish a distinctive presence within a competitive market where many businesses relied on similar visual cues and inconsistent brand presentation. Beyond creating recognition, the objective was to build a brand system capable of communicating expertise, craftsmanship, and trust before a client ever experienced the work itself.',
      'Rather than relying on expected luxury aesthetics or decorative elements, the identity was intentionally designed to stand apart through clarity, structure, and refinement.',
    ],
    thinkingTitle: 'The Thinking: Designing Through Structure Rather Than Decoration.',
    thinking: [
      'In a service where clients often judge quality before seeing results, perception becomes a competitive advantage.',
      'Research revealed an opportunity to differentiate Yachting Perfection from competitors that relied heavily on conventional marine aesthetics. Instead of communicating luxury through excess, the brand was designed to communicate confidence through sharp simplicity.',
      'Client personas, archetypes, and positioning work helped define a personality built around control, standards, and restraint. This foundation informed every decision throughout the brand identity system.',
      'Typography was selected to balance structure with sophistication, combining geometric clarity with subtle refinement. A restrained palette of charcoal, linen, teak, and taupe was chosen to reflect the materials, environments, and craftsmanship associated with high-end yacht finishing.',
      'Together, these elements created a system designed to feel calm, deliberate, and highly controlled, reflecting the standards behind the work itself.',
    ],
    outcomeTitle: 'The Outcome: A Brand Designed To Feel As Precise As The Work It Represents.',
    outcome: [
      'The final identity positions Yachting Perfection as the reference point for properly finished vessels.',
      'Across print, apparel, signage, and digital applications, the system maintains a consistent sense of craftsmanship, professionalism, and control. Every component was designed to reinforce the same message: meticulous work deserves equally meticulous presentation.',
      'The restrained visual language allows the brand to stand apart without relying on visual noise or exaggerated luxury cues. Instead, quality is communicated through clarity, consistency, and attention to detail.',
      'The result is a cohesive identity that feels considered, trustworthy, and enduring, creating a brand experience that mirrors the standards of the work it represents.',
    ],
  },
  'sea-coat-innovations-rebranding': {
    lede: 'Turning Years Of Skill Into A Recognisable Brand.',
    intro: [
      'Sea Coat Innovations was built on years of skill, technical knowledge, and hands-on experience. The objective wasn’t to reinvent the business, but to create a brand identity capable of communicating the quality, professionalism, and precision already present within it.',
      'Through strategic branding, web design, and positioning, the project focused on transforming years of expertise into a recognizable brand experience designed to build trust before a single conversation takes place.',
    ],
    thinkingTitle: 'The Thinking: Closing The Gap Between Perception And Reality.',
    thinking: [
      'Sea Coat Innovations had already earned its reputation through years of craftsmanship, technical expertise, and uncompromising standards. The challenge wasn’t improving the work itself. It was ensuring the brand reflected it.',
      'The project began with an in-depth analysis of the three leading competitors in the market, uncovering opportunities for differentiation, positioning, and user experience.',
      'While many competitors demonstrated strong technical capabilities, their brands often failed to communicate the level of expertise behind the work.',
      'Generic messaging, inconsistent presentation, and familiar industry aesthetics created a disconnect between perception and reality.',
      'The strategy focused on repositioning Sea Coat Innovations away from the expected aesthetics of the category. A more structured, technical, and innovative visual language was developed to reflect the standards, expertise, and discipline behind the work itself.',
    ],
    outcomeTitle: 'The Outcome: A Sharper & More Competent Reflection Of The Business.',
    outcome: [
      'Sea Coat Innovations now presents itself with the same level of precision, expertise, and professionalism that defines its work. What was once communicated primarily through reputation and word of mouth is now reflected consistently across every touchpoint.',
      'Through a refined brand identity, strategic positioning, and a cohesive digital presence, the business gained a clearer and more distinctive market position. The result is a brand that communicates confidence, competence, and technical excellence before a single conversation takes place.',
    ],
  },
  'sea-coat-innovations-web-design': {
    // the original's intro ends with a grey "Visit Website" pill to the live site
    link: { label: 'Visit Website', href: 'https://www.seacoatinnovations.gr/' },
    lede: 'Translating Technical Expertise Online.',
    intro: [
      'Sea Coat Innovations had already earned the trust of clients through craftsmanship and technical excellence. The challenge was ensuring the digital experience reflected the same standard.',
      'Rather than creating a conventional marketing website, the project focused on building an experience that communicates precision through clarity, structure, and intentional interaction. The result is a digital presence designed to express the quality of the business before its work is even seen.',
    ],
    thinkingTitle: 'The Thinking: The Experience Before The Service.',
    thinking: [
      'The website was developed to become a natural extension of the brand, carrying the same standards of precision, professionalism, and technical expertise into the digital space.',
      'Rather than relying on conventional marketing patterns or unnecessary visual complexity, the experience focused on clarity, structure, and intentional interaction. Every page was designed to make information easier to understand, navigation effortless, and the overall experience feel as refined as the work itself.',
      'The objective was simple: create a digital presence capable of communicating the same confidence and attention to detail clients could expect from Sea Coat Innovations long before the first conversation begins.',
    ],
    outcomeTitle: 'The Outcome: A Sharper & More Competent Reflection Of The Business.',
    outcome: [
      'Sea Coat Innovations now presents itself with the same level of precision, expertise, and professionalism that defines its work. What was once communicated primarily through reputation and word of mouth is now reflected consistently across every touchpoint.',
    ],
  },
  'greenleaf-branding': {
    lede: 'Bringing Clarity To Modern Wellness',
    intro: [
      'The wellness market is crowded with competing claims, natural ingredients, and visual clichés. GreenLeaf was created as a concept brand exploring how thoughtful strategy and contemporary design could build trust without relying on familiar industry tropes. Rather than simply appearing organic, the goal was to create a brand experience that feels fresh, approachable, and genuinely reassuring.',
    ],
    thinkingTitle: 'The Thinking: Research Before Resolution.',
    thinking: [
      'Rather than jumping straight into design, the project began by understanding the people behind the products. The research phase explored user personas, competitor positioning, journey mapping, customer motivations, industry opportunities, information architecture, and user flows to uncover what today’s wellness audience actually values.',
      'The goal wasn’t simply to create another wellness brand, but to identify opportunities that competitors had overlooked and build an identity rooted in clarity, optimism, and trust. Every visual decision, from the bright botanical palette to the organic forms, typography, and digital experience, was shaped by those strategic insights rather than personal preference.',
    ],
    outcomeTitle: 'The Outcome: A More Desirable Wellness Brand.',
    outcome: [
      'What emerged wasn’t simply a visual identity, but a feeling. A brand that invites people to slow down, breathe deeper, and reconnect with themselves before they’ve even experienced the product. Every interaction was designed to feel effortless, every detail intentional, creating a quiet confidence that reflects the philosophy behind Greenleaf itself. The result is a brand that doesn’t compete for attention. It earns trust through clarity, consistency, and calm.',
    ],
  },
}
