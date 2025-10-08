function Sobre_nosotros() {
    return (
      <div className="min-h-[523px] flex items-center justify-center px-4">
      <div
        className="
          bg-white p-6 sm:p-8 
          rounded-[15px] shadow-lg 
          w-full max-w-[550px] 
          border-blue-300 border-2 
          space-y-4 mt-8 mb-8
        "
      >
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">
          Sobre Nosotros
        </h2>

        <p className="text-gray-700 mb-2 font-sans leading-relaxed">
          Somos un equipo comprometido en <span className="font-semibold">escuchar y comprender</span> cómo piensa la comunidad respecto a las elecciones. Creemos que cada voz cuenta y merece ser tenida en cuenta.
        </p>

        <p className="text-gray-700 mb-2 font-sans leading-relaxed">
          Con este proyecto buscamos <span className="text-blue-600 font-medium">aportar información valiosa</span> que ayude a entender mejor la opinión de la sociedad frente a los procesos electorales locales, fomentando un debate <span className="italic">sano y constructivo</span>.
        </p>

        <p className="text-gray-700 mb-2 font-sans leading-relaxed">
          Estamos firmemente comprometidos con <span className="underline">la privacidad y la transparencia</span> de cada encuesta, asegurando que la participación sea siempre segura y confiable.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
          <p className="text-sm text-gray-600">
            Nuestro propósito es simple: ofrecer un espacio donde la comunidad pueda expresarse libremente y con confianza.
          </p>
        </div>
      </div>
    </div>
  )
}


export default Sobre_nosotros