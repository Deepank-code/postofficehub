import { openDB } from "idb";

const DB_NAME = "post-office-reminders";
const DB_VERSION = 4; // Increase to force upgrade
const STORE_REMINDERS = "reminders";

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_REMINDERS)) {
        db.createObjectStore(STORE_REMINDERS, { keyPath: "id" });
      }
    },
  });
};

export const setReminder = async (reminder) => {
  const db = await initDB();
  return db.put(STORE_REMINDERS, reminder);
};

export const getAllReminders = async () => {
  const db = await initDB();
  return db.getAll(STORE_REMINDERS);
};

export const deleteReminder = async (id) => {
  const db = await initDB();
  return db.delete(STORE_REMINDERS, id);
};
