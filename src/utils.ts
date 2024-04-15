/**
 * Project Name: ANTLA
 * Author(s): Benoît Rognier (benoit.rognier@edukera.com)
 * License: MIT
 * Creation Date: 2024-03-29
*/
import { writeFileSync } from 'fs';

export const pipeline = <T>(...functions: Function[]) => (value: T) =>
functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), value);

export function exists<T>(arr: T[], predicate: (element: T) => boolean): boolean {
  return arr.reduce((acc, element) => acc || predicate(element), false);
}

export function capitalize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function minimize(string: string): string {
  if (string.length === 0) return "";
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function removeIfFirst(input: string, first: string): string {
  return input.startsWith(first) ? input.slice(1) : input;
}


/**
 * Writes or replaces content in a file synchronously.
 * @param content The string to write to the file.
 * @param filePath The full path to the file.
 */
export function writeContentToFile(content: string, filePath: string): void {
  try {
      writeFileSync(filePath, content);
  } catch (error) {
      console.error('Failed to write to the file:', error);
  }
}

