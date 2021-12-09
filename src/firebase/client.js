import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, firestore, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
};

initializeApp(firebaseConfig);

const db = getFirestore();

export const addPlayer = async ({
  player,
  ranked,
  game,
  qualification,
  observations,
  userId,
}) => {
  return await addDoc(collection(db, 'plants'), {
    player,
    ranked,
    game,
    qualification,
    observations,
    userId: userId,
    createdAt: firestore.Timestamp.fromDate(new Date()),
  });
};

export const getAllPlants = async () => {
  return await getDocs(collection(db, 'plants'));
};
