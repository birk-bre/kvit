import { useEffect, useState, useSyncExternalStore } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Get data from storage
async function getFromMainStorage() {
  const storageData = await AsyncStorage.getItem("notes");
  const parsedStorageData = JSON.parse(storageData || "{}");

  return parsedStorageData;
}
//Write data to storage
async function writeToMainStorage(notes: any) {
  const storageData = await AsyncStorage.getItem("notes");
  const parsedStorageData = JSON.parse(storageData || "{}");

  const newData = {
    ...parsedStorageData,
    ...notes
  };

  await AsyncStorage.setItem("notes", JSON.stringify(newData));
}

let listeners: any[] = [];

type Note = {
  name: string;
  content: string;
  time: string;
};

let notes: Note[] = [];

const dataStore = {
  addNotes(note: Note) {
    //create new object with new data
    notes = [...notes];
    // writeToMainStorage(notes);
    emitChange();
  },
  setData(data: Note[]) {
    notes = data;
    writeToMainStorage(data);
    emitChange();
  },
  subscribe: (listener: any) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l: any) => l !== listener);
    };
  },
  getSnapShot() {
    return notes;
  }
};

function emitChange() {
  for (const l of listeners) {
    l();
  }
}

export function useNoteStore() {
  const store = useSyncExternalStore(
    dataStore.subscribe,
    dataStore.getSnapShot
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getFromMainStorage();
      dataStore.setData(data);
      setLoading(false);
    })();
  }, []);

  return [
    store,
    { setData: dataStore.setData, addData: dataStore.addNotes },
    loading
  ] as const;
}
