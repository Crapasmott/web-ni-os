'use client';

import { useState } from 'react';
import { ArrowLeft, Factory, Settings, AlertTriangle, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PlantaIndustrialPage() {
  const [machines, setMachines] = useState([
    { id: 1, name: 'Motor Principal', running: false, power: 500, temperature: 25, status: 'normal' },
    { id: 2, name: 'Bomba Hidráulica', running: false, power: 300, temperature: 30, status: 'normal' },
    { id: 3, name: 'Compresor Aire', running: false, power: 400, temperature: 35, status: 'normal' },
    { id: 4, name: 'Banda Transportadora', running: false, power: 200, temperature: 28, status: 'normal' }
  ]);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [score, setScore] = useState(0);

  const toggleMachine = (id: number) => {
    if (emergencyStop) return;
    
    setMachines(prev => {
      const updated = prev.map(m => {
        if (m.id === id) {
          const newRunning = !m.running;
          return {
            ...m,
            running: newRunning,
            temperature: newRunning ? m.temperature + 20 : 25,
            status: newRunning ? (Math.random() > 0.8 ? 'warning' : 'normal') : 'normal'
          };
        }
        return m;
      });
      
      const runningCount = updated.filter(m => m.running).length;
      const efficiency = runningCount >= 3 ? 90 : runningCount * 25;
      setScore(runningCount >= 3 ? 750 : runningCount * 150);
      return updated;
    });
  };

  const handleEmergencyStop = () => {
    if (emergencyStop) {
      // Reactivar
      setEmergencyStop(false);
    } else {
      // Parada de emergencia
      setEmergencyStop(true);
      setMachines(prev => prev.map(m => ({ 
        ...m, 
        running: false, 
        temperature: 25, 
        status: 'normal' 
      })));
      setScore(0);
    }
  };

  const totalPower = machines.filter(m => m.running).reduce((sum, m) => sum + m.power, 0);
  const runningMachines = machines.filter(m => m.running).length;
  const warningMachines = machines.filter(m => m.status === 'warning').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'border-green-500 bg-green-100';
      case 'warning': return 'border-yellow-500 bg-yellow-100';
      case 'critical': return 'border-red-500 bg-red-100';
      default: return 'border-gray-300 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/circuits" className="flex items-center gap-2 text-red-700 hover:text-red-800">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver a Simuladores</span>
          </Link>
          
          {emergencyStop && (
            <div className="bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
              <AlertTriangle className="w-4 h-4 inline mr-2" />
              EMERGENCIA ACTIVA
            </div>
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="bg-red-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Factory className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Planta Industrial</h1>
          <p className="text-gray-600">Gestiona la energía de maquinaria industrial de forma segura</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Avanzado</span>
            <span className="text-sm text-gray-600">⏱️ 40 min</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">750 pts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Control Panel */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-red-600" />
              Control Principal
            </h2>

            {/* Emergency Stop */}
            <button
              onClick={handleEmergencyStop}
              className={`w-full py-4 px-4 rounded-xl font-bold text-white mb-6 transition-all duration-300 ${
                emergencyStop 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              {emergencyStop ? 'REACTIVAR SISTEMA' : 'PARADA DE EMERGENCIA'}
            </button>

            {/* System Status */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-700 mb-3">Estado del Sistema</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Máquinas Activas:</span>
                    <span className="font-bold">{runningMachines}/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consumo Total:</span>
                    <span className="font-bold text-red-600">{totalPower} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alertas:</span>
                    <span className={`font-bold ${warningMachines > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {warningMachines > 0 ? `${warningMachines} Advertencias` : 'Todo Normal'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Safety Systems */}
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold text-blue-800 mb-3">Sistemas de Seguridad</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-blue-700">Detección de Incendios: Activo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-blue-700">Sensores de Gas: Activo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-blue-700">Válvulas de Presión: Activo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plant Layout */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Factory className="w-6 h-6 text-red-600" />
              Layout Industrial
            </h2>

            {/* Machines Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {machines.map((machine) => (
                <button
                  key={machine.id}
                  onClick={() => toggleMachine(machine.id)}
                  disabled={emergencyStop}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    emergencyStop 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 cursor-pointer'
                  } ${
                    machine.running 
                      ? getStatusColor(machine.status)
                      : 'border-gray-300 bg-gray-100'
                  }`}
                >
                  <div className="text-center">
                    <Settings className={`w-12 h-12 mx-auto mb-3 ${
                      machine.running 
                        ? machine.status === 'warning' ? 'text-yellow-600' : 'text-green-600'
                        : 'text-gray-500'
                    }`} />
                    <h3 className="font-semibold text-gray-900 mb-2">{machine.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">{machine.power} kW</p>
                      <p className={`font-medium ${
                        machine.running ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {machine.running ? 'Funcionando' : 'Detenida'}
                      </p>
                      {machine.running && (
                        <div className="text-xs">
                          <p className="text-red-600">🌡️ {machine.temperature}°C</p>
                          {machine.status === 'warning' && (
                            <p className="text-yellow-600 font-bold">⚠️ Advertencia</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Power Flow Visualization */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-700 mb-3">Flujo de Energía</h3>
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-600">ElectroHuila</p>
                    <p className="text-xs font-bold">2000 kW</p>
                  </div>
                  
                  {runningMachines > 0 && !emergencyStop && (
                    <>
                      <div className="w-16 h-1 bg-green-500 relative">
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-2">
                          <Factory className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600">Planta</p>
                        <p className="text-xs font-bold text-red-600">{totalPower} kW</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resultados</h2>
          
          {score >= 750 ? (
            <div className="bg-green-100 border border-green-300 p-6 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-green-800 mb-2">¡Planta Operando Eficientemente!</h3>
              <p className="text-green-700 mb-4">
                Todas las máquinas funcionan correctamente con alta eficiencia energética
              </p>
              <div className="text-3xl font-bold text-green-600">+{score} puntos</div>
            </div>
          ) : score > 0 ? (
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Operación Parcial</h3>
              <p className="text-yellow-700 mb-4">
                Enciende más máquinas para alcanzar la máxima eficiencia
              </p>
              <div className="text-2xl font-bold text-yellow-600">+{score} puntos</div>
            </div>
          ) : (
            <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-700 mb-2">Sistema Inactivo</h3>
              <p className="text-gray-600">Activa las máquinas para comenzar la producción</p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Instrucciones:</h4>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Haz clic en las máquinas para encenderlas</li>
                <li>2. Monitorea la temperatura y alertas</li>
                <li>3. Usa parada de emergencia si es necesario</li>
                <li>4. Mantén 3+ máquinas funcionando para máxima eficiencia</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Objetivo:</h4>
              <p className="text-sm text-gray-600">
                🎯 Alimentar maquinaria industrial de forma segura manteniendo alta eficiencia de producción
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}