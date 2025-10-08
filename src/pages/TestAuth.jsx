import { useEffect } from "react"
import { auth, db } from "../services/Firebase.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function TestAuth() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      console.log("🔎 Usuario detectado:", user)

      if (!user) {
        console.log("➡️ No hay sesión iniciada")
        return
      }

      try {
        const adminDoc = await getDoc(doc(db, "admins", user.uid))
        console.log("📂 Documento en admins:", adminDoc.exists() ? adminDoc.data() : "No existe")
      } catch (err) {
        console.error("❌ Error leyendo admins:", err)
      }
    })

    return () => unsub()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Test de Auth</h1>
      <p>Revisa la consola del navegador para ver los resultados.</p>
    </div>
  )
}
