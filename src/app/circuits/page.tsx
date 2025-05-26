'use client';

import Link from 'next/link';
import { ArrowLeft, Home, Network, Battery, Lightbulb, Factory, Brain } from 'lucide-react';

export default function CircuitsPage() {
  const simuladores = [
    {
      id: 1,
      title: "Iluminación de Casa",
      description: "Conecta la electricidad de ElectroHuila a una casa del Huila",
      difficulty: "Fácil",
      time: "10 min",
      points: 100,
      icon: <Home className="w-8 h-8 text-white" />,
      bgColor: "bg-green-500",
      href: "/circuits/iluminacion-casa", // RUTA CORREGIDA
      objective: "Hacer que se encienda la luz de la casa"
    },
    {
      id: 2,
      title: "Red de Distribución",
      description: "Diseña la red eléctrica para un barrio completo",
      difficulty: "Medio",
      time: "20 min",
      points: 250,
      icon: <Network className="w-8 h-8 text-white" />,
      bgColor: "bg-blue-500",
      href: "/circuits/red-distribucion", // RUTA CORREGIDA
      objective: "Suministrar electricidad a 5 casas simultáneamente"
    },
    {
      id: 3,
      title: "Sistema de Respaldo",
      description: "Crea un sistema con energía solar de respaldo",
      difficulty: "Medio",
      time: "25 min",
      points: 350,
      icon: <Battery className="w-8 h-8 text-white" />,
      bgColor: "bg-orange-500",
      href: "/circuits/sistema-respaldo", // RUTA CORREGIDA
      objective: "Mantener electricidad cuando falle la red principal"
    },
    {
      id: 4,
      title: "Alumbrado Público",
      description: "Ilumina las calles de un municipio del Huila",
      difficulty: "Avanzado",
      time: "30 min",
      points: 500,
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      bgColor: "bg-purple-500",
      href: "/circuits/alumbrado-publico", // RUTA CORREGIDA
      objective: "Encender automáticamente las luces al anochecer"
    },
    {
      id: 5,
      title: "Planta Industrial",
      description: "Suministra energía a una empresa del Huila",
      difficulty: "Avanzado",
      time: "40 min",
      points: 750,
      icon: <Factory className="w-8 h-8 text-white" />,
      bgColor: "bg-red-500",
      href: "/circuits/planta-industrial", // RUTA CORREGIDA
      objective: "Alimentar maquinaria industrial de forma segura"
    },
    {
      id: 6,
      title: "Microred Inteligente",
      description: "Red eléctrica del futuro con energías renovables",
      difficulty: "Experto",
      time: "50 min",
      points: 1000,
      icon: <Brain className="w-8 h-8 text-white" />,
      bgColor: "bg-emerald-500",
      href: "/circuits/microred-inteligente", // RUTA CORREGIDA
      objective: "Autogestionar energía renovable para toda una comunidad"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Medio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-orange-100 text-orange-800';
      case 'Experto': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver al Inicio</span>
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simulador de Circuitos ElectroHuila
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende sobre sistemas eléctricos del Huila a través de simulaciones interactivas
          </p>
        </div>

        {/* Circuits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {simuladores.map((simulador) => (
            <Link
              key={simulador.id}
              href={simulador.href}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
            >
              <div className="p-6">
                {/* Header with icon and points */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl ${simulador.bgColor} flex items-center justify-center`}>
                    {simulador.icon}
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                    {simulador.points} pts
                  </div>
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {simulador.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {simulador.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(simulador.difficulty)}`}>
                    {simulador.difficulty}
                  </span>
                  <span>⏱️ {simulador.time}</span>
                </div>

                {/* Objective */}
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    🎯 <strong>Objetivo:</strong> {simulador.objective}
                  </p>
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 px-4 ${simulador.bgColor} text-white rounded-xl font-semibold transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2`}>
                  ⚙️ ¡Construir!
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
