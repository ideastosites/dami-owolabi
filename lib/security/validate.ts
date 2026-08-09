// Deliberately simple — not trying to fully validate RFC 5322 email syntax,
// just reject obvious garbage before it's written to disk and used as an
// email "to" address.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value) && value.length <= 254;
}

export function isReasonableLength(value: string, max: number): boolean {
  return value.length > 0 && value.length <= max;
}

export const MAX_NAME_LENGTH = 120;
export const MAX_PHONE_LENGTH = 40;
export const MAX_LOCATION_LENGTH = 120;
export const MAX_TEXT_FIELD_LENGTH = 2000;
