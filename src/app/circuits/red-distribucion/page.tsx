'use client';

import { useState } from 'react';
import { ArrowLeft, Network, Home } from 'lucide-react';
import Link from 'next/link';

export default function RedDistribucionPage() {
  const [houses, setHouses] = useState([
    { id: 1, name: 'Casa A', connected: false },
    { id: 2, name: 'Casa B', connected: false },
    { id: 3, name: 'Casa C', connected: false },
    { id: 4, name: 'Casa D', connected: false },
    { id: 5, name: 'Casa E', connected: false }
  ]);
  const [score, setScore] = useState(0);

  const toggleHouse = (id: number) => {
    setHouses(prev => {
      const updated = prev.map(h => h.id === id ? { ...h, connected: !h.connected } : h);
      const connectedCount = updated.filter(h => h.connected).length;
      setScore(connectedCount === 5 ? 250 : connectedCount * 50);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/circuits" className="flex items-center gap-2 text-blue-700 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Volver a Simuladores
        </Link>

        <div className="text-center mb-8">
          <div className="bg-blue-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Red de Distribución</h1>
          <p className="text-gray-600">Conecta 5 casas a la red eléctrica</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-5 gap-4 mb-8">
            {houses.map((house) => (
              <button
                key={house.id}
                onClick={() => toggleHouse(house.id)}
                className={`p-4 rounded-xl transition-all ${house.connected ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-100 border-2 border-gray-300'}`}
              >
                <Home className={`w-8 h-8 mx-auto mb-2 ${house.connected ? 'text-green-600' : 'text-gray-500'}`} />
                <p className="text-sm font-medium">{house.name}</p>
                <p className="text-xs">{house.connected ? 'Conectada' : 'Desconectada'}</p>
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold mb-4">
              Casas conectadas: {houses.filter(h => h.connected).length}/5
            </p>
            {score === 250 && (
              <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-bold text-blue-800">¡Red Completada! +250 puntos</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}