'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Zap, CheckCircle, Play, Pause, RotateCcw, Lightbulb, AlertTriangle, Timer, Star, Magnet } from 'lucide-react';

export default function ElectroimanPotentePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const steps = [
    {
      title: "Preparar los materiales",
      description: "Reúne todo lo necesario para tu electroimán",
      materials: ["Clavo grande de hierro", "Cable de cobre aislado (1-2 metros)", "Pila de 1.5V o 9V", "Clips metálicos", "Tornillos pequeños", "Cinta aislante"],
      instruction: "Asegúrate de que el clavo sea de hierro (magnético) y que el cable tenga buen aislamiento para evitar cortocircuitos",
      image: "🧲",
      safety: "Verifica que la pila esté en buen estado y no presente fugas"
    },
    {
      title: "Envolver el clavo",
      description: "Crear las bobinas del electroimán",
      instruction: "Enrolla el cable de cobre alrededor del clavo, dando muchas vueltas en la misma dirección. Deja unos 10 cm de cable libre en cada extremo",
      image: "🌀",
      safety: "Enrolla el cable firmemente pero sin dañar el aislamiento"
    },
    {
      title: "Asegurar las bobinas",
      description: "Fijar el cable enrollado",
      instruction: "Usa cinta aislante para fijar el cable y evitar que se desenrolle. Asegúrate de que las conexiones queden accesibles",
      image: "🔧",
      safety: "No cubras completamente los extremos del cable con cinta"
    },
    {
      title: "Conectar la pila",
      description: "Activar el electroimán",
      instruction: "Conecta un extremo del cable al polo positivo de la pila y el otro al polo negativo. El clavo se convertirá en un imán",
      image: "🔋",
      safety: "Conecta solo por períodos cortos para evitar que la pila se agote rápidamente"
    },
    {
      title: "Probar el magnetismo",
      description: "Verificar la fuerza magnética",
      instruction: "Acerca clips metálicos y tornillos al electroimán. Deberían ser atraídos hacia el clavo mientras esté conectado",
      image: "📎",
      safety: "No dejes conectado el electroimán por mucho tiempo seguido"
    },
    {
      title: "Experimentar con la potencia",
      description: "Variar la fuerza del electroimán",
      instruction: "Prueba desconectar y conectar la pila. Observa cómo los objetos se pegan y se sueltan. Cuenta cuántos clips puedes levantar",
      image: "⚡",
      safety: "Si el cable se calienta, desconecta inmediatamente la pila"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetExperiment = () => {
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const goHome = () => {
    router.push('/');
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Electroimán Completado!</h1>
            <p className="text-xl text-gray-600 mb-6">
              ¡Fantástico! Has creado tu propio electroimán funcional. 
              Ahora entiendes cómo la electricidad puede crear campos magnéticos, tecnología clave en muchos equipos eléctricos.
            </p>
            
            <div className="bg-purple-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🧠 ¿Qué aprendiste?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• La electricidad puede crear magnetismo</li>
                <li>• Los electroimanes se pueden encender y apagar</li>
                <li>• Más vueltas de cable = más fuerza magnética</li>
                <li>• Los electroimanes son reversibles</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">⚡ Aplicaciones Reales</h3>
              <p className="text-gray-700">
                Los electroimanes se usan en motores eléctricos, transformadores, altavoces, 
                y muchos equipos que ElectroHuila utiliza para distribuir electricidad en el Huila.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExperiment}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Repetir Experimento
              </button>
              <button
                onClick={goHome}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
              >
                <Home className="w-5 h-5" />
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Magnet className="w-6 h-6 text-purple-500" />
                Electroimán Potente
              </h1>
              <div className="text-sm text-gray-500">
                Paso {currentStep + 1} de {steps.length}
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Tips
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instrucciones */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{steps[currentStep].image}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">📋 Instrucción:</h3>
              <p className="text-gray-700">{steps[currentStep].instruction}</p>
            </div>

            {steps[currentStep].materials && (
              <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-3">🔧 Materiales necesarios:</h3>
                <ul className="space-y-2">
                  {steps[currentStep].materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-red-50 rounded-2xl p-4 mb-6 border-l-4 border-red-400">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-red-800">Seguridad:</h3>
              </div>
              <p className="text-red-700">{steps[currentStep].safety}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600 hover:shadow-lg transform hover:scale-105'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Anterior
              </button>

              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                {currentStep === steps.length - 1 ? <Star className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Panel de Información */}
          <div className="space-y-6">
            {/* Tips */}
            {showTips && (
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-purple-500" />
                  Tips Útiles
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>🔋 Usa pilas nuevas para mejor rendimiento</p>
                  <p>🌀 Más vueltas de cable = más fuerza magnética</p>
                  <p>🔥 Si se calienta, desconecta inmediatamente</p>
                  <p>📎 Prueba con diferentes objetos metálicos</p>
                </div>
              </div>
            )}

            {/* Información Científica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 ¿Cómo funciona?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cuando la <strong>corriente eléctrica</strong> pasa por el cable enrollado, 
                  crea un <strong>campo magnético</strong> alrededor del clavo de hierro. 
                  Esto convierte al clavo en un imán temporal.
                </p>
                <p>
                  Los <strong>electroimanes</strong> son fundamentales en muchos equipos eléctricos 
                  que ElectroHuila usa: transformadores, motores, relés y sistemas de protección.
                </p>
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">⚡ Dato técnico:</h4>
                  <p>¡Los electroimanes industriales pueden levantar hasta 35 toneladas!</p>
                </div>
              </div>
            </div>

            {/* Datos del Experimento */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Info del Experimento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">Fácil</div>
                  <div className="text-sm text-green-700">Dificultad</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">15 min</div>
                  <div className="text-sm text-blue-700">Duración</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1.5V</div>
                  <div className="text-sm text-purple-700">Voltaje</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">🧲</div>
                  <div className="text-sm text-orange-700">Magnético</div>
                </div>
              </div>
            </div>

            {/* Aplicaciones de Electroimanes */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏭 Usos en ElectroHuila</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🔄</span>
                  </div>
                  <span>Transformadores eléctricos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">⚙️</span>
                  </div>
                  <span>Motores de equipos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">🛡️</span>
                  </div>
                  <span>Sistemas de protección</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">📡</span>
                  </div>
                  <span>Equipos de control</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}