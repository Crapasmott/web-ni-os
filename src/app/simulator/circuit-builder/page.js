'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Battery, Lightbulb, Settings, RotateCcw, Play, Pause, Download, Upload, Home, Info, Award } from 'lucide-react';

export default function CircuitSimulatorPage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [components, setComponents] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [circuitPowered, setCircuitPowered] = useState(false);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Componentes disponibles
  const availableComponents = [
    {
      id: 'battery',
      name: 'Batería ElectroHuila',
      icon: 'battery',
      color: 'bg-green-500',
      voltage: 9,
      description: 'Fuente de energía de 9V'
    },
    {
      id: 'bulb',
      name: 'Bombilla LED',
      icon: 'bulb',
      color: 'bg-yellow-500',
      resistance: 100,
      description: 'Bombilla LED de bajo consumo'
    },
    {
      id: 'switch',
      name: 'Interruptor',
      icon: 'switch',
      color: 'bg-blue-500',
      state: 'off',
      description: 'Controla el flujo de electricidad'
    },
    {
      id: 'wire',
      name: 'Cable',
      icon: 'wire',
      color: 'bg-gray-600',
      description: 'Conecta los componentes'
    }
  ];

  // Tutoriales paso a paso
  const tutorials = [
    {
      title: "Circuito Básico",
      steps: [
        "1. Arrastra una batería al área de trabajo",
        "2. Agrega una bombilla LED",
        "3. Conecta ambos componentes con cables",
        "4. ¡Presiona simular y observa cómo se enciende!"
      ],
      reward: 50
    },
    {
      title: "Circuito con Interruptor",
      steps: [
        "1. Crea un circuito básico",
        "2. Agrega un interruptor en serie",
        "3. Conecta todo correctamente",
        "4. Simula y prueba el interruptor"
      ],
      reward: 100
    }
  ];

  // Función para obtener el icono
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'battery':
        return <Battery className="w-6 h-6" />;
      case 'bulb':
        return <Lightbulb className="w-6 h-6" />;
      case 'switch':
        return <Settings className="w-6 h-6" />;
      case 'wire':
        return <span className="w-6 h-6 flex items-center justify-center text-lg">⚡</span>;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  // Drag and Drop
  const handleDragStart = (e, component) => {
    if (!mounted) return; // No permitir drag hasta estar montado
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedComponent || !mounted) return; // No crear componentes hasta estar montado

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent = {
      id: `comp-${draggedComponent.id}-${components.length}`, // Key determinística
      type: draggedComponent.id,
      x: Math.max(0, Math.min(x - 25, rect.width - 50)), // Mantener dentro del área
      y: Math.max(0, Math.min(y - 25, rect.height - 50)),
      ...draggedComponent,
      connected: false,
      powered: false
    };

    setComponents(prev => [...prev, newComponent]);
    setDraggedComponent(null);
  };

  // Simulación del circuito
  const simulateCircuit = () => {
    setIsSimulating(!isSimulating);
    
    if (!isSimulating) {
      // Lógica de simulación simplificada
      const batteries = components.filter(c => c.type === 'battery');
      const bulbs = components.filter(c => c.type === 'bulb');
      const switches = components.filter(c => c.type === 'switch');
      
      // Verificar si hay un circuito completo
      if (batteries.length > 0 && bulbs.length > 0) {
        const allSwitchesOn = switches.every(s => s.state === 'on') || switches.length === 0;
        
        if (allSwitchesOn && connections.length >= 2) {
          setCircuitPowered(true);
          setScore(prev => prev + 25);
          
          // Actualizar estado de los componentes
          setComponents(prev => prev.map(comp => ({
            ...comp,
            powered: comp.type === 'bulb' ? true : comp.powered
          })));
        }
      }
    } else {
      setCircuitPowered(false);
      setComponents(prev => prev.map(comp => ({
        ...comp,
        powered: false
      })));
    }
  };

  // Toggle switch
  const toggleSwitch = (componentId) => {
    setComponents(prev => prev.map(comp => 
      comp.id === componentId && comp.type === 'switch'
        ? { ...comp, state: comp.state === 'on' ? 'off' : 'on' }
        : comp
    ));
  };

  // Limpiar área de trabajo
  const clearWorkspace = () => {
    setComponents([]);
    setConnections([]);
    setIsSimulating(false);
    setCircuitPowered(false);
  };

  // Crear conexión simple (para demostración)
  const createConnection = (comp1, comp2) => {
    if (!mounted) return; // No crear conexiones hasta estar montado
    
    const newConnection = {
      id: `conn-${comp1.id}-${comp2.id}-${connections.length}`, // Key determinística
      from: comp1.id,
      to: comp2.id,
      fromX: comp1.x + 25,
      fromY: comp1.y + 25,
      toX: comp2.x + 25,
      toY: comp2.y + 25
    };
    setConnections(prev => [...prev, newConnection]);
  };

  // Navegación
  const goBack = () => {
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Cargando Simulador ElectroHuila...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Botón de regreso prominente */}
              <button
                onClick={goBack}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
                title="Volver al inicio"
              >
                <Home className="w-5 h-5" />
                <span className="hidden md:inline font-semibold">Inicio</span>
              </button>
              
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Laboratorio Virtual ElectroHuila</h1>
                <p className="text-gray-600">Diseña circuitos reales como nuestros ingenieros</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 px-4 py-2 rounded-full">
                <span className="text-yellow-800 font-bold flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  {score} puntos
                </span>
              </div>
              <button
                onClick={() => setShowInstructions(true)}
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="Ayuda"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Panel de Componentes */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-2xl mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Componentes ElectroHuila
              </h3>
              
              <div className="space-y-3">
                {availableComponents.map((component) => (
                  <div
                    key={component.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, component)}
                    className={`${component.color} text-white p-4 rounded-2xl cursor-grab active:cursor-grabbing hover:scale-105 transition-all shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(component.icon)}
                      <div>
                        <div className="font-bold text-sm">{component.name}</div>
                        <div className="text-xs opacity-90">{component.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Controles</h3>
              
              <div className="space-y-3">
                <button
                  onClick={simulateCircuit}
                  className={`w-full p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                    isSimulating 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isSimulating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isSimulating ? 'Detener' : 'Simular'}
                </button>
                
                <button
                  onClick={clearWorkspace}
                  className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  Limpiar
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => alert('💾 Función de guardado próximamente')}
                    className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Guardar
                  </button>
                  <button 
                    onClick={() => alert('📁 Función de carga próximamente')}
                    className="p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-1"
                  >
                    <Upload className="w-4 h-4" />
                    Cargar
                  </button>
                </div>
                
                {/* Botón de regreso adicional en el panel */}
                <button
                  onClick={goBack}
                  className="w-full p-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:from-gray-700 hover:to-gray-800"
                >
                  <Home className="w-5 h-5" />
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>

          {/* Área de Trabajo */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Área de Diseño</h3>
                <div className="flex items-center gap-4">
                  {circuitPowered && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-bold animate-pulse">
                      ⚡ Circuito Energizado
                    </div>
                  )}
                </div>
              </div>
              
              <div
                className="w-full h-96 bg-gray-50 rounded-2xl border-4 border-dashed border-gray-300 relative overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              >
                {/* Texto de ayuda */}
                {components.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-semibold mb-2">¡Arrastra componentes aquí!</p>
                      <p className="text-sm">Crea tu primer circuito eléctrico</p>
                    </div>
                  </div>
                )}

                {/* Componentes en el área de trabajo */}
                {components.map((component) => (
                  <div
                    key={component.id}
                    className={`absolute w-12 h-12 ${component.color} rounded-xl flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all shadow-lg ${
                      component.powered ? 'animate-pulse ring-4 ring-yellow-400' : ''
                    }`}
                    style={{ left: component.x, top: component.y }}
                    onClick={() => component.type === 'switch' ? toggleSwitch(component.id) : null}
                    title={`${component.name} ${component.type === 'switch' ? `(${component.state})` : ''}`}
                  >
                    {component.type === 'switch' ? (
                      <div className={`w-6 h-6 rounded-full ${component.state === 'on' ? 'bg-green-400' : 'bg-red-400'} flex items-center justify-center text-white text-xs font-bold`}>
                        {component.state === 'on' ? 'ON' : 'OFF'}
                      </div>
                    ) : (
                      <div className="text-white">
                        {getIcon(component.icon)}
                      </div>
                    )}
                  </div>
                ))}

                {/* Conexiones (líneas simples para demostración) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {connections.map((conn) => (
                    <line
                      key={conn.id}
                      x1={conn.fromX}
                      y1={conn.fromY}
                      x2={conn.toX}
                      y2={conn.toY}
                      stroke={circuitPowered ? "#fbbf24" : "#6b7280"}
                      strokeWidth="3"
                      strokeDasharray={circuitPowered ? "0" : "5,5"}
                      className={circuitPowered ? "animate-pulse" : ""}
                    />
                  ))}
                </svg>
              </div>

              {/* Botón de conexión rápida */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    if (components.length >= 2) {
                      createConnection(components[0], components[1]);
                      setScore(prev => prev + 10);
                    }
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={components.length < 2}
                >
                  🔗 Conectar Componentes (Demo)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Instrucciones */}
        {showInstructions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">¡Bienvenido al Simulador ElectroHuila!</h2>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">🎯 Cómo usar el simulador:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    <li>Arrastra componentes desde el panel izquierdo al área de trabajo</li>
                    <li>Haz clic en "Conectar Componentes" para crear conexiones</li>
                    <li>Usa interruptores haciendo clic sobre ellos (ON/OFF)</li>
                    <li>Presiona "Simular" para activar tu circuito</li>
                    <li>¡Observa cómo se encienden las bombillas!</li>
                  </ol>
                </div>
                
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-2xl">
                    <h4 className="font-bold text-blue-800 mb-2">
                      {tutorial.title} (+{tutorial.reward} puntos)
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                      {tutorial.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowInstructions(false)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg"
                >
                  ¡Comenzar a Experimentar!
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botón para volver */}
        <div className="mt-8 text-center">
          <button
            onClick={goBack}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-3 mx-auto"
          >
            <Home className="w-6 h-6" />
            Volver a Explora y Aprende
          </button>
        </div>
      </div>
    </div>
  );
}