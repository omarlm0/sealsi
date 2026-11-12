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
- Polices auto-hébergées : Inter (latin) et Noto Sans Arabic (arabe), via
  `@fontsource-variable`

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
| `npm test`                | Tests Vitest (routing, calculs, i18n, helpers de demande)  |
| `npm run optimize:images` | Régénère les variantes WebP et l’image Open Graph          |

## Langues et routes

Le site est bilingue **français / arabe**. La langue fait partie de l’URL :
le français vit à la racine, l’arabe sous le préfixe `/ar`. Chaque version est
donc indexable, partageable et restaurable depuis un signet — il n’y a plus de
préférence stockée dans `localStorage`.

- `/` et `/demande` → français, `lang="fr"`, `dir="ltr"`
- `/ar` et `/ar/demande` → arabe, `lang="ar"`, `dir="rtl"`
- Le sélecteur FR / AR du header réécrit l’URL (`pushState`) en conservant la
  page courante ; Précédent / Suivant resynchronisent la langue depuis l’URL.
- Les balises `hreflang` (`fr`, `ar`, `x-default`), le canonical, `og:locale` et
  le JSON-LD suivent la page et la langue actives.

Le routage utilise l’API History (URL lisibles, sans `#`).

| URL (préfixer par `/ar` pour l’arabe) | Page                                           |
| ------------------------------------- | ---------------------------------------------- |
| `/`                                   | Accueil : hero, signature, produit, pro         |
| `/demande`                            | Commande : quantité, coordonnées et récapitulatif sur une page |
| `/selection`                          | Ancienne URL, redirigée côté client vers `/demande` |
| `/revendeurs`                         | Offre revendeurs, volumes et formulaire d’information |
| `/professionnels`                     | Services professionnels, volumes, FAQ et formulaire d’information |
| `/mentions-legales`                   | Mentions légales                                |
| `/confidentialite`                    | Politique de confidentialité                    |
| `/conditions-de-vente`                | Conditions générales de vente                   |
| `/404` (et toute URL inconnue)        | Page introuvable, en `noindex`                  |

Les liens de section utilisent des ancres (`/#univers`, `/ar#univers`).

## Contenu et règles produit

Les textes des deux langues vivent dans **`src/i18n/copy.ts`** (source unique :
`COPY.fr` et `COPY.ar` partagent la même structure, vérifiée par un test). Les
faits produit, les routes et les helpers de langue sont dans
**`src/data/site.ts`**. L’identité, les coordonnées et les champs légaux sont
dans **`src/config/business.ts`** ; le contenu des trois pages légales est dans
`COPY.*.legal.docs`.

- Bouteille : **5 L**
- Carton : **3 bouteilles = 15 L**
- Quantité exprimée en **cartons entiers** (1 à 999 dans cette version)
- **100 lavages** sur la base de 50 ml par lavage, selon dosage, charge et
  dureté de l’eau
- Aucun prix, taxe, stock ou service non validé n’est affiché

Le plafond de 999 cartons est une **limite de démonstration** : remplacez-la par
la règle commerciale validée avant mise en ligne.

## Commande et persistance

- La quantité est stockée dans `localStorage` sous la clé `sealsi-cartons`.
- `/demande` réunit la quantité et les coordonnées sur une seule page.
- Aucune quantité n’est forcée à l’arrivée : la quantité démarre vide et le
  bouton de confirmation reste bloqué tant qu’un nombre entier de cartons n’a
  pas été choisi. Le plafond de 999 et les raccourcis restent des valeurs de
  démonstration.
- Depuis une page métier, le bouton du hero mène au formulaire d’information
  (`/professionnels#infos`, `/revendeurs#infos`) ; les boutons de volume
  ouvrent `/demande` avec le nombre de cartons choisi.

## Formulaire de commande

`src/pages/RequestPage.tsx` réunit la quantité et le formulaire. Il valide les
champs côté client (nom, téléphone, ville, e-mail facultatif, consentement),
place le focus sur le premier champ invalide, conserve les valeurs saisies et
annonce les erreurs via `role="alert"`.

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
message d’erreur et peut transmettre la demande via WhatsApp ou e-mail. Le
champ `type` reprend le libellé de la langue active (`Particulier` /
`Professionnel / revendeur`, ou leur équivalent arabe).

### Sans backend

Si `VITE_REQUEST_ENDPOINT` est vide, **aucune donnée n’est envoyée
automatiquement**. La soumission ouvre une fenêtre de transmission avec :

1. un lien WhatsApp prérempli,
2. un lien e-mail prérempli,
3. un bouton « Copier le récapitulatif ».

Une référence de demande est générée et incluse dans le message. L’interface
indique clairement qu’aucune donnée n’a encore été transmise. Le brouillon
WhatsApp / e-mail est rédigé dans la langue active (`fr-FR` ou `ar-MA`) et
formate la date avec la locale correspondante ; les champs téléphone et e-mail
restent en `dir="ltr"` pour préserver l’ordre des caractères.

## Formulaire d’information (professionnels / revendeurs)

`src/components/InfoRequestForm.tsx` ajoute un formulaire court dans la section
`#infos` des pages `/professionnels` et `/revendeurs`, sur une carte ivoire
(comme le récapitulatif « Sur devis »). Le bouton principal du hero y mène
directement.

- **Professionnel** : nom de la société, e-mail, téléphone, adresse, ville.
- **Revendeur** : nom complet, e-mail, téléphone, adresse, ville.

