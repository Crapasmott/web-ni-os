import SolarFarmSimulator from '@/components/simulators/SolarFarmSimulator';

export const metadata = {
  title: 'Simulador de Granja Solar - ElectroHuila',
  description: 'Construye tu propia granja solar virtual y aprende sobre generación de energía limpia en el Huila.',
};

export default function GranjaSolarPage() {
  return <SolarFarmSimulator />;
}