import { FaFacebook, FaInstagram } from 'react-icons/fa'

function Header() {
  // URLs de redes sociales (puedes reemplazarlas por las correctas)
  const facebookUrl = 'https://www.facebook.com/profile.php?id=100065235921257&mibextid=ZbWKwL'
  const instagramUrl = 'https://www.instagram.com/escuelatecnicaesquina/'

  return (
    <header
      className="relative h-78 bg-cover bg-center text-white sm:h-72 md:h-80  md:bg-bottom-left"
      style={{ backgroundImage: "url('/img/escuela.jpeg')" }}
    >
      {/* Capa negra semitransparente */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenido del header */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center">
        <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-8">
          <img
            src="/escudo/Expo-TecnicaV1.png"
            alt="Escudo de la Escuela"
            className="h-38 w-38 sm:h-46 sm:w-46"
          />
          <div>
            <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
              Escuela Tecnica Dr. Juan Ramon Vidal
            </h1>
            <p className="mt-2 text-lg md:text-2xl">Expo-Tecnica 2025</p>

            {/* Iconos de redes sociales */}
            <div className="mt-6 flex justify-center space-x-6">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="h-8 w-8 transition-transform hover:scale-110" />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-8 w-8 transition-transform hover:scale-110" />
              </a>
            </div>
          </div>
        </div>


      </div>
    </header>
  )
}

export default Header
