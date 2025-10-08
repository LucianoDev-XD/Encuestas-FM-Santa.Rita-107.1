import { Link } from "react-router-dom"

function YaVotaste() {
  return (
    <div className="min-h-[523px] flex items-center justify-center px-4">
      <div className="bg-white border-2 border-blue-300 p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">✅ Ya votaste</h1>
        <p className="mb-6">Tu voto fue registrado correctamente. Gracias por participar.</p>
        
        {/* Botón para resultados (lo activaremos más adelante) */}
        <Link
          to="#"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:scale-95 transition"
        >
          Ver Resultados
        </Link>
      </div>
    </div>
  )
}

export default YaVotaste
