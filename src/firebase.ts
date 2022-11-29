import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCc3lEjcczZr8uMgYYZFhxvRoj6g5vu1aQ',
  authDomain: 'todo-backend-4b99f.firebaseapp.com',
  databaseURL:
    'https://todo-backend-4b99f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-backend-4b99f',
  storageBucket: 'todo-backend-4b99f.appspot.com',
  messagingSenderId: '14183172825',
  appId: '1:14183172825:web:b52b3dfff565e2ba0a0cc8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)