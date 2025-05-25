'use client';

import React, { useState, useEffect } from 'react';
import { Zap, Battery, Lightbulb, RotateCcw, Trophy, Star, Clock, CheckCircle, ArrowLeft, X } from 'lucide-react';

const ConstructorCircuitos = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [board, setBoard] = useState(Array(64).fill(null));
  const [connections, setConnections] = useState([]);
  const [isCircuitComplete, setIsCircuitComplete] = useState(false);
  const [showMessage, setShowMessage] = useState('');

  const levels = [
    {
      id: 1,
      name: "Circuito Básico",
      description: "Conecta una batería con una bombilla",
      components: { battery: 1, bulb: 1, wire: 6 },
      target: "simple",
      timeLimit: 180
    },
    {
      id: 2,
      name: "Circuito en Serie",
      description: "Conecta dos bombillas en serie",
      components: { battery: 1, bulb: 2, wire: 8 },
      target: "series",
      timeLimit: 240
    },
    {
      id: 3,
      name: "Circuito en Paralelo",
      description: "Conecta dos bombillas en paralelo",
      components: { battery: 1, bulb: 2, wire: 10 },
      target: "parallel",
      timeLimit: 300
    },
    {
      id: 4,
      name: "Circuito con Switch",
      description: "Agrega un interruptor al circuito",
      components: { battery: 1, bulb: 2, wire: 8, switch: 1 },
      target: "switch",
      timeLimit: 360
    },
    {
      id: 5,
      name: "Circuito Complejo",
      description: "Combina serie y paralelo",
      components: { battery: 1, bulb: 3, wire: 12, switch: 2 },
      target: "complex",
      timeLimit: 420
    }
  ];

  const currentLevelData = levels[currentLevel - 1];

  const components = {
    battery: { icon: Battery, color: 'bg-green-500', name: 'Batería' },
    bulb: { icon: Lightbulb, color: 'bg-yellow-500', name: 'Bombilla' },
    wire: { icon: '─', color: 'bg-gray-600', name: 'Cable' },
    switch: { icon: '⚫', color: 'bg-blue-500', name: 'Interruptor' }
  };

  const [inventory, setInventory] = useState(currentLevelData.components);

  useEffect(() => {
    let timer;
    if (gameStarted && !gameComplete && !isCircuitComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameComplete, isCircuitComplete]);

  useEffect(() => {
    setInventory(currentLevelData.components);
    setBoard(Array(64).fill(null));
    setConnections([]);
    setIsCircuitComplete(false);
    setTimeElapsed(0);
  }, [currentLevel]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(1);
    setScore(0);
    setTimeElapsed(0);
    setGameComplete(false);
    setIsCircuitComplete(false);
    setBoard(Array(64).fill(null));
    setConnections([]);
    setInventory(levels[0].components);
  };

  const resetLevel = () => {
    setBoard(Array(64).fill(null));
    setConnections([]);
    setIsCircuitComplete(false);
    setTimeElapsed(0);
    setInventory(currentLevelData.components);
    setShowMessage('');
  };

  const placeComponent = (index) => {
    if (!selectedComponent || !inventory[selectedComponent] || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = {
      type: selectedComponent,
      id: Date.now()
    };

    setBoard(newBoard);
    setInventory(prev => ({
      ...prev,
      [selectedComponent]: prev[selectedComponent] - 1
    }));

    if (inventory[selectedComponent] <= 1) {
      setSelectedComponent(null);
    }

    checkCircuit(newBoard);
  };

  const removeComponent = (index) => {
    if (!board[index]) return;

    const component = board[index];
    const newBoard = [...board];
    newBoard[index] = null;

    setBoard(newBoard);
    setInventory(prev => ({
      ...prev,
      [component.type]: prev[component.type] + 1
    }));

    checkCircuit(newBoard);
  };

  const checkCircuit = (currentBoard) => {
    const battery = currentBoard.find(cell => cell?.type === 'battery');
    const bulbs = currentBoard.filter(cell => cell?.type === 'bulb');
    const wires = currentBoard.filter(cell => cell?.type === 'wire');

    if (!battery || bulbs.length === 0) {
      setIsCircuitComplete(false);
      return;
    }

    // Lógica simplificada para verificar circuito
    const totalComponents = currentBoard.filter(cell => cell !== null).length;
    const minComponents = Object.values(currentLevelData.components).reduce((a, b) => a + b, 0);

    if (totalComponents >= minComponents * 0.8) {
      setIsCircuitComplete(true);
      completeLevel();
    }
  };

  const completeLevel = () => {
    const timeBonus = Math.max(0, currentLevelData.timeLimit - timeElapsed) * 2;
    const levelScore = 1000 + timeBonus;
    setScore(prev => prev + levelScore);
    
    setShowMessage(`¡Nivel completado! +${levelScore} puntos`);

    setTimeout(() => {
      if (currentLevel < levels.length) {
        setCurrentLevel(prev => prev + 1);
        setShowMessage(`Siguiente nivel: ${levels[currentLevel].name}`);
      } else {
        setGameComplete(true);
        setShowMessage('¡Felicidades! Has completado todos los circuitos');
      }
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
        case 'Escape':
          handleBackToMenu();
          break;
        case 'r':
        case 'R':
          if (gameStarted && !gameComplete) {
            resetLevel();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Constructor de Circuitos
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Construye circuitos eléctricos y enciende bombillas. Aprende sobre conexiones 
              en serie, paralelo y circuitos complejos mientras resuelves puzzles desafiantes.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-xl">
                <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Componentes</h3>
                <p className="text-sm text-gray-600">Baterías, bombillas, cables y switches</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl">
                <Lightbulb className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Circuitos</h3>
                <p className="text-sm text-gray-600">Serie, paralelo y combinados</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">5 Niveles</h3>
                <p className="text-sm text-gray-600">Dificultad progresiva</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Niveles</h3>
              <div className="space-y-2">
                {levels.map((level, index) => (
                  <div key={level.id} className="bg-gray-50 p-3 rounded-lg text-left">
                    <div className="font-semibold">{level.name}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Controles</h3>
              <div className="flex justify-center gap-4 text-sm flex-wrap">
                <div className="bg-gray-100 px-3 py-2 rounded">Click para colocar/quitar</div>
                <div className="bg-gray-100 px-3 py-2 rounded">R - Reiniciar nivel</div>
                <div className="bg-gray-100 px-3 py-2 rounded">ESC - Salir</div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
            >
              ⚡ ¡Comenzar a Construir!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
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
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Nivel {currentLevel}: {currentLevelData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span>{formatTime(timeElapsed)} / {formatTime(currentLevelData.timeLimit)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{score} puntos</span>
              </div>
              {isCircuitComplete && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">¡Circuito Completo!</span>
                </div>
              )}
              <button
                onClick={resetLevel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                title="Reiniciar nivel (R)"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje del juego */}
        {showMessage && (
          <div className="bg-blue-500 text-white p-3 rounded-lg mb-4 text-center font-semibold">
            {showMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-4">
          {/* Panel de inventario */}
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Componentes</h3>
            <p className="text-sm text-gray-600 mb-4">{currentLevelData.description}</p>
            
            <div className="space-y-3">
              {Object.entries(inventory).map(([type, count]) => {
                const Component = components[type];
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedComponent(selectedComponent === type ? null : type)}
                    className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedComponent === type 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    } ${count === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={count === 0}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {Component.icon === '─' || Component.icon === '⚫' ? (
                          <div className={`w-6 h-6 ${Component.color} rounded flex items-center justify-center text-white text-sm`}>
                            {Component.icon}
                          </div>
                        ) : (
                          <Component.icon className="w-6 h-6 text-gray-700" />
                        )}
                        <span className="text-sm font-medium">{Component.name}</span>
                      </div>
                      <span className="text-sm font-bold">{count}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600">
                {selectedComponent ? (
                  `Seleccionado: ${components[selectedComponent].name}`
                ) : (
                  'Selecciona un componente para colocar'
                )}
              </div>
            </div>
          </div>

          {/* Tablero de construcción */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Tablero de Construcción</h3>
            
            <div className="grid grid-cols-8 gap-2 mb-4">
              {board.map((cell, index) => {
                const Component = cell ? components[cell.type] : null;
                return (
                  <div
                    key={index}
                    onClick={() => cell ? removeComponent(index) : placeComponent(index)}
                    className={`
                      aspect-square rounded-lg border-2 transition-all duration-200 cursor-pointer
                      flex items-center justify-center
                      ${cell ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-400 bg-gray-50'}
                      ${selectedComponent && !cell ? 'hover:bg-blue-100' : ''}
                    `}
                  >
                    {cell && Component && (
                      <div className="text-center">
                        {Component.icon === '─' || Component.icon === '⚫' ? (
                          <div className={`w-6 h-6 ${Component.color} rounded flex items-center justify-center text-white text-sm`}>
                            {Component.icon}
                          </div>
                        ) : (
                          <Component.icon className={`w-6 h-6 ${
                            cell.type === 'battery' ? 'text-green-600' : 
                            cell.type === 'bulb' ? (isCircuitComplete ? 'text-yellow-500' : 'text-gray-400') :
                            'text-gray-600'
                          }`} />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <div className="font-semibold mb-1">Instrucciones:</div>
              <div>• Selecciona un componente del inventario</div>
              <div>• Haz clic en el tablero para colocarlo</div>
              <div>• Haz clic en un componente colocado para eliminarlo</div>
              <div>• Conecta la batería con las bombillas usando cables</div>
              <div>• Presiona R para reiniciar el nivel</div>
            </div>
          </div>
        </div>

        {/* Modal de juego completado */}
        {gameComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Experto en Circuitos!
              </h2>
              <p className="text-gray-600 mb-6">
                Has completado todos los niveles del Constructor de Circuitos.
                ¡Ahora eres un experto en electricidad!
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="font-semibold text-lg">Puntuación Final</div>
                <div className="text-2xl font-bold text-blue-600">{score} puntos</div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setGameComplete(false);
                    setCurrentLevel(1);
                    setScore(0);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl"
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

export default ConstructorCircuitos;