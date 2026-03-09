/**
 * Type-safe localStorage wrapper.
 * SSR-safe: all operations return null / no-op when window is unavailable.
 */

function isClient(): boolean {
  return typeof window !== 'undefined';
}

/** Read and parse a JSON value from localStorage */
export function getItem<T>(key: string): T | null {
  if (!isClient()) return null;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Serialize and write a value to localStorage */
export function setItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or other write error — silently fail
  }
}

/** Remove a key from localStorage */
export function removeItem(key: string): void {
  if (!isClient()) return;
  localStorage.removeItem(key);
}

/** Check if a key exists in localStorage */
export function hasItem(key: string): boolean {
  if (!isClient()) return false;
  return localStorage.getItem(key) !== null;
}
