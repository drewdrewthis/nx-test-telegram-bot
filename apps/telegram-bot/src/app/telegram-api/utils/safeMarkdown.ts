const SPECIAL_CHARACTERS = [
  // '_',
  // '*',
  '[',
  ']',
  '(',
  ')',
  '~',
  '`',
  '>',
  '#',
  '+',
  '-',
  '=',
  '|',
  '{',
  '}',
  '.',
  '!',
];

/**
 * Escapes special characters in a string to make it safe for Markdown formatting in Telegram Bot API.
 *
 * @param text - The string to be escaped.
 * @returns The escaped string.
 *
 * @see https://core.telegram.org/bots/api#formatting-options
 */
export function safeMarkdown(text: string) {
  // Use a regular expression to find special characters and escape them
  const escapedText = text.replace(
    new RegExp(`[${SPECIAL_CHARACTERS.join('\\')}]`, 'g'),
    '\\$&'
  );

  // Return the escaped text
  return escapedText;
}

