/**
 * Storage durability.
 *
 * IndexedDB is not permanent by default. Three things can take it away:
 *
 *  1. The user clears site data. Nothing can be done about that, nor should it.
 *  2. Disk pressure. Browsers evict "best-effort" origins when space runs low.
 *     `navigator.storage.persist()` asks to be exempt. Chrome grants it silently
 *     on engagement, Firefox prompts, Safari decides for itself.
 *  3. Apple's ITP deletes all script-writable storage — IndexedDB included, not
 *     just localStorage — after 7 days of Safari use without visiting the site.
 *     A web app added to the Home Screen runs outside Safari and is documented
 *     as exempt from that counter. On iOS, installing is what protects the data;
 *     the storage API cannot.
 *
 * So: ask for persistence, report honestly what was granted, and keep pushing
 * export as the only backup that survives all three.
 */

export interface StorageStatus {
  supported: boolean;
  persisted: boolean;
  usageBytes: number | null;
  quotaBytes: number | null;
  /** Running from the Home Screen / installed, rather than in a browser tab. */
  installed: boolean;
}

export function isInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  const standaloneIOS = (navigator as { standalone?: boolean }).standalone === true;
  return standaloneIOS || matchMedia('(display-mode: standalone)').matches;
}

/**
 * Ask the browser to keep this origin's data. Safe to call on every load —
 * once granted it stays granted, and a refusal is not an error.
 */
export async function requestPersistence(): Promise<StorageStatus> {
  const installed = isInstalled();

  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
    return { supported: false, persisted: false, usageBytes: null, quotaBytes: null, installed };
  }

  let persisted = false;
  try {
    persisted = (await navigator.storage.persisted?.()) ?? false;
    if (!persisted && navigator.storage.persist) {
      persisted = await navigator.storage.persist();
    }
  } catch {
    // Some browsers throw rather than resolve false. Not fatal — the data is
    // still there, it just has no eviction protection.
    persisted = false;
  }

  let usageBytes: number | null = null;
  let quotaBytes: number | null = null;
  try {
    const est = await navigator.storage.estimate();
    usageBytes = est.usage ?? null;
    quotaBytes = est.quota ?? null;
  } catch {
    /* estimate is optional */
  }

  return { supported: true, persisted, usageBytes, quotaBytes, installed };
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} kB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

/** iOS Safari, in a tab rather than installed — the one combination that loses data on a timer. */
export function isAtRiskIosTab(status: StorageStatus): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  const webkitOnly = /AppleWebKit/.test(ua) && !/CriOS|FxiOS|Chrome|Chromium|Edg/.test(ua);
  return iOS && webkitOnly && !status.installed;
}
