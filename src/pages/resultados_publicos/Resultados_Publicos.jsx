import { useEffect, useMemo, useState } from "react"
import { Link } from 'react-router-dom'
import { db } from "../../services/Firebase.js"
import { collection, onSnapshot } from "firebase/firestore"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"


ChartJS.register(ArcElement, Tooltip, Legend)

function ResultadosPublicos() {
  const [resultados, setResultados] = useState([])
  const [error, setError] = useState(null)

  // Suscripción a la colección "resultados"
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "resultados"),
      (snap) => {
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setResultados(docs)
      },
      (err) => {
        console.error(err)
        setError("No se pudo cargar resultados públicos.")
      }
    )
    return () => unsub()
  }, [])

  // Total de votos
  const totalVotos = useMemo(
    () => resultados.reduce((acc, r) => acc + r.total, 0),
    [resultados]
  )

  // Ordenar resultados y calcular porcentajes
  const resultadosOrdenados = useMemo(() => {
    const arr = resultados.map(r => {
      const porcentaje = totalVotos > 0
        ? ((r.total / totalVotos) * 100).toFixed(1)
        : 0
      return { ...r, porcentaje }
    })
    arr.sort((a, b) => b.total - a.total)
    return arr
  }, [resultados, totalVotos])

  // Datos para el gráfico
  const chartData = useMemo(() => {
    const labels = resultadosOrdenados.map(
      r => `${r.intendente} y ${r.vice} (${r.grupo})`
    )
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
  }, [resultadosOrdenados])

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white border-2 border-blue-300 rounded-xl shadow p-6 flex flex-col">
        <h2 className='text-xl sm:text-2xl font-bold mb-4'>
          Resultados de la Encuesta: Candidatos a Intendente y Viceintendente
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-8">
          {/* Gráfico */}
          <div className="flex items-center justify-center w-full h-96">
            <Pie
              data={chartData}
              options={{
                plugins: { legend: { position: "bottom" } },
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>

          {/* Resultados */}
        <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Totales</h2>
              <ul className="space-y-2">
                {resultadosOrdenados.map(({id, intendente, vice, grupo, total, porcentaje}) => (
                  <li key={id} className="flex justify-between text-sm sm:text-base border border-gray-400 rounded p-4">
                    <span>{`${intendente} y ${vice} (${grupo})`}</span>
                    <span className="font-bold whitespace-nowrap">
                      {porcentaje}% ({total})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t text-sm sm:text-base">
              <span className="font-semibold">Total de votos: </span>
              <span>{totalVotos}</span>
            </div>
        </div>
        </div>
        <div className="flex justify-center items-center mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm sm:text-base"
            >
            <Link to="/">  Volver al Inicio </Link>
            </button>
        </div>
      </div>
    </div>
  )
}

export default ResultadosPublicos

