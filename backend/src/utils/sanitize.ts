import sanitizeHtml from 'sanitize-html';

/**
 * Cleans any string input to prevent XSS attacks.
 * Removes all HTML tags and scripts.
 */
export const cleanString = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: [], // No HTML allowed for simple text fields
    allowedAttributes: {},
  }).trim();
};

/**
 * Cleans rich text inputs (like product descriptions)
 * Allows basic safe HTML tags like <b>, <i>, <p>, <br>.
 */
export const cleanRichText = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'li'],
    allowedAttributes: {},
  }).trim();
};