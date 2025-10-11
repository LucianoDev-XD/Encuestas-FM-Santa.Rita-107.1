import { useEffect, useState } from "react"
import { auth, db } from "../../services/Firebase.js"
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import Resultados from "../resultados/Resultados.jsx"

export default function AdminGate() {
  const [estado, setEstado] = useState("cargando") // cargando | noAuth | noRol | autorizado
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setEstado("noAuth") // si no hay sesión, mostrar login
        return
      }
      try {
        const adminDoc = await getDoc(doc(db, "admins", user.uid))
        if (adminDoc.exists()) {
          const rol = adminDoc.data().rol
          if (rol === "admin" || rol === "desarrollador") {
            setEstado("autorizado")
          } else {
            setEstado("noRol")
          }
        } else {
          setEstado("noRol")
        }
      } catch (err) {
        console.error("Error verificando rol:", err)
        setEstado("noRol")
      }
    })
    return () => unsub()
  }, [])

  const loginEmail = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error("Error en login Email:", err)
      setError("Correo o contraseña incorrectos")
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      // No recargamos, onAuthStateChanged pondrá estado = "noAuth"
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
    }
  }

  if (estado === "cargando") return <p className="text-center mt-10">Cargando...</p>

  if (estado === "noAuth")
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white shadow-md border border-gray-200 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-center">Acceso de Administrador</h2>
          <p className="text-center text-gray-600">
            Inicia sesión con tu cuenta de administrador
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* Formulario Email/Password */}
          <form onSubmit={loginEmail} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Iniciar sesión
            </button>
          </form>

        </div>
      </div>
    )

  if (estado === "noRol")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-red-600 font-semibold text-center">
          No tienes permisos. Tu cuenta no tiene rol de Admin o Desarrollador.
        </p>
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    )

  if (estado === "autorizado") return <Resultados />
}
