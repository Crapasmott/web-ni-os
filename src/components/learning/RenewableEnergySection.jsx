'use client';
import React from 'react';
import { Sun, Droplets, Wind, Zap, Target, Gamepad2, ExternalLink, Play } from 'lucide-react';

const RenewableEnergySection = () => {
  const handleNavigateToSolar = () => {
    // Navega a la sección solar del sitio principal
    const solarSection = document.getElementById('solar');
    if (solarSection) {
      solarSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si no existe la sección, abre el simulador de granja solar
      window.open('/granja-solar', '_blank');
    }
  };

  const handleNavigateToSolarSimulator = () => {
    // Abre el simulador de energía solar para hogares
    window.open('/simulador-solar', '_blank');
  };

  const handleViewMoreProjects = () => {
    // Abre la página de proyectos en una nueva pestaña
    window.open('/proyectos', '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Título Principal */}
      <div className="text-center">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">🌱 Energías Renovables</h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre el futuro verde de la energía y cómo las fuentes renovables están transformando el mundo
        </p>
      </div>

      {/* Sección Principal - El Huila: Potencia Verde de Colombia */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h4 className="text-4xl font-bold mb-4">☀️ El Huila: Potencia Verde de Colombia</h4>
            <p className="text-xl max-w-3xl mx-auto">
              Nuestro departamento tiene condiciones únicas para las energías limpias
            </p>
          </div>

          {/* Ventajas del Huila */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm text-center">
              <div className="text-4xl mb-3">☀️</div>
              <h5 className="font-bold text-xl mb-2">Sol Abundante</h5>
              <p className="text-sm mb-2">4.5+ horas de sol intenso diario</p>
              <p className="text-xs opacity-90">Ideal para paneles solares</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm text-center">
              <div className="text-4xl mb-3">💧</div>
              <h5 className="font-bold text-xl mb-2">Ríos Poderosos</h5>
              <p className="text-sm mb-2">Río Magdalena y más de 20 afluentes</p>
              <p className="text-xs opacity-90">Perfectos para hidroeléctricas</p>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm text-center">
              <div className="text-4xl mb-3">💎</div>
              <h5 className="font-bold text-xl mb-2">Vientos Constantes</h5>
              <p className="text-sm mb-2">Zonas con vientos de 6+ m/s</p>
              <p className="text-xs opacity-90">Excelentes para energía eólica</p>
            </div>
          </div>

          {/* Meta ElectroHuila 2030 */}
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm mb-6">
            <div className="text-center mb-4">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <h5 className="font-bold text-2xl">Meta ElectroHuila 2030</h5>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">50%</div>
                <div className="text-sm">Energía Renovable</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">100K</div>
                <div className="text-sm">Hogares con Solar</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">0</div>
                <div className="text-sm">Emisiones Netas</div>
              </div>
            </div>
          </div>

          {/* Botón Simular Granja Solar */}
          <div className="text-center">
            <button 
              onClick={handleNavigateToSolar}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto"
            >
              <Gamepad2 className="w-6 h-6" />
              Simular Granja Solar
            </button>
          </div>
        </div>
      </div>

      {/* Tipos de Energías Renovables */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: 'Energía Solar',
            icon: <Sun className="w-8 h-8" />,
            color: 'from-yellow-500 to-orange-600',
            description: 'Paneles fotovoltaicos que convierten luz solar en electricidad',
            advantages: ['Abundante en el Huila', 'Bajo mantenimiento', 'Larga duración'],
            efficiency: '22%'
          },
          {
            name: 'Energía Hidroeléctrica',
            icon: <Droplets className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-600',
            description: 'Aprovecha la fuerza del agua de ríos y represas',
            advantages: ['Río Magdalena', 'Energía constante', 'Gran capacidad'],
            efficiency: '90%'
          },
          {
            name: 'Energía Eólica',
            icon: <Wind className="w-8 h-8" />,
            color: 'from-green-500 to-teal-600',
            description: 'Turbinas que transforman viento en electricidad',
            advantages: ['Vientos constantes', 'Tecnología limpia', 'Escalable'],
            efficiency: '45%'
          },
          {
            name: 'Biomasa',
            icon: <Zap className="w-8 h-8" />,
            color: 'from-emerald-500 to-green-600',
            description: 'Energía de residuos orgánicos y agrícolas',
            advantages: ['Residuos de café', 'Económica', 'Sostenible'],
            efficiency: '25%'
          }
        ].map((energy, index) => (
          <div
            key={index}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-green-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${energy.color} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                {energy.icon}
              </div>
              
              <h4 className="text-xl font-bold text-gray-800 mb-3">{energy.name}</h4>
              <p className="text-gray-600 text-sm mb-4">{energy.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Eficiencia</span>
                  <span className="text-sm font-bold text-green-600">{energy.efficiency}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${energy.color} h-2 rounded-full transition-all duration-1000`}
                    style={{ width: energy.efficiency }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h5 className="font-semibold text-gray-700 text-sm">Ventajas en el Huila:</h5>
                {energy.advantages.map((advantage, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
        <h4 className="text-2xl font-bold mb-4">🚀 ¡Únete al Futuro Verde!</h4>
        <p className="text-lg mb-6">
          Descubre cómo puedes ser parte de la transición energética del Huila
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleNavigateToSolar}
            className="bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
          >
            <Gamepad2 className="w-5 h-5" />
            Simular Granja Solar
          </button>
          <button 
            onClick={handleNavigateToSolarSimulator}
            className="bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
          >
            <Play className="w-5 h-5" />
            Calculadora Solar
          </button>
          <button 
            onClick={handleViewMoreProjects}
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
          >
            <ExternalLink className="w-5 h-5" />
            Conocer Más Proyectos
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergySection;