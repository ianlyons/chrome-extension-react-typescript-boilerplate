export function compact(list: any[]) {
  return Array.from(list).filter((arg) => !!arg);
}

export function classnames(...classnames: string[]) {
  return compact(classnames).join(" ");
}

type MapPredicate = (value: any, key: string) => any;
export function mapObject(
  object: Record<string, any>,
  predicate: MapPredicate
) {
  const res = [];
  for (const key in object) {
    res.push(predicate(object[key], key));
  }
  return res;
}

export async function getStoredValue(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(key, (value) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(value);
    });
  });
}

export async function pause(durationMs = 50) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

function debugLog(...args: any[]) {
  console.info(`[Blend Extension]`, ...args);
}

export function getDebugLogger(isDebugMode: boolean) {
  if (!isDebugMode) return () => {};
  return debugLog;
}
