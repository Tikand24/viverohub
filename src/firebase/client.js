import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const db = getFirestore();

export const addPlant = async ({
  name,
  tecnicName,
  unitValue,
  image,
  bag,
  observation,
}) => {
  let urlImage = '';
  if (image) {
    urlImage = await addImage(image);
  }
  return await addDoc(collection(db, 'plants'), {
    name,
    tecnicName,
    unitValue,
    image: urlImage,
    bag,
    createdAt: serverTimestamp(),
    observation,
  });
};

export const updatePlant = async ({
  id,
  name,
  tecnicName,
  unitValue,
  image,
  bag,
  observation,
  imgUrl,
}) => {
  let urlImage = imgUrl;
  if (image) {
    urlImage = await addImage(image);
  }
  const plantRef = doc(db, 'plants', id);
  return await updateDoc(plantRef, {
    name,
    tecnicName,
    unitValue,
    image: urlImage,
    bag,
    createdAt: serverTimestamp(),
    observation,
  });
};

export const getAllPlants = async () => {
  return await getDocs(collection(db, 'plants'));
};
export const addImage = async (image) => {
  const fileName = image ? image.name : '';
  const storageRef = ref(storage, `images/${fileName}`);
  await uploadBytes(storageRef, image)
    .then((snapshot) => {
      if (snapshot) return true;
    })
    .catch((err) => console.log('error1', err));
  let urlReturn = `images/${fileName}`;
  await getDownloadURL(storageRef)
    .then((url) => {
      urlReturn = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error);
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  return urlReturn;
};

export const getAllComplements = async () => {
  return await getDocs(collection(db, 'complements'));
};

export const addBalance = async ({
  month,
  sales,
  expenses,
  totalSale,
  expenseSale,
  gain,
  distribution,
  totalExpenes,
}) => {
  return await addDoc(collection(db, 'balances'), {
    month,
    sales,
    expenses,
    totalSale,
    expenseSale,
    gain,
    distribution,
    totalExpenes,
    createdAt: serverTimestamp(),
  });
};

export const updateBalance = async ({
  id,
  month,
  sales,
  expenses,
  totalSale,
  expenseSale,
  gain,
  distribution,
  totalExpenes,
}) => {
  const balanceRef = doc(db, 'balances', id);
  return await updateDoc(balanceRef, {
    month,
    sales,
    expenses,
    totalSale,
    expenseSale,
    gain,
    distribution,
    totalExpenes,
    createdAt: serverTimestamp(),
  });
};
export const getAllBalances = async () => {
  return await getDocs(collection(db, 'balances'));
};

export const getBalanceById = async (id) => {
  const docRef = doc(db, 'balances', id);
  return await getDoc(docRef);
};
