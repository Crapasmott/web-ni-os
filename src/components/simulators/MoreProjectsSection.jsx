'use client';
import React, { useState } from 'react';
import { ExternalLink, MapPin, Calendar, Users, Zap, Droplets, Wind, Sun, Factory, Building, School, Home, TrendingUp, Award, Target, Clock } from 'lucide-react';

const MoreProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'Todos los Proyectos', icon: Target },
    { id: 'solar', name: 'Energía Solar', icon: Sun },
    { id: 'hydro', name: 'Hidroeléctrica', icon: Droplets },
    { id: 'wind', name: 'Energía Eólica', icon: Wind },
    { id: 'infrastructure', name: 'Infraestructura', icon: Building }
  ];

  const projects = [
    {
      id: 1,
      name: "Parque Solar Neiva Fase I",
      category: "solar",
      location: "Neiva, Huila",
      capacity: "50 MW",
      investment: "$45,000 millones",
      beneficiaries: "25,000 hogares",
      status: "En construcción",
      completion: "85%",
      startDate: "2024",
      endDate: "2025",
      description: "El parque solar más grande del Huila, ubicado en las afueras de Neiva. Generará energía limpia para miles de familias.",
      highlights: [
        "150,000 paneles solares de última generación",
        "Tecnología de seguimiento solar",
        "Reducirá 30,000 toneladas de CO₂ anuales",
        "Creará 200 empleos durante construcción"
      ],
      timeline: [
        { phase: "Estudios ambientales", status: "completed", date: "2023" },
        { phase: "Construcción", status: "in-progress", date: "2024-2025" },
        { phase: "Operación comercial", status: "pending", date: "2025" }
      ]
    },
    {
      id: 2,
      name: "Pequeña Central Hidroeléctrica Suaza",
      category: "hydro",
      location: "Suaza, Huila",
      capacity: "15 MW",
      investment: "$25,000 millones",
      beneficiaries: "8,000 hogares",
      status: "Planificación",
      completion: "35%",
      startDate: "2025",
      endDate: "2027",
      description: "Aprovechamiento del río Suaza para generar energía hidroeléctrica limpia con mínimo impacto ambiental.",
      highlights: [
        "Tecnología de turbinas de baja caída",
        "Respeto total por el ecosistema acuático",
        "Generación constante las 24 horas",
        "Fortalecimiento de la economía local"
      ]
    },
    {
      id: 3,
      name: "Parque Eólico Altamira",
      category: "wind",
      location: "Altamira, Huila",
      capacity: "80 MW",
      investment: "$120,000 millones",
      beneficiaries: "40,000 hogares",
      status: "Estudio de factibilidad",
      completion: "20%",
      startDate: "2026",
      endDate: "2028",
      description: "Aprovechamiento de los vientos constantes de la cordillera para generar energía eólica en el Huila.",
      highlights: [
        "25 aerogeneradores de 3.2 MW cada uno",
        "Vientos promedio de 7.5 m/s",
        "Compatible con actividades agropecuarias",
        "Primera experiencia eólica en el departamento"
      ]
    },
    {
      id: 4,
      name: "Modernización Subestación Garzón",
      category: "infrastructure",
      location: "Garzón, Huila",
      capacity: "34.5 kV",
      investment: "$8,000 millones",
      beneficiaries: "15,000 usuarios",
      status: "En ejecución",
      completion: "60%",
      startDate: "2024",
      endDate: "2025",
      description: "Actualización tecnológica de la subestación para mejorar la confiabilidad del servicio eléctrico.",
      highlights: [
        "Equipos digitales de última generación",
        "Reducción de interrupciones en 40%",
        "Capacidad para integrar energías renovables",
        "Sistema de monitoreo remoto 24/7"
      ]
    },
    {
      id: 5,
      name: "Electrificación Rural Zona Sur",
      category: "infrastructure",
      location: "Sur del Huila",
      capacity: "N/A",
      investment: "$15,000 millones",
      beneficiaries: "500 familias rurales",
      status: "En construcción",
      completion: "70%",
      startDate: "2023",
      endDate: "2024",
      description: "Llevando electricidad a veredas remotas del sur del Huila que nunca habían tenido servicio eléctrico.",
      highlights: [
        "120 km de redes eléctricas nuevas",
        "Incluye sistemas solares individuales",
        "Mejorará calidad de vida rural",
        "Impulso a la educación y salud rural"
      ]
    },
    {
      id: 6,
      name: "Parque Solar Pitalito",
      category: "solar",
      location: "Pitalito, Huila",
      capacity: "30 MW",
      investment: "$28,000 millones",
      beneficiaries: "15,000 hogares",
      status: "Licitación",
      completion: "15%",
      startDate: "2025",
      endDate: "2026",
      description: "Segundo parque solar de gran escala en el Huila, complementando la matriz energética departamental.",
      highlights: [
        "90,000 paneles bifaciales",
        "Sistema de almacenamiento incluido",
        "Integración con red inteligente",
        "Centro de capacitación técnica"
      ]
    },
    {
      id: 7,
      name: "Microred Inteligente Gigante",
      category: "infrastructure",
      location: "Gigante, Huila",
      capacity: "Smart Grid",
      investment: "$12,000 millones",
      beneficiaries: "6,000 usuarios",
      status: "Piloto",
      completion: "45%",
      startDate: "2024",
      endDate: "2025",
      description: "Proyecto piloto de red eléctrica inteligente que integra múltiples fuentes de energía renovable.",
      highlights: [
        "Medidores inteligentes bidireccionales",
        "Gestión automática de la demanda",
        "Integración de vehículos eléctricos",
        "Plataforma digital para usuarios"
      ]
    },
    {
      id: 8,
      name: "Central Solar Comunitaria Oporapa",
      category: "solar",
      location: "Oporapa, Huila",
      capacity: "5 MW",
      investment: "$5,500 millones",
      beneficiaries: "2,500 hogares",
      status: "Aprobado",
      completion: "25%",
      startDate: "2024",
      endDate: "2025",
      description: "Proyecto de energía solar comunitaria donde los usuarios pueden ser propietarios de paneles solares.",
      highlights: [
        "Modelo de propiedad compartida",
        "Tarifas preferenciales para la comunidad",
        "Programa de educación ambiental",
        "Sostenibilidad económica local"
      ]
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const getStatusColor = (status) => {
    const colors = {
      'En construcción': 'bg-blue-100 text-blue-800',
      'Planificación': 'bg-yellow-100 text-yellow-800',
      'Estudio de factibilidad': 'bg-purple-100 text-purple-800',
      'En ejecución': 'bg-green-100 text-green-800',
      'Licitación': 'bg-orange-100 text-orange-800',
      'Piloto': 'bg-pink-100 text-pink-800',
      'Aprobado': 'bg-emerald-100 text-emerald-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      solar: Sun,
      hydro: Droplets,
      wind: Wind,
      infrastructure: Building
    };
    const IconComponent = icons[category] || Zap;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Regresar
            </button>
            <button 
              onClick={() => window.open('/', '_self')}
              className="flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transform hover:scale-105 transition-all shadow-lg"
            >
              <Home className="w-5 h-5" />
              Inicio
            </button>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🚀 Proyectos ElectroHuila
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce todos los proyectos que estamos desarrollando para llevar energía limpia y confiable a todo el Huila
          </p>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{projects.length}</div>
            <div className="text-sm text-gray-600">Proyectos Activos</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {projects.reduce((sum, p) => sum + parseInt(p.capacity.replace(/[^\d]/g, '') || 0), 0)} MW
            </div>
            <div className="text-sm text-gray-600">Capacidad Total</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {projects.reduce((sum, p) => sum + parseInt(p.beneficiaries.replace(/[^\d]/g, '')), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Hogares Beneficiados</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">$300B+</div>
            <div className="text-sm text-gray-600">Inversión Total</div>
          </div>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-xl">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="font-semibold text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedProject(project)}
            >
              {/* Header del Proyecto */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(project.category)}
                  <span className="text-sm font-semibold text-gray-600 capitalize">
                    {project.category === 'hydro' ? 'Hidroeléctrica' : 
                     project.category === 'wind' ? 'Eólica' :
                     project.category === 'infrastructure' ? 'Infraestructura' : 'Solar'}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Título y Ubicación */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{project.location}</span>
              </div>

              {/* Estadísticas Clave */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <div className="text-lg font-bold text-blue-600">{project.capacity}</div>
                  <div className="text-xs text-gray-600">Capacidad</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl text-center">
                  <div className="text-lg font-bold text-green-600">{project.beneficiaries}</div>
                  <div className="text-xs text-gray-600">Beneficiarios</div>
                </div>
              </div>

              {/* Progreso */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Progreso</span>
                  <span className="font-semibold">{project.completion}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: project.completion }}
                  ></div>
                </div>
              </div>

              {/* Descripción Breve */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Timeline */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>

              {/* Inversión */}
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-600">Inversión:</span>
                  <span className="font-bold text-purple-600 ml-1">{project.investment}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                  Ver Detalles →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalles del Proyecto */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedProject.name}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-5 h-5" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-3xl"
                >
                  ×
                </button>
              </div>

              {/* Estadísticas Principales */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-600">{selectedProject.capacity}</div>
                  <div className="text-sm text-gray-600">Capacidad</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-600">{selectedProject.beneficiaries}</div>
                  <div className="text-sm text-gray-600">Beneficiarios</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-purple-600">{selectedProject.investment}</div>
                  <div className="text-sm text-gray-600">Inversión</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-orange-600">{selectedProject.completion}</div>
                  <div className="text-sm text-gray-600">Completado</div>
                </div>
              </div>

              {/* Descripción Detallada */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">📋 Descripción del Proyecto</h3>
                <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Aspectos Destacados */}
              {selectedProject.highlights && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">⭐ Aspectos Destacados</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline del Proyecto */}
              {selectedProject.timeline && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">📅 Cronograma</h3>
                  <div className="space-y-4">
                    {selectedProject.timeline.map((phase, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          phase.status === 'completed' ? 'bg-green-500' :
                          phase.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}>
                          {phase.status === 'completed' ? (
                            <span className="text-white text-sm">✓</span>
                          ) : phase.status === 'in-progress' ? (
                            <span className="text-white text-sm">⏳</span>
                          ) : (
                            <span className="text-gray-600 text-sm">○</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800">{phase.phase}</div>
                          <div className="text-sm text-gray-600">{phase.date}</div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          phase.status === 'completed' ? 'bg-green-100 text-green-700' :
                          phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {phase.status === 'completed' ? 'Completado' :
                           phase.status === 'in-progress' ? 'En Progreso' :
                           'Pendiente'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="flex gap-4 justify-center">
                <button className="bg-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Más Información
                </button>
                <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-all">
                  Contactar Equipo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sección de Próximos Proyectos */}
        <div className="mt-16 bg-white rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">🔮 Próximos Proyectos 2025-2030</h2>
            <p className="text-gray-600">Proyectos en evaluación y planificación para el futuro energético del Huila</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Parque Solar Flotante Betania",
                type: "Solar",
                capacity: "25 MW",
                phase: "Estudio",
                year: "2026"
              },
              {
                name: "Línea de Transmisión Norte-Sur",
                type: "Infraestructura",
                capacity: "230 kV",
                phase: "Evaluación",
                year: "2027"
              },
              {
                name: "Centro de Almacenamiento Energético",
                type: "Baterías",
                capacity: "50 MWh",
                phase: "Conceptual",
                year: "2028"
              },
              {
                name: "Biogás Residuos Agrícolas",
                type: "Biomasa",
                capacity: "5 MW",
                phase: "Factibilidad",
                year: "2026"
              },
              {
                name: "Smart City Neiva",
                type: "Smart Grid",
                capacity: "Ciudad",
                phase: "Piloto",
                year: "2025"
              },
              {
                name: "Hidrógeno Verde Huila",
                type: "H2 Verde",
                capacity: "Industrial",
                phase: "Investigación",
                year: "2030"
              }
            ].map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border-2 border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">{project.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-semibold">{project.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacidad:</span>
                    <span className="font-semibold">{project.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fase:</span>
                    <span className="font-semibold text-blue-600">{project.phase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Año:</span>
                    <span className="font-semibold text-green-600">{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🚀 Únete al Futuro Energético del Huila</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Estos proyectos son posibles gracias al apoyo de nuestra comunidad. 
            Juntos estamos construyendo un Huila más sostenible y próspero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all">
              Conocer Más Proyectos
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all">
              Contactar ElectroHuila
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreProjectsSection;