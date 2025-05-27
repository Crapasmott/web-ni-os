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
  const [isMobile, setIsMobile] = useState(false);
  const pageRef = useRef(null);
  const audioRef = useRef(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Detectar dispositivos móviles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Páginas del libro cómic con archivos de audio
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
      pageStyle: "dramatic",
      audioFile: "/audios/audio1.mp3" // 🎵 Coloca tu MP3 aquí
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
      pageStyle: "cheerful",
      audioFile: "/audios/audio2.mp3" // 🎵 Coloca tu MP3 aquí
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
      pageStyle: "technological",
      audioFile: "/audios/audio3.mp3" // 🎵 Coloca tu MP3 aquí
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
      pageStyle: "warning",
      audioFile: "/audio/page4-alerta.mp3" // 🎵 Coloca tu MP3 aquí
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
      pageStyle: "natural",
      audioFile: "/audios/audio5.mp3" // 🎵 Coloca tu MP3 aquí
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
      pageStyle: "heroic",
      audioFile: "/audios/audio6.mp3" // 🎵 Coloca tu MP3 aquí
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

  // 🎵 SISTEMA DE AUDIO - Control de reproducción
  useEffect(() => {
    const currentAudio = currentPageData.audioFile;
    
    if (soundEnabled && currentAudio && audioRef.current) {
      // Resetear estado de error
      setAudioError(false);
      
      // Cargar nuevo audio
      audioRef.current.src = currentAudio;
      audioRef.current.load();
      
      // Reproducir automáticamente si está habilitado
      const playAudio = async () => {
        try {
          await audioRef.current.play();
          setIsAudioLoaded(true);
        } catch (error) {
          console.log('Error reproduciendo audio:', error.message);
          setAudioError(true);
          setIsAudioLoaded(false);
        }
      };
      
      playAudio();
    } else if (audioRef.current) {
      // Pausar audio si está deshabilitado
      audioRef.current.pause();
    }
  }, [currentPage, soundEnabled]);

  // 🎵 Manejar eventos de audio
  const handleAudioLoad = () => {
    setIsAudioLoaded(true);
    setAudioError(false);
  };

  const handleAudioError = () => {
    setAudioError(true);
    setIsAudioLoaded(false);
    console.log('No se pudo cargar el archivo de audio para la página:', currentPageData.pageNumber);
  };

  // 🎵 Función para reproducir/pausar audio manualmente
  const toggleAudio = () => {
    if (audioRef.current && isAudioLoaded && !audioError) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Componente Lucila con imagen PNG - RESPONSIVE
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
        {/* Aura según el estado - RESPONSIVE */}
        <div className={`absolute ${isMobile ? '-inset-4' : '-inset-8'} bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-full opacity-20 animate-ping`}></div>
        
        {/* Contenedor de la imagen - RESPONSIVE */}
        <div className={`relative flex items-center justify-center ${
          isMobile ? 'w-28 h-36' : 'w-40 h-48'
        }`}>
          
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
          
          {/* Efectos adicionales por estado - RESPONSIVE */}
          {state === 'alert' && (
            <div className={`absolute inset-0 border-4 border-red-500 rounded-lg animate-pulse`}></div>
          )}
          
          {state === 'awakening' && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg opacity-10 animate-pulse"></div>
          )}
          
          {state === 'flying' && (
            <>
              <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-bounce ${isMobile ? 'text-xl' : 'text-2xl'}`}>✨</div>
              <div className={`absolute -bottom-4 right-1/4 text-pink-400 animate-pulse ${isMobile ? 'text-lg' : 'text-xl'}`}>🌟</div>
            </>
          )}
          
          {state === 'inviting' && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-300 rounded-lg opacity-15 animate-pulse"></div>
          )}
        </div>
        
        {/* Efectos interactivos - RESPONSIVE */}
        {lucilaInteraction === state && (
          <div className={`absolute ${isMobile ? '-inset-4' : '-inset-6'} border-4 border-yellow-400 rounded-2xl animate-pulse bg-yellow-400 bg-opacity-10`}></div>
        )}
        
        {/* Partículas de energía alrededor - RESPONSIVE */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-2 right-2 bg-yellow-400 rounded-full animate-ping opacity-60 ${isMobile ? 'w-1 h-1' : 'w-2 h-2'}`}></div>
          <div className={`absolute bottom-4 left-4 bg-pink-400 rounded-full animate-pulse opacity-80 ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'}`}></div>
          <div className={`absolute top-1/2 right-0 bg-blue-400 rounded-full animate-bounce opacity-70 ${isMobile ? 'w-0.5 h-0.5' : 'w-1 h-1'}`}></div>
        </div>
      </div>
    );
  };

  // Efectos de página - RESPONSIVE
  const PageEffects = ({ effects, mood }) => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {effects.includes('lightning') && (
          <>
            <div className={`absolute top-10 left-1/4 bg-gradient-to-b from-yellow-400 to-transparent animate-pulse opacity-80 ${isMobile ? 'w-1 h-20' : 'w-2 h-40'}`}></div>
            <div className={`absolute top-20 right-1/3 bg-gradient-to-b from-blue-400 to-transparent animate-pulse opacity-60 ${isMobile ? 'w-0.5 h-16' : 'w-1 h-32'}`} style={{animationDelay: '0.5s'}}></div>
          </>
        )}
        {effects.includes('sparkles') && (
          <>
            {[...Array(isMobile ? 8 : 15)].map((_, i) => (
              <div
                key={i}
                className={`absolute text-yellow-400 animate-pulse opacity-80 ${isMobile ? 'text-lg' : 'text-2xl'}`}
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
            {[...Array(isMobile ? 3 : 6)].map((_, i) => (
              <div
                key={i}
                className={`absolute inset-0 border-blue-400 rounded-full animate-ping opacity-15 ${isMobile ? 'border-2' : 'border-4'}`}
                style={{ animationDelay: `${i * 0.8}s` }}
              ></div>
            ))}
          </>
        )}
        {effects.includes('hologram') && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-5 animate-pulse"></div>
            <div className={`absolute top-0 left-0 w-full bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30 animate-pulse ${isMobile ? 'h-1' : 'h-2'}`}></div>
            <div className={`absolute top-1/2 left-0 w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse ${isMobile ? 'h-1' : 'h-2'}`} style={{animationDelay: '0.5s'}}></div>
          </>
        )}
        {effects.includes('warning-pulse') && (
          <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
        )}
        {effects.includes('tech-lines') && (
          <>
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20 animate-pulse ${isMobile ? 'h-0.5' : 'h-1'}`}
                style={{
                  top: `${10 + i * (isMobile ? 20 : 10)}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              ></div>
            ))}
          </>
        )}
        {effects.includes('nature-magic') && (
          <>
            <div className={`absolute top-10 left-10 animate-bounce opacity-80 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>🌱</div>
            <div className={`absolute top-20 right-20 animate-pulse opacity-80 ${isMobile ? 'text-2xl' : 'text-4xl'}`} style={{animationDelay: '1s'}}>☀️</div>
            <div className={`absolute bottom-20 left-20 animate-bounce opacity-80 ${isMobile ? 'text-2xl' : 'text-4xl'}`} style={{animationDelay: '2s'}}>💨</div>
            <div className={`absolute bottom-10 right-10 animate-pulse opacity-80 ${isMobile ? 'text-2xl' : 'text-4xl'}`} style={{animationDelay: '0.5s'}}>💧</div>
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

      {/* Libro principal - COMPLETAMENTE RESPONSIVE */}
      <div className={`relative z-10 min-h-screen flex items-center justify-center ${isMobile ? 'px-2 pt-16' : 'px-4 pt-20'}`}>
        <div className={`${isMobile ? 'w-full' : 'max-w-6xl'} mx-auto`}>
          
          {/* Página del libro - RESPONSIVE */}
          <div 
            ref={pageRef}
            className={`relative bg-white bg-opacity-95 backdrop-blur-sm overflow-hidden shadow-2xl transform transition-all duration-700 ${
              bookOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
            } ${isMobile ? 'rounded-2xl mx-1' : 'rounded-3xl'}`}
          >
            
            {/* Encabezado del libro - RESPONSIVE */}
            <div className={`bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-center relative overflow-hidden ${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-10 animate-pulse"></div>
              <div className={`relative z-10 flex items-center justify-center ${isMobile ? 'flex-col gap-2' : 'gap-4'}`}>
                <BookOpen className={`text-white animate-pulse ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`} />
                <h1 className={`font-black text-white ${isMobile ? 'text-xl' : 'text-3xl md:text-4xl'}`}>
                  Las Aventuras de Luzila
                </h1>
                <div className={`bg-yellow-400 text-black rounded-full font-bold ${isMobile ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'}`}>
                  Página {currentPageData.pageNumber}
                </div>
              </div>
            </div>
            
            {/* Contenido de la página - LAYOUT MOBILE vs DESKTOP */}
            <div className={`relative ${isMobile ? 'min-h-80 p-4' : 'min-h-96 p-8'} ${
              isMobile 
                ? 'flex flex-col items-center justify-center gap-4' 
                : 'flex items-center justify-between gap-8'
            }`}>
              
              {/* Lucila - RESPONSIVE POSITIONING */}
              <div className={`${isMobile ? 'w-full' : 'flex-1'} flex flex-col items-center justify-center`}>
                <LucilaBookCharacter 
                  state={currentPageData.lucilaState} 
                  mood={currentPageData.mood}
                />
                
                {/* Título de la página - RESPONSIVE */}
                <h2 className={`font-black text-gray-800 text-center ${isMobile ? 'text-lg mt-3' : 'text-2xl md:text-3xl mt-6'}`}>
                  {currentPageData.title}
                </h2>
              </div>
              
              {/* Contenido de texto - RESPONSIVE */}
              <div className={`${isMobile ? 'w-full' : 'flex-2 max-w-lg'} ${isMobile ? 'space-y-3' : 'space-y-6'}`}>
                
                {/* Burbuja de diálogo - RESPONSIVE */}
                <div className="relative">
                  <div className={`bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl border-4 border-purple-300 relative ${isMobile ? 'p-4' : 'p-6'}`}>
                    {!isMobile && (
                      <div className="absolute -left-6 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-purple-300"></div>
                    )}
                    <p className={`text-gray-800 font-bold leading-relaxed ${isMobile ? 'text-sm' : 'text-lg md:text-xl'}`}>
                      "{currentPageData.dialogue}"
                    </p>
                    <div className={`absolute top-2 right-2 text-yellow-400 animate-pulse ${isMobile ? 'text-lg' : ''}`}>💬</div>
                  </div>
                </div>
                
                {/* Texto narrativo - RESPONSIVE */}
                <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg border-2 border-gray-300 ${isMobile ? 'p-4' : 'p-6'}`}>
                  <p className={`text-gray-700 font-medium leading-relaxed italic ${isMobile ? 'text-xs' : 'text-md md:text-lg'}`}>
                    {currentPageData.narrativeText}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Controles del libro - COMPLETAMENTE RESPONSIVE */}
            <div className={`bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 ${isMobile ? 'p-3' : 'p-4'}`}>
              <div className={`${isMobile ? 'flex flex-col gap-3' : 'flex justify-between items-center'}`}>
                
                {/* MÓVIL: Controles de lectura primero */}
                {isMobile && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsReading(!isReading)}
                      className={`p-3 rounded-full text-white font-bold transition-all transform hover:scale-110 ${
                        isReading ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {isReading ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`p-3 rounded-full text-white font-bold transition-all transform hover:scale-110 relative ${
                        soundEnabled ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                      {/* 🎵 Indicador de estado de audio */}
                      {soundEnabled && (
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                          audioError ? 'bg-red-500' : isAudioLoaded ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                        }`}></div>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setCurrentPage(0)}
                      className="p-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-all transform hover:scale-110"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* MÓVIL: Navegación de páginas */}
                {isMobile && (
                  <div className="flex justify-between items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-700 transition-all text-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Anterior
                    </button>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(comicPages.length - 1, currentPage + 1))}
                      disabled={currentPage === comicPages.length - 1}
                      className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-full font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-700 transition-all text-sm"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* DESKTOP: Layout original */}
                {!isMobile && (
                  <>
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
                        className={`p-4 rounded-full text-white font-bold transition-all transform hover:scale-110 relative ${
                          soundEnabled ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                        {/* 🎵 Indicador de estado de audio */}
                        {soundEnabled && (
                          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                            audioError ? 'bg-red-500' : isAudioLoaded ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                          }`}></div>
                        )}
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
                  </>
                )}
              </div>
              
              {/* Indicador de progreso - RESPONSIVE */}
              <div className={`${isMobile ? 'mt-3' : 'mt-4'}`}>
                <div className={`flex justify-center items-center mb-2 ${isMobile ? 'gap-1' : 'gap-2'}`}>
                  {comicPages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`rounded-full transition-all duration-300 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${
                        index === currentPage 
                          ? 'bg-yellow-400 scale-125 shadow-lg' 
                          : 'bg-gray-500 hover:bg-gray-400'
                      }`}
                    ></button>
                  ))}
                </div>
                <div className={`w-full bg-gray-600 rounded-full ${isMobile ? 'h-1.5' : 'h-2'}`}>
                  <div 
                    className={`bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500 ${isMobile ? 'h-1.5' : 'h-2'}`}
                    style={{ width: `${((currentPage + 1) / comicPages.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎵 ELEMENTO DE AUDIO OCULTO */}
      <audio
        ref={audioRef}
        onLoadedData={handleAudioLoad}
        onError={handleAudioError}
        onEnded={() => setIsAudioLoaded(false)}
        preload="metadata"
        style={{ display: 'none' }}
      />
    </section>
  );
};

export default PureInteractiveComicBook;