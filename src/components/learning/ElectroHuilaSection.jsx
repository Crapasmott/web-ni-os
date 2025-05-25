// 📁 src/components/learning/ElectroHuilaSection.jsx
'use client';
import { ArrowLeft, Home, Calendar, Users, MapPin, Zap, Power, Settings, Sun, ExternalLink } from 'lucide-react';

const ElectroHuilaSection = ({ backToLearning }) => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 py-20 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Botón de regreso */}
      <div className="flex items-center mb-8">
        <button 
          onClick={backToLearning}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Aprendizaje
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 shadow-lg">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">ElectroHuila</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conoce nuestra empresa y cómo servimos con orgullo a todo el departamento del Huila
        </p>
      </div>

      {/* Historia */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 mb-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-center">📚 Nuestra Historia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">1998</h3>
              <p>ElectroHuila nace para llevar progreso a todo el Huila</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">500K+</h3>
              <p>Usuarios conectados en todo el departamento</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">87</h3>
              <p>Municipios atendidos con calidad y compromiso</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl mb-4">
              "Desde 1998, somos el motor eléctrico que impulsa el desarrollo del Huila"
            </p>
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-6 py-3">
              <Zap className="w-6 h-6" />
              <span className="font-bold">25+ años llevando energía y progreso</span>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios y Cobertura */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <Zap className="text-blue-500" />
            Nuestros Servicios
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <Power className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-800">Distribución Eléctrica</h3>
                <p className="text-gray-600 text-sm">Llevamos energía confiable a tu hogar las 24 horas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
              <Settings className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-gray-800">Mantenimiento</h3>
                <p className="text-gray-600 text-sm">Cuidamos la infraestructura eléctrica del Huila</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
              <Sun className="w-8 h-8 text-yellow-600" />
              <div>
                <h3 className="font-bold text-gray-800">Energías Renovables</h3>
                <p className="text-gray-600 text-sm">Apostamos por un futuro sostenible</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
              <Users className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-bold text-gray-800">Atención al Cliente</h3>
                <p className="text-gray-600 text-sm">Servicio personalizado para cada usuario</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cobertura */}
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">🗺️ Cobertura en el Huila</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">🏙️ Zona Centro</h4>
              <p className="text-gray-600 text-sm">Neiva, Palermo, Campoalegre, Rivera</p>
              <div className="text-blue-600 font-semibold text-sm">• 180,000 usuarios</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">🏔️ Zona Sur</h4>
              <p className="text-gray-600 text-sm">Pitalito, San Agustín, Isnos</p>
              <div className="text-green-600 font-semibold text-sm">• 120,000 usuarios</div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">🌾 Zona Norte</h4>
              <p className="text-gray-600 text-sm">La Plata, Paicol, Tesalia</p>
              <div className="text-yellow-600 font-semibold text-sm">• 85,000 usuarios</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">🏞️ Zona Oriental</h4>
              <p className="text-gray-600 text-sm">Garzón, Gigante, Hobo</p>
              <div className="text-purple-600 font-semibold text-sm">• 115,000 usuarios</div>
            </div>
          </div>
        </div>
      </div>

      {/* Misión */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">🎯 Nuestra Misión</h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Suministrar energía eléctrica con calidad, confiabilidad y sostenibilidad, 
            contribuyendo al desarrollo económico y social del Huila, con un equipo humano competente 
            y comprometido con la excelencia en el servicio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-20 rounded-2xl p-6">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold mb-2">Calidad</h3>
              <p className="text-sm">Energía confiable 24/7</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-2xl p-6">
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="font-bold mb-2">Sostenibilidad</h3>
              <p className="text-sm">Cuidamos el medio ambiente</p>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-2xl p-6">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-bold mb-2">Compromiso</h3>
              <p className="text-sm">Con el desarrollo del Huila</p>
            </div>
          </div>
          
          <a 
            href="https://electrohuila.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
          >
            <ExternalLink className="w-6 h-6" />
            Visitar ElectroHuila.com
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default ElectroHuilaSection;