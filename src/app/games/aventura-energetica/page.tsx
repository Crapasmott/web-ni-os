'use client';

import React, { useState, useEffect } from 'react';
import { Zap, MapPin, Star, Home, Trophy, Battery, Lightbulb, ArrowLeft, X } from 'lucide-react';

// Agrega onBack como prop para manejar la navegación
const AventuraEnergetica = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [energy, setEnergy] = useState(100);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [connectedHouses, setConnectedHouses] = useState(new Set());
  const [showMessage, setShowMessage] = useState('');

  const municipalities = [
    { name: 'Neiva', houses: 8, reward: 100 },
    { name: 'Pitalito', houses: 6, reward: 80 },
    { name: 'Garzón', houses: 5, reward: 70 },
    { name: 'La Plata', houses: 4, reward: 60 },
    { name: 'San Agustín', houses: 3, reward: 50 }
  ];

  const currentMunicipality = municipalities[currentLevel - 1];

  // Generar casas aleatorias para el nivel actual
  const generateHouses = () => {
    const houses = [];
    for (let i = 0; i < currentMunicipality.houses; i++) {
      houses.push({
        id: i,
        x: Math.floor(Math.random() * 8) + 1,
        y: Math.floor(Math.random() * 6) + 1,
        connected: connectedHouses.has(`${currentLevel}-${i}`)
      });
    }
    return houses;
  };

  const [houses, setHouses] = useState(generateHouses());

  useEffect(() => {
    setHouses(generateHouses());
  }, [currentLevel, connectedHouses]);

  const movePlayer = (direction) => {
    if (!gameStarted || gameComplete) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, playerPosition.y - 1);
        break;
      case 'down':
        newY = Math.min(5, playerPosition.y + 1);
        break;
      case 'left':
        newX = Math.max(0, playerPosition.x - 1);
        break;
      case 'right':
        newX = Math.min(7, playerPosition.x + 1);
        break;
    }

    setPlayerPosition({ x: newX, y: newY });
    setEnergy(prev => Math.max(0, prev - 2));

    // Verificar si hay una casa en la nueva posición
    const houseAtPosition = houses.find(house => 
      Math.abs(house.x - newX) <= 1 && Math.abs(house.y - newY) <= 1
    );

    if (houseAtPosition && !houseAtPosition.connected) {
      connectHouse(houseAtPosition);
    }
  };

  const connectHouse = (house) => {
    const houseKey = `${currentLevel}-${house.id}`;
    if (!connectedHouses.has(houseKey)) {
      setConnectedHouses(prev => new Set([...prev, houseKey]));
      setScore(prev => prev + 20);
      setEnergy(prev => Math.min(100, prev + 10));
      setShowMessage('¡Casa conectada! +20 puntos');
      
      setTimeout(() => setShowMessage(''), 2000);

      // Verificar si se completó el nivel
      if (connectedHouses.size + 1 >= currentMunicipality.houses) {
        setTimeout(() => {
          if (currentLevel < municipalities.length) {
            setCurrentLevel(prev => prev + 1);
            setPlayerPosition({ x: 0, y: 0 });
            setEnergy(100);
            setScore(prev => prev + currentMunicipality.reward);
            setShowMessage(`¡Nivel completado! Siguiente: ${municipalities[currentLevel].name}`);
          } else {
            setGameComplete(true);
            setShowMessage('¡Felicidades! Has llevado luz a todo el Huila');
          }
        }, 1000);
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(1);
    setPlayerPosition({ x: 0, y: 0 });
    setEnergy(100);
    setScore(0);
    setConnectedHouses(new Set());
    setGameComplete(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentLevel(1);
    setPlayerPosition({ x: 0, y: 0 });
    setEnergy(100);
    setScore(0);
    setConnectedHouses(new Set());
    setGameComplete(false);
    setShowMessage('');
  };

  const handleBackToMenu = () => {
    if (onBack) {
      onBack(); // Función pasada como prop
    } else {
      // Fallback si no hay función onBack
      window.history.back();
    }
  };

  // Usar las teclas del teclado para mover
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

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Aventura Energética
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Ayuda a ElectroHuila a llevar luz a todo el Huila. Navega por los municipios, 
              conecta casas y asegúrate de que todas las familias tengan electricidad.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-orange-50 p-4 rounded-xl">
                <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Objetivo</h3>
                <p className="text-sm text-gray-600">Conectar todas las casas de cada municipio</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Energía</h3>
                <p className="text-sm text-gray-600">Administra tu energía sabiamente</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Municipios</h3>
                <p className="text-sm text-gray-600">5 niveles para completar</p>
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

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
              >
                🚀 ¡Jugar Ahora!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
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
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Nivel {currentLevel}: {currentMunicipality.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-green-600" />
                <span>{connectedHouses.size}/{currentMunicipality.houses} casas</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{score} puntos</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-blue-500" />
                <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      energy > 50 ? 'bg-green-500' : energy > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${energy}%` }}
                  />
                </div>
              </div>
              <button
                onClick={resetGame}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Reiniciar
              </button>
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
          <div className="grid grid-cols-8 gap-2 mb-4" style={{ aspectRatio: '4/3' }}>
            {Array.from({ length: 48 }, (_, index) => {
              const x = index % 8;
              const y = Math.floor(index / 8);
              const house = houses.find(h => h.x === x && h.y === y);
              const isPlayer = playerPosition.x === x && playerPosition.y === y;
              
              return (
                <div
                  key={index}
                  className={`
                    relative rounded-lg border-2 transition-all duration-200
                    ${isPlayer ? 'bg-yellow-400 border-yellow-600 shadow-lg' : 'bg-green-100 border-green-200'}
                    ${house ? 'ring-2 ring-blue-400' : ''}
                  `}
                >
                  {isPlayer && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-800" />
                    </div>
                  )}
                  
                  {house && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`p-1 rounded ${house.connected ? 'bg-green-500' : 'bg-gray-400'}`}>
                        {house.connected ? (
                          <Lightbulb className="w-4 h-4 text-yellow-300" />
                        ) : (
                          <Home className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controles táctiles */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => movePlayer('up')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
              disabled={energy <= 0}
            >
              ↑
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => movePlayer('left')}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
                disabled={energy <= 0}
              >
                ←
              </button>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <button
                onClick={() => movePlayer('right')}
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
                disabled={energy <= 0}
              >
                →
              </button>
            </div>
            <button
              onClick={() => movePlayer('down')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg"
              disabled={energy <= 0}
            >
              ↓
            </button>
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
                ¡Misión Completada!
              </h2>
              <p className="text-gray-600 mb-6">
                Has llevado electricidad a todos los municipios del Huila.
                ElectroHuila está orgullosa de tu trabajo.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <div className="font-semibold text-lg">Puntuación Final</div>
                <div className="text-2xl font-bold text-yellow-600">{score} puntos</div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl"
                >
                  Jugar de Nuevo
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

export default AventuraEnergetica;