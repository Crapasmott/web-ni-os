'use client';
import React, { useState } from 'react';
import { AlertTriangle, Shield, Phone, Download, Brain, CheckCircle, ArrowRight, X, FileText, Award } from 'lucide-react';

const SafetySection = () => {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  const safetyQuiz = [
    {
      id: 1,
      question: "¿Qué hacer si ves un cable eléctrico caído?",
      options: [
        "Tocarlo para ver si tiene corriente",
        "Alejarse y llamar inmediatamente a ElectroHuila (115)",
        "Moverlo con un palo de madera",
        "Ignorarlo y seguir caminando"
      ],
      correctAnswer: 1,
      explanation: "¡Correcto! NUNCA toques un cable caído. Llama inmediatamente a ElectroHuila al 115."
    },
    {
      id: 2,
      question: "¿Con qué NO debes tocar un aparato eléctrico?",
      options: [
        "Con las manos secas",
        "Con las manos mojadas",
        "Con zapatos puestos",
        "Con cuidado"
      ],
      correctAnswer: 1,
      explanation: "¡Exacto! El agua y la electricidad son muy peligrosas juntas. Siempre ten las manos secas."
    },
    {
      id: 3,
      question: "¿Cuántos aparatos puedes conectar en un mismo enchufe?",
      options: [
        "Todos los que quepan",
        "Solo los que pueda soportar sin sobrecalentarse",
        "Máximo 10 aparatos",
        "No importa la cantidad"
      ],
      correctAnswer: 1,
      explanation: "¡Perfecto! Cada enchufe tiene un límite. Sobrecargar puede causar incendios."
    },
    {
      id: 4,
      question: "Si huele a quemado cerca de un enchufe, ¿qué haces?",
      options: [
        "Seguir usando el enchufe normalmente",
        "Rociar agua para apagar",
        "Desconectar inmediatamente y llamar a un adulto",
        "Tapar el olor con perfume"
      ],
      correctAnswer: 2,
      explanation: "¡Correcto! El olor a quemado indica peligro. Desconecta y busca ayuda de inmediato."
    },
    {
      id: 5,
      question: "¿Qué hacer durante una tormenta eléctrica?",
      options: [
        "Usar más aparatos eléctricos",
        "Desconectar aparatos importantes y evitar el agua",
        "Salir al patio a ver los rayos",
        "Bañarse para relajarse"
      ],
      correctAnswer: 1,
      explanation: "¡Excelente! Durante tormentas, desconecta aparatos y mantente alejado del agua."
    }
  ];

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < safetyQuiz.length - 1) {
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
    safetyQuiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const downloadSafetyGuide = () => {
    // Simular descarga de PDF
    const link = document.createElement('a');
    link.href = '#'; // En producción, aquí iría la URL real del PDF
    link.download = 'Guia_Seguridad_Electrica_ElectroHuila.pdf';
    link.click();
    
    // Mostrar modal de guía
    setShowGuideModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Título Principal */}
      <div className="text-center">
        <h3 className="text-4xl font-bold text-gray-800 mb-4">🔒 Seguridad Eléctrica</h3>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Aprende las reglas básicas para usar la electricidad de forma segura y proteger a tu familia
        </p>
      </div>

      {/* Números de Emergencia */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 rounded-3xl p-8 text-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Phone className="w-8 h-8 text-red-300" />
            <h4 className="text-3xl font-bold">📞 Números de Emergencia</h4>
          </div>
          <p className="text-xl">Memoriza estos números importantes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-4xl mb-3">🚨</div>
            <div className="text-4xl font-bold mb-2">123</div>
            <div className="font-bold text-lg mb-1">Emergencias Generales</div>
            <div className="text-sm opacity-90">Policía, Bomberos, Ambulancia</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-4xl font-bold mb-2">115</div>
            <div className="font-bold text-lg mb-1">ElectroHuila</div>
            <div className="text-sm opacity-90">Emergencias Eléctricas 24/7</div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center backdrop-blur-sm">
            <div className="text-4xl mb-3">🏥</div>
            <div className="text-4xl font-bold mb-2">125</div>
            <div className="font-bold text-lg mb-1">Cruz Roja</div>
            <div className="text-sm opacity-90">Primeros auxilios</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={downloadSafetyGuide}
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
          >
            <Download className="w-5 h-5" />
            Descargar Guía de Seguridad
          </button>
          <button 
            onClick={() => setShowQuizModal(true)}
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
          >
            <Brain className="w-5 h-5" />
            Quiz de Seguridad
          </button>
        </div>
      </div>

      {/* Reglas de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Manos Secas Siempre",
            icon: "🚿",
            description: "Nunca toques aparatos eléctricos con las manos mojadas",
            tips: ["Sécate bien las manos", "Aleja el agua de enchufes", "No uses aparatos en el baño"],
            danger: "Alto",
            color: "from-red-500 to-pink-600"
          },
          {
            title: "Cables en Buen Estado",
            icon: "🔌",
            description: "Revisa que los cables no estén dañados o pelados",
            tips: ["Cambia cables rotos", "No jales del cable", "Usa protectores"],
            danger: "Alto",
            color: "from-orange-500 to-red-600"
          },
          {
            title: "No Sobrecargar Enchufes",
            icon: "⚡",
            description: "Un enchufe, pocos aparatos. Evita las 'zapatillas' llenas",
            tips: ["Máximo 2-3 aparatos", "Usa reguladores", "Desconecta lo que no uses"],
            danger: "Medio",
            color: "from-yellow-500 to-orange-600"
          },
          {
            title: "Lejos de los Niños Pequeños",
            icon: "👶",
            description: "Protege los enchufes para que los bebés no los toquen",
            tips: ["Usa tapones de seguridad", "Enseña a los niños", "Supervisa siempre"],
            danger: "Alto",
            color: "from-purple-500 to-pink-600"
          },
          {
            title: "Desconectar en Tormentas",
            icon: "🌩️",
            description: "Durante rayos y tormentas, desconecta aparatos importantes",
            tips: ["Desconecta TV y computador", "Usa protectores de voltaje", "Espera que pase"],
            danger: "Medio",
            color: "from-blue-500 to-cyan-600"
          },
          {
            title: "Cables Caídos = Peligro",
            icon: "⚠️",
            description: "Si ves un cable eléctrico en el suelo, ¡NO lo toques!",
            tips: ["Llama al 115", "Mantén distancia", "Avisa a otros"],
            danger: "Extremo",
            color: "from-red-600 to-red-800"
          }
        ].map((rule, index) => (
          <div
            key={index}
            className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-red-300">
              <div className={`w-16 h-16 bg-gradient-to-r ${rule.color} rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg text-2xl group-hover:rotate-12 transition-transform`}>
                {rule.icon}
              </div>
              
              <h4 className="text-xl font-bold text-gray-800 mb-3">{rule.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{rule.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Nivel de Peligro</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    rule.danger === 'Extremo' ? 'bg-red-100 text-red-800' :
                    rule.danger === 'Alto' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rule.danger}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <h5 className="font-semibold text-gray-700 text-sm">Consejos:</h5>
                {rule.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal del Quiz */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {!quizCompleted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">🧠 Quiz de Seguridad Eléctrica</h3>
                  <button 
                    onClick={() => setShowQuizModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Pregunta {currentQuestion + 1} de {safetyQuiz.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / safetyQuiz.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / safetyQuiz.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    {safetyQuiz[currentQuestion].question}
                  </h4>
                  
                  <div className="space-y-3">
                    {safetyQuiz[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestion, index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-red-500 bg-red-500'
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
                    className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {currentQuestion < safetyQuiz.length - 1 ? 'Siguiente' : 'Finalizar'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              // Resultados del Quiz
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl mb-4">
                    {getScore() === safetyQuiz.length ? '🏆' : getScore() >= 3 ? '🎉' : '📚'}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">¡Quiz Completado!</h3>
                  <p className="text-xl text-gray-600">
                    Tu puntuación: {getScore()} de {safetyQuiz.length}
                  </p>
                </div>

                <div className="bg-red-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-red-800 mb-3">🛡️ {
                    getScore() === safetyQuiz.length ? '¡Experto en Seguridad!' :
                    getScore() >= 4 ? '¡Muy Bien!' :
                    getScore() >= 3 ? '¡Buen Trabajo!' :
                    '¡Sigue Practicando!'
                  }</h4>
                  <p className="text-red-700">
                    {getScore() === safetyQuiz.length 
                      ? "¡Perfecto! Conoces todas las reglas de seguridad eléctrica."
                      : getScore() >= 3
                      ? `¡Bien hecho! Dominas ${getScore()} de ${safetyQuiz.length} conceptos de seguridad.`
                      : "Repasa las reglas de seguridad. Tu familia te necesita seguro."
                    }
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 flex items-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5" />
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

      {/* Modal de Guía de Seguridad */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-gray-800">📋 Guía de Seguridad Eléctrica ElectroHuila</h3>
              <button 
                onClick={() => setShowGuideModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <h4 className="font-bold text-red-800 mb-2">⚠️ IMPORTANTE</h4>
                <p className="text-red-700">
                  Esta guía contiene información vital para tu seguridad y la de tu familia. 
                  Compártela con todos en casa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3">📞 Números de Emergencia</h4>
                  <ul className="space-y-2">
                    <li><strong>123</strong> - Emergencias Generales</li>
                    <li><strong>115</strong> - ElectroHuila (24/7)</li>
                    <li><strong>125</strong> - Cruz Roja</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3">🚨 En Caso de Emergencia</h4>
                  <ol className="space-y-2 text-sm">
                    <li>1. Mantén la calma</li>
                    <li>2. Aleja a todos del peligro</li>
                    <li>3. NO toques cables caídos</li>
                    <li>4. Llama inmediatamente al 115</li>
                  </ol>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={downloadSafetyGuide}
                  className="bg-red-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-600 transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                >
                  <Download className="w-5 h-5" />
                  Descargar Guía Completa (PDF)
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  La guía completa incluye ilustraciones y casos de estudio
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logros de Seguridad */}
      <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-8 border-4 border-red-200">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-red-800 mb-6">🏆 Experto en Seguridad ElectroHuila</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="font-bold text-gray-800 mb-2">Guardián de la Seguridad</h4>
              <p className="text-sm text-gray-600">Aprende las reglas básicas</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🧠</div>
              <h4 className="font-bold text-gray-800 mb-2">Experto en Prevención</h4>
              <p className="text-sm text-gray-600">Completa el quiz perfectamente</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
              <h4 className="font-bold text-gray-800 mb-2">Protector Familiar</h4>
              <p className="text-sm text-gray-600">Enseña a tu familia</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl mb-3">🏅</div>
              <h4 className="font-bold text-gray-800 mb-2">Héroe ElectroHuila</h4>
              <p className="text-sm text-gray-600">Domina toda la seguridad eléctrica</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;