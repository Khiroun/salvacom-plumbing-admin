import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "./firebase";
const storage = getStorage(app);
export const uploadFile = async (name: string, file: any) => {
  const storageRef = ref(storage, name);

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
