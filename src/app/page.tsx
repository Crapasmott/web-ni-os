'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Star, Rocket, Brain, Palette, Beaker, Sun, ChevronDown, Calculator, BookOpen, Globe, Atom, Lightbulb, Play, Trophy, Timer, Gamepad2, Flame, Droplets, Sparkles, Download, RotateCcw, Heart, Battery, Power, Home, Settings, ExternalLink, Leaf } from 'lucide-react';

// Importar componentes de aprendizaje
import ElectricitySection from '@/components/learning/ElectricitySection';
import ElectroHuilaSection from '@/components/learning/ElectroHuilaSection';
import RenewableEnergySection from '@/components/learning/RenewableEnergySection';
import SafetySection from '@/components/learning/SafetySection';
import LaboratorioBasico from '@/components/simulators/LaboratorioBasico';
import LaboratorioAvanzado from '@/components/simulators/LaboratorioAvanzado';

// COMPONENTE DE CARGA
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
    <div className="text-center text-white">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-xl">Cargando Explora y Aprende...</p>
    </div>
  </div>
);

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [activeLearnTab, setActiveLearnTab] = useState('electricity');

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'learn', 'games', 'experiments', 'coloring', 'circuits', 'solar'];
      const currentPos = window.scrollY + 100;

      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= currentPos) {
          setCurrentSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // FUNCIONES DE NAVEGACIÓN
  const navigateToGame = (gameId: string) => {
    const gameRoutes = {
      'aventura-energetica': '/games/aventura-energetica',
      'constructor-circuitos': '/games/constructor-circuitos',
      'cazador-energia': '/games/cazador-energia',
      'quiz-electrohuila': '/games/quiz-electrohuila',
      'heroe-electrico': '/games/heroe-electrico'
    };
    
    const route = gameRoutes[gameId as keyof typeof gameRoutes];
    if (route) {
      router.push(route);
    } else {
      alert(`🎮 ¡Próximamente! El juego "${gameId.replace('-', ' ')}" estará disponible muy pronto en ElectroHuila.`);
    }
  };

  const navigateToExperiment = (experimentId: number) => {
    const experimentRoutes = {
      1: '/experiments/circuito-limon',
      2: '/experiments/generador-manivela',
      3: '/experiments/panel-solar-casero',
      4: '/experiments/turbina-viento',
      5: '/experiments/electroiman-potente',
      6: '/experiments/conductor-aislante'
    };
    
    const route = experimentRoutes[experimentId as keyof typeof experimentRoutes];
    if (route) {
      router.push(route);
    } else {
      alert(`🔬 ¡Próximamente! Este experimento estará disponible muy pronto en el Laboratorio ElectroHuila.`);
    }
  };

  const navigateToColoring = (category: string) => {
    const coloringRoutes = {
      'torres-electricas': '/coloring/torres-electricas',
      'centrales-hidroelectricas': '/coloring/centrales-hidroelectricas',
      'paneles-solares': '/coloring/paneles-solares',
      'hogares-energia': '/coloring/hogares-energia'
    };
    
    const route = coloringRoutes[category as keyof typeof coloringRoutes];
    if (route) {
      router.push(route);
    } else {
      alert(`🎨 ¡Próximamente! Esta sección de colorear estará disponible muy pronto en Arte ElectroHuila.`);
    }
  };

  const navigateToCircuit = (challengeId: number) => {
    const circuitRoutes = {
      1: '/circuits/iluminacion-casa',
      2: '/circuits/red-distribucion',
      3: '/circuits/sistema-respaldo',
      4: '/circuits/alumbrado-publico',
      5: '/circuits/planta-industrial',
      6: '/circuits/microred-inteligente'
    };
    
    const route = circuitRoutes[challengeId as keyof typeof circuitRoutes];
    if (route) {
      router.push(route);
    } else {
      alert(`⚡ ¡Próximamente! Este desafío de circuitos estará disponible muy pronto en el Simulador ElectroHuila.`);
    }
  };

  const openSimulator = () => {
    router.push('/simulator/circuit-builder');
  };

  const navigateToSolarSimulator = (simulatorType: string) => {
    if (simulatorType === 'granja') {
      router.push('/granja-solar');
    } else if (simulatorType === 'calculadora') {
      router.push('/simulador-solar');
    } else {
      alert(`☀️ ¡Próximamente! Este simulador estará disponible muy pronto.`);
    }
  };

  const navigateToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!mounted) {
    return <LoadingSpinner />;
  }

  return (
    <main className="relative">{/* AQUÍ VAN LAS SIGUIENTES PARTES */}
    {/* BOTÓN ELECTROHUILA - FIJO EN LA ESQUINA */}
      <a 
        href="https://electrohuila.com.co" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all font-bold flex items-center gap-2"
      >
        <ExternalLink className="w-5 h-5" />
        ElectroHuila
      </a>

      {/* NAVEGACIÓN FLOTANTE */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white bg-opacity-90 backdrop-blur-md rounded-full px-4 py-2 shadow-xl border border-gray-200">
        <div className="flex items-center space-x-2">
          {[
            { id: 'hero', name: 'Inicio', icon: Star },
            { id: 'learn', name: 'Aprender', icon: Brain },
            { id: 'games', name: 'Juegos', icon: Rocket },
            { id: 'experiments', name: 'Experimentos', icon: Beaker },
            { id: 'coloring', name: 'Colorear', icon: Palette },
            { id: 'circuits', name: 'Circuitos', icon: Zap },
            { id: 'solar', name: 'Solar', icon: Sun }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => navigateToSection(section.id)}
              className={`p-2 rounded-full transition-all duration-300 ${
                currentSection === section.id
                  ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg scale-110'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
              title={section.name}
            >
              <section.icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </nav>
      
      {/* HERO SECTION */}
      <section id="hero" className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-20 h-20 bg-orange-300 bg-opacity-20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-32 w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full animate-pulse"></div>
          
          <div className="absolute top-10 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="relative mb-8">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-2xl mb-6 relative">
                <Zap className="w-16 h-16 text-white animate-pulse" />
                
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
                  <Star className="w-6 h-6 text-orange-300 absolute -top-2 left-1/2 transform -translate-x-1/2" />
                  <Star className="w-4 h-4 text-orange-400 absolute top-1/2 -right-2 transform -translate-y-1/2" />
                  <Star className="w-5 h-5 text-orange-200 absolute -bottom-2 right-1/4" />
                  <Star className="w-4 h-4 text-orange-300 absolute top-1/4 -left-2" />
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Explora
              </span>
              <br />
              <span className="text-white">y Aprende</span>
            </h1>

            <div className="h-16 mb-8">
              <p className="text-xl md:text-2xl text-white font-medium">
                ¡Cada día es una nueva aventura de aprendizaje! 🌟
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {[
                { id: 'learn', icon: Brain, name: 'Aprender', color: 'from-blue-500 to-purple-600' },
                { id: 'games', icon: Rocket, name: 'Juegos', color: 'from-green-500 to-blue-500' },
                { id: 'experiments', icon: Beaker, name: 'Experimentos', color: 'from-red-500 to-pink-600' },
                { id: 'coloring', icon: Palette, name: 'Colorear', color: 'from-pink-500 to-purple-600' },
                { id: 'circuits', icon: Zap, name: 'Circuitos', color: 'from-yellow-500 to-orange-600' },
                { id: 'solar', icon: Sun, name: 'Solar', color: 'from-orange-500 to-red-500' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToSection(item.id)}
                  className={`group relative bg-gradient-to-r ${item.color} p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-center">
                    <item.icon className="w-8 h-8 text-white mx-auto mb-2 group-hover:animate-bounce" />
                    <span className="text-white font-bold text-sm">{item.name}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-white mx-auto" />
              <p className="text-white text-sm mt-2">Desliza para explorar</p>
            </div>
          </div>
        </div>
      </section>{/* AQUÍ VAN LAS SIGUIENTES PARTES */}
      {/* SECCIÓN DE APRENDIZAJE */}
      <section id="learn" className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Centro de Aprendizaje ElectroHuila</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Descubre el fascinante mundo de la energía eléctrica! Aprende cómo ElectroHuila lleva luz a todo el Huila
            </p>
          </div>

          {/* Navegación por pestañas */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-xl border-2 border-blue-200">
              <div className="flex space-x-2 flex-wrap justify-center">
                {[
                  { id: 'electricity', name: '¿Qué es la Electricidad?', icon: Zap },
                  { id: 'electrohuila', name: 'ElectroHuila', icon: Home },
                  { id: 'renewable', name: 'Energías Renovables', icon: Sun },
                  { id: 'safety', name: 'Seguridad Eléctrica', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLearnTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 m-1 ${
                      activeLearnTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden md:inline font-semibold">{tab.name}</span>
                    <span className="md:hidden font-semibold text-sm">{tab.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido dinámico basado en la pestaña activa */}
          <div className="transition-all duration-500">
            {activeLearnTab === 'electricity' && <ElectricitySection />}
            {activeLearnTab === 'electrohuila' && <ElectroHuilaSection />}
            {activeLearnTab === 'renewable' && <RenewableEnergySection />}
            {activeLearnTab === 'safety' && <SafetySection />}
          </div>

          {/* Simuladores Educativos */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl p-8 border-4 border-green-200 mt-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-green-800 mb-4">🎯 Simuladores Educativos</h3>
              <p className="text-lg text-green-700">
                Aprende con simuladores interactivos y pon en práctica tus conocimientos sobre energía
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Simulador de Granja Solar */}
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg text-2xl">
                  🌞
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Simulador de Granja Solar</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Construye tu propia granja solar paso a paso. Aprende cómo funciona la energía solar a gran escala.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Construcción interactiva de paneles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Simulación del clima del Huila</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Desafíos y misiones educativas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Cálculo de CO₂ ahorrado</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigateToSolarSimulator('granja')}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Sun className="w-5 h-5" />
                  Abrir Simulador
                </button>
              </div>

              {/* Calculadora Solar */}
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg text-2xl">
                  🏠
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Calculadora Solar Residencial</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Calcula exactamente cuánto puedes ahorrar con paneles solares en tu casa del Huila.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Análisis personalizado de consumo</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Cálculo de ahorro mensual y anual</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Proyección a 25 años</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Impacto ambiental calculado</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigateToSolarSimulator('calculadora')}
                  className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Abrir Calculadora
                </button>
              </div>
            </div>
          </div>

          {/* Sección de Logros ElectroHuila */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-200 mt-16">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-800 mb-6">🏆 Experto en Energía ElectroHuila</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Aprendiz Eléctrico</h4>
                  <p className="text-sm text-gray-600">Completa tu primera lección</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-yellow-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">💡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Guardián de la Energía</h4>
                  <p className="text-sm text-gray-600">Aprende sobre ahorro energético</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌟</div>
                  <h4 className="font-bold text-gray-800 mb-2">Embajador ElectroHuila</h4>
                  <p className="text-sm text-gray-600">Conoce nuestra historia y misión</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👑</div>
                  <h4 className="font-bold text-gray-800 mb-2">Maestro Energético</h4>
                  <p className="text-sm text-gray-600">Domina todos los temas</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* AQUÍ VAN LAS SIGUIENTES PARTES */}
      {/* ZONA DE JUEGOS */}
      <section id="games" className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 shadow-lg">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Zona de Juegos ElectroHuila</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Aprende sobre energía jugando! Descubre el mundo eléctrico con aventuras súper divertidas
            </p>
          </div>

          {/* Selector de Juegos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                id: 'aventura-energetica',
                title: 'Aventura Energética',
                description: 'Ayuda a ElectroHuila a llevar luz a todo el Huila',
                difficulty: 'Fácil',
                duration: '15 min',
                category: 'Aventura',
                color: 'from-yellow-500 to-orange-600',
                icon: '⚡',
                players: '1 Jugador'
              },
              {
                id: 'constructor-circuitos',
                title: 'Constructor de Circuitos',
                description: 'Construye circuitos eléctricos y enciende bombillas',
                difficulty: 'Medio',
                duration: '20 min',
                category: 'Puzzle',
                color: 'from-blue-500 to-purple-600',
                icon: '🔧',
                players: '1 Jugador'
              },
              {
                id: 'cazador-energia',
                title: 'Cazador de Energía',
                description: 'Encuentra fuentes de energía renovable por el Huila',
                difficulty: 'Medio',
                duration: '18 min',
                category: 'Exploración',
                color: 'from-green-500 to-teal-600',
                icon: '🌱',
                players: '1-2 Jugadores'
              },
              {
                id: 'quiz-electrohuila',
                title: 'Quiz ElectroHuila',
                description: 'Demuestra cuánto sabes sobre nuestra empresa',
                difficulty: 'Fácil',
                duration: '12 min',
                category: 'Trivia',
                color: 'from-purple-500 to-pink-600',
                icon: '🧠',
                players: '1-4 Jugadores'
              }
            ].map((game, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-green-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg text-2xl group-hover:rotate-12 transition-transform`}>
                    {game.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{game.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        game.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {game.difficulty}
                      </span>
                      <span className="text-gray-500 font-medium text-sm">{game.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-600 font-semibold">{game.category}</span>
                      <span className="text-gray-500">{game.players}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigateToGame(game.id)}
                    className={`w-full bg-gradient-to-r ${game.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}
                  >
                    <Play className="w-5 h-5" />
                    ¡Jugar Ahora!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Juego Destacado */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 mb-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-4">
                    <Star className="w-5 h-5" />
                    <span className="font-bold">Juego Destacado</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-4">El Héroe Eléctrico</h3>
                  <p className="text-xl mb-6">
                    ¡Conviértete en el superhéroe de ElectroHuila! Viaja por todos los municipios del Huila 
                    restaurando el servicio eléctrico y ayudando a las comunidades.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                      <div className="text-sm">Nivel</div>
                      <div className="font-bold">Principiante</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                      <div className="text-sm">Duración</div>
                      <div className="font-bold">25 min</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                      <div className="text-sm">Jugadores</div>
                      <div className="font-bold">1-2</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigateToGame('heroe-electrico')}
                    className="bg-white text-orange-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3"
                  >
                    <Rocket className="w-6 h-6" />
                    ¡Comenzar Aventura!
                  </button>
                </div>
                <div className="text-center">
                  <div className="text-8xl mb-4">⚡</div>
                  <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                    <h4 className="text-2xl font-bold mb-4">Misiones Incluidas:</h4>
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Reparar transformadores</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Conectar nuevos usuarios</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Instalar paneles solares</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Educar sobre seguridad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>{/* AQUÍ VAN LAS SIGUIENTES PARTES */}
     {/* EXPERIMENTOS CIENTÍFICOS */}
      <section id="experiments" className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg">
              <Beaker className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Laboratorio ElectroHuila
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Conviértete en un científico de la energía! Descubre cómo funciona la electricidad con experimentos seguros y fascinantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                id: 1,
                title: "Circuito de Limón",
                icon: <Zap className="w-8 h-8" />,
                difficulty: "Fácil",
                time: "20 min",
                materials: ["Limón", "Cables", "LED", "Monedas de cobre", "Clips metálicos"],
                color: "from-yellow-400 to-orange-500"
              },
              {
                id: 2,
                title: "Generador de Manivela",
                icon: <Settings className="w-8 h-8" />,
                difficulty: "Medio",
                time: "30 min",
                materials: ["Motor pequeño", "Manivela", "LED", "Cables", "Base de madera"],
                color: "from-blue-400 to-cyan-500"
              },
              {
                id: 3,
                title: "Panel Solar Casero",
                icon: <Sun className="w-8 h-8" />,
                difficulty: "Medio",
                time: "45 min",
                materials: ["Células solares pequeñas", "Cartón", "Cables", "Multímetro", "Pegamento"],
                color: "from-orange-400 to-red-500"
              },
              {
                id: 4,
                title: "Turbina de Viento",
                icon: <Settings className="w-8 h-8" />,
                difficulty: "Avanzado",
                time: "60 min",
                materials: ["Motor pequeño", "Aspas de cartón", "Ventilador", "LED", "Soporte"],
                color: "from-green-400 to-teal-500"
              },
              {
                id: 5,
                title: "Electroimán Potente",
                icon: <Zap className="w-8 h-8" />,
                difficulty: "Fácil",
                time: "15 min",
                materials: ["Clavo grande", "Cable de cobre", "Pila", "Clips metálicos"],
                color: "from-purple-400 to-indigo-500"
              },
              {
                id: 6,
                title: "Conductor vs Aislante",
                icon: <Lightbulb className="w-8 h-8" />,
                difficulty: "Fácil",
                time: "25 min",
                materials: ["Pila", "LED", "Cables", "Objetos diversos", "Base de pruebas"],
                color: "from-pink-400 to-rose-500"
              }
            ].map((experiment) => (
              <div
                key={experiment.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-purple-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${experiment.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                    {experiment.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{experiment.title}</h3>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      experiment.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' : 
                      experiment.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {experiment.difficulty}
                    </span>
                    <span className="text-gray-500 font-medium">{experiment.time}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Materiales:</h4>
                    <div className="flex flex-wrap gap-1">
                      {experiment.materials.slice(0, 3).map((material, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {material}
                        </span>
                      ))}
                      {experiment.materials.length > 3 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          +{experiment.materials.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigateToExperiment(experiment.id)}
                    className={`w-full mt-6 bg-gradient-to-r ${experiment.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}
                  >
                    <Play className="w-5 h-5" />
                    ¡Experimentar!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* COLOREA Y CREA */}
      <section id="coloring" className="min-h-screen bg-gradient-to-b from-pink-50 to-yellow-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 shadow-lg">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Arte ElectroHuila
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Deja volar tu creatividad! Colorea y diseña el mundo de la energía eléctrica con temas de ElectroHuila
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                id: 'torres-electricas',
                name: 'Torres Eléctricas',
                icon: <Zap className="w-8 h-8" />,
                color: 'from-yellow-500 to-orange-600',
                description: 'Torres de transmisión y postes eléctricos del Huila',
                count: 12,
                difficulty: 'Medio'
              },
              {
                id: 'centrales-hidroelectricas',
                name: 'Centrales Hidroeléctricas',
                icon: <Droplets className="w-8 h-8" />,
                color: 'from-blue-500 to-cyan-600',
                description: 'Represas y plantas generadoras de energía',
                count: 8,
                difficulty: 'Avanzado'
              },
              {
                id: 'paneles-solares',
                name: 'Paneles Solares',
                icon: <Sun className="w-8 h-8" />,
                color: 'from-orange-500 to-red-600',
                description: 'Energía solar y tecnología verde',
                count: 10,
                difficulty: 'Fácil'
              },
              {
                id: 'hogares-energia',
                name: 'Hogares con Energía',
                icon: <Home className="w-8 h-8" />,
                color: 'from-green-500 to-teal-600',
                description: 'Casas y familias del Huila con electricidad',
                count: 15,
                difficulty: 'Fácil'
              }
            ].map((category, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-pink-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                    {category.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      category.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                      category.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {category.difficulty}
                    </span>
                    <span className="text-gray-500 font-medium">{category.count} dibujos</span>
                  </div>
                  
                  <button 
                    onClick={() => navigateToColoring(category.id)}
                    className={`w-full bg-gradient-to-r ${category.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}
                  >
                    <Palette className="w-5 h-5" />
                    ¡Colorear!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ARMADOR DE CIRCUITOS */}
      <section id="circuits" className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Simulador de Circuitos ElectroHuila
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Conviértete en un ingeniero eléctrico! Aprende cómo funciona la electricidad armando circuitos como los técnicos de ElectroHuila
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                id: 1,
                title: "Iluminación de Casa",
                description: "Conecta la electricidad de ElectroHuila a una casa del Huila",
                difficulty: "Fácil",
                components: ['Transformador ElectroHuila', 'Medidor', 'Bombilla', 'Interruptor'],
                goal: "Hacer que se encienda la luz de la casa",
                time: "10 min",
                points: 100,
                color: "from-green-400 to-emerald-500"
              },
              {
                id: 2,
                title: "Red de Distribución",
                description: "Diseña la red eléctrica para un barrio completo",
                difficulty: "Medio",
                components: ['Subestación', 'Transformadores', 'Cables', 'Medidores', 'Casas'],
                goal: "Suministrar electricidad a 5 casas simultáneamente",
                time: "20 min",
                points: 250,
                color: "from-blue-400 to-cyan-500"
              },
              {
                id: 3,
                title: "Sistema de Respaldo",
                description: "Crea un sistema con energía solar de respaldo",
                difficulty: "Medio",
                components: ['Red ElectroHuila', 'Panel Solar', 'Batería', 'Inversor', 'Casa'],
                goal: "Mantener electricidad cuando falle la red principal",
                time: "25 min",
                points: 350,
                color: "from-orange-400 to-red-500"
              },
              {
                id: 4,
                title: "Alumbrado Público",
                description: "Ilumina las calles de un municipio del Huila",
                difficulty: "Avanzado",
                components: ['Subestación', 'Postes', 'Lámparas LED', 'Sensor de Luz', 'Temporizador'],
                goal: "Encender automáticamente las luces al anochecer",
                time: "30 min",
                points: 500,
                color: "from-purple-400 to-indigo-500"
              },
              {
                id: 5,
                title: "Planta Industrial",
                description: "Suministra energía a una empresa del Huila",
                difficulty: "Avanzado", 
                components: ['Línea de Alta Tensión', 'Transformadores', 'Tableros', 'Motores', 'Protecciones'],
                goal: "Alimentar maquinaria industrial de forma segura",
                time: "40 min",
                points: 750,
                color: "from-red-400 to-pink-500"
              },
              {
                id: 6,
                title: "Microred Inteligente",
                description: "Red eléctrica del futuro con energías renovables",
                difficulty: "Experto",
                components: ['Paneles Solares', 'Aerogeneradores', 'Baterías', 'Smart Grid', 'Hogares'],
                goal: "Autogestionar energía renovable para toda una comunidad",
                time: "50 min",
                points: 1000,
                color: "from-green-400 to-teal-500"
              }
            ].map((challenge) => (
              <div
                key={challenge.id}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-yellow-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${challenge.color} rounded-2xl flex items-center justify-center text-white shadow-lg text-2xl group-hover:rotate-12 transition-transform`}>
                      ⚡
                    </div>
                    <div className="text-right">
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">
                        {challenge.points} pts
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        challenge.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                        challenge.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                        challenge.difficulty === 'Avanzado' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-gray-500 font-medium text-sm">{challenge.time}</span>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-xl border-l-4 border-blue-400">
                      <p className="text-sm font-semibold text-blue-800">🎯 {challenge.goal}</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => navigateToCircuit(challenge.id)}
                    className={`w-full bg-gradient-to-r ${challenge.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}
                  >
                    <Settings className="w-5 h-5" />
                    ¡Construir!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Simulador Interactivo */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-4">Laboratorio Virtual ElectroHuila</h3>
              <p className="text-xl mb-6">
                Diseña circuitos reales como nuestros ingenieros. Experimenta con componentes reales de ElectroHuila en un entorno 100% seguro.
              </p>
              
              <button 
                onClick={openSimulator}
                className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto"
              >
                <Settings className="w-6 h-6" />
                Abrir Simulador
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* SECCIÓN SOLAR */}
      <section id="solar" className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full mb-6 shadow-lg">
              <Sun className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Energía Solar ElectroHuila
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Descubre el poder del sol! Aprende sobre energía solar y cómo ElectroHuila está impulsando un futuro más verde para el Huila
            </p>
          </div>

          {/* Información sobre el Huila como potencia verde */}
          <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-3xl p-8 mb-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-4xl font-bold mb-4">🌞 El Huila: Potencia Verde de Colombia</h3>
              <p className="text-xl mb-8">
                Nuestro departamento tiene condiciones únicas para las energías limpias
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">🌞</div>
                  <h4 className="text-xl font-bold mb-2">Sol Abundante</h4>
                  <p className="text-sm mb-2">4.5+ horas de sol intenso diario</p>
                  <p className="text-xs">Ideal para paneles solares</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">💧</div>
                  <h4 className="text-xl font-bold mb-2">Ríos Poderosos</h4>
                  <p className="text-sm mb-2">Río Magdalena y más de 20 afluentes</p>
                  <p className="text-xs">Perfectos para hidroeléctricas</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-4xl mb-3">💎</div>
                  <h4 className="text-xl font-bold mb-2">Vientos Constantes</h4>
                  <p className="text-sm mb-2">Zonas con vientos de 6+ m/s</p>
                  <p className="text-xs">Excelentes para energía eólica</p>
                </div>
              </div>

              {/* Meta ElectroHuila 2030 */}
              <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-8">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-2xl font-bold mb-4">Meta ElectroHuila 2030</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-4xl font-bold">50%</div>
                    <div className="text-sm">Energía Renovable</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">100K</div>
                    <div className="text-sm">Hogares con Solar</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">0</div>
                    <div className="text-sm">Emisiones Netas</div>
                  </div>
                </div>
              </div>

              {/* BOTÓN DIRECTO AL SIMULADOR DE GRANJA SOLAR */}
              <button 
                onClick={() => router.push('/granja-solar')}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto"
              >
                <Gamepad2 className="w-6 h-6" />
                Simular Granja Solar
              </button>
            </div>
          </div>

          {/* ¡Únete al Futuro Verde! */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 mb-16 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">🚀 ¡Únete al Futuro Verde!</h3>
            <p className="text-xl mb-8">
              Descubre cómo puedes ser parte de la transición energética del Huila
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* BOTÓN DIRECTO AL SIMULADOR DE GRANJA SOLAR */}
              <button 
                onClick={() => router.push('/granja-solar')}
                className="bg-white text-purple-600 font-bold py-3 px-6 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2 justify-center"
              >
                <Gamepad2 className="w-5 h-5" />
                Simular Granja Solar
              </button>
              
              {/* BOTÓN DIRECTO A LA CALCULADORA SOLAR */}
              <button 
                onClick={() => router.push('/simulador-solar')}
                className="bg-white text-purple-600 font-bold py-3 px-6 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2 justify-center"
              >
                <Play className="w-5 h-5" />
                Calculadora Solar
              </button>
              
              <button 
                onClick={() => router.push('/proyectos')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-2xl hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all flex items-center gap-2 justify-center"
              >
                <ExternalLink className="w-5 h-5" />
                Conocer Más Proyectos
              </button>
            </div>
          </div>

          {/* Beneficios de la Energía Solar */}
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-3xl p-8 border-4 border-green-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-800 mb-6">🌱 Beneficios de la Energía Solar</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">💰</div>
                  <h4 className="font-bold text-gray-800 mb-2">Ahorro Económico</h4>
                  <p className="text-sm text-gray-600">Reduce tu factura eléctrica hasta un 90%</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌍</div>
                  <h4 className="font-bold text-gray-800 mb-2">Cuida el Planeta</h4>
                  <p className="text-sm text-gray-600">Energía 100% limpia y renovable</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🏠</div>
                  <h4 className="font-bold text-gray-800 mb-2">Aumenta el Valor</h4>
                  <p className="text-sm text-gray-600">Tu propiedad se valoriza con paneles solares</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Energía Confiable</h4>
                  <p className="text-sm text-gray-600">El sol brilla todos los días en el Huila</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-purple-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">¡Sigue Explorando!</h3>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-6">
              El aprendizaje nunca termina. Cada día hay algo nuevo que descubrir.
            </p>
            
            <a 
              href="https://electrohuila.com.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all shadow-lg"
            >
              <ExternalLink className="w-6 h-6" />
              Visitar ElectroHuila
            </a>
          </div>
          
          <div className="border-t border-purple-700 pt-8">
            <p className="text-purple-300">
              © 2025 Explora y Aprende - Hecho con ❤️ para mentes curiosas - Powered by ElectroHuila
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}