'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Clock, Star, Trophy, CheckCircle, XCircle, Zap } from 'lucide-react';

const QuizElectroHuila = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const questions = [
    {
      id: 1,
      question: "¿En qué año fue fundada ElectroHuila?",
      answers: ["1960", "1965", "1970", "1975"],
      correct: 1,
      difficulty: "easy",
      category: "Historia",
      explanation: "ElectroHuila fue fundada en 1965 para servir al departamento del Huila."
    },
    {
      id: 2,
      question: "¿Cuál es la sede principal de ElectroHuila?",
      answers: ["Pitalito", "Neiva", "Garzón", "La Plata"],
      correct: 1,
      difficulty: "easy",
      category: "Ubicación",
      explanation: "La sede principal de ElectroHuila está ubicada en Neiva, capital del Huila."
    },
    {
      id: 3,
      question: "¿Qué tipo de energía renovable es más abundante en el Huila?",
      answers: ["Solar", "Eólica", "Hidráulica", "Geotérmica"],
      correct: 2,
      difficulty: "medium",
      category: "Energía",
      explanation: "El Huila tiene gran potencial hidráulico gracias al río Magdalena y sus afluentes."
    },
    {
      id: 4,
      question: "¿Cuántos municipios atiende ElectroHuila?",
      answers: ["35", "37", "39", "41"],
      correct: 1,
      difficulty: "medium",
      category: "Cobertura",
      explanation: "ElectroHuila presta servicios a 37 municipios del departamento del Huila."
    },
    {
      id: 5,
      question: "¿Cuál es el voltaje estándar residencial en Colombia?",
      answers: ["110V", "120V", "220V", "240V"],
      correct: 0,
      difficulty: "easy",
      category: "Técnico",
      explanation: "El voltaje estándar para uso residencial en Colombia es 110V."
    },
    {
      id: 6,
      question: "¿Qué significa la sigla LED?",
      answers: ["Light Energy Device", "Light Emitting Diode", "Low Energy Display", "Luminous Electric Device"],
      correct: 1,
      difficulty: "medium",
      category: "Tecnología",
      explanation: "LED significa Light Emitting Diode (Diodo Emisor de Luz)."
    },
    {
      id: 7,
      question: "¿Cuál es la unidad de medida de la potencia eléctrica?",
      answers: ["Amperio", "Voltio", "Vatio", "Ohmio"],
      correct: 2,
      difficulty: "medium",
      category: "Técnico",
      explanation: "El vatio (W) es la unidad de medida de la potencia eléctrica."
    },
    {
      id: 8,
      question: "¿Qué es un transformador eléctrico?",
      answers: ["Un generador de energía", "Un dispositivo que cambia voltaje", "Un medidor de consumo", "Un protector de circuitos"],
      correct: 1,
      difficulty: "hard",
      category: "Técnico",
      explanation: "Un transformador es un dispositivo que permite aumentar o disminuir el voltaje de la corriente eléctrica."
    },
    {
      id: 9,
      question: "¿Cuál es el río más importante del Huila para generación hidroeléctrica?",
      answers: ["Río Páez", "Río Magdalena", "Río Suaza", "Río Neiva"],
      correct: 1,
      difficulty: "medium",
      category: "Geografía",
      explanation: "El río Magdalena es el más importante para la generación hidroeléctrica en el Huila."
    },
    {
      id: 10,
      question: "¿Qué es la eficiencia energética?",
      answers: ["Usar más energía", "Ahorrar dinero", "Usar menos energía para el mismo resultado", "Generar más energía"],
      correct: 2,
      difficulty: "easy",
      category: "Sostenibilidad",
      explanation: "La eficiencia energética es usar menos energía para obtener el mismo resultado o servicio."
    },
    {
      id: 11,
      question: "¿Cuál de estos es un electrodoméstico que más consume energía?",
      answers: ["Refrigerador", "Televisor", "Bombilla", "Cargador de celular"],
      correct: 0,
      difficulty: "easy",
      category: "Consumo",
      explanation: "El refrigerador es uno de los electrodomésticos que más energía consume en el hogar."
    },
    {
      id: 12,
      question: "¿Qué es un kilovatio-hora (kWh)?",
      answers: ["Una medida de voltaje", "Una medida de corriente", "Una medida de energía consumida", "Una medida de potencia"],
      correct: 2,
      difficulty: "hard",
      category: "Técnico",
      explanation: "El kilovatio-hora es la unidad de medida de energía eléctrica consumida."
    }
  ];

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Mezclar preguntas al iniciar
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showResult && !gameComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted && !showResult) {
      // Tiempo agotado, marcar como incorrecta
      handleAnswer(-1);
    }
  }, [timeLeft, gameStarted, showResult, gameComplete]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
    setTimeLeft(30);
    
    // Mezclar preguntas de nuevo
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  const handleAnswer = (answerIndex) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const question = shuffledQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;

    if (isCorrect) {
      // Calcular puntos basado en dificultad y tiempo
      let points = 100;
      if (question.difficulty === 'medium') points = 150;
      if (question.difficulty === 'hard') points = 200;
      
      // Bonus por tiempo restante
      const timeBonus = timeLeft * 2;
      
      // Bonus por racha
      const newStreak = streak + 1;
      const streakBonus = newStreak >= 3 ? newStreak * 10 : 0;
      
      const totalPoints = points + timeBonus + streakBonus;
      
      setScore(prev => prev + totalPoints);
      setCorrectAnswers(prev => prev + 1);
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
    } else {
      setStreak(0);
    }

    // Avanzar a la siguiente pregunta después de 3 segundos
    setTimeout(() => {
      if (currentQuestion < shuffledQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameComplete(true);
      }
    }, 3000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccuracy = () => {
    const total = currentQuestion + (showResult || gameComplete ? 1 : 0);
    return total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Quiz ElectroHuila
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Demuestra cuánto sabes sobre ElectroHuila, electricidad y energía renovable. 
              Responde 12 preguntas en tiempo limitado y consigue la puntuación más alta.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-purple-50 p-4 rounded-xl">
                <Brain className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">12 Preguntas</h3>
                <p className="text-sm text-gray-600">Sobre ElectroHuila y energía</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">30 Segundos</h3>
                <p className="text-sm text-gray-600">Por pregunta</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Bonus por Tiempo</h3>
                <p className="text-sm text-gray-600">Respuestas rápidas</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Rachas</h3>
                <p className="text-sm text-gray-600">Bonus por respuestas consecutivas</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Dificultades</h3>
              <div className="flex justify-center gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <span className="font-semibold">Fácil</span> - 100 pts
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                  <span className="font-semibold">Medio</span> - 150 pts
                </div>
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
                  <span className="font-semibold">Difícil</span> - 200 pts
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
            >
              🧠 ¡Comenzar Quiz!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameComplete) {
    const accuracy = getAccuracy();
    let performance = "¡Sigue practicando!";
    if (accuracy >= 90) performance = "¡Experto en ElectroHuila!";
    else if (accuracy >= 75) performance = "¡Muy buen conocimiento!";
    else if (accuracy >= 60) performance = "¡Buen trabajo!";

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Quiz Completado
          </h2>
          
          <p className="text-lg font-semibold text-purple-600 mb-6">
            {performance}
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600">Puntuación Total</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-green-600">{correctAnswers}/12</div>
                <div className="text-xs text-gray-600">Correctas</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{accuracy}%</div>
                <div className="text-xs text-gray-600">Precisión</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-yellow-600">{maxStreak}</div>
              <div className="text-xs text-gray-600">Mejor Racha</div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl w-full"
          >
            Jugar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  const question = shuffledQuestions[currentQuestion];
  if (!question) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header del juego */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Pregunta {currentQuestion + 1}/12</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty === 'easy' ? 'Fácil' : question.difficulty === 'medium' ? 'Medio' : 'Difícil'}
              </div>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {question.category}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{score}</span>
              </div>
              {streak > 0 && (
                <div className="bg-orange-100 px-3 py-1 rounded-full">
                  <span className="text-orange-600 font-semibold">🔥 {streak}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Barra de progreso */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Pregunta */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          <div className="grid gap-4">
            {question.answers.map((answer, index) => {
              let buttonClass = "p-4 rounded-xl border-2 transition-all duration-200 text-left font-medium ";
              
              if (showResult) {
                if (index === question.correct) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800";
                } else if (index === selectedAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "border-purple-500 bg-purple-50 text-purple-800";
                } else {
                  buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      showResult && index === question.correct ? 'bg-green-500 text-white' :
                      showResult && index === selectedAnswer && index !== question.correct ? 'bg-red-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{answer}</span>
                    {showResult && index === question.correct && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explicación */}
          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start gap-2">
                <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-blue-800 mb-1">Explicación:</div>
                  <div className="text-blue-700">{question.explanation}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas en tiempo real */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Progreso</h3>
            <div className="text-2xl font-bold text-purple-600">
              {currentQuestion + 1}/12
            </div>
            <div className="text-sm text-gray-600">
              {Math.round(((currentQuestion + 1) / 12) * 100)}% completado
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Precisión</h3>
            <div className="text-2xl font-bold text-green-600">
              {getAccuracy()}%
            </div>
            <div className="text-sm text-gray-600">
              {correctAnswers} de {currentQuestion + (showResult ? 1 : 0)} correctas
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2">Racha Actual</h3>
            <div className="text-2xl font-bold text-orange-600">
              {streak}
            </div>
            <div className="text-sm text-gray-600">
              Máxima: {maxStreak}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizElectroHuila;