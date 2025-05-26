import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Play, Pause, RotateCcw, CheckCircle, Clock, Zap, Sun, Settings, Trophy, Star, Wind, Magnet } from 'lucide-react';

const LaboratorioAvanzado = ({ onBack }) => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [experimentComplete, setExperimentComplete] = useState(false);

  const experiments = [
    {
      id: 1,
      title: "Turbina de Viento",
      difficulty: "Avanzado",
      duration: 60,
      icon: "🌪️",
      color: "from-green-400 to-teal-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      description: "Construye una turbina eólica funcional que genere electricidad del viento",
      materials: ["Motor pequeño", "Aspas de cartón", "Ventilador", "+2 más"],
      steps: [
        { title: "Diseñar las aspas", description: "Corta y da forma a las aspas aerodinámicas de cartón", duration: 15, visual: "blade-design" },
        { title: "Ensamblar rotor", description: "Conecta las aspas al eje del motor con balance perfecto", duration: 20, visual: "rotor-assembly" },
        { title: "Crear soporte", description: "Construye una base estable para la turbina", duration: 10, visual: "support-build" },
        { title: "Conectar circuito", description: "Cablea el generador con LEDs y sistema de medición", duration: 10, visual: "circuit-connect" },
        { title: "Probar con viento", description: "Usa un ventilador para simular viento y medir la generación", duration: 5, visual: "wind-test" }
      ]
    },
    {
      id: 2,
      title: "Electroimán Potente",
      difficulty: "Fácil",
      duration: 15,
      icon: "🧲",
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: "Crea un electroimán súper potente usando una pila y cable de cobre",
      materials: ["Clavo grande", "Cable de cobre", "Pila", "+1 más"],
      steps: [
        { title: "Preparar el núcleo", description: "Toma un clavo de hierro grande que será el núcleo magnético", duration: 2, visual: "core-prep" },
        { title: "Enrollar cable", description: "Enrolla el cable de cobre alrededor del clavo 50+ veces", duration: 8, visual: "wire-wrap" },
        { title: "Conectar batería", description: "Conecta los extremos del cable a una pila de 9V", duration: 3, visual: "battery-connect" },
        { title: "Probar fuerza", description: "Prueba levantar clips, clavos y otros objetos metálicos", duration: 2, visual: "strength-test" }
      ]
    },
    {
      id: 3,
      title: "Conductor vs Aislante",
      difficulty: "Fácil",
      duration: 25,
      icon: "⚡",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      description: "Descubre qué materiales conducen electricidad y cuáles la bloquean",
      materials: ["Pila", "LED", "Cables", "+2 más"],
      steps: [
        { title: "Construir probador", description: "Crea un circuito simple con pila, LED y cables de prueba", duration: 8, visual: "tester-build" },
        { title: "Probar metales", description: "Prueba diferentes metales: cobre, aluminio, hierro", duration: 5, visual: "metal-test" },
        { title: "Probar no metales", description: "Prueba plástico, madera, vidrio y otros materiales", duration: 5, visual: "nonmetal-test" },
        { title: "Probar líquidos", description: "Prueba agua salada, agua destilada y otros líquidos", duration: 4, visual: "liquid-test" },
        { title: "Crear tabla", description: "Organiza los resultados en una tabla de conductores/aislantes", duration: 3, visual: "results-table" }
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

  useEffect(() => {
    let interval;
    if (isRunning && !experimentComplete) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, experimentComplete]);

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

  const getVisualComponent = (visual) => {
    const visuals = {
      'blade-design': <div className="bg-green-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-6xl mb-2">✂️</div><div className="text-sm text-gray-600">Cortando aspas aerodinámicas</div></div></div>,
      'rotor-assembly': <div className="bg-green-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="relative"><div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center"><div className="w-2 h-2 bg-gray-600 rounded-full"></div></div><div className="absolute top-0 left-8 w-12 h-1 bg-green-500 transform -rotate-45 origin-left"></div></div></div>,
      'support-build': <div className="bg-green-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="w-2 h-24 bg-gray-600 mx-auto"></div><div className="w-12 h-3 bg-gray-400 mx-auto"></div></div></div>,
      'circuit-connect': <div className="bg-green-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="flex items-center space-x-4"><div className="text-3xl">🌪️</div><div className="w-4 h-4 bg-red-500 rounded-full"></div></div></div>,
      'wind-test': <div className="bg-green-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2 animate-spin">🌪️</div><div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mx-auto"></div></div></div>,
      'core-prep': <div className="bg-purple-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="w-2 h-16 bg-gray-600 mx-auto mb-2"></div><div className="text-sm text-gray-600">Clavo de hierro</div></div></div>,
      'wire-wrap': <div className="bg-purple-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="relative"><div className="w-2 h-16 bg-gray-600"></div><div className="absolute inset-0">{[...Array(8)].map((_, i) => <div key={i} className="absolute w-6 h-1 bg-orange-500 rounded" style={{top: `${i * 8 + 4}px`, left: '-10px'}} />)}</div></div></div>,
      'battery-connect': <div className="bg-purple-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="flex items-center space-x-4"><div className="text-3xl">🔋</div><div className="text-3xl">🧲</div></div></div>,
      'strength-test': <div className="bg-purple-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2">🧲</div><div className="flex justify-center space-x-2 mb-2">{[1,2,3].map(i => <div key={i} className="w-2 h-2 bg-gray-600 rounded-full"></div>)}</div></div></div>,
      'tester-build': <div className="bg-pink-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="flex items-center space-x-2"><div className="text-2xl">🔋</div><div className="w-4 h-4 bg-red-500 rounded-full"></div></div></div>,
      'metal-test': <div className="bg-pink-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2">🔧</div><div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mx-auto"></div></div></div>,
      'nonmetal-test': <div className="bg-pink-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2">🪵</div><div className="w-4 h-4 bg-gray-400 rounded-full mx-auto"></div></div></div>,
      'liquid-test': <div className="bg-pink-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2">🧂💧</div><div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mx-auto"></div></div></div>,
      'results-table': <div className="bg-pink-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-center"><div className="text-4xl mb-2">📊</div><div className="grid grid-cols-2 gap-2 text-xs"><div className="bg-green-200 p-1 rounded">Conductores</div><div className="bg-red-200 p-1 rounded">Aislantes</div></div></div></div>
    };
    return visuals[visual] || <div className="bg-gray-100 rounded-xl p-4 h-48 flex items-center justify-center"><div className="text-gray-500">Visualización</div></div>;
  };

  if (!selectedExperiment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-6">
              <button onClick={handleBackToMenu} className="flex items-center gap-2 bg-white text-indigo-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg" title="Volver al menú (ESC)">
                <ArrowLeft className="w-5 h-5" />
                Volver al Menú
              </button>
              <button onClick={handleBackToMenu} className="flex items-center gap-2 bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-600 transform hover:scale-105 transition-all shadow-lg">
                <Home className="w-5 h-5" />
                Inicio
              </button>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🔬 Laboratorio ElectroHuila Avanzado</h1>
            <p className="text-xl text-gray-600 mb-2">¡Experimentos más desafiantes para científicos expertos!</p>
            <p className="text-xl text-gray-600">Descubre conceptos avanzados de electricidad y magnetismo</p>
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                <span>⚡ Controles: ESC-Salir | Enter-Siguiente | Espacio-Cronómetro | R-Reset</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {experiments.map((experiment) => (
              <div key={experiment.id} className={`${experiment.bgColor} rounded-2xl p-6 shadow-xl ${experiment.borderColor} border-2 transform hover:scale-105 transition-all cursor-pointer`} onClick={() => startExperiment(experiment)}>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{experiment.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{experiment.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${experiment.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' : experiment.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {experiment.difficulty}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experiment.duration} min
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 text-center">{experiment.description}</p>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Materiales:</div>
                  <div className="flex flex-wrap gap-1">
                    {experiment.materials.map((material, index) => (
                      <span key={index} className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">{material}</span>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button onClick={backToExperiments} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-all" title="Volver a experimentos (ESC)">
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
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Settings className="text-indigo-500" />
                Controles
              </h3>
              <div className="space-y-3">
                <button onClick={() => setIsRunning(!isRunning)} className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 ${isRunning ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`} title="Iniciar/pausar cronómetro (Espacio)">
                  {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isRunning ? 'Pausar' : 'Iniciar'} Cronómetro
                </button>
                {!experimentComplete && (
                  <button onClick={nextStep} className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl flex items-center justify-center gap-2" title="Siguiente paso (Enter)">
                    <CheckCircle className="w-5 h-5" />
                    Completar Paso
                  </button>
                )}
                <button onClick={resetExperiment} className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-xl flex items-center justify-center gap-2" title="Reiniciar experimento (R)">
                  <RotateCcw className="w-5 h-5" />
                  Reiniciar
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Progreso</h3>
              <div className="space-y-2">
                {selectedExperiment.steps.map((step, index) => (
                  <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${completedSteps.has(index) ? 'bg-green-50 text-green-700' : index === currentStep ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-500'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${completedSteps.has(index) ? 'bg-green-500 text-white' : index === currentStep ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      {completedSteps.has(index) ? '✓' : index + 1}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Paso {currentStep + 1}: {selectedExperiment.steps[currentStep].title}</h2>
                  <p className="text-gray-600">{selectedExperiment.steps[currentStep].description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Tiempo estimado</div>
                  <div className="text-lg font-bold text-indigo-600">{selectedExperiment.steps[currentStep].duration} min</div>
                </div>
              </div>
              {getVisualComponent(selectedExperiment.steps[currentStep].visual)}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Sobre este experimento</h3>
              <p className="text-gray-600 mb-4">{selectedExperiment.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Materiales necesarios:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedExperiment.materials.map((material, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Datos del experimento:</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between"><span>Dificultad:</span><span className="font-semibold">{selectedExperiment.difficulty}</span></div>
                    <div className="flex justify-between"><span>Duración:</span><span className="font-semibold">{selectedExperiment.duration} min</span></div>
                    <div className="flex justify-between"><span>Pasos:</span><span className="font-semibold">{selectedExperiment.steps.length}</span></div>
                    <div className="flex justify-between"><span>Completados:</span><span className="font-semibold">{completedSteps.size}/{selectedExperiment.steps.length}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {experimentComplete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Experimento Avanzado Completado!</h2>
                  <div className="text-4xl mb-4">{selectedExperiment.icon}</div>
                  <p className="text-gray-600 mb-6">¡Excelente trabajo! Has completado "{selectedExperiment.title}". Ahora dominas conceptos avanzados de electricidad y magnetismo.</p>
                  <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-indigo-600">{formatTime(timeElapsed)}</div>
                        <div className="text-gray-600">Tiempo total</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-indigo-600">{selectedExperiment.steps.length}</div>
                        <div className="text-gray-600">Pasos completados</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button onClick={resetExperiment} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2">
                      <RotateCcw className="w-5 h-5" />
                      Repetir Experimento
                    </button>
                    <button onClick={backToExperiments} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2">
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

export default LaboratorioAvanzado;