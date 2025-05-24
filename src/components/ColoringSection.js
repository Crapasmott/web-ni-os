'use client';
import React, { useState, useRef } from 'react';
import { Palette, Download, RotateCcw, Save } from 'lucide-react';

const ColoringSection = ({ isDarkMode, playSound, userProgress, setUserProgress }) => {
    const [selectedColor, setSelectedColor] = useState('#3B82F6');
    const [currentDrawing, setCurrentDrawing] = useState('turbine');
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);

    const colors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
        '#8B5CF6', '#F97316', '#06B6D4', '#84CC16',
        '#EC4899', '#6B7280', '#000000', '#FFFFFF'
    ];

    const drawings = {
        turbine: { name: "Turbina Hidroeléctrica", emoji: "🌊⚙️" },
        house: { name: "Casa con Electricidad", emoji: "🏠💡" },
        tower: { name: "Torre de Transmisión", emoji: "🗼⚡" },
        bulb: { name: "Bombilla Eléctrica", emoji: "💡✨" },
        plant: { name: "Planta Eléctrica", emoji: "🏭🔌" },
        cable: { name: "Cables Eléctricos", emoji: "🔌⚡" }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        playSound('click');
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = `electrohuila-${currentDrawing}-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();

        // Actualizar progreso
        setUserProgress(prev => ({
            ...prev,
            coloringPages: [...(prev.coloringPages || []), currentDrawing]
        }));

        playSound('success');
    };

    return (
        <div className={`min-h-screen py-12 transition-all duration-500 ${isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-pink-900 to-purple-900'
                : 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50'
            }`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-pink-800'
                        }`}>
                        🎨 ¡Colorea el Mundo Eléctrico!
                    </h2>
                    <p className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        } max-w-3xl mx-auto`}>
                        Da rienda suelta a tu creatividad coloreando elementos del mundo eléctrico
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-6">
                    {/* Panel de control */}
                    <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
                        } backdrop-blur-sm p-6 rounded-2xl shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'
                            }`}>
                            🖼️ Elige tu dibujo
                        </h3>

                        <div className="space-y-2 mb-6">
                            {Object.entries(drawings).map(([key, drawing]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setCurrentDrawing(key);
                                        playSound('click');
                                    }}
                                    className={`w-full p-3 text-left rounded-lg transition-all duration-300 ${currentDrawing === key
                                            ? 'bg-pink-500 text-white shadow-lg'
                                            : isDarkMode
                                                ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{drawing.emoji}</span>
                                        <span className="text-sm font-medium">{drawing.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'
                            }`}>
                            🎨 Paleta de colores
                        </h3>

                        <div className="grid grid-cols-4 gap-2 mb-6">
                            {colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => {
                                        setSelectedColor(color);
                                        playSound('click');
                                    }}
                                    className={`w-10 h-10 rounded-full border-4 transition-all duration-300 hover:scale-110 ${selectedColor === color
                                            ? 'border-gray-800 scale-110 shadow-lg'
                                            : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={saveDrawing}
                                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                            >
                                <Save className="w-4 h-4" />
                                <span>Guardar Dibujo</span>
                            </button>
                            <button
                                onClick={clearCanvas}
                                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                <span>Limpiar</span>
                            </button>
                        </div>
                    </div>

                    {/* Área de dibujo */}
                    <div className={`lg:col-span-3 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
                        } backdrop-blur-sm p-6 rounded-2xl shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                        <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'
                            }`}>
                            {drawings[currentDrawing].name}
                        </h3>

                        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-4">
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={600}
                                className="w-full max-w-full h-auto border rounded-lg cursor-crosshair"
                                style={{ aspectRatio: '4/3' }}
                            />
                        </div>

                        {/* Plantillas prediseñadas */}
                        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4">
                            {Object.entries(drawings).map(([key, drawing]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setCurrentDrawing(key);
                                        playSound('click');
                                    }}
                                    className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${currentDrawing === key
                                            ? isDarkMode ? 'bg-pink-600' : 'bg-pink-200'
                                            : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    <div className="text-3xl mb-2">{drawing.emoji}</div>
                                    <div className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                        {drawing.name.split(' ')[0]}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColoringSection;