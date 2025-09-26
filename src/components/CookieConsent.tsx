"use client";

import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

// Déclaration pour Google Analytics
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsentComponent() {
  useEffect(() => {
    // Définir dataLayer et gtag pour Google Consent Mode
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    // Définir le consentement par défaut à 'denied' (RGPD compliant)
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "denied",
    });

    // Fonction pour mettre à jour le consentement Google
    function updateGtagConsent() {
      gtag("consent", "update", {
        analytics_storage: CookieConsent.acceptedCategory("analytics")
          ? "granted"
          : "denied",
        ad_storage: CookieConsent.acceptedCategory("advertisement")
          ? "granted"
          : "denied",
        ad_user_data: CookieConsent.acceptedCategory("advertisement")
          ? "granted"
          : "denied",
        ad_personalization: CookieConsent.acceptedCategory("advertisement")
          ? "granted"
          : "denied",
        functionality_storage: CookieConsent.acceptedCategory("functionality")
          ? "granted"
          : "denied",
        personalization_storage: CookieConsent.acceptedCategory("functionality")
          ? "granted"
          : "denied",
        security_storage: CookieConsent.acceptedCategory("security")
          ? "granted"
          : "denied",
      });
    }

    CookieConsent.run({
      // Configuration générale
      mode: "opt-in", // RGPD compliant
      revision: 1,

      // Configuration du cookie
      cookie: {
        name: "nemwood_cookie_consent",
        expiresAfterDays: 365,
        sameSite: "Lax",
      },

      // Options d'interface
      guiOptions: {
        consentModal: {
          layout: "cloud inline",
          position: "bottom center",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      // Callbacks
      onFirstConsent: () => {
        updateGtagConsent();
      },
      onConsent: () => {
        updateGtagConsent();
      },
      onChange: () => {
        updateGtagConsent();
      },

      // Catégories de cookies
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
              { name: "_gat" },
              { name: "_gtag" },
            ],
          },
          services: {
            google_analytics: {
              label: "Google Analytics",
              onAccept: () => {
                console.log("Google Analytics activé");
              },
              onReject: () => {
                console.log("Google Analytics désactivé");
              },
            },
          },
        },
        advertisement: {
          services: {
            google_ads: {
              label: "Publicités Google",
            },
          },
        },
        functionality: {
          services: {
            preferences: {
              label: "Préférences du site",
            },
          },
        },
        security: {
          services: {
            security: {
              label: "Sécurité et prévention des fraudes",
            },
          },
        },
      },

      // Traductions
      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "🍪 Nous utilisons des cookies",
              description:
                "Ce site utilise des cookies essentiels pour son bon fonctionnement et des cookies de suivi pour comprendre comment vous interagissez avec lui. Ces derniers ne seront activés qu'avec votre consentement. <br><br>Vos données sont traitées conformément au RGPD.",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Refuser tout",
              showPreferencesBtn: "Gérer les préférences",
              footer: `
                <a href="/mentions-legales" target="_blank">Mentions légales</a>
                <a href="/politique-confidentialite" target="_blank">Politique de confidentialité</a>
              `,
            },
            preferencesModal: {
              title: "Gérer les préférences de cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Refuser tout",
              savePreferencesBtn: "Sauvegarder la sélection",
              closeIconLabel: "Fermer",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  title: "Utilisation des cookies",
                  description:
                    "Nous utilisons des cookies pour garantir les fonctionnalités de base du site web et améliorer votre expérience en ligne. Vous pouvez choisir pour chaque catégorie de les activer/désactiver quand vous le souhaitez.",
                },
                {
                  title: "Cookies strictement nécessaires",
                  description:
                    "Ces cookies sont essentiels au bon fonctionnement du site web et ne peuvent pas être désactivés. Ils permettent notamment l'authentification et la sécurité.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Cookies d'analyse et de performance",
                  description:
                    "Ces cookies nous permettent de mesurer l'audience et d'améliorer notre site. Toutes les données sont anonymisées.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: {
                      name: "Nom",
                      domain: "Service",
                      description: "Description",
                      expiration: "Expiration",
                    },
                    body: [
                      {
                        name: "_ga",
                        domain: "Google Analytics",
                        description:
                          "Cookie de Google Analytics pour mesurer l'audience",
                        expiration: "2 ans",
                      },
                      {
                        name: "_gid",
                        domain: "Google Analytics",
                        description:
                          "Cookie de Google Analytics pour identifier les sessions",
                        expiration: "24 heures",
                      },
                    ],
                  },
                },
                {
                  title: "Cookies publicitaires",
                  description:
                    "Ces cookies sont utilisés pour personnaliser les publicités et mesurer leur efficacité.",
                  linkedCategory: "advertisement",
                },
                {
                  title: "Cookies de fonctionnalité",
                  description:
                    "Ces cookies permettent d'améliorer les fonctionnalités du site comme les préférences de langue.",
                  linkedCategory: "functionality",
                },
                {
                  title: "Cookies de sécurité",
                  description:
                    "Ces cookies sont utilisés pour la sécurité, l'authentification et la prévention des fraudes.",
                  linkedCategory: "security",
                },
                {
                  title: "Plus d'informations",
                  description:
                    'Pour toute question concernant notre politique de cookies et vos choix, <a href="/contact">contactez-nous</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null; // Ce composant ne rend rien visuellement
}
