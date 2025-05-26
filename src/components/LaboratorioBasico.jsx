import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Play, Pause, RotateCcw, CheckCircle, Clock, Zap, Sun, Settings, Trophy, Star } from 'lucide-react';

const LaboratorioBasico = ({ onBack }) => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [experimentComplete, setExperimentComplete] = useState(false);

  const experiments = [
    {
      id: 1,
      title: "Circuito de Limón",
      difficulty: "Fácil",
      duration: 20,
      icon: "🍋",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      description: "Crea electricidad usando un limón como batería natural",
      materials: ["Limón", "Cables", "LED", "+2 más"],
      steps: [
        {
          title: "Preparar el limón",
          description: "Rueda el limón en la mesa para ablandarlo y que libere más jugo",
          duration: 2,
          visual: "lemon-prep"
        },
        {
          title: "Insertar electrodos",
          description: "Clava un clavo de zinc y una moneda de cobre en el limón",
          duration: 3,
          visual: "electrodes"
        },
        {
          title: "Conectar cables",
          description: "Conecta los cables a los electrodos con pinzas cocodrilo",
          duration: 4,
          visual: "wiring"
        },
        {
          title: "Probar el LED",
          description: "Conecta el LED a los cables y observa cómo se enciende",
          duration: 5,
          visual: "led-test"
        },
        {
          title: "Medir voltaje",
          description: "Usa un multímetro para medir el voltaje generado (~0.9V)",
          duration: 6,
          visual: "voltage"
        }
      ]
    },
    {
      id: 2,
      title: "Generador de Manivela",
      difficulty: "Medio",
      duration: 30,
      icon: "⚙️",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Construye un generador manual que produce electricidad al girar",
      materials: ["Motor pequeño", "Manivela", "LED", "+2 más"],
      steps: [
        {
          title: "Preparar el motor",
          description: "Toma un motor DC pequeño que funcionará como generador",
          duration: 3,
          visual: "motor-prep"
        },
        {
          title: "Crear la manivela",
          description: "Conecta una manivela al eje del motor para poder girarlo",
          duration: 8,
          visual: "crank"
        },
        {
          title: "Conectar circuito",
          description: "Conecta LEDs y cables al motor para crear el circuito",
          duration: 7,
          visual: "circuit"
        },
        {
          title: "Probar generación",
          description: "Gira la manivela y observa cómo se encienden los LEDs",
          duration: 6,
          visual: "testing"
        },
        {
          title: "Medir potencia",
          description: "Experimenta con diferentes velocidades de giro",
          duration: 6,
          visual: "power-measure"
        }
      ]
    },
    {
      id: 3,
      title: "Panel Solar Casero",
      difficulty: "Medio",
      duration: 45,
      icon: "☀️",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      description: "Construye un panel solar básico usando células solares pequeñas",
      materials: ["Células solares pequeñas", "Cartón", "Cables", "+2 más"],
      steps: [
        {
          title: "Preparar base",
          description: "Corta y prepara una base de cartón para montar las células",
          duration: 8,
          visual: "base-prep"
        },
        {
          title: "Colocar células",
          description: "Pega las células solares en serie sobre la base",
          duration: 12,
          visual: "cells-mount"
        },
        {
          title: "Soldar conexiones",
          description: "Conecta las células en serie para sumar voltajes",
          duration: 15,
          visual: "soldering"
        },
        {
          title: "Probar al sol",
          description: "Lleva el panel al sol y mide el voltaje generado",
          duration: 5,
          visual: "sun-test"
        },
        {
          title: "Conectar carga",
          description: "Conecta LEDs o un motor pequeño para ver el panel funcionando",
          duration: 5,
          visual: "load-test"
        }
      ]
    }
  ];

  const handleBackToMenu = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const startExperiment = (experiment) => {
    setSelectedExperiment(experiment);
    setCurrentStep(0);
    setTimeElapsed(0);
    setCompletedSteps(new Set());
    setExperimentComplete(false);
    setIsRunning(false);
  };

  const nextStep = () => {
    if (currentStep < selectedExperiment.steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setExperimentComplete(true);
      setIsRunning(false);
    }
  };

  const resetExperiment = () => {
    setCurrentStep(0);
    setTimeElapsed(0);
    setCompletedSteps(new Set());
    setExperimentComplete(false);
    setIsRunning(false);
  };

  const backToExperiments = () => {
    setSelectedExperiment(null);
    resetExperiment();
  };

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning && !experimentComplete) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, experimentComplete]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'Escape':
          if (selectedExperiment) {
            backToExperiments();
          } else {
            handleBackToMenu();
          }
          break;
        case ' ':
          e.preventDefault();
          if (selectedExperiment) {
            setIsRunning(!isRunning);
          }
          break;
        case 'Enter':
          if (selectedExperiment && !experimentComplete) {
            nextStep();
          }
          break;
        case 'r':
        case 'R':
          if (selectedExperiment) {
            resetExperiment();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedExperiment, isRunning, experimentComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVisualComponent = (visual, step) => {
    const visuals = {
      'lemon-prep': (
        <div className="bg-yellow-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">🍋</div>
            <div className="text-sm text-gray-600">Rueda el limón para ablandarlo</div>
            <div className="mt-2 flex justify-center space-x-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" 
                     style={{animationDelay: `${i * 0.2}s`}} />
              ))}
            </div>
          </div>
        </div>
      ),
      'electrodes': (
        <div className="bg-yellow-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="relative">
            <div className="text-6xl">🍋</div>
            <div className="absolute top-2 left-4 w-1 h-8 bg-gray-600 rounded"></div>
            <div className="absolute top-2 right-4 w-3 h-3 bg-yellow-600 rounded-full"></div>
            <div className="text-xs text-center mt-2">Zinc (clavo) y Cobre (moneda)</div>
          </div>
        </div>
      ),
      'wiring': (
        <div className="bg-yellow-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="relative">
            <div className="text-6xl">🍋</div>
            <div className="absolute top-0 left-2 w-8 h-1 bg-red-500"></div>
            <div className="absolute top-0 right-2 w-8 h-1 bg-black"></div>
            <div className="text-xs text-center mt-2">Cables rojo (+) y negro (-)</div>
          </div>
        </div>
      ),
      'led-test': (
        <div className="bg-yellow-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🍋</div>
            <div className="flex flex-col items-center">
              <div className="w-1 h-8 bg-red-500"></div>
              <div className="w-1 h-8 bg-black"></div>
            </div>
            <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ),
      'voltage': (
        <div className="bg-yellow-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📟</div>
            <div className="bg-black text-green-400 px-3 py-1 rounded font-mono">0.9V</div>
            <div className="text-xs text-gray-600 mt-2">Multímetro midiendo</div>
          </div>
        </div>
      ),
      'motor-prep': (
        <div className="bg-blue-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">⚙️</div>
            <div className="text-sm text-gray-600">Motor DC pequeño</div>
          </div>
        </div>
      ),
      'crank': (
        <div className="bg-blue-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="relative">
            <div className="text-4xl">⚙️</div>
            <div className="absolute -right-8 top-2 w-12 h-1 bg-gray-600 rounded"></div>
            <div className="absolute -right-12 -top-2 w-6 h-6 border-2 border-gray-600 rounded-full"></div>
          </div>
        </div>
      ),
      'circuit': (
        <div className="bg-blue-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">⚙️</div>
            <div className="flex flex-col space-y-2">
              <div className="w-8 h-1 bg-red-500"></div>
              <div className="w-8 h-1 bg-black"></div>
            </div>
            <div className="flex flex-col space-y-1">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      'testing': (
        <div className="bg-blue-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2 animate-spin">⚙️</div>
            <div className="flex space-x-2 justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-xs text-gray-600 mt-2">¡LEDs encendidos!</div>
          </div>
        </div>
      ),
      'power-measure': (
        <div className="bg-blue-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="bg-black text-green-400 px-3 py-1 rounded font-mono mb-2">3.2V</div>
            <div className="text-xs text-gray-600">Más velocidad = Más voltaje</div>
          </div>
        </div>
      ),
      'base-prep': (
        <div className="bg-orange-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-12 bg-amber-200 border-2 border-amber-400 rounded mb-2"></div>
            <div className="text-sm text-gray-600">Base de cartón</div>
          </div>
        </div>
      ),
      'cells-mount': (
        <div className="bg-orange-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="w-16 h-12 bg-amber-200 border-2 border-amber-400 rounded relative">
            <div className="absolute inset-1 grid grid-cols-2 gap-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-blue-900 rounded-sm"></div>
              ))}
            </div>
          </div>
        </div>
      ),
      'soldering': (
        <div className="bg-orange-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🔧</div>
            <div className="text-sm text-gray-600">Soldando conexiones</div>
            <div className="mt-2 flex justify-center">
              <div className="w-12 h-1 bg-yellow-400 animate-pulse"></div>
            </div>
          </div>
        </div>
      ),
      'sun-test': (
        <div className="bg-orange-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">☀️</div>
            <div className="w-12 h-8 bg-blue-900 rounded mb-2"></div>
            <div className="bg-black text-green-400 px-2 py-1 rounded font-mono text-xs">12V</div>
          </div>
        </div>
      ),
      'load-test': (
        <div className="bg-orange-100 rounded-xl p-4 h-48 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">☀️</div>
            <div className="w-8 h-6 bg-blue-900 rounded"></div>
            <div className="w-1 h-4 bg-red-500"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      )
    };

    return visuals[visual] || (
      <div className="bg-gray-100 rounded-xl p-4 h-48 flex items-center justify-center">
        <div className="text-gray-500">Paso {step + 1}</div>
      </div>
    );
  };

  if (!selectedExperiment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={handleBackToMenu}
                className="flex items-center gap-2 bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
                title="Volver al menú (ESC)"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al Menú
              </button>
              <button 
                onClick={handleBackToMenu}
                className="flex items-center gap-2 bg-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-600 transform hover:scale-105 transition-all shadow-lg"
              >
                <Home className="w-5 h-5" />
                Inicio
              </button>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🔬 Laboratorio ElectroHuila
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              ¡Conviértete en un científico de la energía! Descubre cómo funciona la
            </p>
            <p className="text-xl text-gray-600">
              electricidad con experimentos seguros y fascinantes
            </p>
            
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                <span>💡 Tip: ESC-Salir | Enter-Siguiente paso | Espacio-Cronómetro</span>
              </div>
            </div>
          </div>

          {/* Experimentos */}
          <div className="grid md:grid-cols-3 gap-6">
            {experiments.map((experiment) => (
              <div
                key={experiment.id}
                className={`${experiment.bgColor} rounded-2xl p-6 shadow-xl ${experiment.borderColor} border-2 transform hover:scale-105 transition-all cursor-pointer`}
                onClick={() => startExperiment(experiment)}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{experiment.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{experiment.title}</h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      experiment.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                      experiment.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {experiment.difficulty}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experiment.duration} min
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 text-center">
                  {experiment.description}
                </p>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Materiales:</div>
                  <div className="flex flex-wrap gap-1">
                    {experiment.materials.map((material, index) => (
                      <span key={index} className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                <button className={`w-full bg-gradient-to-r ${experiment.color} text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2`}>
                  <Play className="w-5 h-5" />
                  ¡Experimentar!
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header del experimento */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={backToExperiments}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-all"
                title="Volver a experimentos (ESC)"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Experimentos</span>
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedExperiment.icon}</span>
                <span className="font-bold text-gray-800">{selectedExperiment.title}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="font-semibold">{formatTime(timeElapsed)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Paso:</span>
                <span className="font-bold">{currentStep + 1}/{selectedExperiment.steps.length}</span>
              </div>
              
              {experimentComplete && (
                <div className="flex items-center gap-2 text-green-600">
                  <Trophy className="w-5 h-5" />
                  <span className="font-bold">¡Completado!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Panel de control */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings className="text-blue-500" />
                Controles
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 ${
                    isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                  title="Iniciar/pausar cronómetro (Espacio)"
                >
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isRunning ? 'Pausar' : 'Iniciar'} Cronómetro
                </button>
                
                {!experimentComplete && (
                  <button
                    onClick={nextStep}
                    className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                    title="Siguiente paso (Enter)"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Completar Paso
                  </button>
                )}
                
                <button
                  onClick={resetExperiment}
                  className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                  title="Reiniciar experimento (R)"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reiniciar
                </button>
              </div>
            </div>

            {/* Progreso */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Progreso</h3>
              <div className="space-y-2">
                {selectedExperiment.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      completedSteps.has(index) ? 'bg-green-50 text-green-700' :
                      index === currentStep ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      completedSteps.has(index) ? 'bg-green-500 text-white' :
                      index === currentStep ? 'bg-blue-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {completedSteps.has(index) ? '✓' : index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Área principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Paso actual */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Paso {currentStep + 1}: {selectedExperiment.steps[currentStep].title}
                  </h2>
                  <p className="text-gray-600">
                    {selectedExperiment.steps[currentStep].description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Tiempo estimado</div>
                  <div className="text-lg font-bold text-blue-600">
                    {selectedExperiment.steps[currentStep].duration} min
                  </div>
                </div>
              </div>

              {/* Visualización */}
              {getVisualComponent(selectedExperiment.steps[currentStep].visual, currentStep)}
            </div>

            {/* Información del experimento */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Sobre este experimento</h3>
              <p className="text-gray-600 mb-4">{selectedExperiment.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Materiales necesarios:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedExperiment.materials.map((material, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Datos del experimento:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Dificultad:</span>
                      <span className="font-semibold">{selectedExperiment.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duración:</span>
                      <span className="font-semibold">{selectedExperiment.duration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pasos:</span>
                      <span className="font-semibold">{selectedExperiment.steps.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completados:</span>
                      <span className="font-semibold">{completedSteps.size}/{selectedExperiment.steps.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal de experimento completado */}
            {experimentComplete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    ¡Experimento Completado!
                  </h2>
                  
                  <div className="text-4xl mb-4">{selectedExperiment.icon}</div>
                  
                  <p className="text-gray-600 mb-6">
                    Has completado exitosamente el experimento "{selectedExperiment.title}". 
                    ¡Ahora entiendes mejor cómo funciona la electricidad!
                  </p>

                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-green-600">{formatTime(timeElapsed)}</div>
                        <div className="text-gray-600">Tiempo total</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-green-600">{selectedExperiment.steps.length}</div>
                        <div className="text-gray-600">Pasos completados</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={resetExperiment}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Repetir Experimento
                    </button>
                    
                    <button
                      onClick={backToExperiments}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                    >
                      <Star className="w-5 h-5" />
                      Más Experimentos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaboratorioBasico;