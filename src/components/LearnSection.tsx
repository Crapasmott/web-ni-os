'use client';
import { useState } from 'react';
import { Brain, BookOpen, Calculator, Globe, Atom, Lightbulb } from 'lucide-react';

const subjects = [
  {
    id: 'math',
    name: 'Matemáticas',
    icon: <Calculator className="w-8 h-8" />,
    color: 'from-blue-500 to-purple-600',
    description: 'Números, operaciones y problemas divertidos',
    topics: ['Suma y Resta', 'Multiplicación', 'Fracciones', 'Geometría']
  },
  {
    id: 'science',
    name: 'Ciencias',
    icon: <Atom className="w-8 h-8" />,
    color: 'from-green-500 to-blue-500',
    description: 'Descubre cómo funciona el mundo',
    topics: ['Animales', 'Plantas', 'El Cuerpo Humano', 'El Espacio']
  },
  {
    id: 'language',
    name: 'Lenguaje',
    icon: <BookOpen className="w-8 h-8" />,
    color: 'from-pink-500 to-red-500',
    description: 'Palabras, lectura y escritura creativa',
    topics: ['Alfabeto', 'Vocabulario', 'Cuentos', 'Gramática']
  },
  {
    id: 'geography',
    name: 'Geografía',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-orange-500 to-yellow-500',
    description: 'Explora países, culturas y el planeta',
    topics: ['Continentes', 'Países', 'Culturas', 'Clima']
  }
];

export default function LearnSection() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Centro de Aprendizaje
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¡Descubre el mundo del conocimiento! Aprende jugando con nuestras lecciones interactivas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`p-6 rounded-3xl shadow-xl transition-all duration-300 ${
                selectedSubject.id === subject.id
                  ? 'bg-white border-4 border-blue-300 scale-105'
                  : 'bg-white hover:shadow-2xl hover:scale-102'
              }`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${subject.color} rounded-2xl flex items-center justify-center mb-4 text-white mx-auto`}>
                {subject.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{subject.name}</h3>
              <p className="text-gray-600 text-sm">{subject.description}</p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-purple-200">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${selectedSubject.color} rounded-2xl mb-4 text-white`}>
              {selectedSubject.icon}
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedSubject.name}</h3>
            <p className="text-gray-600">{selectedSubject.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedSubject.topics.map((topic, index) => (
              <div key={topic} className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl mb-4 text-white mx-auto">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-800 text-center mb-2">{topic}</h4>
                <div className="text-center">
                  <span className="text-sm text-blue-600 font-semibold">Lección {index + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className={`px-8 py-4 bg-gradient-to-r ${selectedSubject.color} text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}>
              ¡Comenzar a Aprender!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}