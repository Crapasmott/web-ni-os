'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function AlumbradoPublicoPage() {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  const [autoMode, setAutoMode] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (autoMode) {
      const interval = setInterval(() => {
        setTimeOfDay(prev => prev === 'day' ? 'night' : 'day');
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoMode]);

  useEffect(() => {
    if (autoMode && timeOfDay === 'night') {
      setLightsOn(true);
      setScore(500);
    } else if (autoMode && timeOfDay === 'day') {
      setLightsOn(false);
    }
  }, [timeOfDay, autoMode]);

  return (
    <div className="min-h-screen bg-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/simuladores" className="flex items-center gap-2 text-purple-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Volver a Simuladores
        </Link>

        <div className="text-center mb-8">
          <div className="bg-purple-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Alumbrado Público</h1>
          <p className="text-gray-600">Sistema automático de luces municipales</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className={`w-full h-32 rounded-xl mb-8 flex items-center justify-center transition-all ${timeOfDay === 'night' ? 'bg-gray-800' : 'bg-blue-200'}`}>
            <div className="flex gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="text-center">
                  <div className={`w-8 h-8 rounded-full mb-2 ${lightsOn ? 'bg-yellow-400' : 'bg-gray-400'}`}>
                    <Lightbulb className={`w-4 h-4 m-2 ${lightsOn ? 'text-yellow-800' : 'text-gray-600'}`} />
                  </div>
                  <div className="w-1 h-8 bg-gray-600 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-lg font-semibold mb-2">
              {timeOfDay === 'day' ? '🌞 Día' : '🌙 Noche'}
            </p>
            <p className="text-sm text-gray-600">
              Luces: {lightsOn ? 'Encendidas' : 'Apagadas'}
            </p>
          </div>

          <button
            onClick={() => setAutoMode(!autoMode)}
            className={`w-full py-3 rounded-xl font-semibold ${autoMode ? 'bg-purple-500 text-white' : 'bg-gray-600 text-white'}`}
          >
            {autoMode ? 'Modo Automático Activo 🤖' : 'Activar Modo Automático'}
          </button>

          {score > 0 && (
            <div className="mt-6 bg-purple-100 p-4 rounded-xl text-center">
              <h3 className="font-bold text-purple-800">¡Sistema Automático Funcionando! +{score} puntos</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
