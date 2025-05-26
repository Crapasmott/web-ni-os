'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Network, Brain, Sun, Wind, Battery, Home, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function MicroredInteligentePage() {
  const [aiEnabled, setAiEnabled] = useState(false);
  const [solarOutput, setSolarOutput] = useState(400);
  const [windOutput, setWindOutput] = useState(300);
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [consumption, setConsumption] = useState(600);
  const [gridConnected, setGridConnected] = useState(true);
  const [energyExported, setEnergyExported] = useState(0);
  const [energyImported, setEnergyImported] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'cloudy' | 'windy' | 'calm'>('sunny');
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (aiEnabled) {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Cambiar condiciones climáticas cada 10 segundos
        if (timeElapsed % 10 === 0) {
          const conditions: ('sunny' | 'cloudy' | 'windy' | 'calm')[] = ['sunny', 'cloudy', 'windy', 'calm'];
          setWeatherCondition(conditions[Math.floor(Math.random() * conditions.length)]);
        }

        // Ajustar generación según clima
        setSolarOutput(prev => {
          let target = 400;
          switch (weatherCondition) {
            case 'sunny': target = 450; break;
            case 'cloudy': target = 150; break;
            case 'windy': target = 300; break;
            case 'calm': target = 350; break;
          }
          return Math.max(0, prev + (target - prev) * 0.1 + (Math.random() - 0.5) * 50);
        });

        setWindOutput(prev => {
          let target = 300;
          switch (weatherCondition) {
            case 'windy': target = 500; break;
            case 'calm': target = 50; break;
            case 'sunny': target = 200; break;
            case 'cloudy': target = 350; break;
          }
          return Math.max(0, prev + (target - prev) * 0.1 + (Math.random() - 0.5) * 40);
        });

        // Variación en consumo
        setConsumption(prev => {
          const baseConsumption = 600;
          const timeVariation = Math.sin(timeElapsed / 20) * 100; // Ciclo de demanda
          const randomVariation = (Math.random() - 0.5) * 50;
          return Math.max(300, baseConsumption + timeVariation + randomVariation);
        });

        // Gestión automática de baterías y red
        setBatteryLevel(prev => {
          const totalGeneration = solarOutput + windOutput;
          const balance = totalGeneration - consumption;
          
          if (balance > 0) {
            // Exceso: cargar baterías
            if (prev < 95) {
              return Math.min(100, prev + (balance / 1000) * 2);
            } else if (gridConnected) {
              // Exportar a la red
              setEnergyExported(prevExp => prevExp + balance / 1000);
            }
          } else if (balance < 0) {
            // Déficit: usar baterías
            if (prev > 10) {
              return Math.max(0, prev + (balance / 1000) * 3);
            } else if (gridConnected) {
              // Importar de la red
              setEnergyImported(prevImp => prevImp + Math.abs(balance) / 1000);
            }
          }
          return prev;
        });

        // Calcular score
        const totalGeneration = solarOutput + windOutput;
        const efficiency = Math.min(100, (totalGeneration / consumption) * 100);
        const renewablePercentage = (totalGeneration / (totalGeneration + energyImported)) * 100;
        
        if (efficiency >= 85 && batteryLevel > 50 && renewablePercentage > 80) {
          setScore(1000);
        } else {
          setScore(Math.round(efficiency * 5 + batteryLevel * 2 + renewablePercentage * 3));
        }
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [aiEnabled, timeElapsed, weatherCondition, solarOutput, windOutput, consumption, batteryLevel, gridConnected, energyImported]);

  const totalGeneration = solarOutput + windOutput;
  const efficiency = Math.round((totalGeneration / consumption) * 100);
  const energyBalance = totalGeneration - consumption;
  const renewablePercentage = totalGeneration > 0 ? Math.round((totalGeneration / (totalGeneration + energyImported)) * 100) : 0;

  const getWeatherIcon = () => {
    switch (weatherCondition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'windy': return '💨';
      case 'calm': return '🌤️';
    }
  };

  const getWeatherDescription = () => {
    switch (weatherCondition) {
      case 'sunny': return 'Soleado - Óptimo para solar';
      case 'cloudy': return 'Nublado - Solar reducido';
      case 'windy': return 'Ventoso - Óptimo para eólico';
      case 'calm': return 'Calmo - Eólico reducido';
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/circuits" className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver a Simuladores</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {aiEnabled && (
              <div className="bg-blue-500 text-white px-4 py-2 rounded-full animate-pulse">
                <Brain className="w-4 h-4 inline mr-2" />
                IA Activa
              </div>
            )}
            
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="text-lg mr-2">{getWeatherIcon()}</span>
              <span className="text-sm font-medium">{weatherCondition}</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="bg-emerald-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Network className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Microred Inteligente</h1>
          <p className="text-gray-600">Red eléctrica del futuro con energías renovables que se autogestiona</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Experto</span>
            <span className="text-sm text-gray-600">⏱️ 50 min</span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">1000 pts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Smart Grid Visualization */}
          <div className="xl:col-span-3 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-emerald-600" />
              Red Inteligente
            </h2>

            {/* Weather Status */}
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Condiciones Climáticas</h3>
              <div className="flex items-center gap-4">
                <span className="text-2xl">{getWeatherIcon()}</span>
                <span className="text-blue-700">{getWeatherDescription()}</span>
              </div>
            </div>

            {/* Energy Sources Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Solar */}
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="bg-yellow-400 w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">Energía Solar</h3>
                <p className="text-2xl font-bold text-yellow-600">{Math.round(solarOutput)}</p>
                <p className="text-xs text-gray-600">kW</p>
                <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((solarOutput / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Wind */}
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-400 w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">Energía Eólica</h3>
                <p className="text-2xl font-bold text-blue-600">{Math.round(windOutput)}</p>
                <p className="text-xs text-gray-600">kW</p>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((windOutput / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Battery */}
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                  batteryLevel > 50 ? 'bg-green-400' : batteryLevel > 20 ? 'bg-yellow-400' : 'bg-red-400'
                }`}>
                  <Battery className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">Almacenamiento</h3>
                <p className="text-2xl font-bold text-green-600">{Math.round(batteryLevel)}</p>
                <p className="text-xs text-gray-600">%</p>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
              </div>

              {/* Consumption */}
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="bg-purple-400 w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">Consumo</h3>
                <p className="text-2xl font-bold text-purple-600">{Math.round(consumption)}</p>
                <p className="text-xs text-gray-600">kW</p>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((consumption / 800) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Smart Grid Network Visualization */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-800 mb-4">Red de Distribución Inteligente</h3>
              <div className="relative h-32 bg-white rounded-lg p-4">
                {/* Central Hub */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    aiEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                  }`}>
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Energy Flow Lines */}
                {aiEnabled && (
                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" opacity="0.8" />
                    <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
                    <line x1="50%" y1="50%" x2="30%" y2="80%" stroke="#8b5cf6" strokeWidth="3" opacity="0.8" />
                    <line x1="50%" y1="50%" x2="70%" y2="80%" stroke="#ef4444" strokeWidth="3" opacity="0.8" />
                    
                    {/* Animated data flow */}
                    <circle r="3" fill="#fbbf24" className="animate-ping">
                      <animateMotion dur="2s" repeatCount="indefinite" path="M 20,30 L 50,50" />
                    </circle>
                  </svg>
                )}

                {/* Corner Indicators */}
                <div className="absolute top-2 left-2 text-xs bg-yellow-100 px-2 py-1 rounded">☀️ Solar</div>
                <div className="absolute top-2 right-2 text-xs bg-blue-100 px-2 py-1 rounded">💨 Eólico</div>
                <div className="absolute bottom-2 left-2 text-xs bg-purple-100 px-2 py-1 rounded">🏠 Residencial</div>
                <div className="absolute bottom-2 right-2 text-xs bg-red-100 px-2 py-1 rounded">🏭 Industrial</div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* AI Control */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                Control IA
              </h3>

              <div className="space-y-4">
                <button
                  onClick={() => setAiEnabled(!aiEnabled)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    aiEnabled 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  <Brain className="w-5 h-5 inline mr-2" />
                  {aiEnabled ? 'IA Activada 🤖' : 'Activar Control IA'}
                </button>

                <button
                  onClick={() => setGridConnected(!gridConnected)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    gridConnected 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Zap className="w-5 h-5 inline mr-2" />
                  {gridConnected ? 'Desconectar Red' : 'Conectar Red Principal'}
                </button>
              </div>

              {/* AI Features */}
              {aiEnabled && (
                <div className="mt-4 p-3 bg-blue-50 rounded-xl">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">Funciones IA Activas:</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Optimización automática de flujo energético</li>
                    <li>• Predicción de demanda en tiempo real</li>
                    <li>• Gestión inteligente de almacenamiento</li>
                    <li>• Balanceado automático de cargas</li>
                    <li>• Comercio energético con la red</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Energy Metrics */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Métricas
              </h3>

              <div className="space-y-4">
                {/* Total Generation */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-800">Generación Total</span>
                    <span className="text-lg font-bold text-green-600">{Math.round(totalGeneration)} kW</span>
                  </div>
                </div>

                {/* Energy Balance */}
                <div className={`p-3 rounded-lg ${
                  energyBalance >= 0 ? 'bg-blue-50' : 'bg-red-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      energyBalance >= 0 ? 'text-blue-800' : 'text-red-800'
                    }`}>
                      Balance Energético
                    </span>
                    <span className={`text-lg font-bold ${
                      energyBalance >= 0 ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {energyBalance > 0 ? '+' : ''}{Math.round(energyBalance)} kW
                    </span>
                  </div>
                </div>

                {/* Efficiency */}
                <div className={`p-3 rounded-lg ${
                  efficiency >= 85 ? 'bg-green-50' : efficiency >= 70 ? 'bg-yellow-50' : 'bg-red-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      efficiency >= 85 ? 'text-green-800' : efficiency >= 70 ? 'text-yellow-800' : 'text-red-800'
                    }`}>
                      Eficiencia
                    </span>
                    <span className={`text-lg font-bold ${
                      efficiency >= 85 ? 'text-green-600' : efficiency >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {efficiency}%
                    </span>
                  </div>
                </div>

                {/* Renewable Percentage */}
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-emerald-800">Energía Renovable</span>
                    <span className="text-lg font-bold text-emerald-600">{renewablePercentage}%</span>
                  </div>
                </div>
              </div>

              {/* Grid Trade */}
              {gridConnected && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Intercambio con Red</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-green-600">Exportado:</span>
                      <span className="font-medium">{energyExported.toFixed(1)} kWh</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Importado:</span>
                      <span className="font-medium">{energyImported.toFixed(1)} kWh</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resultados</h2>
          
          {score >= 1000 ? (
            <div className="bg-emerald-100 border border-emerald-300 p-6 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">¡Microred Autogestionada Perfectamente!</h3>
              <p className="text-emerald-700 mb-4">
                El sistema IA está optimizando automáticamente toda la red con máxima eficiencia renovable
              </p>
              <div className="text-3xl font-bold text-emerald-600 mb-4">+{score} puntos</div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold">Eficiencia</p>
                  <p className="text-emerald-600">{efficiency}%</p>
                </div>
                <div>
                  <p className="font-semibold">Renovable</p>
                  <p className="text-emerald-600">{renewablePercentage}%</p>
                </div>
                <div>
                  <p className="font-semibold">Almacenamiento</p>
                  <p className="text-emerald-600">{Math.round(batteryLevel)}%</p>
                </div>
              </div>
            </div>
          ) : score > 500 ? (
            <div className="bg-yellow-100 border border-yellow-300 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-yellow-800 mb-2">Sistema Funcionando Bien</h3>
              <p className="text-yellow-700 mb-4">
                La microred está operando eficientemente. Optimiza más para alcanzar el máximo rendimiento.
              </p>
              <div className="text-2xl font-bold text-yellow-600">+{score} puntos</div>
            </div>
          ) : (
            <div className="bg-gray-100 border border-gray-300 p-6 rounded-xl text-center">
              <h3 className="text-xl font-bold text-gray-700 mb-2">Configurando Sistema</h3>
              <p className="text-gray-600 mb-4">Active el control IA y espere a que el sistema se optimice automáticamente</p>
              <div className="text-xl font-bold text-gray-500">+{score} puntos</div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Instrucciones:</h4>
              <ol className="text-sm text-gray-600 space-y-1">
                <li>1. Activa el control de inteligencia artificial</li>
                <li>2. Observa cómo el sistema se adapta al clima</li>
                <li>3. Monitorea la gestión automática de energía</li>
                <li>4. El sistema optimiza baterías y red automáticamente</li>
                <li>5. Mantén eficiencia >85% y baterías >50%</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Objetivo:</h4>
              <p className="text-sm text-gray-600 mb-3">
                🎯 Autogestionar energía renovable para toda una comunidad con inteligencia artificial
              </p>
              <div className="bg-emerald-50 p-3 rounded-lg">
                <p className="text-xs text-emerald-800">
                  <strong>Meta:</strong> Lograr >85% eficiencia, >80% renovable, y >50% almacenamiento simultáneamente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}