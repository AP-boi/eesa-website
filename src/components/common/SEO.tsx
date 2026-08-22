import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any> | Record<string, any>[];
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'EESA Academy | Spoken English, IELTS, PTE & Test Prep Institute in West Delhi';
const DEFAULT_DESCRIPTION = 'EESA Academy (Expert Educational Services Academy Pvt Ltd) at Dashrath Puri Metro Station, West Delhi. IELTS (Band 8.0+), PTE (79+), OET, Spoken English, Academic Tutoring & Study Abroad Consulting.';
const DEFAULT_IMAGE = '/images/eesa/eesa-logo.jpg';
const SITE_URL = 'https://eesaacademy.com';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [
    'EESA Academy',
    'IELTS coaching West Delhi',
    'PTE Academic Dashrath Puri',
    'OET coaching for nurses Delhi',
    'Spoken English classes Dwarka',
    'English institute Vijay Enclave',
    'Study abroad consultant West Delhi',
    'Neetu Devi EESA Academy',
    'Founder Neetu Devi English Institute',
    'Expert Educational Services Academy'
  ],
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  jsonLd,
  noIndex = false,
}) => {
  const fullTitle = title
    ? title.includes('EESA Academy')
      ? title
      : `${title} | EESA Academy`
    : DEFAULT_TITLE;
  const canonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : undefined;
  const absoluteImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content="EESA Academy" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Optional Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
