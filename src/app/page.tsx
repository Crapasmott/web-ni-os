'use client';
import { useState, useEffect, useRef } from 'react';
import { Zap, Star, Rocket, Brain, Palette, Beaker, Sun, ChevronDown, Calculator, BookOpen, Globe, Atom, Lightbulb, Play, Trophy, Timer, Gamepad2, Flame, Droplets, Sparkles, Download, RotateCcw, Heart, Battery, Power, Home, Settings, ExternalLink } from 'lucide-react';

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
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');

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
    <main className="relative">
      {/* BOTÓN ELECTROHUILA - FIJO EN LA ESQUINA */}
      <a 
        href="https://electrohuila.com" 
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
          
          {/* ESTRELLAS NARANJAS FIJAS */}
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
                
                {/* ESTRELLAS GIRANDO ALREDEDOR DEL RAYO */}
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
      </section>

      {/* SECCIÓN DE APRENDIZAJE - ELECTROHUILA Y ENERGÍA */}
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

          {/* Temas de Energía y ElectroHuila */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: '¿Qué es la Electricidad?',
                icon: Zap,
                color: 'from-yellow-500 to-orange-600',
                description: 'Aprende los conceptos básicos de la energía eléctrica',
                topics: ['Electrones', 'Corriente', 'Voltaje', 'Circuitos']
              },
              {
                name: 'ElectroHuila',
                icon: Home,
                color: 'from-green-500 to-blue-500',
                description: 'Conoce nuestra empresa y cómo servimos al Huila',
                topics: ['Historia', 'Servicios', 'Cobertura', 'Misión']
              },
              {
                name: 'Energías Renovables',
                icon: Sun,
                color: 'from-orange-500 to-red-500',
                description: 'El futuro verde de la energía',
                topics: ['Solar', 'Eólica', 'Hidroeléctrica', 'Sostenibilidad']
              },
              {
                name: 'Seguridad Eléctrica',
                icon: Settings,
                color: 'from-red-500 to-pink-600',
                description: 'Aprende a usar la electricidad de forma segura',
                topics: ['Prevención', 'Emergencias', 'Buenas Prácticas', 'Primeros Auxilios']
              }
            ].map((subject, index) => (
              <div
                key={index}
                className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-4 border-transparent hover:border-blue-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-12 transition-transform`}>
                    <subject.icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{subject.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700">Temas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {subject.topics.slice(0, 2).map((topic, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          {topic}
                        </span>
                      ))}
                      {subject.topics.length > 2 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                          +{subject.topics.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button className={`w-full mt-6 bg-gradient-to-r ${subject.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}>
                    <Play className="w-5 h-5" />
                    ¡Aprender!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Banner ElectroHuila */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 mb-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4">ElectroHuila - Energía para el Progreso</h3>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                Desde 1998, llevamos energía confiable a todos los rincones del Huila, 
                impulsando el desarrollo de nuestras comunidades con tecnología de punta y compromiso social.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">87</div>
                  <div className="text-sm">Municipios Atendidos</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">500K+</div>
                  <div className="text-sm">Usuarios Conectados</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-sm">Años de Experiencia</div>
                </div>
              </div>
            </div>
            {/* Efectos decorativos */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          </div>

          {/* Lecciones sobre Energía */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">⚡ Lecciones de Energía</h3>
              <p className="text-gray-600">Aprende todo sobre electricidad y ElectroHuila</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "¿Cómo llega la luz a tu casa?",
                  category: "ElectroHuila",
                  level: "Principiante",
                  duration: "12 min",
                  color: "from-blue-400 to-purple-500",
                  icon: "🏠",
                  description: "Descubre el viaje de la electricidad desde las plantas hasta tu hogar"
                },
                {
                  title: "Centrales Hidroeléctricas del Huila",
                  category: "Energía Renovable",
                  level: "Intermedio", 
                  duration: "18 min",
                  color: "from-blue-400 to-cyan-500",
                  icon: "💧",
                  description: "Conoce las represas que generan nuestra energía limpia"
                },
                {
                  title: "Ahorro de Energía en Casa",
                  category: "Eficiencia",
                  level: "Principiante",
                  duration: "10 min",
                  color: "from-green-400 to-emerald-500",
                  icon: "💡",
                  description: "Tips para reducir tu consumo y cuidar el planeta"
                },
                {
                  title: "Seguridad con la Electricidad",
                  category: "Seguridad",
                  level: "Importante",
                  duration: "15 min",
                  color: "from-red-400 to-pink-500",
                  icon: "⚠️",
                  description: "Reglas básicas para usar la electricidad sin riesgos"
                },
                {
                  title: "El Futuro de la Energía Solar",
                  category: "Innovación",
                  level: "Avanzado",
                  duration: "22 min",
                  color: "from-yellow-400 to-orange-500",
                  icon: "☀️", 
                  description: "Cómo los paneles solares están cambiando el mundo"
                },
                {
                  title: "Historia de ElectroHuila",
                  category: "Cultura",
                  level: "Principiante",
                  duration: "14 min",
                  color: "from-purple-400 to-indigo-500",
                  icon: "📚",
                  description: "25 años llevando progreso a todo el departamento"
                }
              ].map((lesson, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{lesson.icon}</div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        lesson.level === 'Principiante' ? 'bg-green-100 text-green-700' : 
                        lesson.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-700' :
                        lesson.level === 'Importante' ? 'bg-red-100 text-red-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {lesson.level}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2">{lesson.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span className="font-medium">{lesson.category}</span>
                    <span>{lesson.duration}</span>
                  </div>
                  
                  <button className={`w-full py-2 bg-gradient-to-r ${lesson.color} text-white font-bold rounded-xl hover:shadow-lg transform group-hover:scale-105 transition-all flex items-center justify-center gap-2`}>
                    <Play className="w-4 h-4" />
                    Comenzar
                  </button>
                </div>
              ))}
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
      </section>

    {/* ZONA DE JUEGOS - ELECTROHUILA Y ENERGÍA */}
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
                  
                  <button className={`w-full bg-gradient-to-r ${game.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}>
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
                  <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3">
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
            {/* Efectos decorativos */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          </div>

          {/* Galería de Juegos */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-blue-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🎮 Galería de Juegos</h3>
              <p className="text-gray-600">Todos nuestros juegos educativos sobre energía</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Memoria Eléctrica",
                  category: "Memoria",
                  level: "Fácil",
                  duration: "8 min",
                  color: "from-pink-400 to-rose-500",
                  icon: "🧩",
                  description: "Encuentra las parejas de equipos eléctricos",
                  rating: 5
                },
                {
                  title: "Ruta de la Energía",
                  category: "Estrategia",
                  level: "Medio", 
                  duration: "22 min",
                  color: "from-blue-400 to-indigo-500",
                  icon: "🗺️",
                  description: "Planifica la mejor red eléctrica para el Huila"
                },
                {
                  title: "ElectroMath",
                  category: "Educativo",
                  level: "Intermedio",
                  duration: "15 min",
                  color: "from-green-400 to-emerald-500",
                  icon: "📊",
                  description: "Resuelve problemas matemáticos con electricidad"
                },
                {
                  title: "Ahorro Energético",
                  category: "Simulación",
                  level: "Fácil",
                  duration: "12 min",
                  color: "from-yellow-400 to-amber-500",
                  icon: "💡",
                  description: "Aprende a reducir el consumo en casa"
                },
                {
                  title: "Técnico ElectroHuila",
                  category: "Rol",
                  level: "Avanzado",
                  duration: "30 min",
                  color: "from-purple-400 to-violet-500",
                  icon: "👷",
                  description: "Conviértete en técnico y resuelve emergencias"
                },
                {
                  title: "Carrera Solar",
                  category: "Acción",
                  level: "Medio",
                  duration: "16 min",
                  color: "from-orange-400 to-red-500",
                  icon: "🏎️",
                  description: "Conduce autos eléctricos por el Huila"
                }
              ].map((game, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{game.icon}</div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        game.level === 'Fácil' ? 'bg-green-100 text-green-700' : 
                        game.level === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                        game.level === 'Intermedio' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {game.level}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2">{game.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{game.description}</p>
                  
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                    <span className="font-medium">{game.category}</span>
                    <span>{game.duration}</span>
                  </div>
                  
                  <button className={`w-full py-2 bg-gradient-to-r ${game.color} text-white font-bold rounded-xl hover:shadow-lg transform group-hover:scale-105 transition-all flex items-center justify-center gap-2`}>
                    <Play className="w-4 h-4" />
                    Jugar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking y Logros */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Ranking */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-200">
              <div className="text-center mb-6">
                <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-orange-800">🏆 Ranking de Jugadores</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: "ElectroMaster", score: "2,450", badge: "🥇" },
                  { name: "EnergyKid", score: "2,180", badge: "🥈" },
                  { name: "LuzDelHuila", score: "1,920", badge: "🥉" },
                  { name: "CircuitHero", score: "1,750", badge: "🏅" },
                  { name: "TuNombre", score: "0", badge: "🆕" }
                ].map((player, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-2xl ${
                    player.name === "TuNombre" ? 'bg-blue-100 border-2 border-blue-300' : 'bg-white'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{player.badge}</span>
                      <div>
                        <div className="font-bold text-gray-800">{player.name}</div>
                        <div className="text-sm text-gray-500">Puntos: {player.score}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logros de Juegos */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-200">
              <div className="text-center mb-6">
                <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-800">⭐ Logros de Juegos</h3>
              </div>
              <div className="space-y-4">
                {[
                  { 
                    name: "Primer Paso", 
                    description: "Completa tu primer juego",
                    icon: "🎮",
                    progress: 0,
                    unlocked: false
                  },
                  { 
                    name: "Explorador Eléctrico", 
                    description: "Juega 5 juegos diferentes",
                    icon: "🔍",
                    progress: 0,
                    unlocked: false
                  },
                  { 
                    name: "Campeón ElectroHuila", 
                    description: "Obtén puntuación perfecta",
                    icon: "🏆",
                    progress: 0,
                    unlocked: false
                  },
                  { 
                    name: "Maestro de la Energía", 
                    description: "Completa todos los juegos",
                    icon: "⚡",
                    progress: 0,
                    unlocked: false
                  }
                ].map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-2xl border-2 ${
                    achievement.unlocked ? 'bg-white border-green-300' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{achievement.name}</div>
                        <div className="text-sm text-gray-600">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && <span className="text-green-500 text-xl">✓</span>}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${achievement.unlocked ? 'bg-green-500' : 'bg-gray-400'}`}
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* EXPERIMENTOS CIENTÍFICOS - ELECTROHUILA Y ENERGÍA */}
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

          {/* Experimentos sobre Electricidad y Energía */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                id: 1,
                title: "Circuito de Limón",
                icon: <Zap className="w-8 h-8" />,
                difficulty: "Fácil",
                time: "20 min",
                materials: ["Limón", "Cables", "LED", "Monedas de cobre", "Clips metálicos"],
                steps: [
                  "Inserta una moneda de cobre en un lado del limón",
                  "Inserta un clip metálico en el otro lado",
                  "Conecta los cables a cada metal",
                  "Conecta el LED a los cables",
                  "¡Observa cómo se enciende con energía natural!"
                ],
                science: "El ácido del limón actúa como electrolito, permitiendo que los electrones fluyan entre los metales diferentes, generando una pequeña corriente eléctrica.",
                safety: [
                  "No comer el limón después del experimento",
                  "Lavar las manos al finalizar",
                  "Supervisión de un adulto"
                ],
                color: "from-yellow-400 to-orange-500"
              },
              {
                id: 2,
                title: "Generador de Manivela",
                icon: <Settings className="w-8 h-8" />,
                difficulty: "Medio",
                time: "30 min",
                materials: ["Motor pequeño", "Manivela", "LED", "Cables", "Base de madera"],
                steps: [
                  "Conecta el motor a la base de madera",
                  "Instala la manivela en el eje del motor",
                  "Conecta los cables del motor al LED",
                  "Gira la manivela constantemente",
                  "¡Ve cómo generas electricidad con movimiento!"
                ],
                science: "Al girar la manivela, el motor funciona como generador, convirtiendo energía mecánica en energía eléctrica mediante inducción electromagnética.",
                safety: [
                  "Verificar conexiones antes de usar",
                  "No forzar la manivela",
                  "Usar con supervisión adulta"
                ],
                color: "from-blue-400 to-cyan-500"
              },
              {
                id: 3,
                title: "Panel Solar Casero",
                icon: <Sun className="w-8 h-8" />,
                difficulty: "Medio",
                time: "45 min",
                materials: ["Células solares pequeñas", "Cartón", "Cables", "Multímetro", "Pegamento"],
                steps: [
                  "Pega las células solares en el cartón",
                  "Conecta las células en serie con cables",
                  "Conecta el multímetro para medir voltaje",
                  "Exponlo a la luz solar directa",
                  "¡Mide la electricidad que produces!"
                ],
                science: "Las células fotovoltaicas convierten la luz solar directamente en electricidad mediante el efecto fotoeléctrico, liberando electrones cuando absorben fotones.",
                safety: [
                  "Manejar células solares con cuidado",
                  "No mirar directamente al sol",
                  "Verificar conexiones eléctricas"
                ],
                color: "from-orange-400 to-red-500"
              },
              {
                id: 4,
                title: "Turbina de Viento",
                icon: <Settings className="w-8 h-8" />,
                difficulty: "Avanzado",
                time: "60 min",
                materials: ["Motor pequeño", "Aspas de cartón", "Ventilador", "LED", "Soporte"],
                steps: [
                  "Construye las aspas con cartón resistente",
                  "Conecta las aspas al motor",
                  "Monta todo en el soporte estable",
                  "Conecta el LED al motor",
                  "Usa el ventilador para crear viento artificial",
                  "¡Observa cómo el viento genera electricidad!"
                ],
                science: "El viento mueve las aspas, que hacen girar el motor funcionando como generador, convirtiendo energía cinética del viento en energía eléctrica.",
                safety: [
                  "Aspas bien fijadas al motor",
                  "Mantener dedos alejados de aspas en movimiento",
                  "Supervisión adulta obligatoria"
                ],
                color: "from-green-400 to-teal-500"
              },
              {
                id: 5,
                title: "Electroimán Potente",
                icon: <Zap className="w-8 h-8" />,
                difficulty: "Fácil",
                time: "15 min",
                materials: ["Clavo grande", "Cable de cobre", "Pila", "Clips metálicos"],
                steps: [
                  "Enrolla el cable alrededor del clavo (50 vueltas)",
                  "Conecta los extremos del cable a la pila",
                  "Acerca clips metálicos al clavo",
                  "¡Ve cómo el clavo se vuelve magnético!"
                ],
                science: "La corriente eléctrica que pasa por el cable crea un campo magnético alrededor del clavo, convirtiéndolo en un electroimán.",
                safety: [
                  "No dejar conectado mucho tiempo",
                  "La pila puede calentarse",
                  "Desconectar al terminar"
                ],
                color: "from-purple-400 to-indigo-500"
              },
              {
                id: 6,
                title: "Conductor vs Aislante",
                icon: <Lightbulb className="w-8 h-8" />,
                difficulty: "Fácil",
                time: "25 min",
                materials: ["Pila", "LED", "Cables", "Objetos diversos", "Base de pruebas"],
                steps: [
                  "Construye un circuito simple con pila y LED",
                  "Deja un espacio abierto en el circuito",
                  "Prueba diferentes materiales en el espacio",
                  "Observa cuáles encienden el LED",
                  "¡Clasifica materiales conductores y aislantes!"
                ],
                science: "Los materiales conductores permiten el flujo de electrones, mientras que los aislantes lo impiden. Los metales son buenos conductores.",
                safety: [
                  "Usar solo pilas de bajo voltaje",
                  "No probar con líquidos",
                  "Supervisión adulta"
                ],
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
                  
                  <button className={`w-full mt-6 bg-gradient-to-r ${experiment.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}>
                    <Play className="w-5 h-5" />
                    ¡Experimentar!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Seguridad ElectroHuila */}
          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-8 border-4 border-red-200 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-red-800 mb-6">⚠️ Seguridad ElectroHuila</h3>
              <p className="text-lg text-red-700 mb-8 max-w-3xl mx-auto">
                En ElectroHuila, la seguridad es nuestra prioridad. Antes de experimentar, recuerda estas reglas de oro:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
                  <h4 className="font-bold text-gray-800 mb-2">Supervisión Adulta</h4>
                  <p className="text-sm text-gray-600">Siempre experimenta con la ayuda de un adulto responsable</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🔋</div>
                  <h4 className="font-bold text-gray-800 mb-2">Bajo Voltaje</h4>
                  <p className="text-sm text-gray-600">Usa únicamente pilas y fuentes de bajo voltaje</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🧼</div>
                  <h4 className="font-bold text-gray-800 mb-2">Manos Limpias</h4>
                  <p className="text-sm text-gray-600">Lávate las manos antes y después de experimentar</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🚫</div>
                  <h4 className="font-bold text-gray-800 mb-2">Nunca el Tomacorriente</h4>
                  <p className="text-sm text-gray-600">JAMÁS uses la electricidad de casa para experimentos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kit de Experimentos ElectroHuila */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🧪 Kit Científico ElectroHuila</h3>
              <p className="text-gray-600">Todo lo que necesitas para ser un científico de la energía</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Lista de Materiales */}
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-6">📦 Materiales Incluidos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { item: "Pilas AA (4 unidades)", icon: "🔋" },
                    { item: "LEDs de colores (10 unidades)", icon: "💡" },
                    { item: "Cables con conectores", icon: "🔌" },
                    { item: "Motor pequeño", icon: "⚙️" },
                    { item: "Células solares mini", icon: "☀️" },
                    { item: "Multímetro básico", icon: "📊" },
                    { item: "Electrodo de cobre", icon: "🥉" },
                    { item: "Clips y conectores", icon: "📎" },
                    { item: "Base de experimentos", icon: "🛠️" },
                    { item: "Manual ElectroHuila", icon: "📚" }
                  ].map((material, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                      <span className="text-2xl">{material.icon}</span>
                      <span className="font-medium text-gray-700">{material.item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Proyectos del Kit */}
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-6">⚡ Proyectos Incluidos</h4>
                <div className="space-y-4">
                  {[
                    {
                      name: "Mi Primera Bombilla",
                      difficulty: "Fácil",
                      time: "10 min",
                      description: "Enciende un LED con una pila"
                    },
                    {
                      name: "Batería de Frutas",
                      difficulty: "Fácil", 
                      time: "15 min",
                      description: "Genera electricidad con limones"
                    },
                    {
                      name: "Motor Solar",
                      difficulty: "Medio",
                      time: "25 min",
                      description: "Construye un motor que funciona con sol"
                    },
                    {
                      name: "Alarma Casera",
                      difficulty: "Medio",
                      time: "30 min",
                      description: "Crea una alarma con sensores"
                    },
                    {
                      name: "Mini Generador",
                      difficulty: "Avanzado",
                      time: "45 min",
                      description: "Construye tu propia planta eléctrica"
                    }
                  ].map((project, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-gray-800">{project.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                          project.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Duración: {project.time}</span>
                        <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                          Ver Instrucciones →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto">
                <Beaker className="w-6 h-6" />
                Solicitar Kit ElectroHuila
              </button>
              <p className="text-gray-500 text-sm mt-4">* Disponible para instituciones educativas del Huila</p>
            </div>
          </div>

          {/* Logros de Científico */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-200 mt-16">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-800 mb-6">🏆 Científico ElectroHuila</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🔬</div>
                  <h4 className="font-bold text-gray-800 mb-2">Aprendiz Científico</h4>
                  <p className="text-sm text-gray-600">Completa tu primer experimento</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Maestro Eléctrico</h4>
                  <p className="text-sm text-gray-600">Domina experimentos de electricidad</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌟</div>
                  <h4 className="font-bold text-gray-800 mb-2">Innovador Verde</h4>
                  <p className="text-sm text-gray-600">Experimenta con energías renovables</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👨‍🔬</div>
                  <h4 className="font-bold text-gray-800 mb-2">Científico ElectroHuila</h4>
                  <p className="text-sm text-gray-600">Completa todos los experimentos</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* COLOREA Y CREA - ELECTROHUILA Y ENERGÍA */}
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

          {/* Categorías de Dibujos ElectroHuila */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: 'Torres Eléctricas',
                icon: <Zap className="w-8 h-8" />,
                color: 'from-yellow-500 to-orange-600',
                description: 'Torres de transmisión y postes eléctricos del Huila',
                count: 12,
                difficulty: 'Medio'
              },
              {
                name: 'Centrales Hidroeléctricas',
                icon: <Droplets className="w-8 h-8" />,
                color: 'from-blue-500 to-cyan-600',
                description: 'Represas y plantas generadoras de energía',
                count: 8,
                difficulty: 'Avanzado'
              },
              {
                name: 'Paneles Solares',
                icon: <Sun className="w-8 h-8" />,
                color: 'from-orange-500 to-red-600',
                description: 'Energía solar y tecnología verde',
                count: 10,
                difficulty: 'Fácil'
              },
              {
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
                  
                  <button className={`w-full bg-gradient-to-r ${category.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}>
                    <Palette className="w-5 h-5" />
                    ¡Colorear!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Herramientas de Arte Digital */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-200 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-purple-800 mb-4">🎨 Estudio de Arte Digital</h3>
              <p className="text-purple-700">Herramientas profesionales para crear arte increíble</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  tool: "Pinceles Mágicos",
                  icon: "🖌️",
                  description: "15 pinceles diferentes con efectos especiales",
                  color: "from-pink-400 to-rose-500"
                },
                {
                  tool: "Colores ElectroHuila",
                  icon: "🌈",
                  description: "Paleta oficial con 50+ colores corporativos",
                  color: "from-yellow-400 to-orange-500"
                },
                {
                  tool: "Texturas Energéticas",
                  icon: "✨",
                  description: "Efectos de rayos, chispas y energía",
                  color: "from-blue-400 to-purple-500"
                },
                {
                  tool: "Stickers ElectroHuila",
                  icon: "⚡",
                  description: "Logos, iconos y elementos de la empresa",
                  color: "from-green-400 to-teal-500"
                }
              ].map((tool, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-4xl mb-4 text-center">{tool.icon}</div>
                  <h4 className="font-bold text-gray-800 mb-2 text-center">{tool.tool}</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">{tool.description}</p>
                  <button className={`w-full py-2 bg-gradient-to-r ${tool.color} text-white font-bold rounded-xl hover:shadow-lg transition-all`}>
                    Usar Herramienta
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Galería de Arte ElectroHuila */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-200 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🖼️ Galería de Arte ElectroHuila</h3>
              <p className="text-gray-600">Obras de arte creadas por niños del Huila</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Torre Eléctrica Mágica",
                  artist: "María, 8 años - Neiva",
                  category: "Torres Eléctricas",
                  colors: ["#FFD700", "#FF6B35", "#4ECDC4"],
                  likes: 45,
                  featured: true
                },
                {
                  title: "Mi Casa con Luz",
                  artist: "Carlos, 7 años - Pitalito",
                  category: "Hogares",
                  colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
                  likes: 32,
                  featured: false
                },
                {
                  title: "Represa del Río Magdalena",
                  artist: "Ana, 9 años - Garzón",
                  category: "Hidroeléctrica",
                  colors: ["#4ECDC4", "#45B7D1", "#96CEB4"],
                  likes: 58,
                  featured: true
                },
                {
                  title: "Paneles Solares Coloridos",
                  artist: "Luis, 6 años - La Plata",
                  category: "Energía Solar",
                  colors: ["#FECA57", "#FF9FF3", "#54A0FF"],
                  likes: 41,
                  featured: false
                },
                {
                  title: "ElectroHuila Superhéroe",
                  artist: "Sofia, 8 años - Timaná",
                  category: "Creatividad Libre",
                  colors: ["#5F27CD", "#00D2D3", "#FF9F43"],
                  likes: 67,
                  featured: true
                },
                {
                  title: "Familia Feliz con Energía",
                  artist: "Diego, 7 años - Íquira",
                  category: "Hogares",
                  colors: ["#2ED573", "#FF6348", "#3742FA"],
                  likes: 38,
                  featured: false
                }
              ].map((artwork, index) => (
                <div key={index} className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all ${
                  artwork.featured ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300' : 'bg-gray-50'
                }`}>
                  {artwork.featured && (
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-bold text-yellow-700">Obra Destacada</span>
                    </div>
                  )}
                  
                  {/* Simulación del dibujo con colores */}
                  <div className="aspect-square bg-white rounded-xl mb-4 p-4 border-2 border-gray-200 relative overflow-hidden">
                    <div className="absolute inset-4 rounded-lg" style={{
                      background: `linear-gradient(45deg, ${artwork.colors[0]}, ${artwork.colors[1]}, ${artwork.colors[2]})`
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-4xl opacity-90">🎨</div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-1">{artwork.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{artwork.artist}</p>
                  <p className="text-xs text-blue-600 font-semibold mb-3">{artwork.category}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {artwork.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-semibold text-gray-700">{artwork.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concurso de Arte ElectroHuila */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 text-white relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <Trophy className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-3xl font-bold mb-4">🏆 Concurso Anual de Arte ElectroHuila</h3>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                ¡Participa en nuestro concurso anual! Crea arte sobre energía y ElectroHuila. 
                Los ganadores recibirán premios increíbles y sus obras serán expuestas en nuestras oficinas.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">🥇</div>
                  <div className="text-lg font-bold mb-1">1er Lugar</div>
                  <div className="text-sm">Tablet + Kit de Arte + Visita a Central Eléctrica</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">🥈</div>
                  <div className="text-lg font-bold mb-1">2do Lugar</div>
                  <div className="text-sm">Kit de Arte Profesional + Diploma ElectroHuila</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-6">
                  <div className="text-3xl font-bold mb-2">🥉</div>
                  <div className="text-lg font-bold mb-1">3er Lugar</div>
                  <div className="text-sm">Set de Colores + Certificado de Participación</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg">
                  Ver Bases del Concurso
                </button>
                <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-2xl hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all">
                  Enviar mi Obra
                </button>
              </div>
            </div>
          </div>

          {/* Actividades de Arte */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-pink-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🎨 Actividades Creativas</h3>
              <p className="text-gray-600">Proyectos de arte para aprender sobre energía</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Diseña tu Propia Torre Eléctrica",
                  description: "Crea torres únicas con formas y colores fantásticos",
                  difficulty: "Fácil",
                  time: "20 min",
                  materials: ["Papel", "Colores", "Regla"],
                  color: "from-yellow-400 to-orange-500",
                  icon: "🗼"
                },
                {
                  title: "Mural de Energías Renovables",
                  description: "Pinta un gran mural con todas las energías limpias",
                  difficulty: "Medio",
                  time: "45 min",
                  materials: ["Papel grande", "Témperas", "Pinceles"],
                  color: "from-green-400 to-blue-500",
                  icon: "🌱"
                },
                {
                  title: "Cómic del Superhéroe ElectroHuila",
                  description: "Crea una historieta sobre aventuras eléctricas",
                  difficulty: "Avanzado",
                  time: "60 min",
                  materials: ["Hojas", "Marcadores", "Lápices"],
                  color: "from-purple-400 to-pink-500",
                  icon: "📚"
                },
                {
                  title: "Mandala Energético",
                  description: "Diseña mandalas inspirados en circuitos eléctricos",
                  difficulty: "Medio",
                  time: "30 min",
                  materials: ["Compás", "Colores", "Papel"],
                  color: "from-blue-400 to-indigo-500",
                  icon: "🔸"
                },
                {
                  title: "Collage del Huila Eléctrico",
                  description: "Crea un collage del departamento con energía",
                  difficulty: "Fácil",
                  time: "25 min",
                  materials: ["Revistas", "Tijeras", "Pegamento"],
                  color: "from-red-400 to-pink-500",
                  icon: "✂️"
                },
                {
                  title: "Escultura de Materiales Reciclados",
                  description: "Construye una central eléctrica con reciclaje",
                  difficulty: "Avanzado",
                  time: "90 min",
                  materials: ["Botellas", "Cajas", "Pintura"],
                  color: "from-green-400 to-teal-500",
                  icon: "♻️"
                }
              ].map((activity, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-pink-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-pink-300 transition-all hover:shadow-lg group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{activity.icon}</div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      activity.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                      activity.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {activity.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-gray-800 mb-2">{activity.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                  
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                    <span>Duración: {activity.time}</span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-600 mb-1">Materiales:</p>
                    <div className="flex flex-wrap gap-1">
                      {activity.materials.map((material, idx) => (
                        <span key={idx} className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 border">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className={`w-full py-2 bg-gradient-to-r ${activity.color} text-white font-bold rounded-xl hover:shadow-lg transform group-hover:scale-105 transition-all flex items-center justify-center gap-2`}>
                    <Palette className="w-4 h-4" />
                    Comenzar Proyecto
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Logros de Arte */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-200 mt-16">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-purple-800 mb-6">🏆 Artista ElectroHuila</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🎨</div>
                  <h4 className="font-bold text-gray-800 mb-2">Pequeño Artista</h4>
                  <p className="text-sm text-gray-600">Completa tu primera obra</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-pink-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌈</div>
                  <h4 className="font-bold text-gray-800 mb-2">Maestro del Color</h4>
                  <p className="text-sm text-gray-600">Usa todos los colores disponibles</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-yellow-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Artista Eléctrico</h4>
                  <p className="text-sm text-gray-600">Crea 10 obras sobre energía</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👑</div>
                  <h4 className="font-bold text-gray-800 mb-2">Artista ElectroHuila</h4>
                  <p className="text-sm text-gray-600">Gana el concurso anual</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* ARMADOR DE CIRCUITOS - ELECTROHUILA */}
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

          {/* Desafíos de Circuitos ElectroHuila */}
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
                    
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">Componentes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {challenge.components.slice(0, 3).map((comp, idx) => (
                          <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {comp}
                          </span>
                        ))}
                        {challenge.components.length > 3 && (
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            +{challenge.components.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-xl border-l-4 border-blue-400">
                      <p className="text-sm font-semibold text-blue-800">🎯 {challenge.goal}</p>
                    </div>
                  </div>
                  
                  <button className={`w-full bg-gradient-to-r ${challenge.color} text-white font-bold py-3 rounded-2xl hover:shadow-xl transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2`}>
                    <Settings className="w-5 h-5" />
                    ¡Construir!
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Componentes ElectroHuila */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-orange-200 mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🔧 Caja de Herramientas ElectroHuila</h3>
              <p className="text-gray-600">Conoce los componentes que usamos para llevar electricidad a todo el Huila</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Transformador",
                  icon: "🔄",
                  description: "Cambia voltajes para distribución segura",
                  category: "Distribución",
                  voltage: "13.2kV - 220V"
                },
                {
                  name: "Subestación",
                  icon: "🏭",
                  description: "Centro de control y distribución",
                  category: "Infraestructura", 
                  voltage: "115kV - 13.2kV"
                },
                {
                  name: "Medidor Digital",
                  icon: "📊",
                  description: "Mide consumo eléctrico inteligente",
                  category: "Medición",
                  voltage: "220V - 110V"
                },
                {
                  name: "Protección",
                  icon: "🛡️",
                  description: "Protege contra sobrecargas",
                  category: "Seguridad",
                  voltage: "Todos"
                },
                {
                  name: "Cable de Alta",
                  icon: "🔌",
                  description: "Transmite energía a larga distancia",
                  category: "Transmisión",
                  voltage: "115kV"
                },
                {
                  name: "Poste Eléctrico",
                  icon: "🗼",
                  description: "Soporte para líneas eléctricas",
                  category: "Estructura",
                  voltage: "13.2kV"
                },
                {
                  name: "Panel Solar",
                  icon: "☀️",
                  description: "Genera electricidad del sol",
                  category: "Renovable",
                  voltage: "12V - 24V"
                },
                {
                  name: "Smart Grid",
                  icon: "🌐",
                  description: "Red eléctrica inteligente",
                  category: "Innovación",
                  voltage: "Variable"
                }
              ].map((component, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-lg group cursor-pointer">
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{component.icon}</div>
                    <h4 className="font-bold text-gray-800 mb-2">{component.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                    
                    <div className="space-y-2">
                      <div className="bg-white rounded-lg px-3 py-1">
                        <span className="text-xs font-semibold text-orange-700">{component.category}</span>
                      </div>
                      <div className="bg-blue-100 rounded-lg px-3 py-1">
                        <span className="text-xs font-semibold text-blue-700">{component.voltage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulador Interactivo */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-4">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold">Simulador Avanzado</span>
                  </div>
                  <h3 className="text-4xl font-bold mb-4">Laboratorio Virtual ElectroHuila</h3>
                  <p className="text-xl mb-6">
                    Diseña circuitos reales como nuestros ingenieros. Experimenta con componentes reales 
                    de ElectroHuila en un entorno 100% seguro.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white bg-opacity-20 rounded-xl p-4">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm">Componentes Reales</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-xl p-4">
                      <div className="text-2xl font-bold">25</div>
                      <div className="text-sm">Desafíos Progresivos</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-xl p-4">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm">Seguro y Educativo</div>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-xl p-4">
                      <div className="text-2xl font-bold">∞</div>
                      <div className="text-sm">Posibilidades</div>
                    </div>
                  </div>
                  
                  <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3">
                    <Settings className="w-6 h-6" />
                    Abrir Simulador
                  </button>
                </div>
                
                <div className="text-center">
                  <div className="bg-white bg-opacity-10 rounded-3xl p-8 backdrop-blur-sm">
                    <h4 className="text-2xl font-bold mb-6">Funciones del Simulador:</h4>
                    <div className="space-y-4 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Arrastrar y soltar componentes</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Simulación de flujo eléctrico en tiempo real</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Medición de voltaje y corriente</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Detección automática de errores</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span>Guías paso a paso de ElectroHuila</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Efectos decorativos */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          </div>

          {/* Logros de Ingeniero ElectroHuila */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-800 mb-6">🏆 Ingeniero ElectroHuila</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Técnico Aprendiz</h4>
                  <p className="text-sm text-gray-600">Completa tu primer circuito</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-yellow-500 h-2 rounded-full w-0"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">0/1 circuitos</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🔧</div>
                  <h4 className="font-bold text-gray-800 mb-2">Electricista Certificado</h4>
                  <p className="text-sm text-gray-600">Resuelve 10 desafíos</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">0/10 desafíos</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌟</div>
                  <h4 className="font-bold text-gray-800 mb-2">Ingeniero ElectroHuila</h4>
                  <p className="text-sm text-gray-600">Domina sistemas complejos</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-0"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">0/5 sistemas</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👑</div>
                  <h4 className="font-bold text-gray-800 mb-2">Maestro de la Red</h4>
                  <p className="text-sm text-gray-600">Crea tu propia red eléctrica</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">0/1 red completa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* GRANJA SOLAR INTELIGENTE - ELECTROHUILA */}
      <section id="solar" className="min-h-screen bg-gradient-to-b from-green-50 to-blue-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full mb-6 shadow-lg">
              <Sun className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Granja Solar ElectroHuila
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¡Descubre el futuro energético del Huila! Aprende sobre energía solar y cómo ElectroHuila apuesta por la sostenibilidad
            </p>
          </div>

          {/* Simulador de Paneles Solares */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Panel de Control */}
            <div className="lg:col-span-1 space-y-6">
              {/* Controles de Simulación */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-green-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings className="text-green-500" />
                  Centro de Control
                </h3>
                
                <div className="space-y-4">
                  <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all shadow-lg">
                    + Agregar Panel Solar
                  </button>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg">
                    ☀️ Cambiar Clima
                  </button>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    Simular Día Completo
                  </button>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all flex items-center justify-center gap-2">
                    <RotateCcw className="w-5 h-5" />
                    Reiniciar Granja
                  </button>
                </div>
              </div>

              {/* Estadísticas de Generación */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="text-blue-500" />
                  Energía Generada
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-xl border-2 border-yellow-200">
                    <div className="text-sm text-gray-600">Generación Actual</div>
                    <div className="text-2xl font-bold text-orange-600">0 kW</div>
                    <div className="text-xs text-gray-500">En tiempo real</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border-2 border-green-200">
                    <div className="text-sm text-gray-600">Energía Diaria</div>
                    <div className="text-2xl font-bold text-green-600">0 kWh</div>
                    <div className="text-xs text-gray-500">Acumulado hoy</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl border-2 border-blue-200">
                    <div className="text-sm text-gray-600">Paneles Activos</div>
                    <div className="text-2xl font-bold text-blue-600">0 / 0</div>
                    <div className="text-xs text-gray-500">Paneles funcionando</div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-xl border-2 border-purple-200">
                    <div className="text-sm text-gray-600">CO₂ Evitado</div>
                    <div className="text-2xl font-bold text-purple-600">0 kg</div>
                    <div className="text-xs text-gray-500">Impacto ambiental</div>
                  </div>
                </div>
              </div>

              {/* Desafíos ElectroHuila */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Trophy className="text-yellow-500" />
                  Desafíos ElectroHuila
                </h3>
                
                <div className="space-y-3">
                  {[
                    {
                      title: "Casa Rural",
                      description: "Genera 50 kWh para una casa campesina",
                      target: "50 kWh",
                      difficulty: "Fácil",
                      reward: "⭐"
                    },
                    {
                      title: "Escuela del Huila",
                      description: "Suministra energía a una escuela rural",
                      target: "200 kWh",
                      difficulty: "Medio",
                      reward: "🏆"
                    },
                    {
                      title: "Municipio Verde",
                      description: "Alimenta todo un municipio pequeño",
                      target: "1000 kWh",
                      difficulty: "Difícil",
                      reward: "👑"
                    }
                  ].map((challenge, index) => (
                    <button
                      key={index}
                      className="w-full p-3 rounded-xl transition-all text-left bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-yellow-300"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold text-gray-800 text-sm">{challenge.title}</div>
                        <span className="text-lg">{challenge.reward}</span>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">{challenge.description}</div>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          challenge.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                          challenge.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">Meta: {challenge.target}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Área de Simulación */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Granja Solar del Huila</h3>
                    <p className="text-gray-600">Construye la granja solar más eficiente</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Sun className="w-6 h-6 text-yellow-500" />
                      Hora: 12:00 PM
                    </div>
                    <div className="text-sm text-gray-600">
                      Intensidad Solar: 100%
                    </div>
                  </div>
                </div>

                {/* Información del Clima Actual */}
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">☀️</span>
                      <div>
                        <div className="font-bold text-lg">Día Soleado en Neiva</div>
                        <div className="text-sm opacity-90">Condiciones perfectas para generar energía solar</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">Intensidad Solar</div>
                      <div className="text-2xl">100%</div>
                    </div>
                  </div>
                </div>

                {/* Área de la Granja Solar */}
                <div className="bg-gradient-to-b from-blue-200 to-green-200 rounded-2xl h-96 p-4 relative overflow-hidden">
                  {/* Sol */}
                  <div className="absolute top-4 right-4">
                    <Sun className="w-12 h-12 text-yellow-500 animate-pulse" />
                  </div>
                  
                  {/* Montañas del Huila */}
                  <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 400 100" className="w-full h-24 text-green-600">
                      <path d="M0,100 L0,60 L50,30 L100,50 L150,20 L200,40 L250,15 L300,35 L350,25 L400,35 L400,100 Z" fill="currentColor" opacity="0.3"/>
                    </svg>
                  </div>
                  
                  {/* Área donde aparecerán los paneles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold bg-white bg-opacity-80 rounded-lg p-3">
                        Haz clic en "Agregar Panel Solar" para comenzar tu granja
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información Educativa */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <Sun className="w-5 h-5" />
                      Energía Solar en el Huila
                    </h4>
                    <p className="text-sm text-green-700">
                      El Huila recibe más de 4.5 kWh/m² de radiación solar diaria, 
                      ideal para proyectos fotovoltaicos. ElectroHuila promueve esta energía limpia.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                    <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Tecnología ElectroHuila
                    </h4>
                    <p className="text-sm text-blue-700">
                      Nuestros paneles tienen 22% de eficiencia y 25 años de garantía. 
                      Cada panel genera aproximadamente 400W en condiciones óptimas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proyectos Solares Reales de ElectroHuila */}
          <div className="mt-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-4xl font-bold mb-4">☀️ Proyectos Solares ElectroHuila</h3>
                <p className="text-xl max-w-3xl mx-auto">
                  Conoce los proyectos reales de energía solar que ElectroHuila está desarrollando para el Huila
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Granja Solar Neiva",
                    capacity: "50 MW",
                    homes: "25,000",
                    location: "Neiva",
                    status: "En Desarrollo",
                    year: "2025"
                  },
                  {
                    name: "Proyecto Solar Pitalito",
                    capacity: "30 MW", 
                    homes: "15,000",
                    location: "Pitalito",
                    status: "Planificación",
                    year: "2026"
                  },
                  {
                    name: "Energía Rural Huila",
                    capacity: "20 MW",
                    homes: "10,000",
                    location: "Zona Rural",
                    status: "Estudio",
                    year: "2027"
                  }
                ].map((project, index) => (
                  <div key={index} className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">☀️</div>
                      <h4 className="font-bold text-xl mb-2">{project.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'En Desarrollo' ? 'bg-green-100 text-green-800' :
                        project.status === 'Planificación' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-center">
                      <div>
                        <div className="text-2xl font-bold">{project.capacity}</div>
                        <div className="text-sm opacity-90">Capacidad</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">{project.homes}</div>
                        <div className="text-sm opacity-90">Hogares Beneficiados</div>
                      </div>
                      <div>
                        <div className="font-bold">{project.location}</div>
                        <div className="text-sm opacity-90">Ubicación</div>
                      </div>
                      <div>
                        <div className="font-bold">{project.year}</div>
                        <div className="text-sm opacity-90">Año Proyectado</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="bg-white text-orange-600 font-bold py-4 px-8 rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg flex items-center gap-3 mx-auto">
                  <ExternalLink className="w-6 h-6" />
                  Conocer Más Proyectos ElectroHuila
                </button>
              </div>
            </div>
          </div>

          {/* Beneficios de la Energía Solar */}
          <div className="mt-16 bg-white rounded-3xl p-8 shadow-2xl border-4 border-green-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">🌱 ¿Por qué Energía Solar?</h3>
              <p className="text-gray-600">ElectroHuila apuesta por un futuro sostenible para el Huila</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: "🌍",
                  title: "Cuida el Planeta",
                  description: "Reduce las emisiones de CO₂ y protege el medio ambiente del Huila"
                },
                {
                  icon: "💰",
                  title: "Ahorra Dinero",
                  description: "Reduce los costos de energía a largo plazo para las familias huilenses"
                },
                {
                  icon: "⚡",
                  title: "Energía Confiable",
                  description: "El sol del Huila es una fuente inagotable y constante de energía"
                },
                {
                  icon: "🏘️",
                  title: "Desarrollo Local",
                  description: "Genera empleo y desarrollo económico en las comunidades rurales"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">{benefit.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logros de Ingeniero Solar */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-200 mt-16">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-800 mb-6">🏆 Ingeniero Solar ElectroHuila</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">☀️</div>
                  <h4 className="font-bold text-gray-800 mb-2">Aprendiz Solar</h4>
                  <p className="text-sm text-gray-600">Instala tu primer panel solar</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-yellow-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌱</div>
                  <h4 className="font-bold text-gray-800 mb-2">Guardián Verde</h4>
                  <p className="text-sm text-gray-600">Evita 100 kg de CO₂</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-green-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-800 mb-2">Maestro Energético</h4>
                  <p className="text-sm text-gray-600">Genera 1000 kWh</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-blue-500 h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👑</div>
                  <h4 className="font-bold text-gray-800 mb-2">Ingeniero ElectroHuila</h4>
                  <p className="text-sm text-gray-600">Completa todos los desafíos</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-500 h-2 rounded-full w-0"></div>
                  </div>
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
            
            {/* BOTÓN ADICIONAL A ELECTROHUILA EN FOOTER */}
            <a 
              href="https://electrohuila.com" 
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
              © 2024 Explora y Aprende - Hecho con ❤️ para mentes curiosas - Powered by ElectroHuila
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}