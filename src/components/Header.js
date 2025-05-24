// src/components/Header.js
'use client';
import React from 'react';
import { Zap, Home, Gamepad2, Palette, FlaskConical, BookOpen, Volume2, Sun, Moon } from 'lucide-react';

const Header = ({
  currentSection,
  setCurrentSection,
  isDarkMode,
  setIsDarkMode,
  soundEnabled,
  setSoundEnabled,
  playSound
}) => {
  const navigationItems = [
    { id: 'home', icon: Home, label: 'Inicio', color: 'bg-blue-500' },
    { id: 'learn', icon: BookOpen, label: 'Aprender', color: 'bg-green-500' },
    { id: 'games', icon: Gamepad2, label: 'Juegos', color: 'bg-purple-500' },
    { id: 'coloring', icon: Palette, label: 'Colorear', color: 'bg-pink-500' },
    { id: 'experiments', icon: FlaskConical, label: 'Experimentos', color: 'bg-yellow-500' }
  ];

  const handleSectionChange = (sectionId) => {
    playSound('click');
    setCurrentSection(sectionId);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      playSound('toggle');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    playSound('toggle');
  };

  return (
    <header className={`${
      isDarkMode 
        ? 'bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600'
    } text-white shadow-xl sticky top-0 z-50 transition-all duration-500`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo y título */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <Zap className="w-10 h-10 text-yellow-300 animate-pulse electric-animation" />
              <div className="absolute inset-0 w-10 h-10 rounded-full pulse-ring"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-shadow group-hover:scale-105 transition-transform duration-300">
                ElectroKids
              </h1>
              <p className="text-xs md:text-sm opacity-90 font-medium">
                Huila - Energía Educativa
              </p>
            </div>
          </div>

          {/* Navegación principal */}
          <nav className="hidden md:flex space-x-2" role="navigation" aria-label="Navegación principal">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold
                    transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                    ${isActive 
                      ? 'bg-white text-gray-800 shadow-lg' 
                      : `${item.color} hover:bg-opacity-80 text-white hover:shadow-md`
                    }
                  `}
                  aria-pressed={isActive}
                  aria-label={`Ir a sección ${item.label}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-gray-700' : 'text-white'}`} />
                  <span className="hidden lg:inline text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Navegación móvil */}
          <nav className="md:hidden flex space-x-1" role="navigation" aria-label="Navegación móvil">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`
                    p-2 rounded-lg transition-all duration-300 transform hover:scale-110
                    focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                    ${isActive 
                      ? 'bg-white text-gray-800 shadow-lg' 
                      : 'bg-blue-400 hover:bg-blue-300 text-white'
                    }
                  `}
                  aria-pressed={isActive}
                  aria-label={item.label}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-700' : 'text-white'}`} />
                </button>
              );
            })}
          </nav>

          {/* Controles de configuración */}
          <div className="flex items-center space-x-2">
            
            {/* Control de sonido */}
            <button
              onClick={toggleSound}
              className={`
                p-2 rounded-full transition-all duration-300 transform hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
                ${soundEnabled 
                  ? 'bg-green-500 hover:bg-green-400' 
                  : 'bg-gray-500 hover:bg-gray-400'
                }
              `}
              aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
              title={soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
            >
              <Volume2 className={`w-4 h-4 ${
                soundEnabled ? 'text-white' : 'text-gray-300'
              }`} />
            </button>

            {/* Control de modo oscuro */}
            <button
              onClick={toggleDarkMode}
              className="
                p-2 rounded-full bg-yellow-500 hover:bg-yellow-400 
                transition-all duration-300 transform hover:scale-110
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
              "
              aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
              title={isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-900" />
              ) : (
                <Moon className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Barra de progreso opcional */}
        <div className="mt-3 hidden sm:block">
          <div className="flex justify-center space-x-1">
            {navigationItems.map((item, index) => (
              <div
                key={item.id}
                className={`
                  h-1 rounded-full transition-all duration-500 flex-1 max-w-20
                  ${currentSection === item.id 
                    ? 'bg-yellow-300 shadow-sm' 
                    : 'bg-white bg-opacity-30'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;