import LeoProfanity from 'leo-profanity';

// Initialize profanity filter
LeoProfanity.loadDictionary();

export function containsProfanity(text: string): boolean {
  return LeoProfanity.check(text);
}

export function cleanText(text: string): string {
  return LeoProfanity.clean(text);
}

export function isValidMessage(text: string): { valid: boolean; reason?: string } {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Message cannot be empty' };
  }

  if (trimmed.length > 500) {
    return { valid: false, reason: 'Message is too long (max 500 characters)' };
  }

  if (containsProfanity(trimmed)) {
    return { valid: false, reason: 'Message contains inappropriate language' };
  }

  return { valid: true };
}
