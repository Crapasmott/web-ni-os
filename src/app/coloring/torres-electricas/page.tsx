'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Zap, Palette, Download, RotateCcw, Save, Trash2, Lightbulb, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TorresElectricasPage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [currentDrawing, setCurrentDrawing] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FF6B35');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const drawings = [
    {
      id: 1,
      title: "Torre de Transmisión Principal",
      description: "Torre de alta tensión que lleva electricidad por todo el Huila",
      difficulty: "Medio",
      category: "Transmisión"
    },
    {
      id: 2,
      title: "Subestación ElectroHuila", 
      description: "Centro de distribución eléctrica en Neiva",
      difficulty: "Medio",
      category: "Distribución"
    },
    {
      id: 3,
      title: "Poste de Energía Rural",
      description: "Llevando electricidad a las veredas del Huila",
      difficulty: "Fácil",
      category: "Rural"
    },
    {
      id: 4,
      title: "Red Eléctrica Urbana",
      description: "Sistema de cables en el centro de Neiva",
      difficulty: "Avanzado",
      category: "Urbana"
    },
    {
      id: 5,
      title: "Torre con Paisaje Huilense",
      description: "Torre eléctrica con montañas del Huila de fondo",
      difficulty: "Medio",
      category: "Paisaje"
    },
    {
      id: 6,
      title: "Transformador de Barrio",
      description: "Equipo que reduce el voltaje para las casas",
      difficulty: "Medio",
      category: "Distribución"
    },
    {
      id: 7,
      title: "Línea de Alta Tensión",
      description: "Cables que transportan mucha energía",
      difficulty: "Avanzado",
      category: "Transmisión"
    },
    {
      id: 8,
      title: "Poste con Conexiones",
      description: "Detalle de las conexiones eléctricas",
      difficulty: "Medio",
      category: "Técnico"
    },
    {
      id: 9,
      title: "Torre en el Campo",
      description: "Electricidad llegando a las fincas",
      difficulty: "Fácil",
      category: "Rural"
    },
    {
      id: 10,
      title: "Sistema de Protección",
      description: "Equipos de seguridad eléctrica",
      difficulty: "Avanzado",
      category: "Seguridad"
    },
    {
      id: 11,
      title: "Red de Distribución",
      description: "Esquema completo de distribución eléctrica",
      difficulty: "Avanzado",
      category: "Sistema"
    },
    {
      id: 12,
      title: "Torre ElectroHuila Completa",
      description: "Torre con logo y colores de ElectroHuila",
      difficulty: "Medio",
      category: "Corporativa"
    }
  ];

  const colors = [
    '#FF6B35', '#F7931E', '#FFD700', '#32CD32', '#00CED1', 
    '#4169E1', '#8A2BE2', '#FF1493', '#DC143C', '#000000',
    '#8B4513', '#808080', '#FFFFFF', '#FFC0CB', '#90EE90'
  ];

  const goHome = () => {
    router.push('/');
  };

  const nextDrawing = () => {
    if (currentDrawing < drawings.length - 1) {
      setCurrentDrawing(currentDrawing + 1);
    }
  };

  const prevDrawing = () => {
    if (currentDrawing > 0) {
      setCurrentDrawing(currentDrawing - 1);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Redraw the base outline here
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${drawings[currentDrawing].title.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={goHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al Inicio</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-500" />
                Torres Eléctricas
              </h1>
              <div className="text-sm text-gray-500">
                Dibujo {currentDrawing + 1} de {drawings.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPalette(!showPalette)}
                className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <Palette className="w-4 h-4" />
                Colores
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas de Dibujo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{drawings[currentDrawing].title}</h2>
                  <p className="text-gray-600">{drawings[currentDrawing].description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    drawings[currentDrawing].difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                    drawings[currentDrawing].difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {drawings[currentDrawing].difficulty}
                  </span>
                </div>
              </div>

              {/* Canvas */}
              <div className="border-4 border-gray-200 rounded-2xl overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-auto cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>

              {/* Controles del Canvas */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Pincel:</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={brushSize}
                      onChange={(e) => setBrushSize(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-600">{brushSize}px</span>
                  </div>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer"
                    style={{ backgroundColor: selectedColor }}
                    onClick={() => setShowPalette(!showPalette)}
                  ></div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpiar
                  </button>
                  <button
                    onClick={downloadImage}
                    className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              </div>

              {/* Navegación de Dibujos */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prevDrawing}
                  disabled={currentDrawing === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                    currentDrawing === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Progreso</div>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${((currentDrawing + 1) / drawings.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={nextDrawing}
                  disabled={currentDrawing === drawings.length - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                    currentDrawing === drawings.length - 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Paleta de Colores */}
            {showPalette && (
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-orange-500" />
                  Paleta de Colores
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Información Educativa */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-orange-500" />
                ¿Sabías que?
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Las <strong>torres eléctricas</strong> de ElectroHuila transportan electricidad a voltajes 
                  muy altos (hasta 500,000 voltios) para reducir las pérdidas de energía.
                </p>
                <p>
                  En el Huila tenemos más de <strong>2,500 kilómetros</strong> de líneas de transmisión 
                  que llevan electricidad a los 37 municipios.
                </p>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">⚡ Dato ElectroHuila:</h4>
                  <p>¡Las torres más altas del Huila miden hasta 60 metros de altura!</p>
                </div>
              </div>
            </div>

            {/* Lista de Dibujos */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Todos los Dibujos</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {drawings.map((drawing, index) => (
                  <button
                    key={drawing.id}
                    onClick={() => setCurrentDrawing(index)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      currentDrawing === index
                        ? 'bg-orange-100 border-2 border-orange-300'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">{drawing.title}</div>
                        <div className="text-sm text-gray-600">{drawing.category}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        drawing.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                        drawing.difficulty === 'Medio' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {drawing.difficulty}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Logros */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500" />
                Progreso
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Dibujos completados</span>
                  <span className="font-bold text-orange-600">{currentDrawing + 1}/{drawings.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentDrawing + 1) / drawings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  ¡Sigue coloreando para completar toda la colección!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}