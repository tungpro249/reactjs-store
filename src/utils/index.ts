/**
 * Format a number with a dot (.) as the thousand separator.
 * @param num - The number to format.
 * @returns The formatted number string.
 */
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('de-DE').format(num)
}
