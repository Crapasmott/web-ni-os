import React, { useState } from 'react';

const ElectroHuilaKidsButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
      <button
        className={`
          relative overflow-hidden
          bg-gradient-to-r from-blue-400 via-blue-500 via-cyan-500 via-sky-400 to-blue-600
          text-white font-bold text-lg
          px-8 py-4 rounded-full
          shadow-2xl hover:shadow-blue-500/40
          transition-all duration-500 ease-out
          transform hover:scale-110
          animate-pulse hover:animate-none
          border-4 border-white/30
          backdrop-blur-sm
          ${isHovered ? 'rotate-2' : 'rotate-0'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out animate-shimmer"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-2 h-2 bg-white rounded-full opacity-70
                animate-bounce
              `}
              style={{
                left: `${20 + i * 12}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Contenido del botón */}
        <div className="relative flex items-center gap-3">
          {/* Icono de rayo animado */}
          <div className="text-2xl animate-spin-slow">
            ⚡
          </div>
          
          <span className="font-extrabold tracking-wide">
            ElectroHuila KIDS
          </span>
          
          {/* Icono de estrella parpadeante */}
          <div className="text-xl animate-ping">
            ✨
          </div>
        </div>

        {/* Ondas de energía */}
        <div className="absolute -inset-2 rounded-full border-2 border-cyan-300/60 animate-ping"></div>
        <div className="absolute -inset-4 rounded-full border-2 border-blue-300/40 animate-ping" style={{animationDelay: '0.5s'}}></div>
      </button>

      {/* Texto flotante */}
      <div className={`
        absolute left-full ml-4 top-1/2 transform -translate-y-1/2
        bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg
        font-semibold text-sm whitespace-nowrap
        transition-all duration-300 ease-out
        ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
      `}>
        ¡Diversión y aprendizaje! 🎮
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ElectroHuilaKidsButton;