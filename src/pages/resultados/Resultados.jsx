import { useEffect, useMemo, useState } from "react"
import { db, auth } from "../../services/Firebase.js"
import { collection, onSnapshot, setDoc, doc, writeBatch } from "firebase/firestore"
import { signOut } from "firebase/auth"
import { Candidatos } from "/src/data/Candidatos"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function Resultados() {
  const [votos, setVotos] = useState([])
  const [error, setError] = useState(null)
  const [adminInfo, setAdminInfo] = useState(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishMsg, setPublishMsg] = useState(null)

  useEffect(() => {
    // Guardamos info del admin logueado
    const user = auth.currentUser
    if (user) {
      setAdminInfo({
        nombre: user.displayName || "Administrador",
        correo: user.email || "Sin correo"
      })
    }

    // Suscripción a votos
    const unsub = onSnapshot(
      collection(db, "votos"),
      (snap) => setVotos(snap.docs.map((d) => d.data())),
      (err) => {
        console.error(err)
        setError("No se pudo cargar votos. Verifica reglas y acceso de admin.")
      }
    )
    return () => unsub()
  }, [])

  const etiquetaPorId = useMemo(() => {
    const map = new Map()
    Candidatos.forEach((c) => map.set(c.id, `${c.intendente} (${c.grupo})`))
    return map
  }, [])

  const conteo = useMemo(() => {
    const counts = new Map()
    votos.forEach(({ candidatoId }) => {
      counts.set(candidatoId, (counts.get(candidatoId) || 0) + 1)
    })
    return counts
  }, [votos])

  const totalVotos = votos.length

  const resultadosOrdenados = useMemo (() => {
    const arr = Array.from(conteo.entries()).map(([id, total]) => {
      const porcentaje = totalVotos > 0 ? ((total / totalVotos) * 100).toFixed(1) : 0
      return { id, total, porcentaje}
    })
  
    // Ordenar de mayor a menor
    arr.sort((a, b) => b.total - a.total)
    return arr
  }, [conteo, totalVotos])

  const chartData = useMemo(() => {
    const labels = resultadosOrdenados.map(r => etiquetaPorId.get(r.id) || r.id)
    const data = resultadosOrdenados.map(r => r.total)

    const colors = [
      "#2563EB", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
      "#14B8A6", "#D946EF", "#22C55E", "#F97316", "#64748B"
    ]
    
    

    return {
      labels,
      datasets: [{
        data,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderColor: "#fff",
        borderWidth: 2
      }]
    }
  }, [resultadosOrdenados, etiquetaPorId])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
    }
  }

  const subirResultados = async () => {
    try {
      setIsPublishing(true)
      setPublishMsg(null)
  
      const batch = writeBatch(db)
      const totales = Object.fromEntries(conteo.entries())
  
      for (const [id, total] of Object.entries(totales)) {
        const candidato = Candidatos.find(c => String(c.id) === String(id))
      
        batch.set(
          doc(db, "resultados", id),
          {
            total,
            intendente: candidato?.intendente || "",
            vice: candidato?.vice || "",
            grupo: candidato?.grupo || ""
          },
          { merge: true }
        )
      }
  
      await batch.commit()
      setPublishMsg("✅ Resultados publicados correctamente")
    } catch (err) {
      console.error("Error al publicar resultados:", err)
      setPublishMsg("❌ Hubo un error al publicar")
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white border-2 border-blue-300 rounded-xl shadow p-6 flex flex-col">
        
        {/* Header con título, info admin y botón logout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-center sm:text-left">
            Resultados en tiempo real
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {adminInfo && (
              <div className="text-sm text-gray-600 text-center sm:text-right">
                <p className="font-semibold">{adminInfo.nombre}</p>
                <p className="text-xs">{adminInfo.correo}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm sm:text-base"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfico */}
          <div className="flex items-center justify-center h-72">
            <Pie
              data={chartData}
              options={{
                plugins: { legend: { position: "bottom" } },
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>

          {/* Totales */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Totales</h2>
              <ul className="space-y-2">
                {resultadosOrdenados.map(({id, total, porcentaje}) => (
                  <li key={id} className="flex justify-between text-sm sm:text-base">
                    <span className="">{etiquetaPorId.get(id) || id}</span>
                    <span className="font-bold whitespace-nowrap">{porcentaje}% ({total})</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t text-sm sm:text-base">
              <span className="font-semibold">Total de votos: </span>
              <span>{totalVotos}</span>
            </div>
              <button
                  onClick={subirResultados}
                  disabled={isPublishing || totalVotos === 0}
                  className={`px-4 py-2 rounded text-white ${
                    isPublishing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                  {isPublishing ? "Publicando..." : "Congelar y publicar resultados"}
              </button>
                
                  {publishMsg && (
                    <p className="mt-2 text-sm text-gray-700">{publishMsg}</p>
                  )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resultados

