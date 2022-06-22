import {
  getAuth,
  signInWithEmailAndPassword as fbsignInWithEmailAndPassword,
} from "firebase/auth";
import app from "./firebase";
export const auth = getAuth(app);
export const onAuthStateChanged = auth.onAuthStateChanged;
export const signInWithEmailAndPassword = (email: string, password: string) => {
  return fbsignInWithEmailAndPassword(auth, email, password);
};
