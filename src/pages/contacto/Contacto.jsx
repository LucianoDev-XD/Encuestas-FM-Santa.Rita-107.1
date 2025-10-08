function Contacto() {
    return (
      <div className="min-h-[523px] flex items-center justify-center px-4">

        <div
          className="
            bg-white 
            p-6 sm:p-8 
            rounded-[15px] shadow-md 
            w-full max-w-[550px] 
            border-blue-300 border-2 
            space-y-4 mt-8 mb-8
          "
        >
  
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">Contacto</h2>
  
          <p className="font-sans text-base sm:text-lg">
            Medio de contacto: <em>armandofabio@gmail.com</em>
          </p>
  
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 mb-4">Contacto del Desarrollador</h2>
  
          <p className="font-sans text-base sm:text-lg">
            Desarrollador: <em>Luciano A. Fabio Flores</em>
          </p>
  
          <p className="font-sans text-base sm:text-lg">
            Red social:{" "}
            <em>
              <a
                href="https://www.instagram.com/_lucianodev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:underline"
              >
                Instagram
              </a>
            </em>
          </p>
  
          <p className="font-sans text-base sm:text-lg">
            Correo: <em>lucianodev.09@gmail.com</em>
          </p>
        </div>
      </div>
    )
  }
  
  export default Contacto
  