Les deux variantes partagent la validation, le champ piège, le consentement et
la transmission de `RequestPage` : POST JSON si `VITE_REQUEST_ENDPOINT` est
défini, sinon fenêtre WhatsApp / e-mail / copie avec une référence dédiée. Le
payload contient `reference`, `createdAt`, `audience` (`professional` ou
`reseller`), puis `company` ou `name`, `email`, `phone`, `address` et `city`.

## Coordonnées et informations légales

`src/config/business.ts` centralise :

- le domaine (`https://www.sealsi.com` — **à confirmer**),
- l’e-mail `contact@sealsi.com` et le téléphone/WhatsApp `+212 657 567 876`
  (**à confirmer**),
- les champs légaux marqués `[À COMPLÉTER]` (raison sociale, siège, SIRET,
  TVA, responsable de publication, hébergeur, médiateur).

Les pages légales affichent un encart rappelant que ces champs doivent être
remplacés avant la mise en ligne. Aucune donnée d’entreprise n’est inventée.
Leur contenu bilingue est dans `src/i18n/copy.ts` (`legal.docs`) : c’est la
seule source, aucune copie n’est maintenue ailleurs.

## Images

Les visuels sont dans `public/assets`, avec des variantes WebP responsives :

- hero FR : `oceanic-hero.webp` (1672 × 941) et `-640` / `-960` / `-1280`
- hero AR : `oceanic-hero-ar.webp` (bouteille à gauche) et `-640` / `-960` / `-1280`
- packshot : 320 / 480 / 640 px (`sealsi-oceanic-packshot-*.webp`)
- signature : 700 / 1000 / 1400 px (`sealsi-oceanic-signature*.webp`)
- Open Graph : `sealsi-og.jpg` (1200 × 630, généré depuis le master)

Le script inline de `index.html` applique `lang` / `dir` avant le premier
rendu, puis précharge le hero de la langue demandée (`imagesrcset`). La page
d’accueil pointe le reste du temps vers le bon `srcset`.

> La scène hero est une direction visuelle générée. Avant production,
> remplacez-la par un rendu 3D ou une retouche avec l’étiquette source exacte
> pour garantir les petits textes et les proportions du packaging.

`npm run optimize:images` régénère ces fichiers depuis
`assets-src/products/sealsi-oceanic-packshot.png`,
`assets-src/products/oceanic-hero.png`,
`assets-src/products/oceanic-hero-ar.png` et
`public/assets/sealsi-oceanic-signature.webp`. Le dossier `assets-src/` n’est
**pas versionné** : conservez-le localement pour pouvoir relancer le script.

Le master PNG n’est plus dupliqué dans `public/` : seules les variantes WebP et
l’image Open Graph sont déployées.

## Indexation et SEO

Le site est prêt à être indexé :

- `index.html` : `robots` = `index, follow`, canonical absolu, `hreflang`
  (`fr`, `ar`, `x-default`), Open Graph et Twitter Cards avec une image
  absolue `1200 × 630` et un texte alternatif localisé
- JSON-LD `Organization` / `WebSite` / `Product` injecté par `App.tsx`, avec
  `inLanguage` et `url` qui suivent la langue
- `public/robots.txt` : `Allow: /` et déclaration du sitemap
- `public/sitemap.xml` : chaque page en version FR et `/ar`, avec les liens
  `xhtml:link` réciproques
- le routeur met à jour le titre, la description, le canonical, `og:url`,
  `og:locale`, `hreflang` et `robots` à chaque navigation ; la page 404 reste
  en `noindex, follow`

Avant mise en ligne, confirmez le domaine, les coordonnées et les informations
légales, puis vérifiez le sitemap dans la Search Console.

## Accessibilité

- Lien d’évitement vers le contenu principal
- Vrais liens et boutons, navigation clavier complète
- Focus visible, `aria-current`, `aria-expanded`, `aria-pressed` sur FR / AR
- Labels explicites, `aria-invalid` et `aria-describedby` sur les erreurs
- Erreurs annoncées avec `role="alert"`
- `<dialog>` native pour la transmission de la demande
- Titres hiérarchisés (`h1` → `h2` → `h3`), y compris dans le pied de page
- Prise en charge de `prefers-reduced-motion`
- RTL complet : propriétés logiques (`inset-inline-*`, `padding-inline-*`,
  `border-inline-*`, `text-align: end`), flèches directionnelles inversées et
  interlignage/letter-spacing adaptés à l’arabe
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
      `robots.txt`, `sitemap.xml` et les URL `hreflang` si nécessaire
- [ ] Remplacer tous les champs `[À COMPLÉTER]` dans `src/config/business.ts`
      et dans les pages légales (`COPY.*.legal`)
- [ ] Confirmer `contact@sealsi.com` et le numéro de téléphone/WhatsApp
- [ ] Brancher `VITE_REQUEST_ENDPOINT` ou valider le parcours WhatsApp/e-mail
- [ ] Valider la quantité maximale, les zones de livraison et les délais
- [ ] Vérifier les pages légales avec un conseil juridique
- [ ] Relancer `npm run typecheck`, `npm test`, `npm run build` et
      `npm run optimize:images`
- [ ] Contrôler le rendu FR et `/ar` (RTL) à 360 / 768 / 1024 px, puis lancer
      Lighthouse
