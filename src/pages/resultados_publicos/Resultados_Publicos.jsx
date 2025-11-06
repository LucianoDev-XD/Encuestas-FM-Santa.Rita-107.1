import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/Firebase.js";
import { collection, onSnapshot } from "firebase/firestore"; 
import { PreguntasEncuesta as preguntas } from "../../data/Preguntas.js";
import { FiTrendingUp, FiTrendingDown, FiAward, FiMeh } from 'react-icons/fi';


function ResultadosPublicos() {
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Suscripción a la colección "votos" para obtener resultados en tiempo real.
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "votos"),
      (snap) => {
        const conteos = {};

        // Inicializar conteos para todas las preguntas y opciones
        preguntas.forEach(pregunta => {
          conteos[pregunta.id] = {};
          pregunta.opciones.forEach(opcion => {
            conteos[pregunta.id][opcion.id] = {
              id: opcion.id,
              texto: opcion.texto,
              total: 0
            };
          });
        });

        // Contar los votos
        snap.docs.forEach((doc) => {
          const voto = doc.data();
          preguntas.forEach(pregunta => {
            const respuestaId = voto[pregunta.id];
            if (respuestaId && conteos[pregunta.id][respuestaId]) {
              conteos[pregunta.id][respuestaId].total++;
            }
          });
        });

        // Convertir el objeto de conteos a un array de resultados
        const resultadosProcesados = preguntas.map(pregunta => ({
          id: pregunta.id,
          texto: pregunta.texto,
          opciones: Object.values(conteos[pregunta.id])
        }));

        setResultados(resultadosProcesados);
        setCargando(false);
      },
      (err) => {
        console.error(err);
        setError("No se pudieron cargar los resultados.");
        setCargando(false);
      }
    );
    return () => unsub();
  }, []);

  const destacados = useMemo(() => {
    if (resultados.length === 0) return [];

    return resultados.map(pregunta => {
      if (pregunta.opciones.length === 0) {
        return { id: pregunta.id, masVotado: null, menosVotado: null };
      }

      const opciones = [...pregunta.opciones];
      
      let masVotado = null;
      let menosVotado = null;

      // Si no hay votos, no hay destacados
      if (opciones.every(o => o.total === 0)) {
        return { id: pregunta.id, masVotado: null, menosVotado: null };
      }

      // Encontrar el más votado
      masVotado = opciones.reduce((max, current) => (current.total > max.total ? current : max), opciones[0]);

      // Encontrar el menos votado (con al menos un voto)
      const opcionesConVotos = opciones.filter(o => o.total > 0);
      if (opcionesConVotos.length > 1) {
        menosVotado = opcionesConVotos.reduce((min, current) => (current.total < min.total ? current : min), opcionesConVotos[0]);
      }
      
      // No mostrar "menos votado" si es el mismo que el "más votado" (caso de un solo votado)
      if (masVotado && menosVotado && masVotado.id === menosVotado.id) {
        menosVotado = null;
      }

      return { id: pregunta.id, masVotado, menosVotado };
    });
  }, [resultados]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando resultados...</p>
      </div>
    );
  }

  // Componente para renderizar los resultados de una pregunta
  const BloqueResultados = ({ pregunta }) => {
    const totalVotosPregunta = useMemo(
      () => pregunta.opciones.reduce((acc, r) => acc + r.total, 0),
      [pregunta.opciones]
    );

    const resultadosOrdenados = useMemo(() => {
      const arr = pregunta.opciones.map((r) => {
        const porcentaje = totalVotosPregunta > 0 ? ((r.total / totalVotosPregunta) * 100).toFixed(1) : 0;
        return { ...r, porcentaje };
      });
      arr.sort((a, b) => b.total - a.total);
      return arr;
    }, [pregunta.opciones, totalVotosPregunta]);

    return (
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">{pregunta.texto}</h2>
        <div className="space-y-2">
          {resultadosOrdenados.map(({ id, texto, total, porcentaje }) => (
            <div key={id} className="text-ms">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-gray-700">{texto}</p>
                <p className="font-bold text-gray-800">
                  {total} <span className="font-normal text-gray-500">({porcentaje}%)</span>
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-right text-sm text-gray-500 pt-1">
          Total: {totalVotosPregunta} votos
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen px-4 py-6 flex justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white border-2 border-blue-300 rounded-xl shadow p-6 flex flex-col">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Resultados de la Encuesta Expo-Técnica
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        {resultados.length > 0 && !cargando && !error ? (
          <>
            {/* Sección de Destacados */}
            <div className="mb-8 p-4 border-b-2 border-gray-100">
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Puntos Clave</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                {/* Más Votados */}
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <FiAward className="mx-auto h-8 w-8 text-green-500 mb-3" />
                  <p className="text-base font-semibold text-green-800 mb-2">Los Favoritos</p>
                  <div className="space-y-2">
                    <p className="text-base text-gray-500">Carrera: <span className="block text-lg font-bold text-green-900">{destacados[0]?.masVotado?.texto || 'N/A'}</span></p>
                    <p className="text-base text-gray-500">Exposición: <span className="block text-lg font-bold text-green-900">{destacados[1]?.masVotado?.texto || 'N/A'}</span></p>
                  </div>
                </div>
                {/* Menos Votados */}
                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <FiMeh className="mx-auto h-8 w-8 text-orange-500 mb-3" />
                  <p className="text-base font-semibold text-orange-800 mb-2">A Mejorar</p>
                  <div className="space-y-2">
                    <p className="text-base text-gray-500">Carrera: <span className="block text-lg font-bold text-orange-900">{destacados[0]?.menosVotado?.texto || 'N/A'}</span></p>
                    <p className="text-base text-gray-500">Exposición: <span className="block text-lg font-bold text-orange-900">{destacados[1]?.menosVotado?.texto || 'N/A'}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados Detallados */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {resultados.map(pregunta => (
                <BloqueResultados key={pregunta.id} pregunta={pregunta} />
              ))}
              <div className="md:col-span-2 mt-4 pt-4 border-t text-center text-gray-700">
                <p>Los resultados se actualizan en tiempo real.</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 py-10">
            Aún no se han registrado votos.
          </p>
        )}
        <div className="flex justify-center items-center mt-4">
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm sm:text-base"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResultadosPublicos;
