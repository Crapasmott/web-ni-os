'use client';
import React from 'react';
import { Zap, Star, Brain, Rocket, Beaker, Palette, Heart, ChevronDown, Sparkles, Sun, Home } from 'lucide-react';

const ElectroHuilaKidsHero = () => {
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 relative overflow-hidden">
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0">
        {/* Círculos grandes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-orange-300 bg-opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-yellow-300 bg-opacity-20 rounded-full animate-pulse"></div>
        
        {/* Rayos eléctricos pequeños */}
        <div className="absolute top-10 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        {/* Estrellas brillantes */}
        <div className="absolute top-16 right-32 text-yellow-300 text-2xl animate-pulse">✨</div>
        <div className="absolute top-64 left-16 text-pink-300 text-xl animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
        <div className="absolute bottom-48 right-48 text-blue-300 text-3xl animate-pulse" style={{animationDelay: '2s'}}>🌟</div>
        <div className="absolute bottom-80 left-64 text-green-300 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
      </div>

      {/* CORREGIDO: Agregado pt-20 para bajar todo el contenido */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-20">
        <div className="text-center max-w-5xl mx-auto">
          
          {/* Logo ElectroHuila con espacio para imagen - CORREGIDO: Agregado mt-8 */}
          <div className="relative mb-8 mt-8">
            <div className="inline-flex items-center justify-center w-40 h-40 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500 rounded-full shadow-2xl mb-6 relative border-4 border-white">
              {/* Aquí puedes colocar tu logo */}
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <img src="/icono/electro.png" alt="ElectroHuila" className="w-28 h-28 object-contain" />
                
              </div>
              
              {/* Rayos animados alrededor del logo */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
                <Zap className="w-8 h-8 text-yellow-300 absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse" />
                <Zap className="w-6 h-6 text-orange-400 absolute top-1/2 -right-4 transform -translate-y-1/2 animate-pulse" style={{animationDelay: '0.5s'}} />
                <Zap className="w-7 h-7 text-pink-300 absolute -bottom-4 right-1/4 animate-pulse" style={{animationDelay: '1s'}} />
                <Zap className="w-6 h-6 text-blue-300 absolute top-1/4 -left-4 animate-pulse" style={{animationDelay: '1.5s'}} />
              </div>
              
              {/* Brillo exterior */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Título principal con fuente infantil */}
          <div className="mb-8">
            <h1 className="font-black text-6xl md:text-8xl lg:text-9xl mb-4 transform -rotate-2">
              <span className="inline-block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                ElectroHuila
              </span>
            </h1>
            <div className="transform rotate-1">
              <span className="inline-block text-5xl md:text-7xl lg:text-8xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
                KIDS
              </span>
              <span className="text-4xl md:text-6xl animate-bounce inline-block ml-4">🎈</span>
            </div>
          </div>

          {/* Gran eslogan súper llamativo */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-6 transform -rotate-1 shadow-2xl border-4 border-white mb-6">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2">
                ⚡ ¡DESCUBRE EL PODER DE LA ENERGÍA! ⚡
              </h2>
              <p className="text-lg md:text-2xl text-yellow-200 font-bold">
                🌟 Aprende, Juega y Brilla con ElectroHuila 🌟
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 rounded-3xl p-4 transform rotate-1 shadow-2xl border-4 border-white">
              <p className="text-xl md:text-3xl font-black text-white">
                🚀 ¡LA AVENTURA ELÉCTRICA MÁS DIVERTIDA DEL HUILA! 🎮
              </p>
            </div>
          </div>

          {/* Botones de navegación súper coloridos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { id: 'learn', icon: Brain, name: 'Aprender', color: 'from-blue-500 to-purple-600', emoji: '🧠' },
              { id: 'games', icon: Rocket, name: 'Juegos', color: 'from-green-500 to-blue-500', emoji: '🎮' },
              { id: 'experiments', icon: Beaker, name: 'Experimentos', color: 'from-red-500 to-pink-600', emoji: '🔬' },
              { id: 'coloring', icon: Palette, name: 'Colorear', color: 'from-pink-500 to-purple-600', emoji: '🎨' },
              { id: 'circuits', icon: Zap, name: 'Circuitos', color: 'from-yellow-500 to-orange-600', emoji: '⚡' },
              { id: 'luzila', icon: Heart, name: 'Luzila', color: 'from-purple-500 to-pink-500', emoji: '💖' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToSection(item.id)}
                className={`group relative bg-gradient-to-r ${item.color} p-6 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-rotate-3 transition-all duration-300 border-4 border-white`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 animate-bounce group-hover:animate-spin">
                    {item.emoji}
                  </div>
                  <item.icon className="w-6 h-6 text-white mx-auto mb-2 group-hover:animate-pulse" />
                  <span className="text-white font-black text-sm drop-shadow-lg">{item.name}</span>
                </div>
                
                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>
 </div>
      </div>
    </section>
  );
};

export default ElectroHuilaKidsHero;