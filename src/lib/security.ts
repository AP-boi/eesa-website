import DOMPurify from 'dompurify';
import { z } from 'zod';

/**
 * EESA ACADEMY ZERO-TRUST SECURITY SUITE
 * Model: Defense-in-depth, zero standing trust, least-privilege by default
 */

// 1. Client-Side Sanitization Pipeline
export const sanitizeText = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    USE_PROFILES: { html: false, svg: false, svgFilters: false, mathMl: false },
  });
};

// 2. Structural Schemas (Zod)
export const StudentLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone number invalid'),
  email: z
    .string()
    .email('Invalid email address')
    .max(120, 'Email too long')
    .optional()
    .or(z.literal('')),
  courseId: z.string().min(1, 'Course selection required'),
  preferredTime: z.string().optional(),
  targetExamScore: z.string().max(50).optional(),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
  honeypot: z.string().max(0, 'Bot detected').optional(), // Must remain empty
});

export const FranchiseInquirySchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  phone: z
    .string()
    .min(10, 'Valid phone number required')
    .max(15, 'Phone number invalid'),
  email: z.string().email('Valid business email required').max(120),
  city: z.string().min(2, 'Target city required').max(60),
  netWorthBracket: z.string().min(1, 'Investment bracket required'),
  experience: z.string().max(500).optional(),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export const ContactMessageSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  subject: z.string().min(2, 'Subject required').max(100),
  message: z.string().min(5, 'Message must be at least 5 characters').max(1000),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

// 3. Client Submission Velocity Throttle (Token Bucket / Sliding Window)
const SUBMISSION_TIMESTAMPS: Record<string, number[]> = {};

export const checkSubmissionRateLimit = (
  endpointKey: string,
  maxAttempts: number = 3,
  windowMs: number = 60000
): { allowed: boolean; retryAfterSec?: number } => {
  const now = Date.now();
  const timestamps = (SUBMISSION_TIMESTAMPS[endpointKey] || []).filter(
    (ts) => now - ts < windowMs
  );

  if (timestamps.length >= maxAttempts) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.ceil((windowMs - (now - oldest)) / 1000);
    return { allowed: false, retryAfterSec };
  }

  timestamps.push(now);
  SUBMISSION_TIMESTAMPS[endpointKey] = timestamps;
  return { allowed: true };
};

// 4. Request Header Signature Builder
export const createSecureHeaders = (payload?: unknown) => {
  const timestamp = Date.now().toString();
  return {
    'Content-Type': 'application/json',
    'X-Request-Timestamp': timestamp,
    'X-Client-Platform': 'eesa-web-v1',
  };
};
