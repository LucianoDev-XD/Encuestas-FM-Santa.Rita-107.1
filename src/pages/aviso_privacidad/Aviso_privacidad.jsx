function Privacidad() {
    return (
      <div className="min-h-[523px] flex items-center justify-center px-4">

        <div
          className="
            bg-white 
            p-6 sm:p-8 
            rounded-[15px] shadow-lg 
            w-full max-w-[750px] 
            border-blue-300 border-2 
            space-y-4 mt-8 mb-8
          "
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-600 text-center">
            Aviso de Privacidad
          </h2>
  
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
             En esta plataforma <span className="font-semibold">respetamos tu privacidad</span> y valoramos la confianza que depositás en nosotros.
          </p>
  
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Creemos en la importancia de la <span className="font-semibold text-blue-600">transparencia</span> y la <span className="font-semibold text-blue-600">confidencialidad</span>.  
            Los datos personales como correos electrónicos o nombres de usuario <span className="font-bold">no se almacenan en nuestra base de datos</span>.
          </p>
  
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            De esta forma, garantizamos que cada respuesta sea <span className="italic">anónima</span> y utilizada únicamente con fines <span className="underline">estadísticos</span>, sin comprometer tu identidad.
          </p>
  
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md">
            <p className="text-sm sm:text-base text-gray-600">
              Recuerda: tu participación es valiosa y segura.  
              Nuestro compromiso es ofrecerte un espacio confiable para expresar tu opinión.
            </p>
          </div>
 
        </div>
      </div>
    )
  }
  
  export default Privacidad
  