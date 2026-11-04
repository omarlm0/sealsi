# SEALSI — Oceanic Scent 5 L

Site vitrine et parcours de demande de devis pour la lessive liquide **SEALSI
Oceanic Scent 5 L**, construit à partir du pack de livraison final
(`SEALSI_Web_Design_Handoff_Final_Packaging_v1`).

> **Modèle commercial : sur devis.** Aucun prix public, aucun paiement en ligne
> et aucune promesse de stock. Le tarif, les disponibilités et les modalités de
> livraison sont confirmés par SEALSI avant toute commande.

## Stack

- React 19 + TypeScript
- Vite 8
- CSS design system maison (`src/index.css`), sans Tailwind
- Vitest pour les tests unitaires

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur <http://localhost:5173>.

| Commande                  | Rôle                                                       |
| ------------------------- | ---------------------------------------------------------- |
| `npm run dev`             | Serveur de développement avec rechargement à chaud         |
| `npm run build`           | Vérification TypeScript + build de production dans `dist/` |
| `npm run preview`         | Prévisualisation du build                                  |
| `npm run typecheck`       | TypeScript seul                                            |
| `npm test`                | Tests Vitest (routing, calculs, helpers de demande)        |
| `npm run optimize:images` | Régénère les variantes WebP et l’image Open Graph          |

## Routes

Le routage utilise l’API History (URL lisibles, sans `#`).

| URL                         | Page                                           |
| --------------------------- | ---------------------------------------------- |
| `/`                         | Accueil : hero, signature, produit, pro, étapes |
| `/lessive/oceanic-5l`       | Fiche produit : galerie, quantité, accordéons   |
| `/selection`                | Sélection : cartons, raccourcis, récapitulatif  |
| `/demande`                  | Formulaire de demande de devis                  |
| `/professionnels`           | Services professionnels et FAQ                  |
| `/mentions-legales`         | Mentions légales                                |
| `/confidentialite`          | Politique de confidentialité                    |
| `/conditions-de-vente`      | Conditions générales de vente                   |
| `/404` (et toute URL inconnue) | Page introuvable, en `noindex`               |

Les liens de section utilisent des ancres (`/#univers`,
`/lessive/oceanic-5l#conseils`).

## Contenu et règles produit

Tout est centralisé dans **`src/data/site.ts`** : faits produit, textes,
routes, métadonnées et éléments de navigation. L’identité, les coordonnées et
les informations légales sont dans **`src/config/business.ts`**.

- Bouteille : **5 L**
- Carton : **3 bouteilles = 15 L**
- Quantité exprimée en **cartons entiers** (1 à 999 dans cette version)
- **100 lavages** sur la base de 50 ml par lavage, selon dosage, charge et
  dureté de l’eau
- Aucun prix, taxe, stock ou service non validé n’est affiché

Le plafond de 999 cartons est une **limite de démonstration** : remplacez-la par
la règle commerciale validée avant mise en ligne.

## Sélection et persistance

- La sélection est stockée dans `localStorage` sous la clé `sealsi-cartons`.
- `/selection` ouvre sur **1 carton** lorsqu’aucune sélection n’existe encore.
- `/demande` avec **0 carton** affiche un état vide avec un lien vers la
  sélection : aucune quantité d’exemple n’est injectée à l’insu du visiteur.
- Depuis la fiche produit, « Ajouter à ma sélection » ajoute la quantité au
  nombre déjà stocké (dans la limite de 999), puis ouvre `/selection`.

## Formulaire de demande

`src/pages/RequestPage.tsx` valide les champs côté client (nom, téléphone,
ville, e-mail facultatif, consentement), place le focus sur le premier champ
invalide et annonce les erreurs via `role="alert"`.

Le formulaire contient un **champ piège** invisible : un robot qui le remplit
reçoit une confirmation factice sans aucune requête réseau.

### Brancher un backend

Définissez `VITE_REQUEST_ENDPOINT` (voir `.env.example`) avec une URL qui
accepte un `POST` JSON. Le payload contient :

```json
{
  "reference": "SLS-20261104-ABCD",
  "createdAt": "2026-11-04T10:30:00.000Z",
  "product": "Oceanic Scent 5 L",
  "cartons": 6,
  "bottles": 18,
  "litres": 90,
  "type": "Professionnel / revendeur",
  "name": "…",
  "company": "…",
  "phone": "…",
  "city": "…",
  "email": "…",
  "message": "…"
}
```

