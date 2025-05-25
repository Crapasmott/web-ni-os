import React, { useState } from 'react';
import { Zap, Play, BookOpen, Calculator, Atom, Lightbulb, PlayCircle, Brain, CheckCircle, ArrowRight } from 'lucide-react';

const ElectricitySection = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizQuestions = [
    {
      id: 1,
      question: "¿Qué son los electrones?",
      options: [
        "Partículas que crean electricidad al moverse",
        "Tipos de cables eléctricos",
        "Máquinas que producen energía",
        "Luces muy brillantes"
      ],
      correctAnswer: 0,
      explanation: "¡Correcto! Los electrones son partículas muy pequeñas que al moverse crean la electricidad."
    },
    {
      id: 2,
      question: "¿Cómo es la corriente eléctrica?",
      options: [
        "Como el viento que sopla",
        "Como agua que fluye por una manguera",
        "Como arena en el desierto",
        "Como nubes en el cielo"
      ],
      correctAnswer: 1,
      explanation: "¡Exacto! La corriente eléctrica es como agua que fluye por una manguera, pero son electrones que se mueven por los cables."
    },
    {
      id: 3,
      question: "¿Qué es el voltaje?",
      options: [
        "El color de la electricidad",
        "El ruido que hace la electricidad",
        "La fuerza que empuja a los electrones",
        "El tamaño de los cables"
      ],
      correctAnswer: 2,
      explanation: "¡Perfecto! El voltaje es la fuerza que empuja a los electrones, como la presión del agua en una manguera."
    }
  ];

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
  };

  const getScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="space-y-8">
      {/* Título Principal */}
      <div className="text-center">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">¿Qué es la Electricidad?</h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Aprende los conceptos básicos de la energía eléctrica y descubre cómo funciona el mundo que nos rodea
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Conceptos Básicos */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-yellow-200">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h4 className="text-2xl font-bold text-gray-800">Conceptos Básicos</h4>
          </div>
          
          <div className="space-y-4">
            {/* Electrones */}
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h5 className="font-bold text-gray-800">Electrones</h5>
              </div>
              <p className="text-gray-600 text-sm">
                Partículas muy pequeñas que se mueven y crean la electricidad. ¡Son como hormigas invisibles trabajando!
              </p>
            </div>

            {/* Corriente */}
            <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h5 className="font-bold text-gray-800">Corriente</h5>
              </div>
              <p className="text-gray-600 text-sm">
                El movimiento de los electrones por un cable, como el agua que fluye por una manguera.
              </p>
            </div>

            {/* Voltaje */}
            <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded-r-xl">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-600" />
                <h5 className="font-bold text-gray-800">Voltaje</h5>
              </div>
              <p className="text-gray-600 text-sm">
                La fuerza que empuja a los electrones. ¡Como la presión del agua en una manguera!
              </p>
            </div>
          </div>
        </div>

        {/* Experimenta en Casa */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-orange-200">
          <div className="flex items-center gap-3 mb-6">
            <Atom className="w-8 h-8 text-orange-500" />
            <h4 className="text-2xl font-bold text-gray-800">Experimenta en Casa</h4>
          </div>

          {/* Experimento del Globo Mágico */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white mb-6">
            <h5 className="text-xl font-bold mb-3">Experimento: Globo Mágico</h5>
            <p className="text-lg mb-4">¡Crea electricidad estática en casa!</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <span>Infla un globo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <span>Frótalo en tu cabello 10 veces</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <span>Acércalo a pedacitos de papel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <span>¡Observa cómo se pegan!</span>
              </div>
            </div>

            <button 
              onClick={() => setShowVideoModal(true)}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Ver Video del Experimento
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-200">
        <div className="text-center">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h4 className="text-3xl font-bold text-purple-800 mb-4">🧠 ¡Pon a Prueba lo que Aprendiste!</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-100 rounded-xl p-4">
              <h5 className="font-bold text-blue-800 mb-2">¿Qué son los electrones?</h5>
              <p className="text-blue-700 text-sm">Partículas que crean electricidad al moverse</p>
              <ArrowRight className="w-4 h-4 text-blue-600 mt-2" />
            </div>
            
            <div className="bg-green-100 rounded-xl p-4">
              <h5 className="font-bold text-green-800 mb-2">¿Cómo es la corriente eléctrica?</h5>
              <p className="text-green-700 text-sm">Como agua que fluye por una manguera</p>
              <ArrowRight className="w-4 h-4 text-green-600 mt-2" />
            </div>
          </div>

          <button 
            onClick={() => setShowQuizModal(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto"
          >
            <Brain className="w-6 h-6" />
            Completar Quiz Completo
          </button>
        </div>
      </div>

      {/* Modal del Video - ACTUALIZADO CON REPRODUCTOR REAL */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">🎬 Video: Experimento del Globo Mágico</h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
              >
                ×
              </button>
            </div>
            
            {/* REPRODUCTOR DE VIDEO REAL */}
            <div className="bg-black rounded-xl overflow-hidden mb-6 shadow-2xl">
              <video 
                width="100%" 
                height="auto"
                controls
                className="w-full max-h-[500px] object-contain"
                poster="/videos/globo-thumbnail.jpg" // Opcional: imagen de vista previa
              >
                <source src="/videos/Experimento Globo Mgico_free.mp4" type="video/mp4" />
                <source src="/videos/experimento-globo.webm" type="video/webm" />
                {/* Mensaje para navegadores que no soportan video */}
                <div className="bg-gray-800 text-white p-8 text-center">
                  <p className="text-lg mb-4">Tu navegador no soporta la reproducción de video.</p>
                  <p className="text-sm">Por favor, actualiza tu navegador o descarga el video directamente.</p>
                  <a 
                    href="/videos/experimento-globo.mp4" 
                    download
                    className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Descargar Video
                  </a>
                </div>
              </video>
            </div>
            
            {/* Información del Video */}
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-bold text-blue-800 mb-2">📋 Información del Video</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-blue-700">Duración:</span>
                    <span className="text-blue-600 ml-2">3:45 min</span>
                  </div>
                  <div>
                    <span className="font-semibold text-blue-700">Nivel:</span>
                    <span className="text-blue-600 ml-2">Principiante</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <h4 className="font-bold text-green-800 mb-3">🔬 Lo que aprenderás:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-700">Cómo crear electricidad estática</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-700">Por qué se pegan los papelitos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-700">Consejos de seguridad importantes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-700">Aplicaciones en la vida real</span>
                  </li>
                </ul>
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cerrar Video
                </button>
                <button 
                  onClick={() => {
                    setShowVideoModal(false);
                    setShowQuizModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
                >
                  <Brain className="w-5 h-5" />
                  Hacer Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal del Quiz */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!quizCompleted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">🧠 Quiz de Electricidad</h3>
                  <button 
                    onClick={() => setShowQuizModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Pregunta {currentQuestion + 1} de {quizQuestions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    {quizQuestions[currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestion, index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button 
                    onClick={() => setShowQuizModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                  <button 
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className="px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Siguiente' : 'Finalizar'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              // Resultados del Quiz
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">¡Quiz Completado!</h3>
                  <p className="text-xl text-gray-600">
                    Tu puntuación: {getScore()} de {quizQuestions.length}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-purple-800 mb-3">🏆 ¡Felicitaciones!</h4>
                  <p className="text-purple-700">
                    {getScore() === quizQuestions.length 
                      ? "¡Perfecto! Dominaste todos los conceptos básicos de electricidad."
                      : `¡Buen trabajo! Aprendiste ${getScore()} de ${quizQuestions.length} conceptos correctamente.`
                    }
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 flex items-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Intentar de Nuevo
                  </button>
                  <button 
                    onClick={() => setShowQuizModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectricitySection;