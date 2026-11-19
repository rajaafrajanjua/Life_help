/**
 * Fire a Google Ads conversion event.
 * Called after every successful form submission / booking confirmation.
 * send_to: AW-18565232969/gW_OCJvnlrUdEMnyy5RF
 */
export function fireConversion() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-18565232969/gW_OCJvnlrUdEMnyy5RF',
    });
  }
}
