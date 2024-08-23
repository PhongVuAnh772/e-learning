import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyACzGbr9UllX1b6RYGEwZNJNaZ7jmOxGX8",
  authDomain: "food-hub-97323.firebaseapp.com",
  projectId: "food-hub-97323",
  storageBucket: "food-hub-97323.appspot.com",
  messagingSenderId: "656671118341",
  appId: "1:656671118341:web:e4079bcef4339b0682b86c",
  measurementId: "G-YDQ8MH1HPT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);