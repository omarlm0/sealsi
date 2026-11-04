import { COMMERCE, CONTACT, LEGAL, SITE } from '../config/business'
import type { PageId } from './site'

export type LegalPageId = 'mentions-legales' | 'confidentialite' | 'conditions-de-vente'

export type LegalSection = {
  title: string
  paragraphs: string[]
  list?: string[]
}

export type LegalDocument = {
  page: LegalPageId
  title: string
  description: string
  updated: string
  sections: LegalSection[]
}

export const LEGAL_UPDATED = '4 novembre 2026'

export const LEGAL_DOCUMENTS: Record<LegalPageId, LegalDocument> = {
  'mentions-legales': {
    page: 'mentions-legales',
    title: 'Mentions légales',
    description:
      'Informations relatives à l’éditeur du site SEALSI, à son hébergement et à la propriété intellectuelle.',
    updated: LEGAL_UPDATED,
    sections: [
      {
        title: 'Éditeur du site',
        paragraphs: [
          `Le site ${SITE.url} est édité par ${LEGAL.companyName}, ${LEGAL.legalForm}, au capital de ${LEGAL.capital}.`,
          `Siège social : ${LEGAL.address}.`,
          `Immatriculation : ${LEGAL.registration}. Numéro de TVA intracommunautaire : ${LEGAL.vat}.`,
          `Contact : ${CONTACT.email} — ${CONTACT.phoneDisplay}.`,
        ],
      },
      {
        title: 'Responsable de la publication',
        paragraphs: [
          `Le responsable de la publication est ${LEGAL.publicationDirector}.`,
        ],
      },
      {
        title: 'Hébergement',
        paragraphs: [
          `Le site est hébergé par ${LEGAL.hostName}, dont l’adresse est ${LEGAL.hostAddress}. Téléphone : ${LEGAL.hostPhone}.`,
        ],
      },
      {
        title: 'Propriété intellectuelle',
        paragraphs: [
          'L’ensemble des éléments du site (textes, visuels, photographies, logos, marques, graphismes et mise en page) est protégé par le droit de la propriété intellectuelle.',
          'Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable de l’éditeur est interdite, sous réserve des exceptions prévues par la loi.',
        ],
      },
      {
        title: 'Liens et responsabilité',
        paragraphs: [
          'Le site peut contenir des liens vers des sites tiers. L’éditeur n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.',
          'L’éditeur s’efforce de maintenir les informations du site à jour. Les caractéristiques, disponibilités et modalités commerciales sont toutefois confirmées dans le devis remis au client.',
        ],
      },
      {
        title: 'Données personnelles',
        paragraphs: [
          'Le traitement des données transmises via le formulaire de demande est décrit dans la politique de confidentialité.',
        ],
      },
      {
        title: 'Droit applicable',
        paragraphs: [
          'Le présent site et les présentes mentions sont soumis au droit applicable au siège de l’éditeur, sous réserve des règles impératives applicables aux consommateurs. Tout litige relève des juridictions compétentes.',
        ],
      },
    ],
  },

  confidentialite: {
    page: 'confidentialite',
    title: 'Politique de confidentialité',
    description:
      'Comment SEALSI collecte, utilise et conserve les données transmises via le formulaire de demande de devis.',
    updated: LEGAL_UPDATED,
    sections: [
      {
        title: 'Responsable du traitement',
        paragraphs: [
          `Le responsable du traitement est ${LEGAL.companyName}, ${LEGAL.legalForm}, dont le siège social est situé ${LEGAL.address}.`,
          `Pour toute question relative à vos données : ${CONTACT.email}.`,
        ],
      },
      {
        title: 'Données collectées',
        paragraphs: [
          'Lorsque vous envoyez une demande de devis, nous collectons les informations que vous renseignez : type de demande, nom et prénom, société le cas échéant, téléphone, ville, adresse e-mail le cas échéant et contenu de votre message.',
          'La quantité de cartons sélectionnée et la référence de la demande sont associées à ces informations. Aucun paiement ni numéro de carte bancaire n’est demandé sur ce site.',
        ],
      },
      {
        title: 'Finalités et base légale',
        paragraphs: [
          'Les données sont utilisées pour répondre à votre demande, préparer une proposition commerciale, organiser la livraison et assurer le suivi de la relation.',
          'Ce traitement repose sur les mesures précontractuelles prises à votre demande et, le cas échéant, sur votre consentement. Les données nécessaires à la gestion d’une commande peuvent également être traitées pour respecter nos obligations légales.',
        ],
      },
      {
        title: 'Destinataires',
        paragraphs: [
          'Les données sont accessibles aux personnes de SEALSI chargées de traiter la demande. Elles peuvent être transmises à des prestataires techniques (hébergement, messagerie, logistique) agissant pour notre compte et uniquement dans la mesure nécessaire.',
          'Vos données ne sont ni vendues ni louées à des tiers à des fins commerciales.',
        ],
      },
      {
        title: 'Durée de conservation',
        paragraphs: [
          `Les données liées à une demande sont conservées pendant ${COMMERCE.dataRetentionMonths} mois à compter du dernier contact, sauf obligation légale de conservation plus longue ou demande d’effacement anticipée.`,
          'Les documents comptables et commerciaux sont conservés pour la durée légale applicable.',
        ],
      },
      {
        title: 'Vos droits',
        paragraphs: [
          `Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et, lorsque la loi le prévoit, de portabilité de vos données. Vous pouvez également retirer votre consentement à tout moment.`,
          `Pour exercer ces droits, écrivez à ${CONTACT.email} en précisant votre demande. Une réponse vous sera apportée dans les délais prévus par la réglementation.`,
          'Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à l’autorité de contrôle compétente. En France, il s’agit de la Commission nationale de l’informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou cnil.fr.',
        ],
      },
      {
        title: 'Cookies et stockage local',
        paragraphs: [
          'Ce site n’utilise pas de cookie publicitaire ou de mesure d’audience. Aucun traceur tiers n’est déposé sans votre accord.',
          'Votre nombre de cartons est enregistré dans le stockage local de votre navigateur (clé « sealsi-cartons ») uniquement pour conserver votre sélection. Vous pouvez le supprimer à tout moment en effaçant les données du site dans votre navigateur.',
        ],
      },
      {
        title: 'Sécurité',
        paragraphs: [
          'Des mesures techniques et organisationnelles raisonnables sont mises en œuvre pour protéger les données contre la perte, l’accès non autorisé et la modification. Aucun système ne pouvant garantir une sécurité absolue, nous vous invitons à ne pas transmettre d’informations sensibles via le formulaire.',
        ],
      },
      {
        title: 'Modifications',
        paragraphs: [
          'Cette politique peut être mise à jour pour tenir compte de l’évolution du site ou de la réglementation. La date de dernière mise à jour figure en haut de cette page.',
        ],
      },
    ],
  },

  'conditions-de-vente': {
    page: 'conditions-de-vente',
    title: 'Conditions générales de vente',
    description:
      'Cadre commercial des demandes de devis et des commandes SEALSI : prix, livraison, paiement et garanties.',
    updated: LEGAL_UPDATED,
    sections: [
      {
        title: 'Objet et champ d’application',
        paragraphs: [
          'Les présentes conditions encadrent les demandes de devis et les ventes de produits SEALSI réalisées auprès de professionnels et, le cas échéant, de particuliers.',
          'Toute demande implique l’acceptation des présentes conditions. Les conditions particulières figurant dans le devis accepté prévalent sur les présentes conditions générales.',
        ],
      },
      {
        title: 'Devis et formation de la commande',
        paragraphs: [
          'La sélection effectuée sur le site ne constitue pas une commande ferme. Elle permet de préparer une demande de devis.',
          'Une proposition précisant le tarif, les disponibilités, les modalités de livraison et, le cas échéant, les conditions de paiement est adressée au demandeur. La vente est formée lorsque le devis est accepté et confirmé par SEALSI.',
        ],
      },
      {
        title: 'Prix',
        paragraphs: [
          'Aucun prix public n’est affiché sur le site. Les prix applicables sont ceux du devis accepté, dans la devise qui y est indiquée.',
          'Sauf mention contraire, les prix sont indiqués hors taxes. Les taxes, droits et frais de livraison applicables sont précisés dans le devis.',
        ],
      },
      {
        title: 'Livraison',
        paragraphs: [
          'Les zones desservies, les délais et les frais de livraison sont confirmés dans le devis. Les délais sont donnés à titre indicatif et peuvent dépendre des disponibilités et du transporteur.',
          'Le client doit vérifier l’état du colis à la réception et signaler sans délai toute anomalie au transporteur et à SEALSI.',
        ],
      },
      {
        title: 'Paiement',
        paragraphs: [
          'Aucun paiement en ligne n’est effectué sur ce site. Les modalités de paiement sont celles indiquées dans le devis accepté.',
          'En cas de retard de paiement, les pénalités et indemnités prévues par la loi et par le devis peuvent s’appliquer.',
        ],
      },
      {
        title: 'Rétractation',
        paragraphs: [
          'Lorsque le client est un consommateur, il bénéficie du droit de rétractation prévu par les articles L. 221-18 et suivants du code de la consommation, dans les conditions et délais légaux.',
          'Les modalités pratiques de retour et les exceptions applicables, notamment lorsque le produit a été descellé ou utilisé, sont rappelées dans le devis. Ce droit ne s’applique pas aux commandes conclues dans le cadre d’une activité professionnelle.',
        ],
      },
      {
        title: 'Garanties',
        paragraphs: [
          'Les produits bénéficient des garanties légales de conformité et des vices cachés dans les conditions prévues par la loi.',
          'Les conseils d’utilisation, de dosage et de conservation figurent sur l’emballage. Le client est invité à les respecter.',
        ],
      },
      {
        title: 'Réclamations et litiges',
        paragraphs: [
          `Toute réclamation peut être adressée à ${CONTACT.email} ou au ${CONTACT.phoneDisplay}, en précisant la référence de la demande ou du devis.`,
          `Le client consommateur peut recourir gratuitement à un médiateur de la consommation : ${LEGAL.mediator}.`,
          'À défaut de résolution amiable, le litige sera soumis aux juridictions compétentes selon les règles légales applicables.',
        ],
      },
      {
        title: 'Droit applicable',
        paragraphs: [
          'Les présentes conditions sont soumises au droit applicable au siège de l’éditeur. Les dispositions impératives protégeant les consommateurs demeurent applicables lorsque le client est un consommateur.',
        ],
      },
    ],
  },
}

export const LEGAL_PAGES: LegalPageId[] = [
  'mentions-legales',
  'confidentialite',
  'conditions-de-vente',
]

export function isLegalPage(page: PageId): page is LegalPageId {
  return page === 'mentions-legales' ||
    page === 'confidentialite' ||
    page === 'conditions-de-vente'
}
