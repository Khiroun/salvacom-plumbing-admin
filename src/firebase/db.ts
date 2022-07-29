import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import app from "./firebase";

export const db = getFirestore(app);

export const getAll = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const res = [];
  querySnapshot.forEach((doc) => {
    res.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  return res;
};

export const getDocumentByField = async (
  collectionName: string,
  fieldName: string,
  fieldValue: string
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", fieldValue)
  );
  const docs = await getDocs(q);
  if (docs.docs.length === 0) {
    return null;
  }
  return {
    id: docs.docs[0].id,
    ...docs.docs[0].data(),
  };
};

export const addDocument = (collectionName: string, data: any) => {
  return addDoc(collection(db, collectionName), data);
};

export const deleteDocument = (collectionName: string, id: string) => {
  return deleteDoc(doc(db, collectionName, id));
};
export const getDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  const res: {
    id: string;
    [x: string]: any;
  } = {
    id: docSnap.id,
    ...docSnap.data(),
  };
  return res;
};

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any
) => {
  const docRef = doc(db, collectionName, id);

  return updateDoc(docRef, data);
};
