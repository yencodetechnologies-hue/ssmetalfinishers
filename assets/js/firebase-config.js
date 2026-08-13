import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCY2iqoI8K_xyntV_BjwOAeniXYkRevBqI",
  authDomain: "ssmetalfinishers-ea4a7.firebaseapp.com",
  projectId: "ssmetalfinishers-ea4a7",
  storageBucket: "ssmetalfinishers-ea4a7.firebasestorage.app",
  messagingSenderId: "535521083554",
  appId: "1:535521083554:web:4e3f9514c744efe634d7fb"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const COLLECTION_NAME = "contactSubmissions";
