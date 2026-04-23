import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnxgEHR-D7YYm-nKyt8qBOlvr2cz5QHWQ",
  authDomain: "agrilink-app-9d4fb.firebaseapp.com",
  projectId: "agrilink-app-9d4fb",
  storageBucket: "agrilink-app-9d4fb.firebasestorage.app",
  messagingSenderId: "778261653433",
  appId: "1:778261653433:web:f4b8d3409d16cff909f868",
  measurementId: "G-XKPTMKH92G"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
