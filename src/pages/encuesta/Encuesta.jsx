import { Candidatos } from "/src/data/Candidatos"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db, auth } from "../../services/Firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { signInAnonymously } from "firebase/auth"

function Encuesta() {
  const [seleccionado, setSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState(null)
  const navigate = useNavigate()

  // Asegurar que haya sesión (anónima si no hay otra)
  const asegurarSesionAnonima = async () => {
    if (!auth.currentUser) {
      await signInAnonymously(auth)
    }
  }

  // Guardar voto en Firestore
  const registrarVoto = async () => {
    if (!seleccionado) {
      setMensaje("⚠️ Por favor selecciona un candidato")
      return
    }

    try {
      // 🔹 Garantizamos que haya sesión (anónima si no hay otra)
      await asegurarSesionAnonima()

      // 🔹 Guardamos el voto en un documento con ID = uid
      await setDoc(doc(db, "votos", auth.currentUser.uid), {
        candidatoId: seleccionado,
        fecha: serverTimestamp()
      })

      // Si todo va bien
      setMensaje("✅ Voto registrado con éxito")
      setSeleccionado(null)

      // Redirigir a la página "Ya votaste"
      navigate("/ya-votaste")
    } catch (error) {
      console.error("Error al registrar voto:", error)
      setMensaje("⚠️ Ocurrió un error inesperado")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border-blue-300 border-2 p-6 sm:p-8 rounded-[15px] shadow-md w-full max-w-[850px] space-y-4 mt-8 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Candidatos</h2>
        <ul className="list-image-[url(/src/assets/icon/asterisco.png)] list-outside pl-[4px] sm:list-inside sm:pl-[0px]">
          <li className="text-base sm:text-lg font-sans">
            Una vez que elija un candidato haga click en enviar.
          </li>
        </ul>

        {/* Lista de candidatos */}
        <div className="flex flex-col gap-4 w-full">
          {Candidatos.map((Candidato) => (
            <div
              key={Candidato.id}
              className="flex flex-col sm:flex-row sm:items-center gap-4 bg-gradient-to-r from-gray-200 to-white p-4 rounded-[18px] border border-gray-100 shadow-md"
            >
            <picture>
                <source srcSet={Candidato.portada} type="image/webp" />
                <img
                src={Candidato.portadaFallback}
                    alt={Candidato.grupo}
                    loading="lazy"
                    className="w-full h-40 sm:w-32 sm:h-28 object-contain rounded-[15px] "
                />
            </picture>

              <div className="flex flex-col flex-1 w-full">
                <span className="font-bold pb-1 whitespace-normal break-words">
                  Intendente: <span className="font-normal">{Candidato.intendente}</span>
                  <br />
                  Viceintendente: <span className="font-normal">{Candidato.vice}</span>
                </span>
                <picture>
                  <source srcSet={Candidato.logo} type="image/webp" />
                  <img
                    src={Candidato.logoFallback}
                    alt={Candidato.grupo}
                    loading="lazy"
                    className="max-w-25 max-h-25 object-contain rounded-[18px]"
                  />
                </picture>
              </div>

              <div className="sm:pl-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={seleccionado === Candidato.id}
                    onChange={() => setSeleccionado(Candidato.id)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span className="text-sm sm:text-base">Seleccionar</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={registrarVoto}
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 active:scale-95 transition transform duration-150"
          >
            Enviar Voto
          </button>
        </div>
      </div>

      {/* Modal centrado */}
      {mensaje && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-lg font-semibold">{mensaje}</p>
            <button
              onClick={() => setMensaje(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:scale-95 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Encuesta


