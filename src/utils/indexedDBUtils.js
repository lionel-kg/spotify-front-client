export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("MusicAppDB", 1);

    request.onerror = (event) => {
      reject("Database error: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore("playHistory", { keyPath: "id" });
    };
  });
};

export const addToHistory = async (song) => {
  const db = await openDatabase();
  const transaction = db.transaction(["playHistory"], "readwrite");
  const store = transaction.objectStore("playHistory");
  store.add(song);
};

export const readHistory = async () => {
  const db = await openDatabase();
  return new Promise((resolve) => {
    const transaction = db.transaction(["playHistory"], "readonly");
    const store = transaction.objectStore("playHistory");
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
};