export type HeadshotRecord = {
  id: string;
  image: string;
  createdAt: string;
  profession: string;
  backdrop: string;
  wardrobe: string;
  expression: string;
  favorite: boolean;
};

const FALLBACK_KEY = "aragon-headshot-history-v1";
const DB_NAME = "aragon-studio";
const STORE_NAME = "headshots";
const MAX_HISTORY = 20;

function readFallback(): HeadshotRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FALLBACK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFallback(records: HeadshotRecord[]) {
  try {
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(records.slice(0, 2)));
  } catch {
    // Storage is best-effort; generation and downloads still work without history.
  }
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") return reject(new Error("IndexedDB unavailable"));
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open portrait history"));
  });
}

function transactionDone(transaction: IDBTransaction) {
  return new Promise<void>((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error("Portrait history transaction failed"));
    transaction.onabort = () => reject(transaction.error || new Error("Portrait history transaction was aborted"));
  });
}

export async function getHistory(): Promise<HeadshotRecord[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).getAll();
    const records = await new Promise<HeadshotRecord[]>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as HeadshotRecord[]);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return readFallback();
  }
}

export async function saveRecord(record: HeadshotRecord): Promise<void> {
  try {
    const db = await openDatabase();
    const write = db.transaction(STORE_NAME, "readwrite");
    write.objectStore(STORE_NAME).put(record);
    await transactionDone(write);
    db.close();

    const records = await getHistory();
    if (records.length > MAX_HISTORY) await setHistory(records.slice(0, MAX_HISTORY));
  } catch {
    writeFallback([record, ...readFallback()]);
  }
}

export async function setHistory(records: HeadshotRecord[]): Promise<void> {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.clear();
    records.slice(0, MAX_HISTORY).forEach(record => store.put(record));
    await transactionDone(transaction);
    db.close();
  } catch {
    writeFallback(records);
  }
}
