export type Lang = 'en' | 'fr';
export const languages: Lang[] = ['en', 'fr'];

export const homePath = (lang: Lang) => (lang === 'fr' ? '/fr/' : '/');

/** Path of the same page in another language: "/thoughts/x/" <-> "/fr/thoughts/x/". */
export function altPath(pathname: string, target: Lang): string {
  const bare = pathname.replace(/^\/fr(?=\/|$)/, '') || '/';
  return target === 'fr' ? `/fr${bare === '/' ? '/' : bare}` : bare;
}

export const langFromPath = (pathname: string): Lang => (/^\/fr(\/|$)/.test(pathname) ? 'fr' : 'en');

/** Reads `key` or `key_fr` from a content entry, falling back to English. */
export function loc<T extends Record<string, any>>(data: T, key: string, lang: Lang): any {
  if (lang === 'fr') return data[`${key}_fr`] ?? data[key];
  return data[key];
}

const en = {
  meta: {
    title: 'Charlize — AI, Data, Software, Mathematics',
    description:
      "I design and build software, data and AI solutions, from the problem to the working product. Portfolio of Charlize: web apps, desktop apps and AI-assisted tools."
  },
  common: { skip: 'Skip to content', close: 'Close', toggleNav: 'Toggle navigation', primary: 'Primary', mobile: 'Mobile', language: 'Language' },
  nav: { mind: 'Expertise', learning: 'Learning', building: 'Work', lab: 'Lab', thoughts: 'Thoughts', about: 'About', contact: 'Contact' },
  hero: {
    tagline: ['AI', 'DATA', 'SOFTWARE', 'MATHEMATICS'],
    quote1: 'I build software, data and AI solutions.',
    quote2: ' From the problem to the working product.',
    cta: 'See my work',
    resume: 'Download my CV',
    resumeHref: '/cv/CV_Charlize_Amana_EN.pdf',
    scroll: 'Scroll',
    photoAlt: 'Portrait of Charlize'
  },
  mind: {
    eyebrow: 'Expertise',
    title: 'The foundations behind what I build.',
    intro: 'Mathematics, computer science, AI and data: an interactive map of the areas my solutions rest on.',
    center: 'MIND',
    svgLabel: 'Knowledge constellation. Select a category, then a topic.',
    category: 'Category',
    understood: 'Understood',
    onmyway: 'On my way',
    selectTopic: 'Select a topic to read more.',
    empty: 'Nothing here yet. The Lab is where small experiments will land.',
    categorySuffix: 'category'
  },
  learning: {
    eyebrow: 'Currently learning',
    title: 'Progress, not percentages.',
    intro: "Where I actually am on each path right now. A check means I can explain it; an arrow means I'm on the way.",
    now: 'Now',
    srDone: ' — understood',
    srNow: ' — in progress',
    srNext: ' — up next'
  },
  building: {
    eyebrow: 'Selected work',
    title: 'Solutions I have built.',
    intro: 'Real problems, real users: a web platform, a desktop app delivered to a client, and an online pharmacy.',
    view: 'View project',
    experiments: 'Experiments',
    experimentsText: 'Small prototypes live in the Lab.',
    openLab: 'Open the Lab',
    problem: 'The problem',
    solution: 'The solution',
    builtWith: 'Built with',
    screenshots: 'Screenshots',
    soon: 'Screenshots coming soon',
    live: 'Live ↗',
    demo: 'Demo video',
    videoLabel: (name: string) => `Demo video of ${name}`,
    shotAlt: (name: string, n: number) => `${name} screenshot ${n}`
  },
  lab: {
    eyebrow: 'Lab',
    title: 'Interactive experiments.',
    intro: 'Small prototypes that make an idea tangible. This first one explores vectors, linear combinations and independence, the maths behind many data and AI tools.',
    experimentTitle: 'Vectors, combinations and independence',
    experimentNo: 'Experiment 01',
    shelfTitle: 'On the shelf',
    shelf: ['Experiments with datasets', 'Small machine learning experiments', 'Experiments with LLMs', 'Mathematical visualisations'],
    later: 'Coming later',
    vector: {
      svgLabel: 'Interactive plane. Drag the tips of vectors v1 and v2, or focus them and use the arrow keys.',
      tipLabel: '{k} tip at {x}, {y}. Arrow keys move it.',
      combination: 'Linear combination',
      independent: '✓ Independent.',
      dependent: '→ Dependent.',
      independentText: 'Combinations of v₁ and v₂ can reach every point of the plane.',
      dependentText: 'Both vectors lie on one line, so every combination stays on that line.',
      hint: 'Drag the tips of v₁ and v₂. Try to line them up.',
      reset: 'Reset'
    }
  },
  thoughts: {
    eyebrow: "Things I'm thinking about",
    title: 'Questions I keep coming back to.',
    intro: 'Each one is a page waiting to be written, as I understand more.',
    read: 'Read',
    soon: 'Coming soon',
    back: "← Things I'm thinking about",
    unwritten: "This one isn't written yet. It's a question I'm still working through."
  },
  about: {
    eyebrow: 'About',
    title: "Hi, I'm Charlize.",
    facts: ['Data Science & AI · Master', 'Software Engineering · Licence', 'Based in Senegal'],
    paragraphs: [
      'I build software, data and AI solutions: web platforms, desktop tools and AI-assisted applications, from understanding the problem to a working product.',
      'I start from the real need, then choose the tools. That is why I care about the foundations, mathematics, data and AI, behind what I ship.',
      'My work ranges from an AI-assisted assessment platform to an offline management app delivered to a client.'
    ]
  },
  contact: { line1: 'Have a problem to solve?', line2: "Let's build the solution.", email: 'Email' },
  footer: { tagline: 'AI · Data · Software · Mathematics' },
  notFound: { title: "This page doesn't exist", back: '← Back home' }
};

const fr: typeof en = {
  meta: {
    title: 'Charlize — IA, Data, Logiciel, Mathématiques',
    description:
      "Je conçois et construis des solutions logicielles, data et IA, du problème au produit fonctionnel. Portfolio de Charlize : applications web, applications de bureau et outils assistés par IA."
  },
  common: { skip: 'Aller au contenu', close: 'Fermer', toggleNav: 'Ouvrir ou fermer la navigation', primary: 'Principale', mobile: 'Mobile', language: 'Langue' },
  nav: { mind: 'Expertise', learning: 'Apprentissage', building: 'Réalisations', lab: 'Lab', thoughts: 'Réflexions', about: 'À propos', contact: 'Contact' },
  hero: {
    tagline: ['IA', 'DATA', 'LOGICIEL', 'MATHÉMATIQUES'],
    quote1: 'Je construis des solutions logicielles, data et IA.',
    quote2: ' Du problème au produit fonctionnel.',
    cta: 'Voir mes réalisations',
    resume: 'Télécharger mon CV',
    resumeHref: '/cv/CV_Charlize_Amana_FR.pdf',
    scroll: 'Défiler',
    photoAlt: 'Portrait de Charlize'
  },
  mind: {
    eyebrow: 'Expertise',
    title: 'Les fondations derrière ce que je construis.',
    intro: "Mathématiques, informatique, IA et data : une carte interactive des domaines sur lesquels reposent mes solutions.",
    center: 'ESPRIT',
    svgLabel: 'Constellation de connaissances. Sélectionnez une catégorie, puis un sujet.',
    category: 'Catégorie',
    understood: 'Compris',
    onmyway: 'En chemin',
    selectTopic: 'Sélectionnez un sujet pour en savoir plus.',
    empty: 'Rien ici pour le moment. Les petites expériences arriveront dans le Lab.',
    categorySuffix: 'catégorie'
  },
  learning: {
    eyebrow: "En cours d'apprentissage",
    title: 'Une progression, pas des pourcentages.',
    intro: "Où j'en suis réellement sur chaque parcours. Une coche signifie que je sais l'expliquer ; une flèche, que je suis en chemin.",
    now: 'En cours',
    srDone: ' — compris',
    srNow: ' — en cours',
    srNext: ' — à venir'
  },
  building: {
    eyebrow: 'Réalisations',
    title: "Des solutions que j'ai construites.",
    intro: "De vrais problèmes, de vrais utilisateurs : une plateforme web, une application de bureau livrée à une cliente, et une pharmacie en ligne.",
    view: 'Voir le projet',
    experiments: 'Expériences',
    experimentsText: 'Les petits prototypes vivent dans le Lab.',
    openLab: 'Ouvrir le Lab',
    problem: 'Le problème',
    solution: 'La solution',
    builtWith: 'Technologies',
    screenshots: "Captures d'écran",
    soon: "Captures d'écran bientôt disponibles",
    live: 'Démo en ligne ↗',
    demo: 'Vidéo de démo',
    videoLabel: (name: string) => `Vidéo de démonstration de ${name}`,
    shotAlt: (name: string, n: number) => `Capture d'écran ${n} de ${name}`
  },
  lab: {
    eyebrow: 'Lab',
    title: 'Expériences interactives.',
    intro: "De petits prototypes qui rendent une idée tangible. Cette première explore les vecteurs, les combinaisons linéaires et l'indépendance, les mathématiques derrière de nombreux outils data et IA.",
    experimentTitle: 'Vecteurs, combinaisons et indépendance',
    experimentNo: 'Expérience 01',
    shelfTitle: "Sur l'étagère",
    shelf: ['Expériences avec des datasets', 'Petites expériences de machine learning', 'Expériences avec des LLM', 'Visualisations mathématiques'],
    later: 'Plus tard',
    vector: {
      svgLabel: 'Plan interactif. Déplacez les pointes des vecteurs v1 et v2, ou sélectionnez-les et utilisez les flèches du clavier.',
      tipLabel: 'Pointe de {k} en {x}, {y}. Les flèches la déplacent.',
      combination: 'Combinaison linéaire',
      independent: '✓ Indépendants.',
      dependent: '→ Dépendants.',
      independentText: 'Les combinaisons de v₁ et v₂ atteignent tous les points du plan.',
      dependentText: 'Les deux vecteurs sont sur une même droite : toute combinaison reste sur cette droite.',
      hint: 'Déplacez les pointes de v₁ et v₂. Essayez de les aligner.',
      reset: 'Réinitialiser'
    }
  },
  thoughts: {
    eyebrow: 'Ce à quoi je réfléchis',
    title: 'Des questions auxquelles je reviens sans cesse.',
    intro: "Chacune est une page qui attend d'être écrite, à mesure que je comprends davantage.",
    read: 'Lire',
    soon: 'Bientôt',
    back: '← Ce à quoi je réfléchis',
    unwritten: "Celle-ci n'est pas encore écrite. C'est une question sur laquelle je travaille encore."
  },
  about: {
    eyebrow: 'À propos',
    title: 'Salut, je suis Charlize.',
    facts: ['Data Science & IA · Master', 'Génie Logiciel · Licence', 'Basée au Sénégal'],
    paragraphs: [
      "Je construis des solutions logicielles, data et IA : plateformes web, outils de bureau et applications assistées par IA, de la compréhension du problème jusqu'au produit fonctionnel.",
      "Je pars du besoin réel, puis je choisis les outils. C'est pourquoi je tiens aux fondations, mathématiques, data et IA, derrière ce que je livre.",
      "Mon travail va d'une plateforme d'évaluation assistée par IA à une application de gestion hors-ligne livrée à une cliente."
    ]
  },
  contact: { line1: 'Un problème à résoudre ?', line2: 'Construisons la solution.', email: 'E-mail' },
  footer: { tagline: 'IA · Data · Logiciel · Mathématiques' },
  notFound: { title: "Cette page n'existe pas", back: "← Retour à l'accueil" }
};

export const ui = { en, fr };
export const t = (lang: Lang) => ui[lang];
