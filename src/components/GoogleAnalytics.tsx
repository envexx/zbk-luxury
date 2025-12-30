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
      {/* Google tag (gtag.js) event - delayed navigation helper */}
      <Script id="google-ads-helper" strategy="afterInteractive">
        {`
          // Helper function to delay opening a URL until a gtag event is sent.
          // Call it in response to an action that should navigate to a URL.
          window.gtagSendEvent = function(url, conversionLabel, eventParams) {
            var callback = function () {
              if (typeof url === 'string') {
                window.location = url;
              }
            };
            var eventName = conversionLabel && conversionLabel.startsWith('ads_conversion_')
              ? conversionLabel
              : 'ads_conversion_' + (conversionLabel || 'SUBMIT_LEAD_FORM_1');
            var params = {
              'event_callback': callback,
              'event_timeout': 2000
            };
            if (eventParams) {
              Object.assign(params, eventParams);
            }
            gtag('event', eventName, params);
            return false;
          };
        `}
      </Script>
    </>
  );
}

