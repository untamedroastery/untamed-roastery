import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZjDQAjqZEz_jeyk1MxdHNCb4dd58UBlM",
  authDomain: "untamed-roastery.firebaseapp.com",
  projectId: "untamed-roastery",
  storageBucket: "untamed-roastery.firebasestorage.app",
  messagingSenderId: "631803917381",
  appId: "1:631803917381:web:43e737ea015f44ce215f2c",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
