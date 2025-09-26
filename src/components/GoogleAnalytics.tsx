"use client";

import Script from "next/script";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID";

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "GA_MEASUREMENT_ID") {
    return null; // Don't render if no GA ID provided
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: 'Nemwood - Meubles en bois sur mesure',
              page_location: window.location.href,
              send_page_view: true,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'location'
              }
            });
            
            // Track contact form submissions
            document.addEventListener('submit', function(e) {
              if (e.target && e.target.tagName === 'FORM') {
                gtag('event', 'form_submit', {
                  event_category: 'engagement',
                  event_label: 'contact_form',
                  value: 1
                });
              }
            });
            
            // Track phone number clicks
            document.addEventListener('click', function(e) {
              if (e.target && e.target.href && e.target.href.includes('tel:')) {
                gtag('event', 'phone_click', {
                  event_category: 'engagement',
                  event_label: 'phone_call',
                  value: 1
                });
              }
            });
            
            // Track email clicks
            document.addEventListener('click', function(e) {
              if (e.target && e.target.href && e.target.href.includes('mailto:')) {
                gtag('event', 'email_click', {
                  event_category: 'engagement',
                  event_label: 'email_contact',
                  value: 1
                });
              }
            });
          `,
        }}
      />
    </>
  );
}
