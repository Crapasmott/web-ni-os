'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Sun, Palette, Download, RotateCcw, Save, Trash2, Lightbulb, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PanelesSolaresPage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [currentDrawing, setCurrentDrawing] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#FF8C00');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const drawings = [
    {
      id: 1,
      title: "Panel Solar Residencial",
      description: "Paneles solares en el techo de una casa huilense",
      difficulty: "Fácil",
      category: "Residencial"
    },
    {
      id: 2,
      title: "Granja Solar del Huila", 
      description: "Gran instalación de paneles solares en campo abierto",
      difficulty: "Medio",
      category: "Industrial"
    },
    {
      id: 3,
      title: "Panel Solar con Paisaje",
      description: "Paneles con las montañas del Huila de fondo",
      difficulty: "Fácil",
      category: "Paisaje"
    },
    {
      id: 4,
      title: "Instalación en Escuela",
      description: "Colegio del Huila con energía solar",
      difficulty: "Fácil",
      category: "Educativo"
    },
    {
      id: 5,
      title: "Panel Solar Móvil",
      description: "Sistema portátil para zonas rurales",
      difficulty: "Fácil",
      category: "Móvil"
    },
    {
      id: 6,
      title: "Centro de Salud Solar",
      description: "Hospital rural con paneles solares",
      difficulty: "Medio",
      category: "Salud"
    },
    {
      id: 7,
      title: "Bomba de Agua Solar",
      description: "Sistema de riego con energía solar",
      difficulty: "Medio",
      category: "Agricultura"
    },
    {
      id: 8,
      title: "Alumbrado Público Solar",
      description: "Postes de luz con paneles solares",
      difficulty: "Fácil",
      category: "Público"
    },
    {
      id: 9,
      title: "Cargador Solar",
      description: "Estación de carga solar para dispositivos",
      difficulty: "Fácil",
      category: "Tecnología"
    },
    {
      id: 10,
      title: "Parque Solar ElectroHuila",
      description: "Proyecto futuro de ElectroHuila",
      difficulty: "Medio",
      category: "Futuro"
    }
  ];

  const colors = [
    '#FF8C00', '#FFD700', '#FFA500', '#FF6347', '#FF4500', 
    '#32CD32', '#00CED1', '#1E90FF', '#8A2BE2', '#000000',
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100">
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
                <Sun className="w-6 h-6 text-orange-500" />
                Paneles Solares
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
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300" 
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
                  El Huila recibe más de <strong>4.5 horas de sol intenso</strong> al día, 
                  convirtiéndolo en una zona ideal para la energía solar.
                </p>
                <p>
                  Un panel solar puede funcionar por más de <strong>25 años</strong> 
                  y produce electricidad incluso en días nublados.
                </p>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">☀️ Dato solar:</h4>
                  <p>¡Un metro cuadrado de panel solar puede abastecer una casa huilense por 3 horas!</p>
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

            {/* Beneficios Energía Solar */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🌱 Beneficios Solares</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">💰</span>
                  </div>
                  <span className="text-gray-700">Ahorro en factura eléctrica</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">🌍</span>
                  </div>
                  <span className="text-gray-700">Energía 100% limpia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">♻️</span>
                  </div>
                  <span className="text-gray-700">Recurso renovable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">🏠</span>
                  </div>
                  <span className="text-gray-700">Aumenta valor de la propiedad</span>
                </div>
              </div>
            </div>

            {/* Progreso */}
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
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentDrawing + 1) / drawings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  ¡Colorea toda la energía solar del futuro!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}