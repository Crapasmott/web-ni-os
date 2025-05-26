'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Settings, CheckCircle, Play, Pause, RotateCcw, Lightbulb, AlertTriangle, Timer, Star } from 'lucide-react';

export default function GeneradorManivelaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const steps = [
    {
      title: "Preparar los materiales",
      description: "Reúne todos los componentes para tu generador",
      materials: ["1 motor pequeño DC", "1 manivela o palito", "2 cables con pinzas", "1 LED", "Base de madera o cartón", "Cinta adhesiva"],
      instruction: "Verifica que el motor esté en buen estado y que pueda girar libremente",
      image: "🔧",
      safety: "Maneja el motor con cuidado, evita tocar los contactos"
    },
    {
      title: "Preparar la base",
      description: "Crear una base estable para el generador",
      instruction: "Fija el motor a la base usando cinta adhesiva o tornillos. Debe quedar bien firme para poder girarlo",
      image: "🏗️",
      safety: "Asegúrate de que la base sea estable antes de continuar"
    },
    {
      title: "Instalar la manivela",
      description: "Acoplar el sistema de giro al motor",
      instruction: "Conecta la manivela o palito al eje del motor. Debe quedar bien ajustada para transmitir el movimiento",
      image: "🔄",
      safety: "Gira suavemente para verificar que no haya resistencia excesiva"
    },
    {
      title: "Conectar los cables",
      description: "Preparar las conexiones eléctricas",
      instruction: "Conecta los cables a los terminales del motor usando las pinzas. Estos cables llevarán la electricidad generada",
      image: "🔌",
      safety: "Asegúrate de que las conexiones estén firmes pero no aprietes demasiado"
    },
    {
      title: "Conectar el LED",
      description: "Instalar el indicador de electricidad",
      instruction: "Conecta el LED a los extremos libres de los cables. El LED se encenderá cuando generes electricidad",
      image: "💡",
      safety: "Si el LED no enciende al girar, prueba cambiando la polaridad"
    },
    {
      title: "¡Generar electricidad!",
      description: "Pon en funcionamiento tu generador",
      instruction: "Gira la manivela de forma constante y observa cómo el LED se enciende. ¡Has convertido movimiento en electricidad!",
      image: "⚡",
      safety: "Gira a velocidad moderada para evitar dañar el motor"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Generador Completado!</h1>
            <p className="text-xl text-gray-600 mb-6">
              ¡Increíble! Has construido tu propio generador eléctrico. 
              Ahora entiendes cómo ElectroHuila genera electricidad en sus plantas hidroeléctricas.
            </p>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🧠 ¿Qué aprendiste?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• El movimiento puede convertirse en electricidad</li>
                <li>• Los generadores usan el mismo principio que los motores</li>
                <li>• Las centrales eléctricas funcionan de manera similar</li>
                <li>• La velocidad de giro afecta la cantidad de electricidad</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExperiment}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
              >
                <RotateCcw className="w-5 h-5" />
                Repetir Experimento
              </button>
              <button
                onClick={goHome}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
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
                <Settings className="w-6 h-6 text-blue-500" />
                Generador de Manivela
              </h1>
              <div className="text-sm text-gray-500">
                Paso {currentStep + 1} de {steps.length}
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Tips
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300" 
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
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
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
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
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
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  Tips Útiles
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>⚡ Gira más rápido para generar más electricidad</p>
                  <p>🔧 Si no hay luz, verifica todas las conexiones</p>
                  <p>🔄 El motor también puede funcionar como generador</p>
                  <p>💡 Puedes conectar varios LEDs en paralelo</p>
                </div>
              </div>
            )}

            {/* Información Científica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 ¿Cómo funciona?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cuando giras la manivela, el <strong>motor actúa como generador</strong>. 
                  Los imanes internos del motor crean un campo magnético que, al girar, 
                  genera corriente eléctrica.
                </p>
                <p>
                  Este es el mismo principio que usan las <strong>centrales hidroeléctricas</strong> 
                  de ElectroHuila, donde el agua mueve grandes turbinas que generan electricidad para todo el Huila.
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">💧 Dato ElectroHuila:</h4>
                  <p>¡Una turbina hidroeléctrica puede generar hasta 700 MW de electricidad!</p>
                </div>
              </div>
            </div>

            {/* Datos del Experimento */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Info del Experimento</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">Medio</div>
                  <div className="text-sm text-yellow-700">Dificultad</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">30 min</div>
                  <div className="text-sm text-blue-700">Duración</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">Variable</div>
                  <div className="text-sm text-purple-700">Voltaje</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">⭐⭐⭐⭐</div>
                  <div className="text-sm text-orange-700">Diversión</div>
                </div>
              </div>
            </div>

            {/* Relación con ElectroHuila */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💧 Como las Centrales de ElectroHuila</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Tu generador funciona igual que las <strong>centrales hidroeléctricas</strong> de ElectroHuila:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600">💧</span>
                    </div>
                    <span>El agua del río mueve las turbinas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">⚙️</span>
                    </div>
                    <span>Las turbinas giran los generadores</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600">⚡</span>
                    </div>
                    <span>Los generadores producen electricidad</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600">🏠</span>
                    </div>
                    <span>La electricidad llega a tu casa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Datos de ElectroHuila */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏭 Datos ElectroHuila</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">El Quimbo</div>
                  <div className="text-sm text-blue-700">Central hidroeléctrica más grande del Huila</div>
                  <div className="text-xs text-blue-600 mt-1">400 MW de capacidad</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">Río Magdalena</div>
                  <div className="text-sm text-green-700">Principal fuente de energía hidráulica</div>
                  <div className="text-xs text-green-600 mt-1">Genera energía limpia para Colombia</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-600 mb-1">37 Municipios</div>
                  <div className="text-sm text-orange-700">ElectroHuila suministra energía a todo el Huila</div>
                  <div className="text-xs text-orange-600 mt-1">Más de 400,000 usuarios</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}