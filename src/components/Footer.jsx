import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 border-t border-gray-300">
      <div
        className="
          max-w-6xl mx-auto 
          flex flex-col sm:flex-col md:flex-row 
          justify-center md:justify-around 
          items-center 
          gap-2 sm:gap-3 md:gap-6 
          px-4 py-6
          text-center md:text-left
        "
      >
        {/* Texto de copyright */}
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} FM Santa.Rita 107.7 - Todos los derechos reservados
        </p>

        {/* Enlace al aviso de privacidad */}
        <Link
          to="/privacidad"
          className="text-xs sm:text-sm text-blue-600 hover:underline"
        >
          Aviso de privacidad
        </Link>

        {/* Crédito personal */}
        <p className="text-xs sm:text-sm">
          Desarrollado por{" "}
          <a
            href="https://www.instagram.com/_lucianodev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:underline"
          >
            Luciano A. Fabio Flores
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
