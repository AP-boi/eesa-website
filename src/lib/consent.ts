/**
 * Cookie & Privacy Consent Management Module (GDPR & DPDP Baseline)
 */

export interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'eesa_cookie_consent';

export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to parse consent preferences:', e);
  }
  return null;
}

export function hasConsent(type: 'essential' | 'analytics' | 'marketing'): boolean {
  if (type === 'essential') return true;
  const prefs = getConsentPreferences();
  if (!prefs) return false;
  return !!prefs[type];
}

export function saveConsentPreferences(prefs: Omit<ConsentPreferences, 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  const full: ConsentPreferences = {
    ...prefs,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  window.dispatchEvent(new CustomEvent('eesa_consent_changed', { detail: full }));
}
