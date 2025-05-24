'use client';
import { useState } from 'react';
import { Beaker, Zap, Droplets, Flame, Sparkles, Play, RotateCcw } from 'lucide-react';

const experiments = [
  {
    id: 1,
    title: "Volcán de Bicarbonato",
    icon: <Flame className="w-8 h-8" />,
    difficulty: "Fácil",
    time: "15 min",
    materials: ["Bicarbonato", "Vinagre", "Colorante rojo", "Botella pequeña"],
    steps: [
      "Pon 2 cucharadas de bicarbonato en la botella",
      "Añade 3-4 gotas de colorante rojo",
      "Vierte el vinagre lentamente y ¡retrocede!",
      "¡Observa la erupción volcánica!"
    ],
    science: "La reacción entre el ácido (vinagre) y la base (bicarbonato) produce gas CO₂ que crea presión.",
    color: "from-red-400 to-orange-500"
  },
  {
    id: 2,
    title: "Slime Mágico",
    icon: <Sparkles className="w-8 h-8" />,
    difficulty: "Fácil",
    time: "10 min",
    materials: ["Cola escolar", "Activador de slime", "Purpurina", "Colorante"],
    steps: [
      "Vierte la cola en un bowl",
      "Añade el colorante y mezcla",
      "Agrega purpurina brillante",
      "¡Amasa tu slime mágico!"
    ],
    science: "Los polímeros de la cola se entrelazan creando una sustancia viscosa.",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    title: "Lámpara de Lava",
    icon: <Droplets className="w-8 h-8" />,
    difficulty: "Medio",
    time: "20 min",
    materials: ["Aceite vegetal", "Agua", "Colorante", "Pastilla efervescente"],
    steps: [
      "Llena 1/4 del frasco con agua",
      "Añade colorante al agua",
      "Completa con aceite vegetal",
      "¡Echa la pastilla y observa!"
    ],
    science: "El aceite y agua no se mezclan. Las burbujas de gas crean el movimiento.",
    color: "from-blue-400 to-cyan-500"
  }
];

export default function ExperimentsSection() {
  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showScience, setShowScience] = useState(false);

  const resetExperiment = () => {
    setCurrentStep(0);
    setShowScience(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
            <Beaker className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Experimentos Científicos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Conviértete en un científico loco! Descubre la magia de la ciencia
          </p>
        </div>

        {!selectedExperiment ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                onClick={() => setSelectedExperiment(experiment.id)}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-purple-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${experiment.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                    {experiment.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{experiment.title}</h3>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      experiment.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {experiment.difficulty}
                    </span>
                    <span className="text-gray-500 font-medium">{experiment.time}</span>
                  </div>
                  
                  <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    ¡Experimentar!
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          (() => {
            const experiment = experiments.find(e => e.id === selectedExperiment)!;
            return (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-200">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${experiment.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        {experiment.icon}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800">{experiment.title}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedExperiment(null)}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-gray-700 transition-colors"
                    >
                      ← Volver
                    </button>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">🧪 Materiales:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {experiment.materials.map((material, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-100">
                          <span className="font-semibold text-gray-700">{material}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">🔬 Pasos:</h4>
                    <div className="space-y-4">
                      {experiment.steps.map((step, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                            idx <= currentStep 
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' 
                              : 'bg-gray-50 border-2 border-gray-200'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            idx < currentStep ? 'bg-green-500' : idx === currentStep ? 'bg-blue-500 animate-pulse' : 'bg-gray-400'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="font-semibold text-gray-700 flex-1">{step}</span>
                          {idx === currentStep && currentStep < experiment.steps.length - 1 && (
                            <button
                              onClick={() => setCurrentStep(currentStep + 1)}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                            >
                              ¡Listo!
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentStep === experiment.steps.length - 1 && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                      <button
                        onClick={() => setShowScience(!showScience)}
                        className="flex items-center gap-3 w-full text-left mb-4"
                      >
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        <h4 className="text-xl font-bold text-purple-800">🧬 ¿Por qué funciona?</h4>
                      </button>
                      {showScience && (
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {experiment.science}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })()
        )}
      </div>
    </section>
  );
}