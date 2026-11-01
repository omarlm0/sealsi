# SEALSI — Oceanic Scent 5 L

Site vitrine et parcours de demande de devis pour la lessive liquide **SEALSI
Oceanic Scent 5 L**, construit à partir du pack de livraison final
(`SEALSI_Web_Design_Handoff_Final_Packaging_v1`).

> **Prototype local.** Aucun prix public, aucun paiement et aucun envoi de
> formulaire. Le tarif, les disponibilités et les modalités de livraison sont
> confirmés par SEALSI avant toute commande.

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

| Commande                 | Rôle                                                          |
| ------------------------ | ------------------------------------------------------------- |
| `npm run dev`            | Serveur de développement avec rechargement à chaud            |
| `npm run build`          | Vérification TypeScript + build de production dans `dist/`    |
| `npm run preview`        | Prévisualisation du build                                     |
| `npm run typecheck`      | TypeScript seul                                               |
| `npm test`               | Tests Vitest (données produit, calculs cartons)               |
| `npm run optimize:images`| Régénère les variantes WebP responsives                       |

## Routes

Le routage utilise l’API History (URL lisibles, sans `#`).

| URL                     | Page                                             |
| ----------------------- | ------------------------------------------------ |
| `/`                     | Accueil : hero, signature, produit, pro, étapes   |
| `/lessive/oceanic-5l`   | Fiche produit : galerie, quantité, accordéons     |
| `/selection`            | Sélection : cartons, raccourcis, récapitulatif    |
| `/demande`              | Formulaire de demande (maquette, sans backend)    |
| `/professionnels`       | Services professionnels et FAQ                    |

Une URL inconnue retombe sur l’accueil. Les liens de section utilisent des
ancres (`/#univers`, `/lessive/oceanic-5l#conseils`).

## Contenu et règles produit

Tout est centralisé dans **`src/data/site.ts`** : faits produit, textes,
routes, métadonnées et éléments de navigation.

- Bouteille : **5 L**
- Carton : **3 bouteilles = 15 L**
- Quantité exprimée en **cartons entiers** (1 à 999 dans cette maquette)
- **100 lavages** sur la base de 50 ml par lavage, selon dosage, charge et
  dureté de l’eau
- Aucun prix, taxe, stock ou service non validé n’est affiché

Le plafond de 999 cartons est une **limite de démonstration** : remplacez-la par
la règle commerciale validée avant mise en ligne.

## Sélection et persistance

- La sélection est stockée dans `localStorage` sous la clé `sealsi-cartons`.
- Si aucune sélection n’existe, `/selection` et `/demande` affichent
  **6 cartons d’exemple**, conformément au pack de livraison.
- Depuis la fiche produit, « Ajouter à ma sélection » ajoute la quantité au
  nombre déjà stocké, puis ouvre `/selection`.

## Formulaire de demande

`src/pages/RequestPage.tsx` valide les champs côté client (nom, téléphone,
ville, e-mail facultatif, consentement), place le focus sur le premier champ
invalide et annonce les erreurs via `role="alert"`.

**Aucun backend n’est branché.** À la soumission, une `<dialog>` native indique
explicitement qu’aucune donnée n’a été envoyée. Pour passer en production, il
faut connecter un endpoint, enregistrer la demande et remplacer ce message.

## Images

Les visuels sont dans `public/assets`, avec des variantes WebP responsives :

- packshot : 320 / 480 / 640 px (`sealsi-oceanic-packshot-*.webp`)
- signature : 700 / 1000 / 1400 px (`sealsi-oceanic-signature*.webp`)

`npm run optimize:images` régénère ces variantes depuis
`assets-src/products/sealsi-oceanic-packshot.png` et
`public/assets/sealsi-oceanic-signature.webp`. Le dossier `assets-src/` n’est
**pas versionné** : conservez-le localement pour pouvoir relancer le script.

Les packshots utilisent `object-fit: contain` afin de préserver leurs
proportions.

## Indexation

Le site est volontairement **non indexable** tant que les contenus légaux et
commerciaux ne sont pas validés :

- `index.html` : `<meta name="robots" content="noindex, nofollow">`
- `public/robots.txt` : `Disallow: /`
- `public/sitemap.xml` : prêt pour le lancement

Avant mise en ligne : retirer le `noindex`, passer `robots.txt` en
`Allow: /`, vérifier le domaine dans `sitemap.xml` et remplacer l’URL Open Graph
relative par une URL absolue.

## Accessibilité

- Lien d’évitement vers le contenu principal
- Vrais liens et boutons, navigation clavier complète
- Focus visible, `aria-current`, `aria-expanded`
- Labels explicites, `aria-invalid` et `aria-describedby` sur les erreurs
- Erreurs annoncées avec `role="alert"`
- `<dialog>` native pour la fenêtre de démonstration
- Prise en charge de `prefers-reduced-motion`
- Aucun débordement horizontal, mise en page sur une colonne en mobile

## Déploiement

Le routage History impose une **réécriture SPA** vers `index.html` sur
l’hébergement. Déployez le contenu de `dist/`.

Exemples :

```text
# Netlify (_redirects)
/*  /index.html  200

# Vercel (vercel.json)
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

# Nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Checklist avant mise en ligne

- [ ] Connecter le formulaire à un backend et remplacer la fenêtre de démo
- [ ] Rédiger les mentions légales, la confidentialité et les conditions de vente
      (les liens du pied de page sont des libellés visuels uniquement)
- [ ] Valider la quantité maximale, les zones de livraison et les délais
- [ ] Confirmer le domaine, le canonical, l’Open Graph et le sitemap
- [ ] Retirer `noindex, nofollow` et autoriser l’indexation
- [ ] Ajouter les coordonnées de contact définitives
