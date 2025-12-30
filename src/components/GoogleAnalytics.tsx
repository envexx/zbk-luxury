'use client';

import Script from 'next/script';

export default function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-3MQD3KV6MM';
  const GA_ADS_ID = 'AW-17828596675';

  return (
    <>
      {/* Google tag (gtag.js) - Load once for both GA4 and Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Google Analytics 4
          gtag('config', '${GA_MEASUREMENT_ID}');
          
          // Google Ads Conversion Tracking
          gtag('config', '${GA_ADS_ID}');
        `}
      </Script>
    </>
  );
}

