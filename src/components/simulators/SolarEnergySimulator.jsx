'use client';
import React, { useState, useEffect } from 'react';
import { Sun, Home, Zap, TrendingUp, Calculator, MapPin, Calendar, DollarSign, Leaf, Award } from 'lucide-react';

const SolarEnergySimulator = () => {
  const [houseType, setHouseType] = useState('small'); // small, medium, large
  const [location, setLocation] = useState('neiva'); // neiva, pitalito, garzon
  const [roofArea, setRoofArea] = useState(50); // m²
  const [monthlyBill, setMonthlyBill] = useState(150000); // COP
  const [results, setResults] = useState(null);

  const houseTypes = {
    small: { name: 'Casa Pequeña', consumption: 150, area: 50, cost: 15000000 },
    medium: { name: 'Casa Mediana', consumption: 300, area: 100, cost: 25000000 },
    large: { name: 'Casa Grande', consumption: 500, area: 150, cost: 35000000 }
  };

  const locations = {
    neiva: { name: 'Neiva', solar: 4.8, temp: 28 },
    pitalito: { name: 'Pitalito', solar: 4.5, temp: 24 },
    garzon: { name: 'Garzón', solar: 4.6, temp: 26 }
  };

  const calculateSolarSystem = () => {
    const house = houseTypes[houseType];
    const loc = locations[location];
    
    // Cálculos básicos
    const dailyConsumption = house.consumption; // kWh/día
    const solarHours = loc.solar; // horas de sol pico
    const panelsNeeded = Math.ceil(dailyConsumption / (0.4 * solarHours)); // 400W por panel
    const systemPower = panelsNeeded * 0.4; // kW
    const dailyGeneration = systemPower * solarHours;
    const monthlyGeneration = dailyGeneration * 30;
    const yearlyGeneration = dailyGeneration * 365;
    
    // Costos y ahorros
    const systemCost = panelsNeeded * 800000; // $800,000 COP por panel
    const installationCost = systemCost * 0.3; // 30% adicional
    const totalCost = systemCost + installationCost;
    const monthlySavings = (monthlyGeneration / house.consumption * 30) * (monthlyBill / 1000);
    const yearlySavings = monthlySavings * 12;
    const paybackPeriod = totalCost / yearlySavings;
    
    // Beneficios ambientales
    const co2Saved = yearlyGeneration * 0.5; // 0.5 kg CO2 por kWh
    const treesEquivalent = co2Saved / 22; // 1 árbol absorbe ~22 kg CO2/año
    
    setResults({
      panelsNeeded,
      systemPower,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration,
      systemCost,
      installationCost,
      totalCost,
      monthlySavings,
      yearlySavings,
      paybackPeriod,
      co2Saved,
      treesEquivalent,
      efficiency: Math.min((dailyGeneration / dailyConsumption) * 100, 100)
    });
  };

  useEffect(() => {
    calculateSolarSystem();
  }, [houseType, location, roofArea, monthlyBill]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg border border-gray-200"
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
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ☀️ Calculadora Solar ElectroHuila
          </h1>
          <p className="text-xl text-gray-600">
            Descubre cuánto puedes ahorrar con paneles solares en tu casa del Huila
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuración */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Home className="text-blue-500" />
                Configuración
              </h3>
              
              <div className="space-y-4">
                {/* Tipo de Casa */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Casa
                  </label>
                  <select 
                    value={houseType}
                    onChange={(e) => setHouseType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(houseTypes).map(([key, house]) => (
                      <option key={key} value={key}>
                        {house.name} (~{house.consumption} kWh/mes)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Ubicación en el Huila
                  </label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(locations).map(([key, loc]) => (
                      <option key={key} value={key}>
                        {loc.name} ({loc.solar} h sol/día)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Área del Techo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Área del Techo (m²)
                  </label>
                  <input 
                    type="range"
                    min="20"
                    max="200"
                    value={roofArea}
                    onChange={(e) => setRoofArea(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-gray-600 mt-1">
                    {roofArea} m²
                  </div>
                </div>

                {/* Factura Mensual */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Factura Mensual Actual
                  </label>
                  <input 
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="150000"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    Valor en pesos colombianos (COP)
                  </div>
                </div>
              </div>
            </div>

            {/* Información del Lugar */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sun className="text-yellow-500" />
                Condiciones Solares
              </h3>
              
              <div className="space-y-3">
                <div className="bg-yellow-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Radiación Solar</div>
                  <div className="text-xl font-bold text-yellow-600">
                    {locations[location].solar} kWh/m²/día
                  </div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Temperatura Promedio</div>
                  <div className="text-xl font-bold text-orange-600">
                    {locations[location].temp}°C
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-xl">
                  <div className="text-sm text-gray-600">Eficiencia Esperada</div>
                  <div className="text-xl font-bold text-green-600">
                    {results ? Math.round(results.efficiency) : 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="lg:col-span-2 space-y-4">
            {results && (
              <>
                {/* Sistema Recomendado */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-blue-500" />
                    Sistema Solar Recomendado
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-blue-600">{results.panelsNeeded}</div>
                      <div className="text-sm text-gray-600">Paneles Solares</div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-green-600">{results.systemPower} kW</div>
                      <div className="text-sm text-gray-600">Potencia Total</div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-xl text-center">
                      <div className="text-3xl font-bold text-yellow-600">{Math.round(results.dailyGeneration)}</div>
                      <div className="text-sm text-gray-600">kWh/día</div>
                    </div>
                  </div>

                  {/* Visualización del Techo */}
                  <div className="bg-gradient-to-b from-blue-100 to-green-100 rounded-xl p-4 mb-4">
                    <h4 className="font-bold mb-2">Vista del Techo con Paneles</h4>
                    <div className="bg-gray-300 rounded-lg h-32 relative overflow-hidden">
                      {/* Simulación de paneles en el techo */}
                      {Array.from({ length: Math.min(results.panelsNeeded, 20) }).map((_, index) => (
                        <div
                          key={index}
                          className="absolute w-6 h-4 bg-blue-800 border border-gray-400 rounded-sm"
                          style={{
                            left: `${5 + (index % 8) * 35}px`,
                            top: `${10 + Math.floor(index / 8) * 25}px`
                          }}
                        />
                      ))}
                      <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded px-2 py-1 text-xs">
                        {results.panelsNeeded > 20 ? `${results.panelsNeeded} paneles total` : `${results.panelsNeeded} paneles`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Análisis Económico */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calculator className="text-green-500" />
                    Análisis Económico
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-gray-700 mb-3">💰 Inversión Inicial</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Paneles e Inversor:</span>
                          <span className="font-semibold">{formatCurrency(results.systemCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Instalación:</span>
                          <span className="font-semibold">{formatCurrency(results.installationCost)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-bold">Total:</span>
                          <span className="font-bold text-lg text-green-600">{formatCurrency(results.totalCost)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-gray-700 mb-3">📈 Ahorros</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Ahorro Mensual:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.monthlySavings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Ahorro Anual:</span>
                          <span className="font-semibold text-green-600">{formatCurrency(results.yearlySavings)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-bold">Recuperación:</span>
                          <span className="font-bold text-lg text-blue-600">{Math.round(results.paybackPeriod)} años</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gráfico de Ahorro a 25 años */}
                  <div className="mt-6">
                    <h4 className="font-bold text-gray-700 mb-3">📊 Proyección de Ahorro (25 años)</h4>
                    <div className="bg-gray-100 rounded-xl p-4">
                      <div className="flex items-end space-x-2 h-32">
                        {Array.from({ length: 25 }).map((_, year) => {
                          const cumulativeSavings = (year + 1) * results.yearlySavings - results.totalCost;
                          const height = Math.max(0, Math.min(100, (cumulativeSavings / (results.yearlySavings * 25)) * 100));
                          
                          return (
                            <div
                              key={year}
                              className={`flex-1 rounded-t ${
                                cumulativeSavings > 0 ? 'bg-green-500' : 'bg-red-400'
                              }`}
                              style={{ height: `${height}%` }}
                              title={`Año ${year + 1}: ${formatCurrency(cumulativeSavings)}`}
                            />
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Año 1</span>
                        <span>Año 25</span>
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-sm font-semibold">
                          Ahorro total en 25 años: {formatCurrency(25 * results.yearlySavings - results.totalCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beneficios Ambientales */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Leaf className="text-green-500" />
                    Impacto Ambiental
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">🌱</div>
                      <div className="text-2xl font-bold text-green-600">{Math.round(results.co2Saved)} kg</div>
                      <div className="text-sm text-gray-600">CO₂ evitado/año</div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">🌳</div>
                      <div className="text-2xl font-bold text-blue-600">{Math.round(results.treesEquivalent)}</div>
                      <div className="text-sm text-gray-600">Árboles equivalentes</div>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-xl text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="text-2xl font-bold text-yellow-600">{Math.round(results.yearlyGeneration)}</div>
                      <div className="text-sm text-gray-600">kWh limpios/año</div>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-100 border-l-4 border-green-500 p-4 rounded">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-green-600 mr-2" />
                      <p className="text-green-800 font-semibold">
                        ¡Tu sistema solar evitará la emisión de {Math.round(results.co2Saved * 25)} kg de CO₂ en 25 años!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Generación Mensual */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="text-blue-500" />
                    Generación Mensual Estimada
                  </h3>
                  
                  <div className="grid grid-cols-12 gap-2">
                    {[
                      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
                    ].map((month, index) => {
                      // Simulación de variación estacional (más sol en verano)
                      const seasonalFactor = 0.8 + 0.4 * Math.sin((index + 3) * Math.PI / 6);
                      const monthlyGen = results.monthlyGeneration * seasonalFactor;
                      const height = (monthlyGen / (results.monthlyGeneration * 1.2)) * 100;
                      
                      return (
                        <div key={month} className="text-center">
                          <div className="bg-gray-100 rounded h-24 flex items-end p-1">
                            <div
                              className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded"
                              style={{ height: `${height}%` }}
                              title={`${month}: ${Math.round(monthlyGen)} kWh`}
                            />
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{month}</div>
                          <div className="text-xs font-semibold">{Math.round(monthlyGen)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Comparación con Red Eléctrica */}
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="text-purple-500" />
                    Comparación: Solar vs Red Eléctrica
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      <h4 className="font-bold text-yellow-800 mb-3">☀️ Con Energía Solar</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Factura reducida hasta en {Math.round(results.efficiency)}%
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Energía limpia y renovable
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Independencia energética
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          Valor agregado a la propiedad
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          25+ años de vida útil
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="font-bold text-gray-800 mb-3">⚡ Solo Red Eléctrica</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Factura completa cada mes
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Dependencia de combustibles fósiles
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Tarifas que aumentan cada año
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Vulnerable a cortes de luz
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Emisiones de CO₂
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">🌟 ¡Es hora de pasarte a la energía solar!</h3>
                  <p className="text-lg mb-6">
                    Con ElectroHuila, tu inversión en energía solar está respaldada por 25+ años de experiencia
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all">
                      Solicitar Cotización
                    </button>
                    <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all">
                      Contactar Asesor
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarEnergySimulator;