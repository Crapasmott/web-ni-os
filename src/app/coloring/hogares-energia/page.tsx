'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, Heart, Palette, Download, RotateCcw, Save, Trash2, Lightbulb, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HogaresEnergiaPage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [currentDrawing, setCurrentDrawing] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#32CD32');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  const drawings = [
    {
      id: 1,
      title: "Casa Huilense Iluminada",
      description: "Hogar típico del Huila con electricidad ElectroHuila",
      difficulty: "Fácil",
      category: "Residencial"
    },
    {
      id: 2,
      title: "Familia Feliz con Energía", 
      description: "Familia disfrutando de la electricidad en casa",
      difficulty: "Fácil",
      category: "Familiar"
    },
    {
      id: 3,
      title: "Cocina Eléctrica",
      description: "Mamá cocinando con electrodomésticos",
      difficulty: "Fácil",
      category: "Cocina"
    },
    {
      id: 4,
      title: "Niños Estudiando",
      description: "Niños haciendo tareas con buena iluminación",
      difficulty: "Fácil",
      category: "Educación"
    },
    {
      id: 5,
      title: "Abuela Viendo TV",
      description: "Abuelita disfrutando su programa favorito",
      difficulty: "Fácil",
      category: "Entretenimiento"
    },
    {
      id: 6,
      title: "Casa Rural Conectada",
      description: "Vereda del Huila con electricidad",
      difficulty: "Medio",
      category: "Rural"
    },
    {
      id: 7,
      title: "Tienda del Barrio",
      description: "Negocio familiar con energía ElectroHuila",
      difficulty: "Fácil",
      category: "Comercial"
    },
    {
      id: 8,
      title: "Celebración Navideña",
      description: "Casa decorada con luces navideñas",
      difficulty: "Medio",
      category: "Festividad"
    },
    {
      id: 9,
      title: "Taller de Papá",
      description: "Papá trabajando con herramientas eléctricas",
      difficulty: "Fácil",
      category: "Trabajo"
    },
    {
      id: 10,
      title: "Refrigerador Familiar",
      description: "Familia conservando alimentos frescos",
      difficulty: "Fácil",
      category: "Hogar"
    },
    {
      id: 11,
      title: "Computadora para Estudiar",
      description: "Jóvenes usando tecnología para aprender",
      difficulty: "Fácil",
      category: "Tecnología"
    },
    {
      id: 12,
      title: "Ventilador en Verano",
      description: "Familia refrescándose en el calor huilense",
      difficulty: "Fácil",
      category: "Confort"
    },
    {
      id: 13,
      title: "Lavadora Eléctrica",
      description: "Mamá lavando ropa con facilidad",
      difficulty: "Fácil",
      category: "Hogar"
    },
    {
      id: 14,
      title: "Barrio Completo Iluminado",
      description: "Todo un barrio de Neiva con electricidad",
      difficulty: "Medio",
      category: "Comunidad"
    },
    {
      id: 15,
      title: "Hogar ElectroHuila del Futuro",
      description: "Casa inteligente con tecnología verde",
      difficulty: "Medio",
      category: "Futuro"
    }
  ];

  const colors = [
    '#32CD32', '#FFD700', '#FF6347', '#1E90FF', '#FF69B4', 
    '#FFA500', '#8A2BE2', '#00CED1', '#DC143C', '#000000',
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
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
                <Home className="w-6 h-6 text-green-500" />
                Hogares con Energía
              </h1>
              <div className="text-sm text-gray-500">
                Dibujo {currentDrawing + 1} de {drawings.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPalette(!showPalette)}
                className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors"
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
                      : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Anterior
                </button>

                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Progreso</div>
                  <div className="w-48 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300" 
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
                      : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transform hover:scale-105'
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
                  <Palette className="w-5 h-5 text-green-500" />
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
                <Lightbulb className="w-5 h-5 text-green-500" />
                ¿Sabías que?
              </h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  ElectroHuila lleva electricidad a más de <strong>400,000 hogares</strong> 
                  en los 37 municipios del Huila, mejorando la calidad de vida de las familias.
                </p>
                <p>
                  La electricidad permite que los niños estudien de noche, las familias conserven 
                  alimentos frescos y los negocios locales prosperen.
                </p>
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="font-bold text-gray-800 mb-2">❤️ Impacto social:</h4>
                  <p>¡Cada hogar conectado mejora la educación, salud y oportunidades de toda la familia!</p>
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
                        ? 'bg-green-100 border-2 border-green-300'
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

            {/* Impacto ElectroHuila */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🏠 Impacto ElectroHuila</h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3">
                  <div className="font-bold text-blue-700">400,000+ Hogares</div>
                  <div className="text-sm text-blue-600">Familias con electricidad</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-3">
                  <div className="font-bold text-green-700">37 Municipios</div>
                  <div className="text-sm text-green-600">Todo el Huila conectado</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-3">
                  <div className="font-bold text-purple-700">24/7 Servicio</div>
                  <div className="text-sm text-purple-600">Electricidad confiable</div>
                </div>
              </div>
            </div>

            {/* Progreso */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-green-500" />
                Progreso
              </h3>
              <div className="space-y-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentDrawing + 1) / drawings.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-gray-600">
                  ¡Colorea todos los hogares felices con electricidad!
                </div>
              </div>
            </div>

            {/* La Energía Une Familias */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                La Energía Une Familias
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600">💡</span>
                  </div>
                  <span>Estudiar de noche</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📺</span>
                  </div>
                  <span>Ver TV en familia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">🍽️</span>
                  </div>
                  <span>Conservar alimentos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">💻</span>
                  </div>
                  <span>Conectarse al mundo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600">🏪</span>
                  </div>
                  <span>Crear nuevos negocios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}