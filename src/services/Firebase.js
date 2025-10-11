import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
}

const app = initializeApp(firebaseConfig)

if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_KEY),
  isTokenAutoRefreshEnabled: true
})

export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
