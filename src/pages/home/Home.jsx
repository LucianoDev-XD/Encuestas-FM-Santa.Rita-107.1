import { useEffect, useState } from "react"
import { auth, db } from "../../services/Firebase.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { Link } from "react-router-dom"

const ENCUESTA_CERRADA = true // Cambiá a false si querés reabrir

function Home() {
  const [yaVoto, setYaVoto] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    if (!ENCUESTA_CERRADA) {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const votoDoc = await getDoc(doc(db, "votos", user.uid))
            setYaVoto(votoDoc.exists())
          } catch (err) {
            console.error("Error verificando voto:", err)
          }
        }
        setCargando(false)
      })
      return () => unsub()
    } else {
      setCargando(false)
    }
  }, [])

  if (cargando) {
    return (
      <div className="min-h-[523px] flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[523px] flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-[650px] 
          space-y-4 shadow-md border-2 gap-2 text-center 
          border-blue-300 bg-white rounded-xl 
          p-6 sm:p-8
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8"> 
          Bienvenido a la encuesta sobre los candidatos a Intendentes y Viceintendentes 2025 
          </h2> 
        <p className="font-sans text-base sm:text-lg"> 
          Si fueran hoy las elecciones 
          </p> 
        <p className="pb-4 sm:pb-2 font-sans text-base sm:text-lg"> 
          ¿A quién elegirías como intendente de Esquina? 

        </p>
        {ENCUESTA_CERRADA ? (
          <>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded font-semibold">
              ⚠️ La encuesta ya está cerrada. Mira los resultados aquí:
            </div>
            <Link
              to="/resultado"
              className="
                bg-blue-500 text-white 
                px-4 py-2 sm:px-4 sm:py-2 
                rounded hover:bg-blue-600 transition
                text-sm sm:text-base inline-block
              "
            >
              Ver resultados
            </Link>
          </>
        ) : (
          <>
            {yaVoto ? (
              <div className="bg-green-100 text-green-700 p-4 rounded font-semibold">
                ✅ Ya votaste. Espera la semana que viene los resultados.
              </div>
            ) : (
              <Link
                to="/encuesta"
                className="
                  bg-blue-500 text-white 
                  px-4 py-2 sm:px-4 sm:py-2 
                  rounded hover:bg-blue-600 transition
                  text-sm sm:text-base
                "
              >
                Iniciar encuesta
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home


