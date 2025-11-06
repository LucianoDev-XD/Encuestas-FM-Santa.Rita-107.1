import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

const firebaseConfig = {
  apiKey: "AIzaSyAyhn6bF0hQLo1aIH53N_mZqRlJZdSh7zQ",
  authDomain: "encuesta-proyectoescolar.firebaseapp.com",
  projectId: "encuesta-proyectoescolar",
  storageBucket: "encuesta-proyectoescolar.firebasestorage.app",
  messagingSenderId: "135671680086",
  appId: "1:135671680086:web:6858466964c3abfb793ff7"
};

const app = initializeApp(firebaseConfig)

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_KEY),
//   isTokenAutoRefreshEnabled: true
// })

export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
