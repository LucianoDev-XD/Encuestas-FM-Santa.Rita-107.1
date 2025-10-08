import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Encuesta from './pages/encuesta/Encuesta.jsx'
import Sobre_nosotros from './pages/sobre_nosotros/Sobre_nosotros.jsx'
import Contacto from './pages/contacto/Contacto.jsx'
import Privacidad from './pages/aviso_privacidad/Aviso_privacidad.jsx'
import AdminGate from "./pages/admingate/AdminGate.jsx"
import YaVotaste from "./pages/ya_votaste/YaVotaste.jsx"
import TestAuth from "./pages/TestAuth.jsx"




function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encuesta" element={<Encuesta />} />
          <Route path="/sobre_nosotros" element={<Sobre_nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/ya-votaste" element={<YaVotaste />} />
          <Route path="/resultados" element={<AdminGate />} />
          <Route path="/test-auth" element={<TestAuth />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
