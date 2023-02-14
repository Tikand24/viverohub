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
  deleteDoc
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

export const addList = async ({
  customer,
  name,
  route,
  percentage,
  observation,
  products,
  status,
}) => {
  return await addDoc(collection(db, 'lists'), {
    name,
    customer,
    route,
    percentage,
    observation,
    products,
    status,
    createdAt: serverTimestamp(),
  });
};

export const updateList = async ({
  id,
  name,
  customer,
  route,
  percentage,
  observation,
  products,
  status,
}) => {
  const listRef = doc(db, 'lists', id);
  return await updateDoc(listRef, {
    name,
    customer,
    route,
    percentage,
    observation,
    products,
    status,
    createdAt: serverTimestamp(),
  });
};
export const getAllLists = async () => {
  return await getDocs(collection(db, 'lists'));
};

export const getListById = async (id) => {
  const docRef = doc(db, 'lists', id);
  return await getDoc(docRef);
};

export const addRoute = async ({ name, code, status, observation }) => {
  return await addDoc(collection(db, 'routes'), {
    name,
    code,
    observation,
    status,
    createdAt: serverTimestamp(),
  });
};

export const updateRoute = async ({ id, name, code, status, observation }) => {
  const routeRef = doc(db, 'routes', id);
  return await updateDoc(routeRef, {
    name,
    code,
    status,
    observation,
    createdAt: serverTimestamp(),
  });
};
export const getAllRoutes = async () => {
  return await getDocs(collection(db, 'routes'));
};

export const getRouteById = async (id) => {
  const docRef = doc(db, 'routes', id);
  return await getDoc(docRef);
};

export const addCustomer = async ({
  name,
  customName,
  code,
  tipDoc,
  document,
  phone,
  email,
  route,
  observation,
  percentage,
  status,
}) => {
  return await addDoc(collection(db, 'customers'), {
    name,
    customName,
    code,
    tipDoc,
    document,
    phone,
    email,
    route,
    observation,
    percentage,
    status,
    createdAt: serverTimestamp(),
  });
};

export const updateCustomer = async ({
  id,
  name,
  customName,
  code,
  tipDoc,
  document,
  phone,
  email,
  route,
  observation,
  percentage,
  status,
}) => {
  const customerRef = doc(db, 'customers', id);
  return await updateDoc(customerRef, {
    name,
    customName,
    code,
    tipDoc,
    document,
    phone,
    email,
    route,
    observation,
    percentage,
    status,
    createdAt: serverTimestamp(),
  });
};
export const getAllCustomers = async () => {
  return await getDocs(collection(db, 'customers'));
};

export const getCustomerById = async (id) => {
  const docRef = doc(db, 'customers', id);
  return await getDoc(docRef);
};

export const addFamily = async ({ family, familyMembers, status }) => {
  return await addDoc(collection(db, 'family'), {
    family,
    familyMembers,
    status,
    createdAt: serverTimestamp(),
  });
};

export const updateFamily = async ({ id, family, familyMembers, status}) => {
  const routeRef = doc(db, 'family', id);
  return await updateDoc(routeRef, {
    family,
    familyMembers,
    status,
    createdAt: serverTimestamp(),
  });
};

export const removeFamily = async (id) => {
  return await deleteDoc(doc(db, 'family', id));
};
export const getAllFamilies = async () => {
  return await getDocs(collection(db, 'family'));
};

export const getFamilyById = async (id) => {
  const docRef = doc(db, 'family', id);
  return await getDoc(docRef);
};
