'use client';
import { useState, useRef, useEffect } from 'react';
import { Zap, Battery, Lightbulb, Power, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';

interface Component {
  id: string;
  type: 'battery' | 'bulb' | 'switch' | 'wire';
  x: number;
  y: number;
  connected: boolean;
  powered: boolean;
}

interface Connection {
  from: string;
  to: string;
}

const componentTypes = [
  {
    type: 'battery' as const,
    name: 'Batería',
    icon: <Battery className="w-6 h-6" />,
    color: 'bg-green-500',
    description: 'Fuente de energía'
  },
  {
    type: 'bulb' as const,
    name: 'Bombilla',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'bg-yellow-500',
    description: 'Se ilumina con energía'
  },
  {
    type: 'switch' as const,
    name: 'Interruptor',
    icon: <Power className="w-6 h-6" />,
    color: 'bg-blue-500',
    description: 'Controla el paso de corriente'
  }
];

const circuitChallenges = [
  {
    id: 1,
    title: "Circuito Básico",
    description: "Conecta una batería a una bombilla",
    difficulty: "Fácil",
    components: ['battery', 'bulb'],
    goal: "Hacer que la bombilla se encienda"
  },
  {
    id: 2,
    title: "Con Interruptor",
    description: "Agrega un interruptor para controlar la luz",
    difficulty: "Medio",
    components: ['battery', 'bulb', 'switch'],
    goal: "Controlar la bombilla con el interruptor"
  },
  {
    id: 3,
    title: "Doble Bombilla",
    description: "Enciende dos bombillas con una batería",
    difficulty: "Medio",
    components: ['battery', 'bulb', 'bulb'],
    goal: "Ambas bombillas deben encender"
  }
];

export default function CircuitsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState(circuitChallenges[0]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null);

  useEffect(() => {
    drawCircuit();
    checkCircuitCompletion();
  }, [components, connections]);

  const drawCircuit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw connections
    connections.forEach(connection => {
      const fromComp = components.find(c => c.id === connection.from);
      const toComp = components.find(c => c.id === connection.to);
      
      if (fromComp && toComp) {
        ctx.strokeStyle = fromComp.powered ? '#10B981' : '#6B7280';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(fromComp.x + 25, fromComp.y + 25);
        ctx.lineTo(toComp.x + 25, toComp.y + 25);
        ctx.stroke();
        
        // Add electricity animation for powered connections
        if (fromComp.powered) {
          ctx.strokeStyle = '#FCD34D';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    });

    // Draw components
    components.forEach(component => {
      const isSelected = selectedComponent === component.id;
      const isPowered = component.powered;
      
      // Component background
      ctx.fillStyle = isPowered ? '#FEF3C7' : '#F3F4F6';
      if (isSelected) ctx.fillStyle = '#DBEAFE';
      ctx.strokeStyle = isSelected ? '#3B82F6' : '#9CA3AF';
      ctx.lineWidth = isSelected ? 3 : 2;
      
      ctx.fillRect(component.x, component.y, 50, 50);
      ctx.strokeRect(component.x, component.y, 50, 50);
      
      // Component icon/symbol
      ctx.fillStyle = isPowered ? '#F59E0B' : '#374151';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      
      switch (component.type) {
        case 'battery':
          ctx.fillText('🔋', component.x + 25, component.y + 35);
          break;
        case 'bulb':
          ctx.fillText(isPowered ? '💡' : '⚫', component.x + 25, component.y + 35);
          break;
        case 'switch':
          ctx.fillText(component.connected ? '🟢' : '🔴', component.x + 25, component.y + 35);
          break;
      }
      
      // Component label
      ctx.font = '12px Arial';
      ctx.fillStyle = '#374151';
      ctx.fillText(component.type.toUpperCase(), component.x + 25, component.y - 5);
    });
  };

  const checkCircuitCompletion = () => {
    // Simple circuit completion logic
    const hasBattery = components.some(c => c.type === 'battery');
    const bulbs = components.filter(c => c.type === 'bulb');
    const poweredBulbs = bulbs.filter(c => c.powered);
    
    setIsCompleted(hasBattery && bulbs.length > 0 && poweredBulbs.length === bulbs.length);
  };

  const simulateElectricity = () => {
    const batteries = components.filter(c => c.type === 'battery');
    const updatedComponents = [...components];
    
    // Reset all powered states
    updatedComponents.forEach(comp => {
      comp.powered = comp.type === 'battery';
    });
    
    // Trace electricity through connections
    const visited = new Set<string>();
    
    const traceElectricity = (componentId: string) => {
      if (visited.has(componentId)) return;
      visited.add(componentId);
      
      const component = updatedComponents.find(c => c.id === componentId);
      if (!component) return;
      
      // If it's a switch and it's off, stop here
      if (component.type === 'switch' && !component.connected) return;
      
      // Find connected components
      connections.forEach(conn => {
        let targetId = null;
        if (conn.from === componentId) targetId = conn.to;
        if (conn.to === componentId) targetId = conn.from;
        
        if (targetId && !visited.has(targetId)) {
          const targetComp = updatedComponents.find(c => c.id === targetId);
          if (targetComp) {
            targetComp.powered = true;
            traceElectricity(targetId);
          }
        }
      });
    };
    
    batteries.forEach(battery => {
      traceElectricity(battery.id);
    });
    
    setComponents(updatedComponents);
  };

  const addComponent = (type: 'battery' | 'bulb' | 'switch') => {
    const newComponent: Component = {
      id: `${type}-${Date.now()}`,
      type,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      connected: type === 'switch' ? false : true,
      powered: type === 'battery'
    };
    
    setComponents([...components, newComponent]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if clicked on a component
    const clickedComponent = components.find(comp => 
      x >= comp.x && x <= comp.x + 50 && y >= comp.y && y <= comp.y + 50
    );
    
    if (clickedComponent) {
      if (connectingFrom && connectingFrom !== clickedComponent.id) {
        // Create connection
        const newConnection: Connection = {
          from: connectingFrom,
          to: clickedComponent.id
        };
        
        // Check if connection already exists
        const exists = connections.some(conn => 
          (conn.from === newConnection.from && conn.to === newConnection.to) ||
          (conn.from === newConnection.to && conn.to === newConnection.from)
        );
        
        if (!exists) {
          setConnections([...connections, newConnection]);
          setTimeout(simulateElectricity, 100);
        }
        setConnectingFrom(null);
      } else if (clickedComponent.type === 'switch') {
        // Toggle switch
        const updated = components.map(comp => 
          comp.id === clickedComponent.id 
            ? { ...comp, connected: !comp.connected }
            : comp
        );
        setComponents(updated);
        setTimeout(simulateElectricity, 100);
      } else {
        // Start connecting
        setConnectingFrom(clickedComponent.id);
      }
      
      setSelectedComponent(clickedComponent.id);
    } else {
      setSelectedComponent(null);
      setConnectingFrom(null);
    }
  };

  const resetCircuit = () => {
    setComponents([]);
    setConnections([]);
    setSelectedComponent(null);
    setConnectingFrom(null);
    setIsCompleted(false);
  };

  const loadChallenge = (challenge: typeof circuitChallenges[0]) => {
    resetCircuit();
    setSelectedChallenge(challenge);
    
    // Add required components for the challenge
    setTimeout(() => {
      challenge.components.forEach((compType, index) => {
        addComponent(compType as 'battery' | 'bulb' | 'switch');
      });
    }, 100);
  };

  useEffect(() => {
    simulateElectricity();
  }, [connections]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Armador de Circuitos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Conviértete en un ingeniero eléctrico! Aprende sobre electricidad armando circuitos divertidos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Challenges Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CheckCircle className="text-blue-500" />
                Desafíos
              </h3>
              
              <div className="space-y-4">
                {circuitChallenges.map((challenge) => (
                  <button
                    key={challenge.id}
                    onClick={() => loadChallenge(challenge)}
                    className={`w-full p-4 rounded-xl transition-all text-left ${
                      selectedChallenge.id === challenge.id
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-3 border-blue-300 shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <div className="font-bold text-gray-800 mb-1">{challenge.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{challenge.description}</div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        challenge.difficulty === 'Fácil' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      {isCompleted && selectedChallenge.id === challenge.id && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Components Palette */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Componentes
              </h3>
              
              <div className="space-y-3">
                {componentTypes.map((compType) => (
                  <button
                    key={compType.type}
                    onClick={() => addComponent(compType.type)}
                    className="w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-xl border-2 border-gray-200 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${compType.color} rounded-lg flex items-center justify-center text-white`}>
                        {compType.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-800">{compType.name}</div>
                        <div className="text-xs text-gray-500">{compType.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Circuit Canvas */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-indigo-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedChallenge.title}</h3>
                  <p className="text-gray-600">{selectedChallenge.goal}</p>
                </div>
                <div className="flex gap-3">
                  {isCompleted && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      ¡Completado!
                    </div>
                  )}
                  <button
                    onClick={resetCircuit}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                    title="Reiniciar"
                  >
                    <RotateCcw className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  onClick={handleCanvasClick}
                  className="border-4 border-gray-300 rounded-xl cursor-pointer bg-white w-full"
                />
              </div>

              {/* Instructions */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Cómo conectar
                  </h4>
                  <p className="text-sm text-blue-700">
                    1. Haz clic en un componente<br/>
                    2. Haz clic en otro para conectarlos<br/>
                    3. Los cables se iluminarán si hay electricidad
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <Power className="w-5 h-5" />
                    Interruptores
                  </h4>
                  <p className="text-sm text-purple-700">
                    Haz clic en un interruptor para encenderlo/apagarlo<br/>
                    🟢 = Encendido | 🔴 = Apagado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}