import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check"

const firebaseConfig = {
  apiKey: "AIzaSyAyCfabspsrOoiYkzi6X-kr_8YHxlEzATY",
  authDomain: "encuestas-esquina.firebaseapp.com",
  projectId: "encuestas-esquina",
  storageBucket: "encuestas-esquina.appspot.com",
  messagingSenderId: "132414285181",
  appId: "1:132414285181:web:9aa76bccca64af1fb05814"
}

const app = initializeApp(firebaseConfig)

// App Check con reCAPTCHA v3
// if (import.meta.env.DEV) {
//   self.FIREBASE_APPCHECK_DEBUG_TOKEN = true
// }

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lfy5eArAAAAAJg28yKDk6HMZnkdXxmLxu5zonMP"),
  isTokenAutoRefreshEnabled: true
})

export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
