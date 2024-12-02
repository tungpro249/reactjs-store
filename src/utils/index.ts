/**
 * Format a number with a dot (.) as the thousand separator.
 * @param num - The number to format.
 * @returns The formatted number string.
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("de-DE").format(num);
};

/**
 * Format a string with the first letter capitalized.
 * @param str - The string to format.
 * @returns The formatted string.
 */
export const formatString = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format a string to be a valid URL slug.
 * @param str - The string to format.
 * @returns The formatted string.
 */
export const convertToUnsigned = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "");
};
