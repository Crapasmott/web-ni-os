// src/components/HomeSection.js
'use client';
import React, { useEffect, useState } from 'react';
import { Zap, ArrowRight, Users, Calendar, Award, Lightbulb } from 'lucide-react';

const HomeSection = ({ isDarkMode, setCurrentSection, playSound, userProgress }) => {
    const [animationStage, setAnimationStage] = useState(0);
    const [stats, setStats] = useState({
        yearsOfService: 77, // 2024 - 1947
        housesServed: "300,000+",
        cleanEnergy: "100%",
        departments: 1
    });

    // Animación secuencial al cargar
    useEffect(() => {
        const timer = setTimeout(() => {
            if (animationStage < 3) {
                setAnimationStage(animationStage + 1);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [animationStage]);

    const features = [
        {
            icon: "🌊",
            title: "Energía Hidroeléctrica",
            description: "Aprende cómo los ríos del Huila generan electricidad limpia y renovable",
            color: isDarkMode ? "from-blue-800 to-blue-600" : "from-blue-400 to-blue-200",
            delay: "animation-delay-100"
        },
        {
            icon: "⚡",
            title: "Distribución Eléctrica",
            description: "Descubre el increíble viaje de la electricidad desde las plantas hasta tu hogar",
            color: isDarkMode ? "from-yellow-800 to-yellow-600" : "from-yellow-400 to-yellow-200",
            delay: "animation-delay-200"
        },
        {
            icon: "🔬",
            title: "Experimentos Seguros",
            description: "Realiza fascinantes experimentos científicos de forma completamente segura",
            color: isDarkMode ? "from-green-800 to-green-600" : "from-green-400 to-green-200",
            delay: "animation-delay-300"
        },
        {
            icon: "🎮",
            title: "Juegos Interactivos",
            description: "Aprende jugando con nuestros divertidos juegos educativos sobre electricidad",
            color: isDarkMode ? "from-purple-800 to-purple-600" : "from-purple-400 to-purple-200",
            delay: "animation-delay-400"
        }
    ];

    const achievements = [
        { icon: "🏆", label: "Juegos Completados", value: userProgress.gamesCompleted || 0 },
        { icon: "⭐", label: "Puntuación Quiz", value: userProgress.quizScore || 0 },
        { icon: "🎨", label: "Dibujos Coloreados", value: userProgress.coloringPages?.length || 0 },
        { icon: "🧪", label: "Experimentos Vistos", value: userProgress.experimentsViewed?.length || 0 }
    ];

    const handleStartLearning = () => {
        playSound('success');
        setCurrentSection('learn');
    };

    const handleStartGames = () => {
        playSound('click');
        setCurrentSection('games');
    };

    return (
        <div className={`min-h-screen transition-all duration-1000 ${isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
                : 'bg-gradient-to-br from-blue-100 via-purple-50 to-yellow-50'
            }`}>

            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 md:py-20">
                <div className="container mx-auto px-4 text-center">

                    {/* Logo animado principal */}
                    <div className={`mb-8 transform transition-all duration-1000 ${animationStage >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <div className="relative inline-block">
                            <Zap className={`w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-500'
                                } drop-shadow-2xl animate-bounce electric-animation`} />

                            {/* Efectos de partículas */}
                            <div className="absolute inset-0 -m-4">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`absolute w-2 h-2 rounded-full ${isDarkMode ? 'bg-yellow-300' : 'bg-yellow-400'
                                            } animate-ping`}
                                        style={{
                                            top: `${Math.random() * 100}%`,
                                            left: `${Math.random() * 100}%`,
                                            animationDelay: `${i * 0.5}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Título principal */}
                    <div className={`transform transition-all duration-1000 delay-300 ${animationStage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-blue-800'
                            } text-shadow leading-tight`}>
                            ¡Bienvenidos a{' '}
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                ElectroKids Huila!
                            </span>
                            <span className="animate-pulse">⚡</span>
                        </h1>

                        <p className={`text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                            Descubre el mundo mágico de la electricidad con{' '}
                            <strong className="text-blue-500">Electrohuila</strong>, la empresa que lleva energía
                            a todo el departamento del Huila desde{' '}
                            <span className="font-bold text-yellow-600">1947</span>.
                        </p>
                    </div>

                    {/* Estadísticas destacadas */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transform transition-all duration-1000 delay-500 ${animationStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        {[
                            { icon: Calendar, label: "Años de Servicio", value: stats.yearsOfService, suffix: "+" },
                            { icon: Users, label: "Hogares Servidos", value: stats.housesServed, suffix: "" },
                            { icon: Lightbulb, label: "Energía Limpia", value: stats.cleanEnergy, suffix: "" },
                            { icon: Award, label: "Departamentos", value: stats.departments, suffix: "" }
                        ].map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div key={index} className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
                                    } backdrop-blur-sm p-4 rounded-xl shadow-lg card-hover border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                    }`}>
                                    <Icon className={`w-8 h-8 mx-auto mb-2 ${isDarkMode ? 'text-yellow-300' : 'text-blue-500'
                                        }`} />
                                    <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'
                                        }`}>
                                        {stat.value}{stat.suffix}
                                    </div>
                                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Botones de acción principales */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transform transition-all duration-1000 delay-700 ${animationStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`}>
                        <button
                            onClick={handleStartLearning}
                            className="btn-electric text-lg px-8 py-4 flex items-center space-x-2 group"
                        >
                            <span>¡Empezar a Aprender!</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span className="text-2xl">🚀</span>
                        </button>

                        <button
                            onClick={handleStartGames}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                        >
                            <span>¡Jugar Ahora!</span>
                            <span className="text-2xl">🎮</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Características principales */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-blue-800'
                        }`}>
                        ¿Qué puedes hacer en ElectroKids?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group p-6 rounded-2xl shadow-xl card-hover bg-gradient-to-br ${feature.color} backdrop-blur-sm border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'
                                    } transform transition-all duration-500 hover:rotate-1`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-center">
                                    <div className="text-6xl mb-4 animate-bounce group-hover:animate-spin">
                                        {feature.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'
                                        }`}>
                                        {feature.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                        }`}>
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Efecto hover */}
                                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Progreso del usuario */}
            {(userProgress.gamesCompleted > 0 || userProgress.quizScore > 0) && (
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
                            } backdrop-blur-sm rounded-2xl p-8 shadow-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                            <h3 className={`text-2xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-800'
                                }`}>
                                🏆 Tus Logros
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-4xl mb-2">{achievement.icon}</div>
                                        <div className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-300' : 'text-blue-600'
                                            }`}>
                                            {achievement.value}
                                        </div>
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            {achievement.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Llamada a la acción final */}
            <section className="py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className={`${isDarkMode ? 'bg-gradient-to-r from-blue-800 to-purple-800' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                        } rounded-2xl p-8 md:p-12 shadow-2xl`}>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            ¡La aventura eléctrica te espera!
                        </h3>
                        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Únete a miles de niños que ya están aprendiendo sobre electricidad de manera divertida y segura.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setCurrentSection('learn')}
                                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                            >
                                Comenzar Aprendizaje 📚
                            </button>
                            <button
                                onClick={() => setCurrentSection('experiments')}
                                className="bg-yellow-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
                            >
                                Ver Experimentos 🔬
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeSection;