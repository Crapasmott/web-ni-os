'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Lightbulb, CheckCircle, Play, Pause, RotateCcw, AlertTriangle, Timer, Star, Zap } from 'lucide-react';

export default function ConductorAislantePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const steps = [
    {
      title: "Preparar los materiales",
      description: "Reúne todo lo necesario para el experimento",
      materials: ["Pila de 1.5V", "LED", "2 cables con pinzas", "Base de pruebas", "Objetos variados: monedas, plástico, madera, metal, papel, goma, vidrio, etc."],
      instruction: "Reúne objetos de diferentes materiales para probar cuáles conducen electricidad y cuáles no",
      image: "🔬",
      safety: "Usa solo pilas de baja tensión y nunca pruebes con electricidad de casa"
    },
    {
      title: "Construir el circuito base",
      description: "Crear el circuito de prueba",
      instruction: "Conecta un cable desde el polo positivo de la pila hasta una pinza libre. Conecta otro cable desde el polo negativo hasta un extremo del LED",
      image: "🔌",
      safety: "Asegúrate de que las conexiones estén firmes pero no fuerces las pinzas"
    },
    {
      title: "Preparar el LED indicador",
      description: "Completar el circuito de prueba",
      instruction: "Conecta el otro extremo del LED a otra pinza libre. Ahora tienes dos pinzas libres que usarás para probar materiales",
      image: "💡",
      safety: "Si el LED no funciona, verifica la polaridad (lado positivo y negativo)"
    },
    {
      title: "Probar materiales conductores",
      description: "Identificar materiales que conducen electricidad",
      instruction: "Toca ambas pinzas con una moneda, un clip metálico, o papel aluminio. Si el LED se enciende, el material es conductor",
      image: "🪙",
      safety: "Nunca pruebes con materiales húmedos o desconocidos"
    },
    {
      title: "Probar materiales aislantes",
      description: "Identificar materiales que no conducen electricidad",
      instruction: "Prueba con plástico, madera, goma, papel seco, vidrio. Si el LED no se enciende, el material es aislante",
      image: "🧱",
      safety: "Mantén los materiales secos durante las pruebas"
    },
    {
      title: "Crear tabla de resultados",
      description: "Clasificar los materiales probados",
      instruction: "Anota en una tabla cuáles materiales encendieron el LED (conductores) y cuáles no (aislantes)",
      image: "📊",
      safety: "Organiza tus resultados para entender mejor las propiedades de cada material"
    },
    {
      title: "Entender la importancia",
      description: "Aplicar el conocimiento a la vida real",
      instruction: "Reflexiona sobre por qué los cables eléctricos tienen metal por dentro y plástico por fuera. ¡Ahora entiendes la seguridad eléctrica!",
      image: "🎓",
      safety: "Este conocimiento te ayudará a estar más seguro con la electricidad"
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Experimento Completado!</h1>
            <p className="text-xl text-gray-600 mb-6">
              ¡Excelente trabajo! Ahora sabes la diferencia entre conductores y aislantes. 
              Este conocimiento es fundamental para la seguridad eléctrica que ElectroHuila promueve.
            </p>
            
            <div className="bg-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🧠 ¿Qué aprendiste?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Los metales generalmente conducen electricidad</li>
                <li>• Los plásticos y gomas son buenos aislantes</li>
                <li>• Los aislantes nos protegen de la electricidad</li>
                <li>• La seguridad eléctrica depende de usar ambos correctamente</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">⚡ Seguridad ElectroHuila</h3>
              <p className="text-gray-700">
                ElectroHuila usa aislantes en todos sus cables y equipos para proteger a los huilenses. 
                ¡Nunca toques cables eléctricos pelados o dañados!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExperiment}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
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
                <Lightbulb className="w-6 h-6 text-pink-500" />
                Conductor vs Aislante
              </h1>
              <div className="text-sm text-gray-500">
                Paso {currentStep + 1} de {steps.length}
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 bg-pink-100 text-pink-700 px-3 py-2 rounded-lg hover:bg-pink-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Tips
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300" 
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
              <div className="bg-pink-50 rounded-2xl p-6 mb-6">
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
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
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
                  <Lightbulb className="w-5 h-5 text-pink-500" />
                  Tips Útiles
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>💡 Si el LED no enciende, el material es aislante</p>
                  <p>⚡ Si el LED enciende, el material es conductor</p>
                  <p>🧪 Prueba con muchos materiales diferentes</p>
                  <p>📝 Anota todos tus resultados para recordar</p>
                </div>
              </div>
            )}

            {/* Información Científica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 ¿Cómo funciona?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Los <strong>conductores</strong> permiten que los electrones se muevan libremente, 
                  completando el circuito y encendiendo el LED. Los <strong>aislantes</strong> 
                  bloquean el paso de los electrones, manteniendo el circuito abierto.
                </p>
                <p>
                  ElectroHuila usa esta propiedad para <strong>proteger a las personas</strong>: 
                  cables de cobre (conductor) cubiertos con plástico (aislante) para llevar 
                  electricidad de forma segura.
                </p>
                <div className="bg-pink-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">🛡️ Dato de seguridad:</h4>
                  <p>¡Los aislantes pueden soportar miles de voltios sin conducir electricidad!</p>
                </div>
              </div>
            </div>

            {/* Tabla de Materiales Comunes */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Materiales Comunes</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-green-800 mb-2">✅ Conductores</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Cobre</li>
                    <li>• Aluminio</li>
                    <li>• Hierro</li>
                    <li>• Plata</li>
                    <li>• Agua salada</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <h4 className="font-bold text-red-800 mb-2">❌ Aislantes</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• Plástico</li>
                    <li>• Goma</li>
                    <li>• Vidrio</li>
                    <li>• Madera seca</li>
                    <li>• Aire</li>
                  </ul>
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
                  <div className="text-2xl font-bold text-blue-600">25 min</div>
                  <div className="text-sm text-blue-700">Duración</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1.5V</div>
                  <div className="text-sm text-purple-700">Voltaje</div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">🛡️</div>
                  <div className="text-sm text-yellow-700">Seguridad</div>
                </div>
              </div>
            </div>

            {/* Seguridad Eléctrica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🛡️ Seguridad Eléctrica</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600">⚠️</span>
                  </div>
                  <span>Nunca toques cables pelados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🧤</span>
                  </div>
                  <span>Usa guantes aislantes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">🔌</span>
                  </div>
                  <span>Respeta los aislantes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600">📞</span>
                  </div>
                  <span>Llama a ElectroHuila si hay problemas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}