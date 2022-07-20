import {
  getAuth,
  signInWithEmailAndPassword as fbsignInWithEmailAndPassword,
  signOut as fbsignOut,
  createUserWithEmailAndPassword as fbcreateUserWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase";
export const auth = getAuth(app);
export const onAuthStateChanged = auth.onAuthStateChanged;
export const signInWithEmailAndPassword = (email: string, password: string) => {
  return fbsignInWithEmailAndPassword(auth, email, password);
};
export const createUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return fbcreateUserWithEmailAndPassword(auth, email, password);
};
export const signOut = () => {
  return fbsignOut(auth);
};
