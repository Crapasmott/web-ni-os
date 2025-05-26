'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Sun, CheckCircle, Play, Pause, RotateCcw, Lightbulb, AlertTriangle, Timer, Star } from 'lucide-react';

export default function PanelSolarCaseroPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const steps = [
    {
      title: "Preparar los materiales",
      description: "Reúne todo lo necesario para tu panel solar",
      materials: ["Células solares pequeñas (4-6 unidades)", "Base de cartón grueso", "Cables finos", "LED", "Multímetro", "Pegamento o silicona", "Cinta transparente"],
      instruction: "Asegúrate de tener células solares funcionales. Puedes comprarlas en tiendas de electrónicos o usar las de calculadoras viejas",
      image: "🌞",
      safety: "Maneja las células solares con cuidado, son frágiles"
    },
    {
      title: "Preparar la base",
      description: "Crear la estructura del panel solar",
      instruction: "Corta el cartón del tamaño adecuado y márcalo para ubicar las células solares de manera ordenada, dejando espacio para las conexiones",
      image: "📐",
      safety: "Usa tijeras con cuidado y pide ayuda a un adulto si es necesario"
    },
    {
      title: "Pegar las células solares",
      description: "Fijar las células a la base",
      instruction: "Pega cada célula solar en su posición marcada. Asegúrate de que queden bien fijas y orientadas hacia el mismo lado",
      image: "🔗",
      safety: "Aplica pegamento con moderación para no dañar las células"
    },
    {
      title: "Conectar en serie",
      description: "Crear el circuito del panel solar",
      instruction: "Conecta el polo positivo de una célula con el negativo de la siguiente usando cables finos. Repite hasta conectar todas las células en serie",
      image: "🔌",
      safety: "Verifica la polaridad antes de hacer cada conexión"
    },
    {
      title: "Instalar cables de salida",
      description: "Preparar la conexión externa",
      instruction: "Conecta cables más largos a los extremos libres del circuito (positivo y negativo) para poder conectar dispositivos externos",
      image: "⚡",
      safety: "Marca claramente cuál cable es positivo y cuál es negativo"
    },
    {
      title: "Probar con LED",
      description: "Verificar el funcionamiento del panel",
      instruction: "Conecta un LED a los cables de salida y expón el panel a la luz solar directa. ¡El LED debería encenderse!",
      image: "💡",
      safety: "Si no funciona, verifica todas las conexiones antes de ajustar"
    },
    {
      title: "Medir el voltaje",
      description: "Cuantificar la energía generada",
      instruction: "Usa el multímetro para medir el voltaje generado por tu panel solar bajo diferentes condiciones de luz",
      image: "📊",
      safety: "Configura correctamente el multímetro antes de medir"
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Panel Solar Completado!</h1>
            <p className="text-xl text-gray-600 mb-6">
              ¡Excelente trabajo! Has construido tu propio panel solar funcional. 
              Ahora entiendes cómo ElectroHuila aprovecha la energía del sol para un futuro más verde.
            </p>
            
            <div className="bg-orange-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🧠 ¿Qué aprendiste?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• La luz solar se puede convertir directamente en electricidad</li>
                <li>• Las células fotovoltaicas generan más energía en serie</li>
                <li>• La intensidad de luz afecta la cantidad de electricidad</li>
                <li>• La energía solar es limpia y renovable</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🌱 Impacto Ambiental</h3>
              <p className="text-gray-700">
                Tu panel solar no genera emisiones contaminantes y puede funcionar durante más de 25 años. 
                ¡Es tecnología del futuro para un Huila más verde!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExperiment}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
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
                <Sun className="w-6 h-6 text-orange-500" />
                Panel Solar Casero
              </h1>
              <div className="text-sm text-gray-500">
                Paso {currentStep + 1} de {steps.length}
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Tips
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300" 
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
              <div className="bg-orange-50 rounded-2xl p-6 mb-6">
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
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
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
                  <Lightbulb className="w-5 h-5 text-orange-500" />
                  Tips Útiles
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>☀️ Más luz solar = más electricidad generada</p>
                  <p>🔗 Conexiones en serie aumentan el voltaje</p>
                  <p>🧹 Mantén las células limpias para mejor rendimiento</p>
                  <p>📐 La orientación hacia el sol es importante</p>
                </div>
              </div>
            )}

            {/* Información Científica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 ¿Cómo funciona?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Las <strong>células fotovoltaicas</strong> convierten la luz solar directamente en electricidad 
                  mediante el <strong>efecto fotoeléctrico</strong>. Cuando los fotones de luz golpean el silicio, 
                  liberan electrones que crean corriente eléctrica.
                </p>
                <p>
                  ElectroHuila está instalando <strong>granjas solares</strong> en el Huila para aprovechar 
                  nuestro abundante sol y generar energía limpia para todos los huilenses.
                </p>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">☀️ Dato solar:</h4>
                  <p>¡El Huila recibe más de 4.5 horas de sol intenso al día, ideal para energía solar!</p>
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
                  <div className="text-2xl font-bold text-blue-600">45 min</div>
                  <div className="text-sm text-blue-700">Duración</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1-3V</div>
                  <div className="text-sm text-purple-700">Voltaje</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">♻️</div>
                  <div className="text-sm text-green-700">Eco-Friendly</div>
                </div>
              </div>
            </div>

            {/* Beneficios Ambientales */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🌱 Beneficios</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">🌍</span>
                  </div>
                  <span>Zero emisiones contaminantes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">💧</span>
                  </div>
                  <span>No consume agua</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">☀️</span>
                  </div>
                  <span>Energía inagotable del sol</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">💰</span>
                  </div>
                  <span>Reduce costos eléctricos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}