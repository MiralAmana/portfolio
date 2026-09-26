---
name: PharmaV2
kind: Web app
kind_fr: Application web
tagline: Online pharmacy with secure prescription upload.
tagline_fr: Pharmacie en ligne avec dépôt sécurisé d'ordonnances.
description: "An online pharmacy management app: a client space (catalogue, cart, checkout, order history) and a role-protected manager space (dashboard, products, orders)."
description_fr: "Une application de gestion de pharmacie en ligne : un espace client (catalogue, panier, commande, historique) et un espace gérant protégé par rôle (tableau de bord, produits, commandes)."
problem: "Prescription-only medicines must not be ordered without a prescription, and stock and prices must stay reliable at the moment of payment."
problem_fr: "Les médicaments sur ordonnance ne doivent pas être commandés sans ordonnance, et le stock comme les prix doivent rester fiables au moment du paiement."
solution: "Checkout re-validates stock and prices on the server, never from the cart session. Prescriptions are uploaded under random file names and stored privately, and client and manager access are separated by a role middleware."
solution_fr: "Le paiement revalide le stock et les prix côté serveur, jamais depuis la session du panier. Les ordonnances sont envoyées sous des noms de fichiers aléatoires et stockées en privé, et les accès client et gérant sont séparés par un middleware de rôle."
tech: [Laravel 12, PHP 8.2, Blade, Tailwind CSS, Alpine.js, Vite, PostgreSQL, Eloquent]
github: https://github.com/MiralAmana/pharma-v2
note: No live demo yet.
note_fr: Pas encore de démo en ligne.
screenshots: [/images/projects/pharma-1.webp, /images/projects/pharma-2.webp, /images/projects/pharma-3.webp]
video: /videos/pharma-v2-demo.mp4
order: 3
---
