import { FaInstagram } from 'react-icons/fa'

function Footer() {
  const developerInstagramUrl = 'https://www.instagram.com/_lucianodev/'

  return (
    <footer className="bg-gray-800 p-6 text-center text-white">
      <div className="mx-auto max-w-6xl">
        {/* Información de la Tutora */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <p className="text-sm">Tutora de Septimo Año: Aranda Malena</p>
          {/* 
            // Descomenta este bloque para añadir el enlace al Instagram de la tutora
            <a 
              href="URL_INSTAGRAM_TUTORA" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram de la tutora"
            >
              <FaInstagram className="h-5 w-5 transition-transform hover:scale-110" />
            </a>
          */}
        </div>

        {/* Información del Desarrollador */}
        <div className="mb-4">
          <p className="text-sm">
            Proyecto Desarrollado por:{' '}
          <a
            href={developerInstagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram del desarrollador"
            className="inline-flex items-center gap-2 font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
              Luciano A. Fabio Flores
              <FaInstagram className="h-5 w-5" />
          </a>
          </p>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Escuela Tecnica Dr. Juan Ramon Vidal. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
