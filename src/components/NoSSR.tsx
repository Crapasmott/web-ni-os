'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importar dinámicamente para evitar SSR issues
const LearnSection = dynamic(() => import('../components/LearnSection'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Zap className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
        <p className="text-blue-600">Cargando sección...</p>
      </div>
    </div>
  ),
});

// Hook corregido sin bucle infinito
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeStorage = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 0)); // Esperar al próximo tick

        if (!isMounted) return;

        if (typeof window !== 'undefined') {
          const item = window.localStorage.getItem(key);
          const value = item ? JSON.parse(item) : initialValue;
          setStoredValue(value);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        if (isMounted) {
          setStoredValue(initialValue);
          setIsInitialized(true);
        }
      }
    };

    initializeStorage();

    return () => {
      isMounted = false;
    };
  }, [key, initialValue]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, isInitialized] as const;
}

// Tipos TypeScript
interface UserProgress {
  quizScore: number;
  gamesCompleted: number;
  experimentsViewed: string[];
  coloringPages: string[];
}

type SectionType = 'home' | 'learn' | 'games' | 'coloring' | 'experiments';

export default function ElectroKidsApp() {
  // Estados principales
  const [currentSection, setCurrentSection] = useState<SectionType>('home');
  const [isMounted, setIsMounted] = useState(false);

  // Estados persistentes con localStorage
  const [isDarkMode, setIsDarkMode, isDarkModeInitialized] = useLocalStorage('electrokids-darkMode', false);
  const [soundEnabled, setSoundEnabled, isSoundInitialized] = useLocalStorage('electrokids-soundEnabled', true);
  const [userProgress, setUserProgress, isProgressInitialized] = useLocalStorage<UserProgress>('electrokids-userProgress', {
    quizScore: 0,
    gamesCompleted: 0,
    experimentsViewed: [],
    coloringPages: [],
  });

  // Verificar si el componente está montado
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Aplicar modo oscuro al documento
  useEffect(() => {
    if (!isMounted || !isDarkModeInitialized) return;

    const applyDarkMode = () => {
      try {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          document.body.style.backgroundColor = '#111827';
        } else {
          document.documentElement.classList.remove('dark');
          document.body.style.backgroundColor = '#f9fafb';
        }
      } catch (error) {
        // Silenciar error
      }
    };

    applyDarkMode();
  }, [isDarkMode, isMounted, isDarkModeInitialized]);

  // Componente de ejemplo para secciones pendientes
  const PlaceholderSection = ({ title, emoji }: { title: string; emoji: string }) => (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50'
      }`}
    >
      <div className="text-center p-8">
        <div className="text-8xl mb-6 animate-bounce">{emoji}</div>
        <h2
          className={`text-4xl md:text-6xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-blue-800'
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-xl md:text-2xl mb-8 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-blue-600'
          }`}
        >
          ¡Próximamente disponible!
        </p>
        <div
          className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 ${
            isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
          }`}
        >
          <Zap className="w-4 h-4 mr-2 animate-pulse" />
          Sección en desarrollo
        </div>
      </div>
    </div>
  );

  // Función para renderizar la sección actual
  const renderCurrentSection = () => {
    if (!isMounted || !isDarkModeInitialized || !isSoundInitialized || !isProgressInitialized) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
          <div className="text-center">
            <Zap className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold text-blue-800">Cargando ElectroKids...</h2>
            <p className="mt-2 text-blue-600">Preparando la experiencia eléctrica ⚡</p>
          </div>
        </div>
      );
    }

    switch (currentSection) {
      case 'home':
        return (
          <div
            className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
              isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
                : 'bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50'
            }`}
          >
            <div className="text-center p-8 max-w-6xl mx-auto">
              <div className="relative mb-8">
                <Zap
                  className={`w-32 h-32 mx-auto mb-6 animate-pulse transition-colors duration-300 ${
                    isDarkMode ? 'text-yellow-300' : 'text-yellow-500'
                  } drop-shadow-2xl`}
                />
              </div>

              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-blue-800'
                } leading-tight`}
              >
                ¡Bienvenidos a{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ElectroKids Huila!
                </span>
                <span className="animate-pulse">⚡</span>
              </h1>

              <p
                className={`text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Descubre el mundo mágico de la electricidad con{' '}
                <strong className="text-blue-500">Electrohuila</strong>, la empresa que lleva energía a todo el departamento del Huila desde{' '}
                <span className="font-bold text-yellow-600">1947</span>.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: '📅', label: 'Años de Servicio', value: '77+' },
                  { icon: '🏠', label: 'Hogares Servidos', value: '300k+' },
                  { icon: '💡', label: 'Energía Limpia', value: '100%' },
                  { icon: '🏆', label: 'Departamento', value: 'Huila' },
                ].map((stat, index) => (
                  <div
                    key={`stat-${index}`}
                    className={`p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                      isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/70 border border-gray-200'
                    }`}
                  >
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div
                      className={`text-2xl font-bold transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}
                    >
                      {stat.value}
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setCurrentSection('learn');
                    playSound('success');
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>¡Empezar a Aprender!</span>
                  <span className="text-2xl">🚀</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentSection('games');
                    playSound('click');
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>¡Jugar Ahora!</span>
                  <span className="text-2xl">🎮</span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'learn':
        return <LearnSection isDarkMode={isDarkMode} playSound={playSound} setCurrentSection={setCurrentSection} />;
      case 'games':
        return <PlaceholderSection title="Juegos Eléctricos" emoji="🎮" />;
      case 'coloring':
        return <PlaceholderSection title="Colorea y Crea" emoji="🎨" />;
      case 'experiments':
        return <PlaceholderSection title="Experimentos Seguros" emoji="🔬" />;
      default:
        return <PlaceholderSection title="Inicio" emoji="🏠" />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      suppressHydrationWarning
    >
      {/* Header */}
      {isMounted && (
        <header
          className={`${
            isDarkMode
              ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900'
              : 'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600'
          } text-white shadow-xl sticky top-0 z-50 transition-all duration-500`}
          suppressHydrationWarning
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <Zap className="w-10 h-10 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold group-hover:scale-105 transition-transform duration-300">
                    ElectroKids
                  </h1>
                  <p className="text-xs md:text-sm opacity-90 font-medium">Huila - Energía Educativa</p>
                </div>
              </div>

              {/* Navegación Desktop */}
              <nav className="hidden md:flex space-x-2">
                {[
                  { id: 'home', label: 'Inicio', emoji: '🏠', color: 'bg-blue-500' },
                  { id: 'learn', label: 'Aprender', emoji: '📚', color: 'bg-green-500' },
                  { id: 'games', label: 'Juegos', emoji: '🎮', color: 'bg-purple-500' },
                  { id: 'coloring', label: 'Colorear', emoji: '🎨', color: 'bg-pink-500' },
                  { id: 'experiments', label: 'Experimentos', emoji: '🔬', color: 'bg-yellow-500' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id as SectionType);
                      playSound('click');
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      currentSection === item.id
                        ? 'bg-white text-gray-800 shadow-lg'
                        : `${item.color} hover:opacity-80 text-white hover:shadow-md`
                    }`}
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <span className="hidden lg:inline text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Controles */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    playSound('toggle');
                  }}
                  className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    soundEnabled ? 'bg-green-500 hover:bg-green-400' : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  title={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
                >
                  <span className="text-lg">{soundEnabled ? '🔊' : '🔇'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    playSound('toggle');
                  }}
                  className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110"
                  title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                  <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Contenido principal */}
      <main className="min-h-screen" suppressHydrationWarning>
        {renderCurrentSection()}
      </main>

      {/* Footer */}
      {isMounted && (
        <footer
          className={`${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-800 border-blue-700'
          } text-white p-6 mt-12 border-t-4 transition-colors duration-500`}
          suppressHydrationWarning
        >
          <div className="container mx-auto text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
              <h3 className="text-2xl font-bold">ElectroKids Huila</h3>
            </div>
            <p className="text-lg font-medium mb-2">Una iniciativa educativa de Electrohuila S.A. E.S.P.</p>
            <p className="text-sm opacity-90 mb-4">
              "Transmitimos buena energía, generamos confianza y distribuimos bienestar"
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center space-x-2">
                <span className="text-2xl">🌊</span>
                <span>Energía Hidroeléctrica</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span>Desde 1947</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="text-2xl">🏠</span>
                <span>Todo el Huila</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <span>100% Renovable</span>
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}