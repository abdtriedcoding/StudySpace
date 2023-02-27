import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpkdRcFSAZCtH6qX1-bltqM9zzvvjdpl8",
  authDomain: "studyspacce.firebaseapp.com",
  projectId: "studyspacce",
  storageBucket: "studyspacce.appspot.com",
  messagingSenderId: "370229397868",
  appId: "1:370229397868:web:0d73332d6a70c727ec8b49",
};
if (getApps().length == 0) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

}
const db = getFirestore();
const auth = getAuth()
const storage = getStorage();

export {db, storage, auth };