La réponse doit avoir un statut HTTP 2xx. En cas d’échec, le visiteur voit un
message d’erreur et peut transmettre la demande via WhatsApp ou e-mail.

### Sans backend

Si `VITE_REQUEST_ENDPOINT` est vide, **aucune donnée n’est envoyée
automatiquement**. La soumission ouvre une fenêtre de transmission avec :

1. un lien WhatsApp prérempli,
2. un lien e-mail prérempli,
3. un bouton « Copier le récapitulatif ».

Une référence de demande est générée et incluse dans le message. L’interface
indique clairement qu’aucune donnée n’a encore été transmise.

## Coordonnées et informations légales

`src/config/business.ts` centralise :

- le domaine (`https://www.sealsi.com` — **à confirmer**),
- l’e-mail `contact@sealsi.com` et le téléphone/WhatsApp `+212 657 567 876`
  (**à confirmer**),
- les champs légaux marqués `[À COMPLÉTER]` (raison sociale, siège, SIRET,
  TVA, responsable de publication, hébergeur, médiateur).

Les pages légales affichent un encart rappelant que ces champs doivent être
remplacés avant la mise en ligne. Aucune donnée d’entreprise n’est inventée.

## Images

Les visuels sont dans `public/assets`, avec des variantes WebP responsives :

- packshot : 320 / 480 / 640 px (`sealsi-oceanic-packshot-*.webp`)
- signature : 700 / 1000 / 1400 px (`sealsi-oceanic-signature*.webp`)
- Open Graph : `sealsi-og.jpg` (1200 × 630, généré depuis le master)

`npm run optimize:images` régénère ces fichiers depuis
`assets-src/products/sealsi-oceanic-packshot.png` et
`public/assets/sealsi-oceanic-signature.webp`. Le dossier `assets-src/` n’est
**pas versionné** : conservez-le localement pour pouvoir relancer le script.

Le master PNG n’est plus dupliqué dans `public/` : seules les variantes WebP et
l’image Open Graph sont déployées.

## Indexation et SEO

Le site est prêt à être indexé :

- `index.html` : `robots` = `index, follow`, canonical absolu, Open Graph et
  Twitter Cards avec une image absolue `1200 × 630`
- `public/robots.txt` : `Allow: /` et déclaration du sitemap
- `public/sitemap.xml` : pages produit, sélection, demande, professionnels et
  pages légales
- le routeur met à jour le titre, la description, le canonical, `og:url` et
  `robots` à chaque navigation ; la page 404 reste en `noindex, follow`

Avant mise en ligne, confirmez le domaine, les coordonnées et les informations
légales, puis vérifiez le sitemap dans la Search Console.

## Accessibilité

- Lien d’évitement vers le contenu principal
- Vrais liens et boutons, navigation clavier complète
- Focus visible, `aria-current`, `aria-expanded`
- Labels explicites, `aria-invalid` et `aria-describedby` sur les erreurs
- Erreurs annoncées avec `role="alert"`
- `<dialog>` native pour la transmission de la demande
- Titres hiérarchisés (`h1` → `h2` → `h3`), y compris dans le pied de page
- Prise en charge de `prefers-reduced-motion`
- Aucun débordement horizontal, mise en page sur une colonne en mobile

## Déploiement

Le routage History impose une **réécriture SPA** vers `index.html` sur
l’hébergement. Déployez le contenu de `dist/`.

Des fichiers prêts à l’emploi sont fournis :

- `public/_redirects` pour Netlify / Cloudflare Pages
- `vercel.json` pour Vercel

Exemple Nginx :

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

N’oubliez pas de définir `VITE_REQUEST_ENDPOINT` dans l’environnement de build
si vous activez l’envoi automatique.

## Checklist avant mise en ligne

- [ ] Confirmer le domaine et mettre à jour `SITE.url`, `index.html`,
      `robots.txt` et `sitemap.xml` si nécessaire
- [ ] Remplacer tous les champs `[À COMPLÉTER]` dans `src/config/business.ts`
- [ ] Confirmer `contact@sealsi.com` et le numéro de téléphone/WhatsApp
- [ ] Brancher `VITE_REQUEST_ENDPOINT` ou valider le parcours WhatsApp/e-mail
- [ ] Valider la quantité maximale, les zones de livraison et les délais
- [ ] Vérifier les pages légales avec un conseil juridique
- [ ] Relancer `npm run typecheck`, `npm test`, `npm run build` et
      `npm run optimize:images`
- [ ] Contrôler le rendu à 360 / 768 / 1024 px et lancer Lighthouse
