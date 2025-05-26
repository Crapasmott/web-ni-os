'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Zap, Star, Play, Pause, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight, BookOpen, Eye, Sparkles } from 'lucide-react';

const PureInteractiveComicBook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [readingSpeed, setReadingSpeed] = useState(4000);
  const [bookOpen, setBookOpen] = useState(true);
  const [lucilaInteraction, setLucilaInteraction] = useState(null);
  const pageRef = useRef(null);

  // Páginas del libro cómic
  const comicPages = [
    {
      id: 0,
      pageNumber: 1,
      title: "El Despertar de la Guardiana",
      background: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900",
      dialogue: "En lo alto de las montañas del Huila, donde los rayos danzan entre las nubes, despierta una nueva guardiana...",
      narrativeText: "Luzila abre sus ojos por primera vez, sintiendo el poder de la electricidad corriendo por sus venas.",
      lucilaState: "awakening",
      mood: "mystical",
      effects: ["lightning", "stars", "glow"],
      pageStyle: "dramatic"
    },
    {
      id: 1,
      pageNumber: 2,
      title: "¡Hola, Pequeños Exploradores!",
      background: "bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500",
      dialogue: "¡Hola! Soy Luzila, la guardiana de toda la energía eléctrica del Huila. ¿Están listos para conocer mis secretos?",
      narrativeText: "Con una sonrisa brillante, Luzila se presenta ante el mundo, irradiando energía positiva.",
      lucilaState: "greeting",
      mood: "joyful",
      effects: ["sparkles", "energy-waves", "rainbow"],
      pageStyle: "cheerful"
    },
    {
      id: 2,
      pageNumber: 3,
      title: "El Laboratorio de los Milagros",
      background: "bg-gradient-to-br from-cyan-600 via-teal-700 to-green-800",
      dialogue: "¡Vengan conmigo! Este es mi laboratorio secreto donde la magia de la electricidad cobra vida.",
      narrativeText: "Luzila extiende sus brazos, mostrando hologramas de circuitos y energía que bailan a su alrededor.",
      lucilaState: "showing",
      mood: "wonder",
      effects: ["hologram", "tech-lines", "floating-circuits"],
      pageStyle: "technological"
    },
    {
      id: 3,
      pageNumber: 4,
      title: "¡Alerta Roja!",
      background: "bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600",
      dialogue: "¡CUIDADO! Mi radar detecta peligro. Nunca, NUNCA toquen cables sueltos o aparatos con las manos mojadas.",
      narrativeText: "Los ojos de Luzila brillan con intensidad mientras su sistema de alerta se activa completamente.",
      lucilaState: "alert",
      mood: "serious",
      effects: ["warning-pulse", "danger-scan", "alert-border"],
      pageStyle: "warning"
    },
    {
      id: 4,
      pageNumber: 5,
      title: "Aliados del Planeta",
      background: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
      dialogue: "¡Miren a mis mejores amigos! El sol, el viento y el agua me ayudan a crear energía limpia para proteger nuestro planeta.",
      narrativeText: "Luzila vuela entre elementos naturales que cobran vida, creando un ballet de energía renovable.",
      lucilaState: "flying",
      mood: "harmonious",
      effects: ["nature-magic", "eco-glow", "elemental-dance"],
      pageStyle: "natural"
    },
    {
      id: 5,
      pageNumber: 6,
      title: "Únete a Mi Misión",
      background: "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700",
      dialogue: "¿Quieren ser mis compañeros guardianes? ¡Juntos podemos hacer del Huila el lugar más brillante de Colombia!",
      narrativeText: "Luzila extiende su mano hacia el lector, invitándolo a formar parte de su equipo de superhéroes energéticos.",
      lucilaState: "inviting",
      mood: "inspiring",
      effects: ["invitation-glow", "team-aura", "hope-sparkles"],
      pageStyle: "heroic"
    }
  ];

  // Auto-lectura
  useEffect(() => {
    let interval;
    if (isReading && bookOpen) {
      interval = setInterval(() => {
        setCurrentPage(prev => {
          if (prev < comicPages.length - 1) {
            return prev + 1;
          } else {
            setIsReading(false);
            return 0; // Volver al inicio
          }
        });
      }, readingSpeed);
    }
    return () => clearInterval(interval);
  }, [isReading, readingSpeed, bookOpen]);

  // Componente Lucila con imagen PNG
  const LucilaBookCharacter = ({ state, mood, interactive = true }) => {
    const getStateAnimation = () => {
      switch (state) {
        case 'awakening':
          return 'animate-pulse transform scale-110';
        case 'greeting':
          return 'animate-bounce transform hover:rotate-6';
        case 'showing':
          return 'transform rotate-12 animate-pulse';
        case 'alert':
          return 'animate-pulse transform scale-105 filter brightness-125';
        case 'flying':
          return 'animate-bounce transform hover:scale-110';
        case 'inviting':
          return 'transform scale-110 animate-pulse hover:scale-125';
        default:
          return 'hover:scale-105 transition-all duration-300';
      }
    };

    const getImageFilter = () => {
      switch (mood) {
        case 'mystical':
          return 'hue-rotate(180deg) brightness(1.1) drop-shadow(0 0 20px rgba(147, 51, 234, 0.7))';
        case 'joyful':
          return 'brightness(1.15) saturate(1.2) drop-shadow(0 0 15px rgba(251, 191, 36, 0.6))';
        case 'wonder':
          return 'hue-rotate(90deg) brightness(1.05) drop-shadow(0 0 15px rgba(20, 184, 166, 0.6))';
        case 'serious':
          return 'brightness(1.2) contrast(1.1) drop-shadow(0 0 20px rgba(239, 68, 68, 0.7))';
        case 'harmonious':
          return 'saturate(1.3) brightness(1.1) drop-shadow(0 0 15px rgba(34, 197, 94, 0.6))';
        case 'inspiring':
          return 'brightness(1.2) contrast(1.05) drop-shadow(0 0 20px rgba(236, 72, 153, 0.7))';
        default:
          return 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))';
      }
    };

    return (
      <div 
        className={`relative ${getStateAnimation()} cursor-pointer transition-all duration-500`}
        onClick={() => interactive && setLucilaInteraction(lucilaInteraction ? null : state)}
      >
        {/* Aura según el estado */}
        <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full opacity-20 animate-ping"></div>
        
        {/* Contenedor de la imagen */}
        <div className="relative w-40 h-48 flex items-center justify-center">
          
          {/* IMAGEN PNG DE LUCILA */}
          <img 
            src="/luzila/luzila.png" 
            alt="Luzila - Guardiana de ElectroHuila" 
            className="w-full h-full object-contain transition-all duration-500"
            style={{
              filter: getImageFilter()
            }}
            onError={(e) => {
              // Fallback si no encuentra la imagen
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBDMTI3LjYxNCA1MCAxNTAgNzIuMzg1OCAxNTAgMTAwQzE1MCAxMjcuNjE0IDEyNy42MTQgMTUwIDEwMCAxNTBDNzIuMzg1OCAxNTAgNTAgMTI3LjYxNCA1MCAxMDBDNTAgNzIuMzg1OCA3Mi4zODU4IDUwIDEwMCA1MFoiIGZpbGw9IiNGRjY2MDAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwTDMwIDMwSDEwTDIwIDEwWiIgZmlsbD0iIzNEQzNGNiIvPgo8L3N2Zz4KPC9zdmc+';
              console.log('Imagen de Lucila no encontrada, usando placeholder');
            }}
          />
          
          {/* Efectos adicionales por estado */}
          {state === 'alert' && (
            <div className="absolute inset-0 border-4 border-red-500 rounded-lg animate-pulse"></div>
          )}
          
          {state === 'awakening' && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg opacity-10 animate-pulse"></div>
          )}
          
          {state === 'flying' && (
            <>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce text-2xl">✨</div>
              <div className="absolute -bottom-4 right-1/4 text-pink-400 animate-pulse text-xl">🌟</div>
            </>
          )}
          
          {state === 'inviting' && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg opacity-15 animate-pulse"></div>
          )}
        </div>
        
        {/* Efectos interactivos */}
        {lucilaInteraction === state && (
          <div className="absolute -inset-6 border-4 border-yellow-400 rounded-2xl animate-pulse bg-yellow-400 bg-opacity-10"></div>
        )}
        
        {/* Partículas de energía alrededor */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-1/2 right-0 w-1 h-1 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
        </div>
      </div>
    );
  };

  // Efectos de página
  const PageEffects = ({ effects, mood }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {effects.includes('lightning') && (
          <>
            <div className="absolute top-10 left-1/4 w-2 h-40 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse opacity-80"></div>
            <div className="absolute top-20 right-1/3 w-1 h-32 bg-gradient-to-b from-blue-400 to-transparent animate-pulse opacity-60" style={{animationDelay: '0.5s'}}></div>
          </>
        )}
        {effects.includes('sparkles') && (
          <>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-yellow-400 text-2xl animate-pulse opacity-80"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              >
                ✨
              </div>
            ))}
          </>
        )}
        {effects.includes('energy-waves') && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping opacity-15"
                style={{ animationDelay: `${i * 0.8}s` }}
              ></div>
            ))}
          </>
        )}
        {effects.includes('hologram') && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-5 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </>
        )}
        {effects.includes('warning-pulse') && (
          <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
        )}
        {effects.includes('tech-lines') && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20 animate-pulse"
                style={{
                  top: `${10 + i * 10}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </>
        )}
        {effects.includes('nature-magic') && (
          <>
            <div className="absolute top-10 left-10 text-4xl animate-bounce opacity-80">🌱</div>
            <div className="absolute top-20 right-20 text-4xl animate-pulse opacity-80" style={{animationDelay: '1s'}}>☀️</div>
            <div className="absolute bottom-20 left-20 text-4xl animate-bounce opacity-80" style={{animationDelay: '2s'}}>💨</div>
            <div className="absolute bottom-10 right-10 text-4xl animate-pulse opacity-80" style={{animationDelay: '0.5s'}}>💧</div>
          </>
        )}
      </div>
    );
  };

  const currentPageData = comicPages[currentPage];

  return (
    <section id="luzila" className="min-h-screen relative overflow-hidden bg-gray-900">
      
      {/* Fondo de página */}
      <div className={`absolute inset-0 ${currentPageData.background} transition-all duration-1000`}>
        <PageEffects effects={currentPageData.effects} mood={currentPageData.mood} />
      </div>

      {/* Libro principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto">
          
          {/* Página del libro */}
          <div 
            ref={pageRef}
            className={`relative bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-700 ${
              bookOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
            }`}
          >
            
            {/* Encabezado del libro */}
            <div className="bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-10 animate-pulse"></div>
              <div className="relative z-10 flex items-center justify-center gap-4">
                <BookOpen className="w-8 h-8 text-white animate-pulse" />
                <h1 className="text-3xl md:text-4xl font-black text-white">
                  Las Aventuras de Luzila
                </h1>
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                  Página {currentPageData.pageNumber}
                </div>
              </div>
            </div>
            
            {/* Contenido de la página */}
            <div className="relative min-h-96 p-8 flex items-center justify-between gap-8">
              
              {/* Lucila - Lado izquierdo */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <LucilaBookCharacter 
                  state={currentPageData.lucilaState} 
                  mood={currentPageData.mood}
                />
                
                {/* Título de la página */}
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 mt-6 text-center">
                  {currentPageData.title}
                </h2>
              </div>
              
              {/* Contenido de texto - Lado derecho */}
              <div className="flex-2 max-w-lg space-y-6">
                
                {/* Burbuja de diálogo */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-6 shadow-xl border-4 border-purple-300 relative">
                    <div className="absolute -left-6 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-purple-300"></div>
                    <p className="text-lg md:text-xl text-gray-800 font-bold leading-relaxed">
                      "{currentPageData.dialogue}"
                    </p>
                    <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">💬</div>
                  </div>
                </div>
                
                {/* Texto narrativo */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg border-2 border-gray-300">
                  <p className="text-md md:text-lg text-gray-700 font-medium leading-relaxed italic">
                    {currentPageData.narrativeText}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Controles del libro */}
            <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-4">
              <div className="flex justify-between items-center">
                
                {/* Navegación de páginas */}
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Página Anterior
                </button>
                
                {/* Controles de lectura */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsReading(!isReading)}
                    className={`p-4 rounded-full text-white font-bold transition-all transform hover:scale-110 ${
                      isReading ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isReading ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-4 rounded-full text-white font-bold transition-all transform hover:scale-110 ${
                      soundEnabled ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage(0)}
                    className="p-4 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all transform hover:scale-110"
                  >
                    <RotateCcw className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Siguiente página */}
                <button
                  onClick={() => setCurrentPage(Math.min(comicPages.length - 1, currentPage + 1))}
                  disabled={currentPage === comicPages.length - 1}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-700 transition-all transform hover:scale-105"
                >
                  Página Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Indicador de progreso */}
              <div className="mt-4">
                <div className="flex justify-center items-center gap-2 mb-2">
                  {comicPages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentPage 
                          ? 'bg-yellow-400 scale-125 shadow-lg' 
                          : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                    ></button>
                  ))}
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentPage + 1) / comicPages.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PureInteractiveComicBook;