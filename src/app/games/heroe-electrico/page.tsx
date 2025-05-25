'use client';

import React, { useState, useEffect } from 'react';
import { Zap, MapPin, Users, Settings, Wrench, GraduationCap, Shield, Star, Trophy, Clock, ArrowLeft } from 'lucide-react';

const HeroeElectrico = ({ onBack }) => {
  // Estados del juego
  const [gameStarted, setGameStarted] = useState(false);
  const [currentMission, setCurrentMission] = useState(0);
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    experience: 0,
    reputation: 100,
    energy: 100
  });
  const [completedMissions, setCompletedMissions] = useState(new Set());
  const [gameComplete, setGameComplete] = useState(false);
  const [showMissionComplete, setShowMissionComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [missionProgress, setMissionProgress] = useState({});
  const [showMissionDetails, setShowMissionDetails] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Definición de misiones
  const missions = [
    {
      id: 1,
      title: "Reparar Transformadores",
      description: "Los transformadores de Neiva necesitan mantenimiento urgente",
      location: "Neiva Centro",
      difficulty: "Principiante",
      timeLimit: 300,
      steps: [
        { id: 1, text: "Inspeccionar el transformador", icon: Settings, duration: 3000 },
        { id: 2, text: "Revisar conexiones eléctricas", icon: Wrench, duration: 4000 },
        { id: 3, text: "Cambiar fusibles dañados", icon: Zap, duration: 5000 },
        { id: 4, text: "Probar funcionamiento", icon: Shield, duration: 3000 }
      ],
      rewards: { experience: 100, reputation: 20, energy: -30 },
      impact: "500 familias recuperaron el servicio eléctrico"
    },
    {
      id: 2,
      title: "Conectar Nuevos Usuarios",
      description: "Una nueva urbanización necesita conexión eléctrica",
      location: "Pitalito Norte",
      difficulty: "Principiante",
      timeLimit: 450,
      steps: [
        { id: 1, text: "Planificar la instalación", icon: MapPin, duration: 4000 },
        { id: 2, text: "Instalar postes de luz", icon: Wrench, duration: 6000 },
        { id: 3, text: "Tender cables eléctricos", icon: Zap, duration: 8000 },
        { id: 4, text: "Conectar medidores", icon: Settings, duration: 4000 }
      ],
      rewards: { experience: 150, reputation: 30, energy: -40 },
      impact: "200 nuevas familias con acceso a electricidad"
    },
    {
      id: 3,
      title: "Instalar Paneles Solares",
      description: "Instalar sistema solar en escuela rural",
      location: "San Agustín Rural",
      difficulty: "Intermedio",
      timeLimit: 600,
      steps: [
        { id: 1, text: "Evaluar estructura del techo", icon: Settings, duration: 4000 },
        { id: 2, text: "Instalar soportes", icon: Wrench, duration: 6000 },
        { id: 3, text: "Colocar paneles solares", icon: Zap, duration: 8000 },
        { id: 4, text: "Conectar inversor", icon: Shield, duration: 5000 },
        { id: 5, text: "Capacitar al personal", icon: GraduationCap, duration: 6000 }
      ],
      rewards: { experience: 200, reputation: 50, energy: -50 },
      impact: "Una escuela ahora funciona con energía limpia"
    },
    {
      id: 4,
      title: "Educar sobre Seguridad",
      description: "Enseñar seguridad eléctrica en colegios",
      location: "Garzón Educativo",
      difficulty: "Intermedio",
      timeLimit: 480,
      steps: [
        { id: 1, text: "Preparar material educativo", icon: GraduationCap, duration: 4000 },
        { id: 2, text: "Presentar charla de seguridad", icon: Shield, duration: 6000 },
        { id: 3, text: "Demostrar primeros auxilios", icon: Users, duration: 5000 },
        { id: 4, text: "Realizar simulacro", icon: Wrench, duration: 4000 }
      ],
      rewards: { experience: 180, reputation: 40, energy: -25 },
      impact: "300 estudiantes aprendieron sobre seguridad eléctrica"
    }
  ];

  // Effects y funciones del juego
  useEffect(() => {
    let timer;
    if (gameStarted && showMissionDetails && !showMissionComplete && !gameComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, showMissionDetails, showMissionComplete, gameComplete]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentMission(0);
    setPlayerStats({ level: 1, experience: 0, reputation: 100, energy: 100 });
    setCompletedMissions(new Set());
    setGameComplete(false);
    setTimeElapsed(0);
    setMissionProgress({});
    setShowMissionDetails(false);
    setShowMissionComplete(false);
    setCurrentStepIndex(0);
  };

  const selectMission = (missionIndex) => {
    const mission = missions[missionIndex];
    const energyRequired = Math.abs(mission.rewards.energy);
    
    if (playerStats.energy < energyRequired) {
      alert(`Necesitas ${energyRequired} puntos de energía para esta misión. Tienes ${playerStats.energy}.`);
      return;
    }

    setCurrentMission(missionIndex);
    setTimeElapsed(0);
    setMissionProgress({});
    setShowMissionDetails(true);
    setCurrentStepIndex(0);
  };

  const executeStep = (stepIndex) => {
    const mission = missions[currentMission];
    const step = mission.steps[stepIndex];
    
    setMissionProgress(prev => ({
      ...prev,
      [stepIndex]: { started: true, completed: false }
    }));

    setTimeout(() => {
      setMissionProgress(prev => ({
        ...prev,
        [stepIndex]: { started: true, completed: true }
      }));

      if (stepIndex === mission.steps.length - 1) {
        setTimeout(() => {
          completeMission();
        }, 1000);
      } else {
        setCurrentStepIndex(stepIndex + 1);
      }
    }, step.duration);
  };

  const completeMission = () => {
    const mission = missions[currentMission];
    
    setCompletedMissions(prev => new Set([...prev, mission.id]));
    
    const newExperience = playerStats.experience + mission.rewards.experience;
    const levelUp = newExperience >= 500;
    
    setPlayerStats(prev => ({
      level: levelUp ? prev.level + 1 : prev.level,
      experience: levelUp ? newExperience - 500 : newExperience,
      reputation: Math.min(1000, prev.reputation + mission.rewards.reputation),
      energy: Math.max(0, Math.min(100, prev.energy + mission.rewards.energy))
    }));

    setShowMissionComplete(true);

    setTimeout(() => {
      setShowMissionComplete(false);
      setShowMissionDetails(false);
      if (completedMissions.size + 1 >= missions.length) {
        setGameComplete(true);
      }
    }, 4000);
  };

  const backToMissionSelection = () => {
    setShowMissionDetails(false);
    setMissionProgress({});
    setTimeElapsed(0);
    setCurrentStepIndex(0);
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
          if (showMissionDetails) {
            backToMissionSelection();
          } else {
            handleBackToMenu();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showMissionDetails]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlayerTitle = () => {
    if (playerStats.level >= 4) return "Maestro Electricista";
    if (playerStats.level >= 3) return "Técnico Experto";
    if (playerStats.level >= 2) return "Técnico Especializado";
    return "Aprendiz Electricista";
  };

  // Pantalla de inicio
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-4">
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
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <div className="bg-yellow-50 px-4 py-2 rounded-full inline-block mb-4">
              <span className="text-yellow-700 font-semibold">⭐ Juego Destacado</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              El Héroe Eléctrico
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              ¡Conviértete en el superhéroe de ElectroHuila! Viaja por todos los municipios 
              del Huila restaurando el servicio eléctrico y ayudando a las comunidades.
            </p>

            <div className="bg-orange-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4 text-orange-800">Misiones Incluidas:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {missions.map((mission) => (
                  <div key={mission.id} className="flex items-center gap-3 text-left">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{mission.title}</div>
                      <div className="text-sm text-gray-600">{mission.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-yellow-50 p-4 rounded-xl">
                <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Sistema de Niveles</h3>
                <p className="text-sm text-gray-600">Evoluciona de aprendiz a maestro</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Impacto Real</h3>
                <p className="text-sm text-gray-600">Ayuda a miles de familias</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">25 minutos</h3>
                <p className="text-sm text-gray-600">Duración aproximada</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Controles</h3>
              <div className="flex justify-center gap-4 text-sm flex-wrap">
                <div className="bg-gray-100 px-3 py-2 rounded">Click para interactuar</div>
                <div className="bg-gray-100 px-3 py-2 rounded">ESC - Retroceder/Salir</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Nivel: Principiante</span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Jugadores: 1-2</span>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Duración: 25 min</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
            >
              🚀 ¡Comenzar Aventura!
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de finalización
  if (gameComplete) {
    const totalImpact = {
      families: 700,
      students: 300,
      schools: 1
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Misión Cumplida!
          </h2>
          
          <p className="text-lg font-semibold text-yellow-600 mb-6">
            Te has convertido en {getPlayerTitle()}
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">Nivel {playerStats.level}</div>
              <div className="text-sm text-gray-600">{getPlayerTitle()}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{playerStats.reputation}</div>
                <div className="text-xs text-gray-600">Reputación</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-green-600">{completedMissions.size}</div>
                <div className="text-xs text-gray-600">Misiones</div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-orange-800 mb-2">Impacto Total:</h3>
            <div className="text-sm text-orange-700">
              • {totalImpact.families}+ familias con electricidad<br/>
              • {totalImpact.students} estudiantes educados<br/>
              • {totalImpact.schools} escuela con energía solar
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl"
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
    );
  }

  // Pantalla de selección de misiones
  if (!showMissionDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-orange-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header del jugador con botón de regreso */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* BOTÓN DE REGRESO EN SELECCIÓN DE MISIONES */}
                <button
                  onClick={handleBackToMenu}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded-lg transition-all duration-200"
                  title="Volver al menú (ESC)"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Menú</span>
                </button>

                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">{getPlayerTitle()}</div>
                  <div className="text-sm text-gray-600">Nivel {playerStats.level}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Experiencia</div>
                  <div className="font-bold">{playerStats.experience}/500</div>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-2 bg-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${(playerStats.experience / 500) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Reputación</div>
                  <div className="font-bold text-blue-600">{playerStats.reputation}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Energía</div>
                  <div className={`font-bold ${playerStats.energy > 50 ? 'text-green-600' : 'text-red-600'}`}>
                    {playerStats.energy}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Selecciona tu Misión
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {missions.map((mission, index) => {
              const isCompleted = completedMissions.has(mission.id);
              const energyRequired = Math.abs(mission.rewards.energy);
              const isAvailable = playerStats.energy >= energyRequired;
              
              return (
                <div
                  key={mission.id}
                  className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-200 ${
                    isCompleted ? 'opacity-75 border-2 border-green-500' : 
                    isAvailable ? 'hover:scale-105 cursor-pointer hover:shadow-xl' : 
                    'opacity-50'
                  }`}
                  onClick={() => isAvailable && !isCompleted && selectMission(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {mission.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{mission.location}</span>
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{mission.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      mission.difficulty === 'Principiante' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {mission.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {formatTime(mission.timeLimit)}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {mission.steps.length} pasos
                    </span>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm text-gray-600 mb-2">Recompensas:</div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-purple-600">+{mission.rewards.experience} XP</span>
                      <span className="text-blue-600">+{mission.rewards.reputation} Rep</span>
                      <span className={mission.rewards.energy < 0 ? 'text-red-600' : 'text-green-600'}>
                        {mission.rewards.energy} Energía
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg mb-4">
                    <div className="text-sm font-medium text-gray-700">Impacto:</div>
                    <div className="text-sm text-gray-600">{mission.impact}</div>
                  </div>

                  {!isAvailable && !isCompleted && (
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <div className="text-sm text-red-600">
                        Energía insuficiente ({energyRequired} requerida)
                      </div>
                    </div>
                  )}

                  {isAvailable && !isCompleted && (
                    <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200">
                      Iniciar Misión
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Pantalla de ejecución de misión
  const mission = missions[currentMission];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header de la misión */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={backToMissionSelection}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                title="Volver a misiones (ESC)"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver
              </button>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold">{mission.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-600">{mission.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span className="font-semibold">{formatTime(timeElapsed)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">Nivel {playerStats.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progreso de la misión */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Progreso de la Misión
          </h3>
          
          <div className="space-y-4">
            {mission.steps.map((step, index) => {
              const stepProgress = missionProgress[index];
              const isActive = index === currentStepIndex && !stepProgress?.completed;
              const isCompleted = stepProgress?.completed;
              const isInProgress = stepProgress?.started && !stepProgress?.completed;
              const isPending = index > currentStepIndex;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 ${
                    isCompleted ? 'border-green-500 bg-green-50' :
                    isInProgress ? 'border-yellow-500 bg-yellow-50 animate-pulse' :
                    isActive ? 'border-blue-500 bg-blue-50' :
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isCompleted ? 'bg-green-500' :
                    isInProgress ? 'bg-yellow-500' :
                    isActive ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    {isCompleted ? (
                      <span className="text-white text-lg">✓</span>
                    ) : (
                      <step.icon className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      isCompleted ? 'text-green-800' :
                      isInProgress ? 'text-yellow-800' :
                      isActive ? 'text-blue-800' :
                      'text-gray-600'
                    }`}>
                      {step.text}
                    </div>
                    <div className="text-sm text-gray-500">
                      Duración: {(step.duration / 1000).toFixed(1)} segundos
                    </div>
                  </div>
                  
                  {isActive && (
                    <button
                      onClick={() => executeStep(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                    >
                      Ejecutar
                    </button>
                  )}
                  
                  {isInProgress && (
                    <div className="text-yellow-600 font-semibold animate-pulse">
                      Ejecutando...
                    </div>
                  )}

                  {isPending && (
                    <div className="text-gray-400 text-sm">
                      Pendiente
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Información de la misión */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-gray-800">Objetivo</h3>
            <p className="text-sm text-gray-600">{mission.description}</p>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-gray-800">Recompensas</h3>
            <div className="space-y-1 text-sm">
              <div className="text-purple-600">+{mission.rewards.experience} Experiencia</div>
              <div className="text-blue-600">+{mission.rewards.reputation} Reputación</div>
              <div className={mission.rewards.energy < 0 ? 'text-red-600' : 'text-green-600'}>
                {mission.rewards.energy} Energía
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-gray-800">Estado del Héroe</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Energía:</span>
                <span className={playerStats.energy > 50 ? 'text-green-600' : 'text-red-600'}>
                  {playerStats.energy}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    playerStats.energy > 50 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${playerStats.energy}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal de misión completada */}
        {showMissionComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Misión Completada!
              </h2>
              <p className="text-gray-600 mb-4">
                {mission.impact}
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <div className="font-semibold text-green-800">Recompensas Obtenidas:</div>
                <div className="text-sm text-green-700 mt-1">
                  +{mission.rewards.experience} Experiencia<br/>
                  +{mission.rewards.reputation} Reputación<br/>
                  {mission.rewards.energy} Energía
                </div>
              </div>
              {playerStats.experience >= 400 && (
                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <div className="text-yellow-800 font-semibold">
                    ¡Subiste de nivel! Ahora eres {getPlayerTitle()}
                  </div>
                </div>
              )}
              <div className="text-center">
                <button
                  onClick={() => setShowMissionComplete(false)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Botón de abandono de misión */}
        {showMissionDetails && (
          <div className="fixed bottom-4 right-4 z-40">
            <button
              onClick={backToMissionSelection}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg"
              title="Abandonar misión"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroeElectrico;