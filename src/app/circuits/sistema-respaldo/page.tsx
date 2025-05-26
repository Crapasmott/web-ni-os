'use client';

import { useState } from 'react';
import { ArrowLeft, Battery, Sun } from 'lucide-react';
import Link from 'next/link';

export default function SistemaRespaldoPage() {
  const [solarActive, setSolarActive] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [powerOutage, setPowerOutage] = useState(false);
  const [score, setScore] = useState(0);

  const toggleSolar = () => {
    setSolarActive(!solarActive);
  };

  const simulateOutage = () => {
    setPowerOutage(true);
    if (solarActive && batteryLevel > 50) {
      setScore(350);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/circuits" className="flex items-center gap-2 text-orange-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Volver a Simuladores
        </Link>

        <div className="text-center mb-8">
          <div className="bg-orange-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Battery className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Sistema de Respaldo</h1>
          <p className="text-gray-600">Mantén la energía con paneles solares y baterías</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Panel Solar */}
            <div className="text-center">
              <div className={`w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center ${solarActive ? 'bg-yellow-400' : 'bg-gray-300'}`}>
                <Sun className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold">Paneles Solares</p>
              <p className="text-sm text-gray-600">{solarActive ? 'Activos' : 'Inactivos'}</p>
            </div>

            {/* Baterías */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-400 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <p className="font-semibold">Baterías</p>
              <p className="text-sm text-gray-600">{batteryLevel}%</p>
            </div>

            {/* Red Principal */}
            <div className="text-center">
              <div className={`w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center ${powerOutage ? 'bg-red-500' : 'bg-blue-500'}`}>
                <span className="text-white text-2xl">⚡</span>
              </div>
              <p className="font-semibold">Red Principal</p>
              <p className="text-sm text-gray-600">{powerOutage ? 'Sin energía' : 'Normal'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={toggleSolar}
              className={`w-full py-3 rounded-xl font-semibold ${solarActive ? 'bg-yellow-500 text-white' : 'bg-gray-600 text-white'}`}
            >
              {solarActive ? 'Paneles Activos ☀️' : 'Activar Paneles Solares'}
            </button>

            <button
              onClick={simulateOutage}
              disabled={powerOutage}
              className={`w-full py-3 rounded-xl font-semibold ${powerOutage ? 'bg-gray-300 text-gray-500' : 'bg-red-600 text-white'}`}
            >
              Simular Apagón
            </button>
          </div>

          {score > 0 && (
            <div className="mt-6 bg-orange-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-orange-800">¡Sistema funcionando! +{score} puntos</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
