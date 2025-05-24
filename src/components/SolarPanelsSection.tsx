'use client';
import { useState } from 'react';
import { Sun, Zap, Home } from 'lucide-react';

export default function SolarPanelsSection() {
  const [panels, setPanels] = useState(0);
  const [energy, setEnergy] = useState(0);

  const addPanel = () => {
    setPanels(prev => prev + 1);
    setEnergy(prev => prev + 50);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full mb-6 shadow-lg">
            <Sun className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Granja Solar Inteligente
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Aprende sobre energía renovable! Diseña tu propia granja solar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Controles</h3>
              
              <button
                onClick={addPanel}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl mb-4"
              >
                Agregar Panel Solar
              </button>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-xl border-2 border-yellow-200">
                  <div className="text-sm text-gray-600">Paneles Instalados</div>
                  <div className="text-xl font-bold text-orange-600">{panels}</div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border-2 border-green-200">
                  <div className="text-sm text-gray-600">Energía Generada</div>
                  <div className="text-xl font-bold text-green-600">{energy} W</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Granja Solar</h3>
              
              <div className="bg-gradient-to-b from-blue-200 to-green-200 rounded-2xl h-96 p-4 relative">
                <div className="absolute top-4 right-4">
                  <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />
                </div>
                
                <div className="grid grid-cols-6 gap-4 p-8">
                  {Array.from({ length: panels }).map((_, i) => (
                    <div key={i} className="bg-blue-800 w-12 h-8 rounded shadow-lg animate-pulse">
                      <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                        <Zap className="w-3 h-3 text-yellow-300" />
                      </div>
                    </div>
                  ))}
                </div>
                
                {panels === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-semibold">Agrega paneles solares para generar energía</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <h4 className="font-bold text-green-800 mb-2">🌱 Energía Limpia</h4>
                  <p className="text-sm text-green-700">
                    Los paneles solares convierten la luz del sol en electricidad sin contaminar
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2">☀️ Renovable</h4>
                  <p className="text-sm text-yellow-700">
                    El sol es una fuente inagotable de energía que podemos usar todos los días
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}