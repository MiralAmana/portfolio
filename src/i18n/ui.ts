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
      "I don't just want to build things. I want to understand how they work. A portfolio documenting a progression through mathematics, AI, data and software."
  },
  common: { skip: 'Skip to content', close: 'Close', toggleNav: 'Toggle navigation', primary: 'Primary', mobile: 'Mobile', language: 'Language' },
  nav: { mind: 'Mind', learning: 'Learning', building: 'Building', lab: 'Lab', thoughts: 'Thoughts', about: 'About', contact: 'Contact' },
  hero: {
    tagline: ['AI', 'DATA', 'SOFTWARE', 'MATHEMATICS'],
    quote1: "I don't just want to build things.",
    quote2: ' I want to understand how they work.',
    cta: 'Enter my mind',
    scroll: 'Scroll',
    photoAlt: 'Portrait of Charlize'
  },
  mind: {
    eyebrow: 'My Mind',
    title: "A map of what I know, and what I'm reaching for.",
    intro: 'Not a skills list. A constellation: each point is something I\'m trying to understand from the ground up.',
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
    eyebrow: "Things I'm building",
    title: 'What I make while I learn.',
    intro: 'Real projects, each one a way to test what I understand against a real problem.',
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
    title: 'Where I learn by poking things.',
    intro:
      "Small experiments, built to understand an idea rather than to ship a product. This first one is about the exact topic I'm working through right now.",
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
    facts: ['Master 1 · Data Science & AI', 'Licence · Software Engineering', 'Based in Senegal'],
    paragraphs: [
      "I'm building my knowledge of computer science, mathematics, data and AI one layer at a time, starting from the foundations instead of skipping to the tools.",
      "Right now I'm consolidating linear algebra, so that when I go deeper into data and AI, I understand what the tools are actually doing.",
      'This portfolio is where I keep track of that: what I understand, what I\'m learning, what I build, and what I try. It will keep changing as I do.'
    ]
  },
  contact: { line1: "I'm still learning.", line2: "That's the point.", email: 'Email' },
  footer: { tagline: 'AI · Data · Software · Mathematics' },
  notFound: { title: "This page doesn't exist", back: '← Back home' }
};

const fr: typeof en = {
  meta: {
    title: 'Charlize — IA, Data, Logiciel, Mathématiques',
    description:
      "Je ne veux pas seulement construire des choses. Je veux comprendre comment elles fonctionnent. Un portfolio qui documente une progression en mathématiques, IA, data et logiciel."
  },
  common: { skip: 'Aller au contenu', close: 'Fermer', toggleNav: 'Ouvrir ou fermer la navigation', primary: 'Principale', mobile: 'Mobile', language: 'Langue' },
  nav: { mind: 'Esprit', learning: 'Apprentissage', building: 'Projets', lab: 'Lab', thoughts: 'Réflexions', about: 'À propos', contact: 'Contact' },
  hero: {
    tagline: ['IA', 'DATA', 'LOGICIEL', 'MATHÉMATIQUES'],
    quote1: 'Je ne veux pas seulement construire des choses.',
    quote2: ' Je veux comprendre comment elles fonctionnent.',
    cta: 'Entrer dans mon univers',
    scroll: 'Défiler',
    photoAlt: 'Portrait de Charlize'
  },
  mind: {
    eyebrow: 'Mon esprit',
    title: 'Une carte de ce que je sais, et de ce que je cherche à atteindre.',
    intro: "Pas une liste de compétences. Une constellation : chaque point est quelque chose que j'essaie de comprendre depuis les bases.",
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
    eyebrow: 'Ce que je construis',
    title: 'Ce que je fabrique en apprenant.',
    intro: 'De vrais projets : chacun est une façon de confronter ce que je comprends à un vrai problème.',
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
    title: "Là où j'apprends en manipulant les choses.",
    intro:
      "De petites expériences, faites pour comprendre une idée plutôt que pour livrer un produit. Cette première porte sur le sujet exact que je travaille en ce moment.",
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
    facts: ['Master 1 · Data Science & IA', 'Licence · Génie Logiciel', 'Basée au Sénégal'],
    paragraphs: [
      "Je construis mes connaissances en informatique, mathématiques, data et IA couche après couche, en partant des fondations plutôt qu'en sautant directement aux outils.",
      "En ce moment, je consolide l'algèbre linéaire, pour comprendre ce que font réellement les outils quand j'irai plus loin en data et en IA.",
      "Ce portfolio me sert à garder la trace de tout ça : ce que je comprends, ce que j'apprends, ce que je construis et ce que j'essaie. Il changera en même temps que moi."
    ]
  },
  contact: { line1: "Je suis encore en train d'apprendre.", line2: "C'est tout l'intérêt.", email: 'E-mail' },
  footer: { tagline: 'IA · Data · Logiciel · Mathématiques' },
  notFound: { title: "Cette page n'existe pas", back: "← Retour à l'accueil" }
};

export const ui = { en, fr };
export const t = (lang: Lang) => ui[lang];
