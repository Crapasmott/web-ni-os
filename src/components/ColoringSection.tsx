'use client';
import { useState, useRef, useEffect } from 'react';
import { Palette, Download, RotateCcw, Sparkles, Heart, Star, Sun, Moon } from 'lucide-react';

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#2ED573', '#FF6348', '#3742FA', '#F8B500', '#FF3838'
];

const templates = [
  {
    id: 1,
    name: "Unicornio Mágico",
    icon: <Sparkles className="w-6 h-6" />,
    paths: [
      // Cuerpo del unicornio
      "M100 200 Q120 180 150 200 Q180 220 200 200 Q220 180 180 160 Q150 140 120 160 Q90 180 100 200 Z",
      // Cuerno
      "M140 120 L145 80 L150 120 Z",
      // Melena
      "M120 140 Q100 120 80 140 Q60 160 80 180 Q100 200 120 180 Q140 160 120 140 Z",
      // Patas
      "M110 200 L115 240 L125 240 L120 200 Z",
      "M170 200 L175 240 L185 240 L180 200 Z"
    ],
    category: "Fantasía"
  },
  {
    id: 2,
    name: "Dinosaurio Feliz",
    icon: <Star className="w-6 h-6" />,
    paths: [
      // Cuerpo
      "M80 180 Q60 160 80 140 Q120 120 160 140 Q200 160 180 180 Q160 200 120 200 Q100 200 80 180 Z",
      // Cabeza
      "M160 140 Q180 120 200 140 Q220 160 200 180 Q180 200 160 180 Q140 160 160 140 Z",
      // Cola
      "M80 180 Q40 160 20 180 Q40 200 60 180 Q70 170 80 180 Z",
      // Patas
      "M100 200 L95 230 L105 230 L110 200 Z",
      "M140 200 L135 230 L145 230 L150 200 Z"
    ],
    category: "Animales"
  },
  {
    id: 3,
    name: "Princesa Estrella",
    icon: <Heart className="w-6 h-6" />,
    paths: [
      // Cara
      "M120 120 Q100 100 120 80 Q140 60 160 80 Q180 100 160 120 Q140 140 120 120 Z",
      // Vestido
      "M100 160 Q80 140 100 120 Q140 100 180 120 Q200 140 180 160 Q160 200 140 200 Q120 200 100 160 Z",
      // Corona
      "M110 80 L115 60 L125 65 L135 50 L145 65 L155 60 L160 80 Z",
      // Brazos
      "M100 140 Q80 130 70 140 Q80 150 90 140 Q95 135 100 140 Z",
      "M180 140 Q200 130 210 140 Q200 150 190 140 Q185 135 180 140 Z"
    ],
    category: "Fantasía"
  },
  {
    id: 4,
    name: "Sol Sonriente",
    icon: <Sun className="w-6 h-6" />,
    paths: [
      // Cara del sol
      "M140 140 Q120 120 140 100 Q160 80 180 100 Q200 120 180 140 Q160 160 140 140 Z",
      // Rayos
      "M140 60 L145 40 L150 60 Z",
      "M180 80 L200 70 L190 90 Z",
      "M200 140 L220 145 L200 150 Z",
      "M180 200 L200 210 L190 190 Z",
      "M140 220 L145 240 L150 220 Z",
      "M100 200 L80 210 L90 190 Z",
      "M80 140 L60 145 L80 150 Z",
      "M100 80 L80 70 L90 90 Z"
    ],
    category: "Naturaleza"
  },
  {
    id: 5,
    name: "Luna Dulce",
    icon: <Moon className="w-6 h-6" />,
    paths: [
      // Luna creciente
      "M100 100 Q80 120 100 140 Q120 160 140 140 Q160 120 140 100 Q120 80 100 100 Z",
      // Cara interior
      "M110 110 Q100 100 110 90 Q120 80 130 90 Q140 100 130 110 Q120 120 110 110 Z",
      // Estrellas alrededor
      "M60 80 L65 70 L70 80 L65 90 Z",
      "M180 90 L185 80 L190 90 L185 100 Z",
      "M170 160 L175 150 L180 160 L175 170 Z",
      "M70 170 L75 160 L80 170 L75 180 Z"
    ],
    category: "Naturaleza"
  }
];
export default function ColoringSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [filledPaths, setFilledPaths] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    drawTemplate();
  }, [selectedTemplate, filledPaths]);

  const drawTemplate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas background with subtle pattern
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(1, '#F8FAFC');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw template paths
    selectedTemplate.paths.forEach((path, index) => {
      const path2D = new Path2D(path);
      
      // Fill if colored
      if (filledPaths[index]) {
        ctx.fillStyle = filledPaths[index];
        ctx.fill(path2D);
      } else {
        // Add subtle fill for unfilled areas
        ctx.fillStyle = 'rgba(248, 250, 252, 0.3)';
        ctx.fill(path2D);
      }
      
      // Draw outline
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.stroke(path2D);
    });

    // Add sparkle effects for completed sections
    Object.keys(filledPaths).forEach(key => {
      const index = parseInt(key);
      if (filledPaths[index]) {
        // Add random sparkles
        for (let i = 0; i < 3; i++) {
          const x = 50 + Math.random() * 200;
          const y = 50 + Math.random() * 200;
          
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Check which path was clicked
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    selectedTemplate.paths.forEach((pathStr, index) => {
      const path2D = new Path2D(pathStr);
      if (ctx.isPointInPath(path2D, x, y)) {
        setFilledPaths(prev => ({
          ...prev,
          [index]: selectedColor
        }));
        
        // Add click animation effect
        setTimeout(() => {
          drawTemplate();
        }, 50);
      }
    });
  };

  const clearCanvas = () => {
    setFilledPaths({});
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `mi-arte-${selectedTemplate.name.toLowerCase().replace(/ /g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const isTemplateComplete = () => {
    return Object.keys(filledPaths).length === selectedTemplate.paths.length;
  };

  const getRandomTemplate = () => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
  };
  return (
    <section className="min-h-screen bg-gradient-to-b from-pink-50 to-yellow-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Colorea y Crea
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Deja volar tu imaginación! Colorea hermosos dibujos y crea obras de arte increíbles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Templates Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Sparkles className="text-pink-500" />
                Plantillas
              </h3>
              
              <div className="space-y-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setFilledPaths({});
                    }}
                    className={`w-full p-4 rounded-xl transition-all ${
                      selectedTemplate.id === template.id
                        ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-3 border-pink-300 shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        selectedTemplate.id === template.id
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {template.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-800">{template.name}</div>
                        <div className="text-sm text-gray-500">{template.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{selectedTemplate.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-600">{selectedTemplate.category}</span>
                    {isTemplateComplete() && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <span>✨</span>
                        ¡Completado!
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCanvas}
                    className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition-colors"
                    title="Limpiar todo"
                  >
                    <RotateCcw className="w-5 h-5 text-red-600" />
                  </button>
                  <button
                    onClick={downloadArt}
                    className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors"
                    title="Descargar arte"
                  >
                    <Download className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(getRandomTemplate());
                      setFilledPaths({});
                    }}
                    className="p-3 bg-purple-100 hover:bg-purple-200 rounded-xl transition-colors"
                    title="Plantilla aleatoria"
                  >
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex justify-center relative">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  onClick={handleCanvasClick}
                  className="border-4 border-gray-300 rounded-xl cursor-pointer bg-white shadow-inner hover:border-pink-300 transition-colors"
                />
                
                {/* Progress indicator */}
                <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 shadow-lg">
                  <span className="text-sm font-bold text-gray-700">
                    {Object.keys(filledPaths).length}/{selectedTemplate.paths.length}
                  </span>
                </div>
                
                {/* Completion celebration */}
                {isTemplateComplete() && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                    <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
                      <div className="text-4xl mb-2">🎉</div>
                      <div className="font-bold text-xl text-gray-800 mb-2">¡Increíble!</div>
                      <div className="text-gray-600 mb-4">Has completado tu obra de arte</div>
                      <button
                        onClick={downloadArt}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
                      >
                        Descargar mi Arte
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Interactive Tools */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Cómo Colorear
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Haz clic en cualquier parte del dibujo para pintarla con el color seleccionado
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // Undo last color
                        const keys = Object.keys(filledPaths);
                        if (keys.length > 0) {
                          const lastKey = keys[keys.length - 1];
                          const newPaths = { ...filledPaths };
                          delete newPaths[parseInt(lastKey)];
                          setFilledPaths(newPaths);
                        }
                      }}
                      className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      ↶ Deshacer
                    </button>
                    <button
                      onClick={() => {
                        // Fill random areas
                        const unfilledIndexes = selectedTemplate.paths
                          .map((_, idx) => idx)
                          .filter(idx => !filledPaths[idx]);
                        
                        if (unfilledIndexes.length > 0) {
                          const randomIndex = unfilledIndexes[Math.floor(Math.random() * unfilledIndexes.length)];
                          setFilledPaths(prev => ({
                            ...prev,
                            [randomIndex]: selectedColor
                          }));
                        }
                      }}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      🎲 Sorpresa
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Progreso
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-purple-700">Completado:</span>
                      <span className="font-bold text-purple-800">
                        {Math.round((Object.keys(filledPaths).length / selectedTemplate.paths.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-purple-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(Object.keys(filledPaths).length / selectedTemplate.paths.length) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="text-xs text-purple-600">
                      {Object.keys(filledPaths).length} de {selectedTemplate.paths.length} secciones
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Colors Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Palette className="text-yellow-500" />
                Colores
              </h3>

              {/* Color Palette */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-full h-12 rounded-xl shadow-lg hover:scale-110 transition-transform ${
                      selectedColor === color ? 'ring-4 ring-gray-400 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Color Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-gray-800 mb-2">Color Seleccionado</h4>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg shadow-md"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span className="font-mono text-sm text-gray-600">{selectedColor}</span>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="mt-6 space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-xl border-2 border-green-200">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎨</div>
                    <div className="text-sm font-semibold text-gray-700">
                      ¡Mezcla colores en tu mente!
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-3 rounded-xl border-2 border-orange-200">
                  <div className="text-center">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-sm font-semibold text-gray-700">
                      ¡Eres un artista genial!
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Games */}
              <div className="mt-6">
                <h4 className="font-bold text-gray-800 mb-3">🎮 Mini Juegos</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      const randomColors = colors.sort(() => Math.random() - 0.5);
                      setSelectedColor(randomColors[0]);
                    }}
                    className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    🎲 Color Sorpresa
                  </button>
                  
                  <button 
                    onClick={() => {
                      const autoFill = () => {
                        selectedTemplate.paths.forEach((_, index) => {
                          setTimeout(() => {
                            const randomColor = colors[Math.floor(Math.random() * colors.length)];
                            setFilledPaths(prev => ({
                              ...prev,
                              [index]: randomColor
                            }));
                          }, index * 300);
                        });
                      };
                      autoFill();
                    }}
                    className="w-full py-2 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-lg text-sm font-semibold transition-all"
                  >
                    ✨ Auto-Colorear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              🖼️ Galería de Arte
            </h3>
            <p className="text-gray-600">
              ¡Mira todas las obras de arte que puedes crear!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="group">
                <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all border-3 border-gray-200 hover:border-pink-300">
                  <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl mb-3 flex items-center justify-center">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      {template.paths.map((path, idx) => (
                        <path
                          key={idx}
                          d={path}
                          fill={`hsl(${idx * 60}, 70%, 70%)`}
                          stroke="#333"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 text-center">{template.name}</h4>
                  <p className="text-xs text-gray-500 text-center">{template.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border-4 border-purple-200">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-purple-800 mb-6">
              🎨 ¿Sabías que...?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🌈</div>
                <h4 className="font-bold text-gray-800 mb-2">Colores Primarios</h4>
                <p className="text-sm text-gray-600">
                  El rojo, azul y amarillo son los colores básicos. ¡Mezclándolos puedes crear todos los demás!
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🖌️</div>
                <h4 className="font-bold text-gray-800 mb-2">Arte Digital</h4>
                <p className="text-sm text-gray-600">
                  ¡Colorear digitalmente es súper divertido! Puedes deshacer, cambiar colores y experimentar sin límites.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl mb-3">🧠</div>
                <h4 className="font-bold text-gray-800 mb-2">Beneficios</h4>
                <p className="text-sm text-gray-600">
                  Colorear ayuda a desarrollar la creatividad, concentración y coordinación. ¡Es diversión y aprendizaje!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 border-4 border-yellow-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-800 mb-6">
                🏆 ¡Conviértete en un Artista Maestro!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🎨</div>
                  <h4 className="font-bold text-gray-800 mb-2">Principiante</h4>
                  <p className="text-sm text-gray-600 mb-3">Completa tu primer dibujo</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-1/4"></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🌟</div>
                  <h4 className="font-bold text-gray-800 mb-2">Explorador</h4>
                  <p className="text-sm text-gray-600 mb-3">Prueba 3 plantillas diferentes</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-2/4"></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">🎭</div>
                  <h4 className="font-bold text-gray-800 mb-2">Creativo</h4>
                  <p className="text-sm text-gray-600 mb-3">Usa todos los colores disponibles</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl mb-3">👑</div>
                  <h4 className="font-bold text-gray-800 mb-2">Maestro Artista</h4>
                  <p className="text-sm text-gray-600 mb-3">Completa todas las plantillas</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gold-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}