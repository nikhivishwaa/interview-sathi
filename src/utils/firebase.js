import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, setUserId } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_PROJECT_ID}.firebasestorage.app`,
  messagingSenderId: import.meta.env.VITE_MESSAGINSENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const sendAnalytics = (eventName, eventParams) =>
  logEvent(analytics, eventName, eventParams);

export { analytics, sendAnalytics, setUserId };
