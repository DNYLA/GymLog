import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDLw4iUVcvWx_-fsgxdxBM-lkElSKGKLCA',
  authDomain: 'gymlog-b8ae4.firebaseapp.com',
  projectId: 'gymlog-b8ae4',
  storageBucket: 'gymlog-b8ae4.appspot.com',
  messagingSenderId: '219965266147',
  appId: '1:219965266147:web:b675bc507451be7d248dd6',
  measurementId: 'G-2VB43MGL8P',
};

initializeApp(firebaseConfig);

const auth = getAuth();

// async function loginDefault() {

// }

export { auth };
