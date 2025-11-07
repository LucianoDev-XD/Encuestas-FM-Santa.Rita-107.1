import { FaMapMarkerAlt } from "react-icons/fa";

function Marquee() {
  const address = "BARTOLOME MITRE 1652 Bº SAN CAYETANO entre las calles Roque Saenz Peña y Beron de Astrada (Corrientes), departamento: Esquina";

  return (
    <div className="w-full overflow-hidden whitespace-nowrap bg-gray-800 py-2.5 text-sm text-gray-200 shadow-md sm:text-base">
      <div className="inline-block animate-marquee">
        {/* Duplicamos el contenido para un bucle fluido */}
        <span className="inline-flex items-center mx-4">
          <FaMapMarkerAlt className="mr-3 h-5 w-5 flex-shrink-0 text-red-500" />{address}
        </span>
      </div>
    </div>
  );
}

export default Marquee;