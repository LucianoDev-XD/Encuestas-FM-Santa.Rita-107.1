import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header() {
  // Estado para abrir/cerrar el menú en móviles
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="flex justify-between items-center p-4 shadow bg-white">
      {/* Logo / título */}
      <div className="text-lg sm:text-2xl font-bold text-blue-600">
        Encuestas FM-Santa.Rita 107.1
      </div>

      {/* Botón hamburguesa (solo visible en móvil) */}
      <button
        className="lg:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Tres rayitas del menú */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            // Icono de cerrar
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Icono hamburguesa
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navegación */}
      <div className="hidden lg:flex items-center gap-5">
        <nav className="flex gap-2">
          <Link
            to="/"
            className="bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-blue-500 active:scale-105 transition duration-200 ease-in-out"
          >
            Inicio
          </Link>
          <Link
            to="/sobre_nosotros"
            className="bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-blue-500 active:scale-105 transition duration-200 ease-in-out"
          >
            Sobre Nosotros
          </Link>
          <Link
            to="/contacto"
            className="bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-blue-500 active:scale-105 transition duration-200 ease-in-out"
          >
            Contacto
          </Link>
        </nav>
      </div>

      {/* Menú desplegable en móvil */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 lg:hidden z-50">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Inicio
          </Link>
          <Link
            to="/sobre_nosotros"
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Sobre Nosotros
          </Link>
          <Link
            to="/contacto"
            onClick={() => setIsOpen(false)}
            className="w-full text-center bg-gray-200 text-black font-semibold px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
