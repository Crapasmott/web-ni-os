'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Zap, CheckCircle, Play, Pause, RotateCcw, Lightbulb, AlertTriangle, Timer, Star } from 'lucide-react';

export default function CircuitoLimonPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const steps = [
    {
      title: "Preparar los materiales",
      description: "Reúne todos los materiales necesarios para el experimento",
      materials: ["1 limón fresco", "2 cables con pinzas", "1 LED", "1 moneda de cobre", "1 clip metálico"],
      instruction: "Asegúrate de tener todos los materiales limpios y en buen estado",
      image: "🍋",
      safety: "Lávate las manos antes de comenzar"
    },
    {
      title: "Preparar el limón",
      description: "Haz dos pequeños cortes en el limón",
      instruction: "Con cuidado, haz dos cortes pequeños en el limón, separados por unos 2 cm",
      image: "🔪",
      safety: "Pide ayuda a un adulto para usar el cuchillo"
    },
    {
      title: "Insertar los electrodos",
      description: "Coloca la moneda de cobre y el clip en los cortes",
      instruction: "Inserta la moneda de cobre en un corte y el clip metálico en el otro. Deben quedar bien firmes",
      image: "🪙",
      safety: "No empujes demasiado fuerte para evitar lastimarte"
    },
    {
      title: "Conectar los cables",
      description: "Conecta los cables a los electrodos",
      instruction: "Conecta un cable a la moneda de cobre y otro al clip metálico usando las pinzas",
      image: "🔌",
      safety: "Asegúrate de que las conexiones estén firmes"
    },
    {
      title: "Conectar el LED",
      description: "Conecta el LED a los cables libres",
      instruction: "Conecta los extremos libres de los cables al LED. Recuerda respetar la polaridad (+ y -)",
      image: "💡",
      safety: "Si el LED no enciende, intenta cambiar la polaridad"
    },
    {
      title: "¡Observa el resultado!",
      description: "El LED debería encenderse con la electricidad del limón",
      instruction: "Si todo está bien conectado, el LED se encenderá débilmente. ¡Has creado tu primera batería natural!",
      image: "✨",
      safety: "¡Felicitaciones! Has generado electricidad con un limón"
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Experimento Completado!</h1>
            <p className="text-xl text-gray-600 mb-6">
              ¡Excelente trabajo! Has creado tu primera batería natural con un limón. 
              Ahora sabes cómo los ácidos pueden generar electricidad.
            </p>
            
            <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">🧠 ¿Qué aprendiste?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• El ácido del limón actúa como electrolito</li>
                <li>• Los metales diferentes crean una reacción química</li>
                <li>• Esta reacción genera electricidad</li>
                <li>• Es el mismo principio de las baterías comerciales</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetExperiment}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-3 px-6 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
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
                <Zap className="w-6 h-6 text-yellow-500" />
                Circuito de Limón
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
                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300" 
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
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-6 py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all"
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
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Tips Útiles
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>💡 Si el LED no enciende, verifica las conexiones</p>
                  <p>🔋 Mientras más ácido tenga el limón, mejor funcionará</p>
                  <p>⚡ Puedes conectar varios limones en serie para más voltaje</p>
                  <p>🧪 Otros cítricos como naranjas también funcionan</p>
                </div>
              </div>
            )}

            {/* Información Científica */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🔬 ¿Cómo funciona?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  El limón actúa como una <strong>batería electroquímica</strong>. El ácido cítrico 
                  del limón permite que los electrones fluyan entre el cobre y el metal del clip.
                </p>
                <p>
                  Este movimiento de electrones es lo que llamamos <strong>corriente eléctrica</strong>, 
                  la misma que usa ElectroHuila para llevar energía a tu casa.
                </p>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">⚡ Dato curioso:</h4>
                  <p>¡Una batería de limón puede generar hasta 0.9 voltios!</p>
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
                  <div className="text-2xl font-bold text-blue-600">20 min</div>
                  <div className="text-sm text-blue-700">Duración</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">0.9V</div>
                  <div className="text-sm text-purple-700">Voltaje</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">⭐⭐⭐</div>
                  <div className="text-sm text-orange-700">Diversión</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}