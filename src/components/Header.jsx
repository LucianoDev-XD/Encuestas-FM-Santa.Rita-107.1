import { FaFacebook, FaInstagram } from 'react-icons/fa'

function Header() {
  // URLs de redes sociales (puedes reemplazarlas por las correctas)
  const facebookUrl = '#'
  const instagramUrl = '#'

  return (
    <header
      className="relative h-80 bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/img/escuela.jpeg')" }}
    >
      {/* Capa negra semitransparente */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenido del header */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center sm:flex-row">
          <img
            src="/escudo/Expo-TecnicaV1.png"
            alt="Escudo de la Escuela"
            className="mb-4 h-24 w-24 sm:mb-0 sm:mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold md:text-5xl">
              Escuela Tecnica Dr. Juan Ramon Vidal
            </h1>
            <p className="mt-2 text-xl md:text-2xl">Expo-Tecnica 2025</p>
          </div>
        </div>

        {/* Iconos de redes sociales */}
        <div className="mt-6 flex space-x-6">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook className="h-8 w-8 transition-transform hover:scale-110" />
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="h-8 w-8 transition-transform hover:scale-110" />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
