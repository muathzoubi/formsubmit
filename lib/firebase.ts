import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1Tpv9S00TO__RCkAN95ydnMQDR7yEb0A',
  authDomain: 'csa3-e2b6a.firebaseapp.com',
  projectId: 'csa3-e2b6a',
  storageBucket: 'csa3-e2b6a.firebasestorage.app',
  messagingSenderId: '328650323342',
  appId: '1:328650323342:web:468ea6435238c0452be0df',
  measurementId: 'G-D32GDGT38Q',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
