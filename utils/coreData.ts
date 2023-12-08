import { useEffect, useState, useSyncExternalStore } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Get data from storage
async function getFromMainStorage() {
  const storageData = await AsyncStorage.getItem("data");
  const parsedStorageData = JSON.parse(storageData || "{}");

  return parsedStorageData;
}
//Write data to storage
async function writeToMainStorage(data: any) {
  const storageData = await AsyncStorage.getItem("data");
  const parsedStorageData = JSON.parse(storageData || "{}");

  const newData = {
    ...parsedStorageData,
    ...data
  };

  await AsyncStorage.setItem("data", JSON.stringify(newData));
}

let listeners: any[] = [];
let coreData: {
  name?: string;
  numberOfUnits?: number;
  stopDate?: string;
} = {};

const dataStore = {
  addCoreData(key: string, value: any) {
    //create new object with new data
    const newData = {
      [key]: value,
      ...coreData
    };
    //add new data to coreData
    coreData = newData;

    writeToMainStorage(coreData);
    emitChange();
  },
  setData(data: any) {
    coreData = data;
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
    return coreData;
  }
};

function emitChange() {
  for (const l of listeners) {
    l();
  }
}

export function useDataStore() {
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
    { setData: dataStore.setData, addData: dataStore.addCoreData },
    loading
  ] as const;
}
