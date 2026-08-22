/**
 * UTM & Campaign Attribution Utility
 * Captures query parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, referrer)
 * on page load and persists them to sessionStorage & localStorage for lead tracking.
 */

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
}

const STORAGE_KEY = 'eesa_utm_params';

/**
 * Initializes and captures UTM parameters from current URL.
 * Call this once when the app mounts.
 */
export function initUtmTracking(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existing = getStoredUtmParams();

    const utm_source = urlParams.get('utm_source') || existing.utm_source || undefined;
    const utm_medium = urlParams.get('utm_medium') || existing.utm_medium || undefined;
    const utm_campaign = urlParams.get('utm_campaign') || existing.utm_campaign || undefined;
    const utm_term = urlParams.get('utm_term') || existing.utm_term || undefined;
    const utm_content = urlParams.get('utm_content') || existing.utm_content || undefined;
    const gclid = urlParams.get('gclid') || existing.gclid || undefined;
    const referrer = document.referrer ? document.referrer : existing.referrer || undefined;
    const landing_page = window.location.pathname + window.location.search;

    const params: UtmParams = {
      ...(utm_source && { utm_source }),
      ...(utm_medium && { utm_medium }),
      ...(utm_campaign && { utm_campaign }),
      ...(utm_term && { utm_term }),
      ...(utm_content && { utm_content }),
      ...(gclid && { gclid }),
      ...(referrer && { referrer }),
      landing_page,
      captured_at: existing.captured_at || new Date().toISOString(),
    };

    // Save to storage if any tracking data exists
    if (Object.keys(params).length > 2) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    }

    return params;
  } catch (e) {
    console.warn('UTM tracking init failed:', e);
    return {};
  }
}

/**
 * Retrieves captured UTM parameters from storage.
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) return JSON.parse(localData);
  } catch (e) {
    console.warn('Failed to retrieve UTM params:', e);
  }

  return {};
}
