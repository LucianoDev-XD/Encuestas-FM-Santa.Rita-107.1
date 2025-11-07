import { PreguntasEncuesta } from "../../data/Preguntas"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db, auth } from "../../services/Firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { signInAnonymously } from "firebase/auth"

function Encuesta() {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [mensaje, setMensaje] = useState(null)
  const navigate = useNavigate()

  // Asegurar que haya sesión (anónima si no hay otra)
  const asegurarSesionAnonima = async () => {
    if (!auth.currentUser) {
      await signInAnonymously(auth)
    }
  }

  const manejarAnterior = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1)
    }
  }

  const manejarSiguiente = () => {
    if (preguntaActual < PreguntasEncuesta.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      // Si es la última pregunta, intentar registrar el voto
      registrarVoto()
    }
  }

  // Guardar voto en Firestore
  const registrarVoto = async () => {
    if (Object.keys(respuestas).length !== PreguntasEncuesta.length) {
      setMensaje("⚠️ Por favor, responde todas las preguntas.")
      return; // Detener la ejecución si no se han respondido todas las preguntas
    }

    try {
      //Garantizamos que haya sesión (anónima si no hay otra)
      await asegurarSesionAnonima()

      //Guardamos el voto en un documento con ID = uid
      await setDoc(doc(db, "votos", auth.currentUser.uid), {
        ...respuestas,
        fecha: serverTimestamp()
      })

      // Si todo va bien
      setMensaje("✅ Voto registrado con éxito")

      // Redirigir a la página "Ya votaste"
      navigate("/ya-votaste")
    } catch (error) {
      console.error("Error al registrar voto:", error)
      setMensaje("⚠️ Ocurrió un error inesperado")
    }
  }

  const pregunta = PreguntasEncuesta[preguntaActual]

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">Encuesta Expo-Técnica</h2>
          <p className="mt-2 text-gray-600">Tu opinión es importante para nosotros.</p>
        </div>

        {/* Barra de Progreso */}
        <div>
          <p className="text-sm text-gray-500">
            Pregunta {preguntaActual + 1} de {PreguntasEncuesta.length}
          </p>
          <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((preguntaActual + 1) / PreguntasEncuesta.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Renderizado de una pregunta a la vez */}
        <fieldset>
          <legend className="text-lg font-semibold text-gray-900">{pregunta.texto}</legend>
          <div className="mt-4 space-y-3">
            {pregunta.opciones.map((opcion) => (
              <label key={opcion.id} className="flex cursor-pointer items-center rounded-lg border p-4 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:ring-2 has-[:checked]:ring-blue-500">
                <input
                  type="radio"
                  name={pregunta.id}
                  value={opcion.id}
                  checked={respuestas[pregunta.id] === opcion.id}
                  onChange={(e) => setRespuestas({ ...respuestas, [pregunta.id]: e.target.value })}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 block text-sm font-medium text-gray-800">{opcion.texto}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center justify-between gap-4 pt-4">
          {/* Botón para volver atrás (solo visible después de la primera pregunta) */}
          {preguntaActual > 0 ? (
            <button
              onClick={manejarAnterior}
              className="rounded-md bg-gray-200 px-6 py-3 text-base font-medium text-gray-800 transition hover:bg-gray-300"
            >
              Anterior
            </button>
          ) : <div/> /* Placeholder para mantener el botón siguiente a la derecha */}

          <button
            onClick={manejarSiguiente}
            disabled={!respuestas[pregunta.id]}
            className="rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {preguntaActual < PreguntasEncuesta.length - 1 ? 'Siguiente' : 'Finalizar Encuesta'}
          </button>
        </div>
      </div>

      {/* Modal centrado */}
      {mensaje && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
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
