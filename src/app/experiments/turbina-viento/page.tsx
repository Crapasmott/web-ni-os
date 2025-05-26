'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Wind, CheckCircle, Play, Pause, RotateCcw, Lightbulb, AlertTriangle, Timer, Star } from 'lucide-react';

export default function TurbinaVientoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const steps = [
    {
      title: "Preparar los materiales",
      description: "Reúne todo lo necesario para tu turbina eólica",
      materials: ["Motor pequeño DC", "Aspas (cartón o plástico)", "Base estable", "Cables con pinzas", "LED", "Ventilador o secador", "Pegamento fuerte", "Varilla o palito"],
      instruction: "Verifica que el motor funcione correctamente y que las aspas sean ligeras pero resistentes",
      image: "💨",
      safety: "Asegúrate de tener supervisión adulta para usar el ventilador"
    },
    {
      title: "Diseñar las aspas",
      description: "Crear aspas aerodinámicas eficientes",
      instruction: "Corta 3-4 aspas de cartón en forma alargada y ligeramente curvada. Deben ser simétricas para un balance perfecto",
      image: "✂️",
      safety: "Ten cuidado al usar tijeras y asegúrate de que las aspas tengan el mismo tamaño"
    },
    {
      title: "Montar las aspas",
      description: "Fijar las aspas al eje del motor",
      instruction: "Pega las aspas al eje del motor de manera equilibrada, con el mismo ángulo entre cada una. Usa pegamento fuerte y deja secar",
      image: "🔧",
      safety: "Verifica que las aspas estén bien balanceadas para evitar vibraciones"
    },
    {
      title: "Crear la base",
      description: "Construir un soporte estable",
      instruction: "Monta el motor en una base que permita que las aspas giren libremente. La turbina debe estar estable pero poder orientarse al viento",
      image: "🏗️",
      safety: "Asegúrate de que la base sea lo suficientemente pesada para no volcarse"
    },
    {
      title: "Conectar el circuito",
      description: "Preparar las conexiones eléctricas",
      instruction: "Conecta cables a los terminales del motor y luego conecta un LED a los extremos libres de los cables",
      image: "🔌",
      safety: "Marca cuál cable es positivo y cuál es negativo para evitar confusiones"
    },
    {
      title: "Probar con viento artificial",
      description: "Generar viento para probar la turbina",
      instruction: "Usa un ventilador o secador de pelo (en frío) para generar viento hacia las aspas. Observa cómo giran y generan electricidad",
      image: "🌪️",
      safety: "Mantén distancia segura del ventilador y no toques las aspas en movimiento"
    },
    {
      title: "Optimizar el diseño",
      description: "Mejorar la eficiencia de la turbina",
      instruction: "Ajusta el ángulo de las aspas, la dirección del viento y observa cuándo el LED brilla más intensamente",
      image: "⚡",
      safety: "Haz ajustes con el ventilador apagado para mayor seguridad"
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Turbina Eólica Completada!</h1>
            <p className="text-xl text-gray-600 mb-6">
              ¡Impresionante! Has construido tu propia turbina eólica funcional. 
              Ahora comprendes cómo el viento puede generar electricidad limpia para el futuro energético del Huila.
            </p>
            
            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🧠 ¿Qué aprendiste?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• El viento puede convertirse en electricidad</li>
                <li>• El diseño de las aspas afecta la eficiencia</li>
                <li>• La velocidad del viento determina la energía generada</li>
                <li>• La energía eólica es limpia y renovable</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🌪️ Potencial Eólico del Huila</h3>
              <p className="text-gray-700">
                El Huila tiene zonas con vientos constantes de más de 6 m/s, perfectas para parques eólicos. 
                ¡Tu experimento muestra el potencial de esta energía renovable!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExperiment}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Repetir Experimento
              </button>
              <button
                onClick={goHome}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
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
                <Wind className="w-6 h-6 text-green-500" />
                Turbina de Viento
              </h1>
              <div className="text-sm text-gray-500">
                Paso {currentStep + 1} de {steps.length}
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Tips
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300" 
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
              <div className="bg-green-50 rounded-2xl p-6 mb-6">
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
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
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
                  <Lightbulb className="w-5 h-5 text-green-500" />
                  Tips Útiles
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>🌪️ Más viento = más electricidad generada</p>
                  <p>⚖️ Aspas balanceadas evitan vibraciones</p>
                  <p>📐 El ángulo de las aspas es crucial</p>
                  <p>🎯 Orienta la turbina hacia el viento</p>
                </div>
              </div>
            )}

            {/* Información Científica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 ¿Cómo funciona?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Las <strong>turbinas eólicas</strong> capturan la energía cinética del viento mediante aspas aerodinámicas. 
                  El viento hace girar las aspas, que a su vez hacen girar un generador que produce electricidad.
                </p>
                <p>
                  El Huila tiene un gran <strong>potencial eólico</strong> en zonas montañosas donde los vientos son 
                  constantes y fuertes, perfectos para generar energía limpia y renovable.
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">🌪️ Dato eólico:</h4>
                  <p>¡Una turbina eólica moderna puede generar hasta 3 MW de electricidad!</p>
                </div>
              </div>
            </div>

            {/* Datos del Experimento */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Info del Experimento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">Avanzado</div>
                  <div className="text-sm text-red-700">Dificultad</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">60 min</div>
                  <div className="text-sm text-blue-700">Duración</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">Variable</div>
                  <div className="text-sm text-purple-700">Potencia</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">🌱</div>
                  <div className="text-sm text-green-700">Renovable</div>
                </div>
              </div>
            </div>

            {/* Ventajas de la Energía Eólica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🌪️ Ventajas Eólicas</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">♻️</span>
                  </div>
                  <span>100% energía renovable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🌍</span>
                  </div>
                  <span>Cero emisiones de CO₂</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">💨</span>
                  </div>
                  <span>Recurso inagotable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">🏔️</span>
                  </div>
                  <span>Aprovecha geografía del Huila</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
            