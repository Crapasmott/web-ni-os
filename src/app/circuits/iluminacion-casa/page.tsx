'use client';

import { useState } from 'react';
import { ArrowLeft, Home, Lightbulb, Zap } from 'lucide-react';
import Link from 'next/link';

export default function IluminacionCasaPage() {
  const SIMULATOR_ID = 1;
  const [isConnected, setIsConnected] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [score, setScore] = useState(0);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleToggleLights = () => {
    if (isConnected) {
      setLightsOn(!lightsOn);
      if (!lightsOn) setScore(100);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-4" data-simulator-id={SIMULATOR_ID}>
      <div className="max-w-4xl mx-auto">
        {/* RUTA CORREGIDA AQUÍ */}
        <Link href="/circuits" className="flex items-center gap-2 text-green-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Volver a Circuitos
        </Link>

        <div className="text-center mb-8">
          <div className="bg-green-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Iluminación de Casa</h1>
          <p className="text-gray-600">Circuito #{SIMULATOR_ID} - Conecta la electricidad a una casa del Huila</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Simulación Visual */}
          <div className="relative w-full h-64 bg-gray-100 rounded-xl mb-8 flex items-center justify-center">
            {/* ElectroHuila */}
            <div className="absolute left-8 top-8">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs mt-2">ElectroHuila</p>
            </div>

            {/* Casa */}
            <div className="absolute right-8 top-8">
              <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${lightsOn ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                <Home className="w-8 h-8" />
                <Lightbulb className={`w-4 h-4 absolute top-2 left-2 ${lightsOn ? 'text-yellow-500' : 'text-gray-500'}`} />
              </div>
              <p className="text-xs mt-2">Casa</p>
            </div>

            {/* Línea de conexión */}
            {isConnected && (
              <div className="absolute top-14 left-20 right-24 h-1 bg-green-500"></div>
            )}
          </div>

          {/* Controles */}
          <div className="space-y-4">
            <button
              onClick={handleConnect}
              disabled={isConnected}
              className={`w-full py-3 rounded-xl font-semibold ${isConnected ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {isConnected ? 'Circuito Conectado ✓' : 'Conectar Circuito'}
            </button>

            <button
              onClick={handleToggleLights}
              disabled={!isConnected}
              className={`w-full py-3 rounded-xl font-semibold ${!isConnected ? 'bg-gray-300 text-gray-500' : lightsOn ? 'bg-yellow-500 text-white' : 'bg-orange-500 text-white'}`}
            >
              {lightsOn ? 'Apagar Luces' : 'Encender Luces'}
            </button>
          </div>

          {score > 0 && (
            <div className="mt-6 bg-green-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-green-800">¡Completado! +{score} puntos</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}