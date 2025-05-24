// src/components/GamesSection.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Star, RotateCcw, Trophy, Clock, Target, Zap, CheckCircle, XCircle } from 'lucide-react';

interface GamesSectionProps {
  isDarkMode: boolean;
  playSound: (sound: 'click' | 'success' | 'error' | 'toggle') => void;
  userProgress: {
    quizScore: number;
    gamesCompleted: number;
    experimentsViewed: string[];
    coloringPages: string[];
  };
  setUserProgress: (progress: any) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({ 
  isDarkMode, 
  playSound, 
  userProgress, 
  setUserProgress 
}) => {
  const [currentGame, setCurrentGame] = useState('quiz');
  const [gameData, setGameData] = useState({
    quiz: {
      currentQuestion: 0,
      score: 0,
      started: false,
      completed: false,
      timeLeft: 30,
      answers: [] as Array<{questionIndex: number, answer: number, correct: boolean}>
    },
    memory: {
      cards: [] as string[],
      flippedCards: [] as number[],
      matchedCards: [] as number[],
      moves: 0,
      started: false,
      completed: false,
      timeLeft: 120
    }
  });

  // Preguntas del quiz
  const quizQuestions = [
    {
      question: "¿En qué año fue fundada Electrohuila?",
      options: ["1945", "1947", "1950", "1955"],
      correct: 1,
      explanation: "Electrohuila fue fundada el 17 de julio de 1947"
    },
    {
      question: "¿Qué tipo de energía utiliza principalmente Electrohuila?",
      options: ["Solar", "Eólica", "Hidroeléctrica", "Nuclear"],
      correct: 2,
      explanation: "Electrohuila genera energía hidroeléctrica usando los ríos del Huila"
    },
    {
      question: "¿Cuál es la capacidad instalada de las plantas de Electrohuila?",
      options: ["5.32 MW", "8.32 MW", "10.32 MW", "12.32 MW"],
      correct: 1,
      explanation: "Las plantas tienen una capacidad instalada de 8.32 MW"
    },
    {
      question: "¿Cuál es el eslogan de Electrohuila?",
      options: ["Energía limpia", "Transmitimos buena energía", "Luz para todos", "Poder eléctrico"],
      correct: 1,
      explanation: "El eslogan es 'Transmitimos buena energía, generamos confianza y distribuimos bienestar'"
    },
    {
      question: "¿En qué departamento opera Electrohuila?",
      options: ["Caquetá", "Tolima", "Huila", "Putumayo"],
      correct: 2,
      explanation: "Electrohuila opera en el departamento del Huila"
    }
  ];

  // Inicializar juego de memoria
  const initMemoryGame = () => {
    const symbols = ["⚡", "🌊", "🏠", "💡", "🔌", "⚙️", "🌱", "🔋"];
    const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    setGameData(prev => ({
      ...prev,
      memory: {
        cards,
        flippedCards: [],
        matchedCards: [],
        moves: 0,
        started: true,
        completed: false,
        timeLeft: 120
      }
    }));
  };

  // Timer para juegos
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const currentGameData = gameData[currentGame as keyof typeof gameData];
    
    if ((currentGame === 'quiz' && currentGameData.started && !currentGameData.completed) ||
        (currentGame === 'memory' && currentGameData.started && !currentGameData.completed)) {
      
      interval = setInterval(() => {
        setGameData(prev => {
          const newTimeLeft = prev[currentGame as keyof typeof prev].timeLeft - 1;
          
          if (newTimeLeft <= 0) {
            // Tiempo agotado
            if (currentGame === 'quiz') {
              return {
                ...prev,
                quiz: { ...prev.quiz, completed: true, timeLeft: 0 }
              };
            } else if (currentGame === 'memory') {
              return {
                ...prev,
                memory: { ...prev.memory, completed: true, timeLeft: 0 }
              };
            }
          }
          
          return {
            ...prev,
            [currentGame]: { ...prev[currentGame as keyof typeof prev], timeLeft: newTimeLeft }
          };
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [currentGame, gameData]);

  // Manejar respuesta del quiz
  const handleQuizAnswer = (answerIndex: number) => {
    const currentQ = quizQuestions[gameData.quiz.currentQuestion];
    const isCorrect = answerIndex === currentQ.correct;
    
    if (isCorrect) {
      playSound('success');
    } else {
      playSound('error');
    }

    const newAnswers = [...gameData.quiz.answers, { 
      questionIndex: gameData.quiz.currentQuestion, 
      answer: answerIndex, 
      correct: isCorrect 
    }];
    const newScore = gameData.quiz.score + (isCorrect ? 1 : 0);
    const nextQuestion = gameData.quiz.currentQuestion + 1;
    
    setGameData(prev => ({
      ...prev,
      quiz: {
        ...prev.quiz,
        score: newScore,
        answers: newAnswers,
        currentQuestion: nextQuestion,
        completed: nextQuestion >= quizQuestions.length
      }
    }));

    // Actualizar progreso del usuario
    if (nextQuestion >= quizQuestions.length) {
      setUserProgress((prev: any) => ({
        ...prev,
        quizScore: Math.max(prev.quizScore || 0, newScore),
        gamesCompleted: prev.gamesCompleted + 1
      }));
    }
  };

  // Manejar click en carta de memoria
  const handleCardClick = (index: number) => {
    const { flippedCards, matchedCards } = gameData.memory;
    
    if (flippedCards.length >= 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    const newMoves = gameData.memory.moves + (newFlipped.length === 1 ? 1 : 0);

    setGameData(prev => ({
      ...prev,
      memory: {
        ...prev.memory,
        flippedCards: newFlipped,
        moves: newMoves
      }
    }));

    if (newFlipped.length === 2) {
      setTimeout(() => {
        const [first, second] = newFlipped;
        const isMatch = gameData.memory.cards[first] === gameData.memory.cards[second];
        
        if (isMatch) {
          playSound('success');
          const newMatched = [...gameData.memory.matchedCards, first, second];
          const isCompleted = newMatched.length === gameData.memory.cards.length;
          
          setGameData(prev => ({
            ...prev,
            memory: {
              ...prev.memory,
              matchedCards: newMatched,
              flippedCards: [],
              completed: isCompleted
            }
          }));

          if (isCompleted) {
            setUserProgress((prev: any) => ({
              ...prev,
              gamesCompleted: prev.gamesCompleted + 1
            }));
          }
        } else {
          playSound('error');
          setGameData(prev => ({
            ...prev,
            memory: { ...prev.memory, flippedCards: [] }
          }));
        }
      }, 1000);
    }
  };

  // Reiniciar juego
  const resetGame = (gameType: 'quiz' | 'memory') => {
    playSound('click');
    
    if (gameType === 'quiz') {
      setGameData(prev => ({
        ...prev,
        quiz: {
          currentQuestion: 0,
          score: 0,
          started: false,
          completed: false,
          timeLeft: 30,
          answers: []
        }
      }));
    } else if (gameType === 'memory') {
      setGameData(prev => ({
        ...prev,
        memory: {
          cards: [],
          flippedCards: [],
          matchedCards: [],
          moves: 0,
          started: false,
          completed: false,
          timeLeft: 120
        }
      }));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Muy Fácil': return 'bg-green-500';
      case 'Fácil': return 'bg-blue-500';
      case 'Intermedio': return 'bg-yellow-500';
      case 'Avanzado': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const games = [
    { id: 'quiz', name: 'Quiz Eléctrico', icon: '🧠', color: 'yellow' },
    { id: 'memory', name: 'Memoria Eléctrica', icon: '🃏', color: 'blue' },
    { id: 'circuit', name: 'Arma Circuitos', icon: '🔌', color: 'green' }
  ];

  return (
    <div className={`min-h-screen py-12 transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50'
    }`}>
      <div className="container mx-auto px-4">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-purple-800'
          }`}>
            🎮 ¡Juegos Eléctricos!
          </h2>
          <p className={`text-lg md:text-xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-3xl mx-auto`}>
            Aprende sobre electricidad mientras te diviertes con nuestros juegos educativos
          </p>
        </div>

        {/* Selector de juegos */}
        <div className="flex justify-center mb-8">
          <div className={`flex space-x-2 p-2 rounded-full ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}>
            {games.map(game => {
              const colorClasses = {
                yellow: currentGame === game.id 
                  ? 'bg-yellow-500 text-white' 
                  : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100',
                blue: currentGame === game.id 
                  ? 'bg-blue-500 text-white' 
                  : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100',
                green: currentGame === game.id 
                  ? 'bg-green-500 text-white' 
                  : isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              };

              return (
                <button
                  key={game.id}
                  onClick={() => {
                    setCurrentGame(game.id);
                    playSound('click');
                  }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${colorClasses[game.color as keyof typeof colorClasses]}`}
                >
                  <span className="text-2xl">{game.icon}</span>
                  <span className="hidden md:inline">{game.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Área de juego */}
        <div className="max-w-4xl mx-auto">
          
          {/* Quiz Eléctrico */}
          {currentGame === 'quiz' && (
            <div className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-sm rounded-2xl shadow-xl border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } p-8`}>
              
              {/* Header del quiz */}
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                }`}>
                  🧠 Quiz Eléctrico
                </h3>
                
                {gameData.quiz.started && !gameData.quiz.completed && (
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <Clock className="w-5 h-5" />
                      <span className={`font-bold ${
                        gameData.quiz.timeLeft <= 10 ? 'text-red-500' : ''
                      }`}>
                        {gameData.quiz.timeLeft}s
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <Target className="w-5 h-5" />
                      <span>{gameData.quiz.score}/{quizQuestions.length}</span>
                    </div>
                  </div>
                )}
              </div>

              {!gameData.quiz.started ? (
                // Pantalla de inicio
                <div className="text-center">
                  <div className="text-8xl mb-6">🧠</div>
                  <p className={`text-lg mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    ¡Pon a prueba tus conocimientos sobre Electrohuila!
                  </p>
                  <div className={`grid md:grid-cols-3 gap-4 mb-8 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      <span>📝</span>
                      <span>{quizQuestions.length} preguntas</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>⏱️</span>
                      <span>30 segundos por pregunta</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>🏆</span>
                      <span>Gana puntos por respuestas correctas</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setGameData(prev => ({
                        ...prev,
                        quiz: { ...prev.quiz, started: true, timeLeft: 30 }
                      }));
                      playSound('success');
                    }}
                    className="bg-yellow-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-600 transition-colors shadow-lg"
                  >
                    ¡Empezar Quiz! 🚀
                  </button>
                </div>
              ) : !gameData.quiz.completed ? (
                // Pregunta actual
                <div>
                  <div className={`mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Pregunta {gameData.quiz.currentQuestion + 1} de {quizQuestions.length}
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className={`w-full h-2 rounded-full mb-6 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-2 bg-yellow-500 rounded-full transition-all duration-300"
                      style={{ width: `${((gameData.quiz.currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    />
                  </div>

                  <h4 className={`text-xl md:text-2xl font-bold mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {quizQuestions[gameData.quiz.currentQuestion].question}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {quizQuestions[gameData.quiz.currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className={`p-4 text-left rounded-xl transition-all duration-300 border-2 hover:scale-105 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-yellow-400' 
                            : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-yellow-400'
                        }`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Resultados finales
                <div className="text-center">
                  <div className="text-8xl mb-6">
                    {gameData.quiz.score === quizQuestions.length ? '🏆' : 
                     gameData.quiz.score >= quizQuestions.length * 0.7 ? '🎉' : '👍'}
                  </div>
                  
                  <h4 className={`text-3xl font-bold mb-4 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    ¡Quiz Completado!
                  </h4>
                  
                  <p className={`text-xl mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Tu puntuación: {gameData.quiz.score} de {quizQuestions.length}
                  </p>
                  
                  {/* Estrellas */}
                  <div className="flex justify-center space-x-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-8 h-8 ${
                          i < (gameData.quiz.score / quizQuestions.length) * 5 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Respuestas detalladas */}
                  <div className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  } rounded-xl p-6 mb-6 text-left`}>
                    <h5 className={`font-bold mb-4 ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      Revisión de Respuestas:
                    </h5>
                    {gameData.quiz.answers.map((answer, index) => {
                      const question = quizQuestions[answer.questionIndex];
                      return (
                        <div key={index} className="mb-4 p-3 rounded-lg border-l-4 border-gray-400">
                          <div className="flex items-start space-x-2">
                            {answer.correct ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                            )}
                            <div>
                              <p className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-800'
                              }`}>
                                {question.question}
                              </p>
                              <p className={`text-sm mt-1 ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => resetGame('quiz')}
                    className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Jugar de Nuevo</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Juego de Memoria */}
          {currentGame === 'memory' && (
            <div className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-sm rounded-2xl shadow-xl border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } p-8`}>
              
              {/* Header del juego de memoria */}
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  🃏 Memoria Eléctrica
                </h3>
                
                {gameData.memory.started && !gameData.memory.completed && (
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <Clock className="w-5 h-5" />
                      <span className={`font-bold ${
                        gameData.memory.timeLeft <= 30 ? 'text-red-500' : ''
                      }`}>
                        {Math.floor(gameData.memory.timeLeft / 60)}:{(gameData.memory.timeLeft % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <Target className="w-5 h-5" />
                      <span>Movimientos: {gameData.memory.moves}</span>
                    </div>
                  </div>
                )}
              </div>

              {!gameData.memory.started ? (
                // Pantalla de inicio
                <div className="text-center">
                  <div className="text-8xl mb-6">🃏</div>
                  <p className={`text-lg mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    ¡Encuentra las parejas de elementos eléctricos!
                  </p>
                  <div className={`grid md:grid-cols-3 gap-4 mb-8 text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <div className="flex items-center justify-center space-x-2">
                      <span>🎯</span>
                      <span>8 parejas que encontrar</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>⏱️</span>
                      <span>2 minutos de tiempo</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>🧠</span>
                      <span>Ejercita tu memoria</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      initMemoryGame();
                      playSound('success');
                    }}
                    className="bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    ¡Empezar Juego! 🎯
                  </button>
                </div>
              ) : !gameData.memory.completed ? (
                // Tablero de juego
                <div>
                  <div className={`mb-6 text-center ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Parejas encontradas: {gameData.memory.matchedCards.length / 2} de 8
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className={`w-full h-2 rounded-full mb-6 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(gameData.memory.matchedCards.length / 16) * 100}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                    {gameData.memory.cards.map((card, index) => {
                      const isFlipped = gameData.memory.flippedCards.includes(index);
                      const isMatched = gameData.memory.matchedCards.includes(index);
                      const isVisible = isFlipped || isMatched;

                      return (
                        <button
                          key={index}
                          onClick={() => handleCardClick(index)}
                          disabled={isMatched || gameData.memory.flippedCards.length >= 2}
                          className={`aspect-square text-3xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                            isMatched
                              ? 'bg-green-500 text-white shadow-lg animate-pulse'
                              : isFlipped
                              ? isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                              : isDarkMode 
                                ? 'bg-gray-700 text-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-300 text-gray-300 hover:bg-gray-400'
                          }`}
                        >
                          {isVisible ? card : '?'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Pantalla de resultados
                <div className="text-center">
                  <div className="text-8xl mb-6">🎉</div>
                  <h4 className={`text-3xl font-bold mb-4 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    ¡Felicitaciones!
                  </h4>
                  <p className={`text-xl mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Completaste el juego en {gameData.memory.moves} movimientos
                  </p>
                  
                  {/* Puntuación basada en eficiencia */}
                  <div className="flex justify-center space-x-2 mb-6">
                    {[...Array(5)].map((_, i) => {
                      const efficiency = Math.max(0, 5 - Math.floor(gameData.memory.moves / 4));
                      return (
                        <Star 
                          key={i} 
                          className={`w-8 h-8 ${
                            i < efficiency ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`} 
                        />
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => resetGame('memory')}
                    className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Jugar de Nuevo</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Juego de Circuitos (Próximamente) */}
          {currentGame === 'circuit' && (
            <div className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-sm rounded-2xl shadow-xl border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } p-8 text-center`}>
              
              <div className="text-8xl mb-6">🔌</div>
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                Arma Circuitos
              </h3>
              <p className={`text-lg mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                ¡Próximamente! Aprende a armar circuitos eléctricos simples de forma interactiva.
              </p>
              
              <div className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              } rounded-xl p-6 mb-6`}>
                <h4 className={`font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  🔧 Características que tendrá:
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Componentes arrastrables
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Simulación en tiempo real
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Diferentes niveles
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Explicaciones educativas
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setCurrentGame('quiz')}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors"
                >
                  Jugar Quiz 🧠
                </button>
                <button
                  onClick={() => setCurrentGame('memory')}
                  className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors"
                >
                  Jugar Memoria 🃏
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas del jugador */}
        {(userProgress.gamesCompleted > 0 || userProgress.quizScore > 0) && (
          <div className="mt-12">
            <div className={`${
              isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-sm rounded-2xl shadow-xl border ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } p-8`}>
              <h3 className={`text-2xl font-bold text-center mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                🏆 Tus Estadísticas de Juego
              </h3>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎮</div>
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {userProgress.gamesCompleted || 0}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Juegos Completados
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {userProgress.quizScore || 0}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Mejor Puntuación Quiz
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-2">🏅</div>
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {userProgress.quizScore >= 4 ? 'Experto' : 
                     userProgress.quizScore >= 3 ? 'Avanzado' : 
                     userProgress.quizScore >= 2 ? 'Intermedio' : 'Principiante'}
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Nivel Actual
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className={`text-3xl font-bold ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>
                    {userProgress.quizScore ? Math.round((userProgress.quizScore / 5) * 100) : 0}%
                  </div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Precisión Quiz
                  </div>
                </div>
              </div>

              {/* Logros */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h4 className={`text-lg font-bold text-center mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  🏆 Logros Desbloqueados
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { 
                      name: 'Primer Juego', 
                      icon: '🎮', 
                      unlocked: userProgress.gamesCompleted >= 1,
                      description: 'Completa tu primer juego'
                    },
                    { 
                      name: 'Quiz Master', 
                      icon: '🧠', 
                      unlocked: userProgress.quizScore >= 4,
                      description: 'Responde 4 o más preguntas correctas'
                    },
                    { 
                      name: 'Memoria Perfecta', 
                      icon: '🃏', 
                      unlocked: userProgress.gamesCompleted >= 3,
                      description: 'Completa el juego de memoria'
                    },
                    { 
                      name: 'Experto Eléctrico', 
                      icon: '⚡', 
                      unlocked: userProgress.quizScore === 5,
                      description: 'Responde todas las preguntas correctas'
                    }
                  ].map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        achievement.unlocked
                          ? isDarkMode ? 'bg-yellow-800/50 border border-yellow-600' : 'bg-yellow-100 border border-yellow-300'
                          : isDarkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-gray-100 border border-gray-300'
                      }`}
                    >
                      <div className={`text-2xl mb-1 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className={`text-xs font-bold ${
                        achievement.unlocked
                          ? isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </div>
                      <div className={`text-xs mt-1 ${
                        achievement.unlocked
                          ? isDarkMode ? 'text-yellow-200' : 'text-yellow-600'
                          : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consejos para mejorar */}
        <div className="mt-12">
          <div className={`${
            isDarkMode ? 'bg-gradient-to-r from-blue-800 to-purple-800' : 'bg-gradient-to-r from-blue-500 to-purple-600'
          } rounded-2xl p-8 shadow-xl text-white`}>
            <h3 className="text-2xl font-bold text-center mb-6">
              💡 Consejos para Mejorar
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold mb-2">Para el Quiz</h4>
                <p className="text-sm text-blue-100">
                  Lee las preguntas con calma. ¡La información está en la sección Aprender!
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">🃏</div>
                <h4 className="font-bold mb-2">Para Memoria</h4>
                <p className="text-sm text-blue-100">
                  Trata de recordar la posición de las cartas que ya viste.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h4 className="font-bold mb-2">General</h4>
                <p className="text-sm text-blue-100">
                  ¡Practica regularmente para mejorar tus puntajes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesSection;