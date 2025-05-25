'use client';
import React, { useState, useEffect } from 'react';
import { Plus, RotateCcw, Play, Sun, Zap, Home, Settings, TrendingUp, Trophy, Battery } from 'lucide-react';

const SolarFarmSimulator = () => {
  const [panels, setPanels] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState(12); // 12 = mediodía
  const [weather, setWeather] = useState('sunny'); // sunny, cloudy, rainy
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [dailyEnergy, setDailyEnergy] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);
  const [money, setMoney] = useState(10000); // Dinero inicial
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  const challenges = [
    {
      id: 1,
      name: "Casa Rural",
      target: 50,
      reward: 500,
      description: "Genera 50 kWh para una familia campesina",
      difficulty: "Fácil"
    },
    {
      id: 2,
      name: "Escuela del Huila",
      target: 200,
      reward: 2000,
      description: "Suministra energía a una escuela rural",
      difficulty: "Medio"
    },
    {
      id: 3,
      name: "Municipio Verde",
      target: 1000,
      reward: 10000,
      description: "Alimenta todo un municipio pequeño",
      difficulty: "Difícil"
    }
  ];

  const weatherTypes = {
    sunny: { name: 'Soleado', efficiency: 1.0, icon: '☀️' },
    cloudy: { name: 'Nublado', efficiency: 0.6, icon: '☁️' },
    rainy: { name: 'Lluvioso', efficiency: 0.3, icon: '🌧️' }
  };

  const addPanel = () => {
    if (money >= 1000) {
      const newPanel = {
        id: Date.now(),
        x: Math.random() * 400 + 50,
        y: Math.random() * 200 + 100,
        power: 400, // 400W por panel
        active: true
      };
      setPanels([...panels, newPanel]);
      setMoney(money - 1000);
    }
  };

  const resetSimulation = () => {
    setPanels([]);
    setTotalEnergy(0);
    setDailyEnergy(0);
    setCo2Saved(0);
    setMoney(10000);
    setIsRunning(false);
    setSelectedChallenge(null);
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const changeWeather = () => {
    const weathers = ['sunny', 'cloudy', 'rainy'];
    const currentIndex = weathers.indexOf(weather);
    const nextWeather = weathers[(currentIndex + 1) % weathers.length];
    setWeather(nextWeather);
  };

  const getSolarEfficiency = () => {
    // Eficiencia basada en hora del día (curva solar)
    const timeEfficiency = Math.max(0, Math.sin(((timeOfDay - 6) / 12) * Math.PI));
    const weatherEfficiency = weatherTypes[weather].efficiency;
    return timeEfficiency * weatherEfficiency;
  };

  const getCurrentPower = () => {
    const efficiency = getSolarEfficiency();
    return panels.reduce((total, panel) => total + (panel.power * efficiency), 0);
  };

  // Simulación en tiempo real
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const currentPower = getCurrentPower();
        const energyIncrement = currentPower / 3600; // kWh por segundo (simulado)
        
        setTotalEnergy(prev => prev + energyIncrement);
        setDailyEnergy(prev => prev + energyIncrement);
        setCo2Saved(prev => prev + (energyIncrement * 0.5)); // 0.5 kg CO2 por kWh
        
        // Avanzar tiempo (1 segundo = 10 minutos en simulación)
        setTimeOfDay(prev => {
          const newTime = prev + 0.167; // 10 minutos = 0.167 horas
          return newTime > 24 ? 0 : newTime;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, panels, weather, timeOfDay]);

  const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.floor((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Regresar
            </button>
            <button 
              onClick={() => window.open('/', '_self')}
              className="flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transform hover:scale-105 transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              Inicio
            </button>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌞 Simulador de Granja Solar ElectroHuila
          </h1>
          <p className="text-xl text-gray-600">
            Construye tu propia granja solar y genera energía limpia para el Huila
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel de Control */}
          <div className="lg:col-span-1 space-y-4">
            {/* Controles */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="text-blue-500" />
                Controles
              </h3>
              
              <div className="space-y-3">
                <button 
                  onClick={addPanel}
                  disabled={money < 1000}
                  className="w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Agregar Panel ($1,000)
                </button>
                
                <button 
                  onClick={toggleSimulation}
                  className={`w-full py-3 font-bold rounded-xl flex items-center justify-center gap-2 ${
                    isRunning 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Play className="w-5 h-5" />
                  {isRunning ? 'Pausar' : 'Iniciar'} Simulación
                </button>
                
                <button 
                  onClick={changeWeather}
                  className="w-full py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">{weatherTypes[weather].icon}</span>
                  Cambiar Clima
                </button>
                
                <button 
                  onClick={resetSimulation}
                  className="w-full py-3 bg-gray-500 text-white font-bold rounded-xl hover:bg-gray-600 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reiniciar
                </button>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-green-500" />
                Estadísticas
              </h3>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Potencia Actual</div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {Math.round(getCurrentPower())} W
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Energía Total</div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(totalEnergy)} kWh
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Paneles Activos</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {panels.length}
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">CO₂ Evitado</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(co2Saved)} kg
                  </div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Dinero</div>
                  <div className="text-2xl font-bold text-orange-600">
                    ${money.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Desafíos */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-500" />
                Desafíos
              </h3>
              
              <div className="space-y-2">
                {challenges.map((challenge) => (
                  <button
                    key={challenge.id}
                    onClick={() => setSelectedChallenge(challenge)}
                    className={`w-full p-3 text-left rounded-xl border-2 transition-all ${
                      selectedChallenge?.id === challenge.id
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-sm">{challenge.name}</div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        +${challenge.reward}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{challenge.description}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Meta: {challenge.target} kWh</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        challenge.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                        challenge.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    {totalEnergy >= challenge.target && (
                      <div className="text-xs text-green-600 font-bold mt-1">¡Completado! ✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Área de Simulación */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Granja Solar del Huila</h3>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold flex items-center gap-2">
                      <Sun className="w-6 h-6 text-yellow-500" />
                      {formatTime(timeOfDay)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {weatherTypes[weather].name} - {Math.round(getSolarEfficiency() * 100)}% Eficiencia
                    </div>
                  </div>
                </div>
              </div>

              {/* Campo Solar */}
              <div className="bg-gradient-to-b from-blue-200 to-green-200 rounded-xl h-96 relative overflow-hidden border-4 border-gray-300">
                {/* Sol */}
                <div 
                  className="absolute w-12 h-12 transition-all duration-1000"
                  style={{
                    top: `${20 + Math.sin(((timeOfDay - 6) / 12) * Math.PI) * -10}px`,
                    right: `${20 + Math.cos(((timeOfDay - 6) / 12) * Math.PI) * 100}px`,
                    opacity: getSolarEfficiency() + 0.3
                  }}
                >
                  <Sun className="w-12 h-12 text-yellow-400" />
                </div>

                {/* Montañas del Huila */}
                <div className="absolute bottom-0 left-0 right-0">
                  <svg viewBox="0 0 400 100" className="w-full h-24 text-green-600">
                    <path d="M0,100 L0,60 L50,30 L100,50 L150,20 L200,40 L250,15 L300,35 L350,25 L400,35 L400,100 Z" 
                          fill="currentColor" opacity="0.4"/>
                  </svg>
                </div>

                {/* Paneles Solares */}
                {panels.map((panel) => (
                  <div
                    key={panel.id}
                    className="absolute w-8 h-6 bg-blue-900 border border-gray-400 rounded-sm shadow-lg transform hover:scale-110 transition-transform cursor-pointer"
                    style={{
                      left: `${panel.x}px`,
                      top: `${panel.y}px`,
                      opacity: getSolarEfficiency() > 0.1 ? 1 : 0.7
                    }}
                    title={`Panel ${panel.id} - ${Math.round(panel.power * getSolarEfficiency())}W`}
                  >
                    {/* Reflejo solar */}
                    {getSolarEfficiency() > 0.3 && (
                      <div className="absolute inset-0 bg-yellow-300 opacity-30 animate-pulse"></div>
                    )}
                  </div>
                ))}

                {/* Mensaje inicial */}
                {panels.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white bg-opacity-90 rounded-xl p-6">
                      <Home className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 font-semibold">
                        Haz clic en "Agregar Panel" para construir tu granja solar
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Información del Desafío Activo */}
              {selectedChallenge && (
                <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-yellow-800">
                        🎯 Desafío Activo: {selectedChallenge.name}
                      </h4>
                      <p className="text-yellow-700 text-sm">{selectedChallenge.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-800">
                        {Math.round(totalEnergy)} / {selectedChallenge.target} kWh
                      </div>
                      <div className="w-32 bg-yellow-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((totalEnergy / selectedChallenge.target) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarFarmSimulator;