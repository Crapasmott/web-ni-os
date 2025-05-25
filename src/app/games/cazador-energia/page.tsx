'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Sun, Droplets, Zap, MapPin, Trophy, Star, Clock, Target, ArrowLeft, X } from 'lucide-react';

const CazadorEnergia = ({ onBack }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 4, y: 4 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [foundSources, setFoundSources] = useState(new Set());
  const [energySources, setEnergySources] = useState([]);
  const [showMessage, setShowMessage] = useState('');
  const [combo, setCombo] = useState(0);

  const levels = [
    {
      id: 1,
      name: "Valle del Magdalena",
      timeLimit: 120,
      target: 5,
      sources: { solar: 3, wind: 2, hydro: 1 },
      terrain: 'valley'
    },
    {
      id: 2,
      name: "Cordillera Oriental",
      timeLimit: 150,
      target: 7,
      sources: { solar: 2, wind: 4, hydro: 2 },
      terrain: 'mountain'
    },
    {
      id: 3,
      name: "Desierto de la Tatacoa",
      timeLimit: 180,
      target: 8,
      sources: { solar: 6, wind: 1, hydro: 1 },
      terrain: 'desert'
    },
    {
      id: 4,
      name: "Zona Cafetera",
      timeLimit: 200,
      target: 10,
      sources: { solar: 3, wind: 3, hydro: 4 },
      terrain: 'forest'
    },
    {
      id: 5,
      name: "Región Amazónica",
      timeLimit: 240,
      target: 12,
      sources: { solar: 2, wind: 2, hydro: 8 },
      terrain: 'jungle'
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  const energyTypes = {
    solar: { icon: Sun, color: 'text-yellow-500 bg-yellow-100', name: 'Solar', points: 10 },
    wind: { icon: Wind, color: 'text-blue-500 bg-blue-100', name: 'Eólica', points: 15 },
    hydro: { icon: Droplets, color: 'text-cyan-500 bg-cyan-100', name: 'Hidráulica', points: 20 }
  };

  const terrainColors = {
    valley: 'bg-green-200',
    mountain: 'bg-gray-300',
    desert: 'bg-yellow-200',
    forest: 'bg-green-300',
    jungle: 'bg-green-400'
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
  }, [timeLeft, gameStarted, gameComplete]);

  useEffect(() => {
    generateEnergySources();
  }, [currentLevel]);

  const generateEnergySources = () => {
    const sources = [];
    const { solar, wind, hydro } = currentLevelData.sources;
    
    // Generar fuentes solares
    for (let i = 0; i < solar; i++) {
      sources.push({
        id: `solar-${i}`,
        type: 'solar',
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8),
        found: false
      });
    }
    
    // Generar fuentes eólicas
    for (let i = 0; i < wind; i++) {
      sources.push({
        id: `wind-${i}`,
        type: 'wind',
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8),
        found: false
      });
    }
    
    // Generar fuentes hidráulicas
    for (let i = 0; i < hydro; i++) {
      sources.push({
        id: `hydro-${i}`,
        type: 'hydro',
        x: Math.floor(Math.random() * 8),
        y: Math.floor(Math.random() * 8),
        found: false
      });
    }
    
    setEnergySources(sources);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(1);
    setPlayerPosition({ x: 4, y: 4 });
    setScore(0);
    setTimeLeft(levels[0].timeLimit);
    setFoundSources(new Set());
    setGameComplete(false);
    setCombo(0);
    generateEnergySources();
  };

  const movePlayer = (direction) => {
    if (!gameStarted || gameComplete || timeLeft === 0) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, playerPosition.y - 1);
        break;
      case 'down':
        newY = Math.min(7, playerPosition.y + 1);
        break;
      case 'left':
        newX = Math.max(0, playerPosition.x - 1);
        break;
      case 'right':
        newX = Math.min(7, playerPosition.x + 1);
        break;
    }

    setPlayerPosition({ x: newX, y: newY });
    checkForEnergySource(newX, newY);
  };

  const checkForEnergySource = (x, y) => {
    const source = energySources.find(s => 
      s.x === x && s.y === y && !foundSources.has(s.id)
    );

    if (source) {
      findEnergySource(source);
    }
  };

  const findEnergySource = (source) => {
    setFoundSources(prev => new Set([...prev, source.id]));
    
    const energyType = energyTypes[source.type];
    const basePoints = energyType.points;
    const comboBonus = combo * 5;
    const totalPoints = basePoints + comboBonus;
    
    setScore(prev => prev + totalPoints);
    setCombo(prev => prev + 1);
    
    setShowMessage(`¡${energyType.name} encontrada! +${totalPoints} puntos ${comboBonus > 0 ? `(Combo x${combo})` : ''}`);
    
    setTimeout(() => setShowMessage(''), 2000);

    // Verificar si se completó el nivel
    if (foundSources.size + 1 >= currentLevelData.target) {
      setTimeout(() => completeLevel(), 1000);
    }
  };

  const completeLevel = () => {
    const timeBonus = timeLeft * 5;
    const comboBonus = combo * 50;
    const levelScore = 500 + timeBonus + comboBonus;
    
    setScore(prev => prev + levelScore);
    setShowMessage(`¡Nivel completado! +${levelScore} puntos`);

    setTimeout(() => {
      if (currentLevel < levels.length) {
        setCurrentLevel(prev => prev + 1);
        setPlayerPosition({ x: 4, y: 4 });
        setTimeLeft(levels[currentLevel].timeLimit);
        setFoundSources(new Set());
        setCombo(0);
        generateEnergySources();
        setShowMessage(`Siguiente nivel: ${levels[currentLevel].name}`);
      } else {
        setGameComplete(true);
        setShowMessage('¡Felicidades! Has explorado toda Colombia');
      }
    }, 2000);
  };

  const endGame = () => {
    setShowMessage('¡Se acabó el tiempo!');
    setTimeout(() => {
      setGameStarted(false);
      setCurrentLevel(1);
      setScore(0);
      setFoundSources(new Set());
      setCombo(0);
    }, 2000);
  };

  const handleBackToMenu = () => {
    if (onBack) {
      onBack(); // Función pasada como prop
    } else {
      // Fallback si no hay función onBack
      window.history.back();
    }
  };

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          movePlayer('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          movePlayer('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          movePlayer('right');
          break;
        case 'Escape':
          handleBackToMenu();
          break;
      }
    };

    if (gameStarted) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [gameStarted, playerPosition]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 p-4">
        <div className="max-w-4xl mx-auto">
          {/* BOTÓN DE REGRESO EN PANTALLA DE INICIO */}
          <div className="mb-4">
            <button
              onClick={handleBackToMenu}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Menú
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Cazador de Energía
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Encuentra fuentes de energía renovable por todo el Huila. Explora diferentes 
              regiones, descubre paneles solares, molinos de viento y plantas hidráulicas 
              antes de que se acabe el tiempo.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-yellow-50 p-4 rounded-xl">
                <Sun className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Energía Solar</h3>
                <p className="text-sm text-gray-600">Paneles solares en zonas soleadas</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <Wind className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Energía Eólica</h3>
                <p className="text-sm text-gray-600">Molinos de viento en montañas</p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-xl">
                <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Energía Hidráulica</h3>
                <p className="text-sm text-gray-600">Plantas hidroeléctricas en ríos</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Regiones para Explorar</h3>
              <div className="space-y-2">
                {levels.map((level, index) => (
                  <div key={level.id} className="bg-gray-50 p-3 rounded-lg text-left">
                    <div className="font-semibold">{level.name}</div>
                    <div className="text-sm text-gray-600">
                      Encuentra {level.target} fuentes en {formatTime(level.timeLimit)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Controles</h3>
              <div className="flex justify-center gap-4 text-sm flex-wrap">
                <div className="bg-gray-100 px-3 py-2 rounded">Flechas del teclado</div>
                <div className="bg-gray-100 px-3 py-2 rounded">WASD</div>
                <div className="bg-gray-100 px-3 py-2 rounded">Botones táctiles</div>
                <div className="bg-gray-100 px-3 py-2 rounded">ESC - Salir</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
            >
              🔍 ¡Comenzar Exploración!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-teal-800 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header del juego con botón de regreso */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* BOTÓN DE REGRESO EN EL JUEGO */}
              <button
                onClick={handleBackToMenu}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-all duration-200"
                title="Volver al menú (ESC)"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Menú</span>
              </button>

              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Nivel {currentLevel}: {currentLevelData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>{foundSources.size}/{currentLevelData.target} fuentes</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className={`font-semibold ${timeLeft < 30 ? 'text-red-500' : ''}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{score} puntos</span>
              </div>
              {combo > 1 && (
                <div className="bg-orange-100 px-3 py-1 rounded-full">
                  <span className="text-orange-600 font-semibold">Combo x{combo}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mensaje del juego */}
        {showMessage && (
          <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center font-semibold">
            {showMessage}
          </div>
        )}

        {/* Tablero de juego */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <div className="grid grid-cols-8 gap-2 mb-4">
            {Array.from({ length: 64 }, (_, index) => {
              const x = index % 8;
              const y = Math.floor(index / 8);
              const isPlayer = playerPosition.x === x && playerPosition.y === y;
              const source = energySources.find(s => s.x === x && s.y === y);
              const isSourceFound = source && foundSources.has(source.id);
              const isSourceHidden = source && !foundSources.has(source.id);
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square rounded-lg transition-all duration-200 relative
                    ${terrainColors[currentLevelData.terrain]} border border-gray-300
                    ${isPlayer ? 'ring-4 ring-yellow-400' : ''}
                  `}
                >
                  {/* Terreno base */}
                  <div className="absolute inset-0 opacity-20">
                  </div>
                  
                  {/* Jugador */}
                  {isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  
                  {/* Fuente de energía encontrada */}
                  {isSourceFound && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className={`w-6 h-6 rounded-full ${energyTypes[source.type].color} flex items-center justify-center`}>
                        {React.createElement(energyTypes[source.type].icon, { 
                          className: `w-4 h-4 ${energyTypes[source.type].color.split(' ')[0]}` 
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Indicador sutil de fuente oculta (solo cerca del jugador) */}
                  {isSourceHidden && Math.abs(x - playerPosition.x) <= 1 && Math.abs(y - playerPosition.y) <= 1 && (
                    <div className="absolute inset-0 flex items-center justify-center z-5">
                      <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span>Explorador</span>
            </div>
            {Object.entries(energyTypes).map(([type, config]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full ${config.color} flex items-center justify-center`}>
                  {React.createElement(config.icon, { 
                    className: `w-4 h-4 ${config.color.split(' ')[0]}` 
                  })}
                </div>
                <span>{config.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Controles táctiles */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => movePlayer('up')}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
              disabled={timeLeft === 0}
            >
              ↑
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => movePlayer('left')}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
                disabled={timeLeft === 0}
              >
                ←
              </button>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <button
                onClick={() => movePlayer('right')}
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
                disabled={timeLeft === 0}
              >
                →
              </button>
            </div>
            <button
              onClick={() => movePlayer('down')}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg"
              disabled={timeLeft === 0}
            >
              ↓
            </button>
          </div>
        </div>

        {/* Panel de estadísticas */}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Fuentes Encontradas</h3>
            <div className="space-y-2">
              {Object.entries(energyTypes).map(([type, config]) => {
                const found = energySources.filter(s => s.type === type && foundSources.has(s.id)).length;
                const total = currentLevelData.sources[type];
                return (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {React.createElement(config.icon, { 
                        className: `w-4 h-4 ${config.color.split(' ')[0]}` 
                      })}
                      <span className="text-sm">{config.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{found}/{total}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Progreso del Nivel</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(foundSources.size / currentLevelData.target) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 text-center">
              {Math.round((foundSources.size / currentLevelData.target) * 100)}% completado
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Bonificaciones</h3>
            <div className="space-y-1 text-sm">
              <div>Tiempo restante: +{timeLeft * 5} pts</div>
              <div>Combo actual: x{combo}</div>
              <div className="text-green-600">Próximo combo: +{(combo + 1) * 5} pts</div>
            </div>
          </div>
        </div>

        {/* Modal de juego completado */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Explorador Experto!
              </h2>
              <p className="text-gray-600 mb-6">
                Has encontrado todas las fuentes de energía renovable en Colombia.
                ¡ElectroHuila tiene un futuro sostenible gracias a ti!
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="font-semibold text-lg">Puntuación Final</div>
                <div className="text-2xl font-bold text-green-600">{score} puntos</div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setGameComplete(false);
                    setCurrentLevel(1);
                    setScore(0);
                    setFoundSources(new Set());
                    setCombo(0);
                  }}
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Explorar de Nuevo
                </button>
                <button
                  onClick={handleBackToMenu}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Volver al Menú
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CazadorEnergia;