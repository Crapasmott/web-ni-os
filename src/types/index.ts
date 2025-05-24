// types/index.ts - Definiciones de tipos para ElectroKids

/**
 * Tipos principales de la aplicación
 */

// Secciones disponibles de la aplicación
export type SectionType = 'home' | 'learn' | 'games' | 'coloring' | 'experiments';

// Tipos de sonidos disponibles
export type SoundType = 'click' | 'success' | 'error' | 'toggle';

// Niveles de dificultad para experimentos
export type DifficultyLevel = 'Muy Fácil' | 'Fácil' | 'Intermedio' | 'Avanzado';

/**
 * Interfaces para el progreso del usuario
 */
export interface UserProgress {
  quizScore: number;
  gamesCompleted: number;
  experimentsViewed: string[];
  coloringPages: string[];
  achievements?: Achievement[];
  lastVisit?: string;
  totalTimeSpent?: number; // en minutos
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
  category: 'quiz' | 'games' | 'experiments' | 'coloring' | 'general';
}

/**
 * Interfaces para los juegos
 */
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty?: DifficultyLevel;
  category?: 'historia' | 'tecnico' | 'seguridad' | 'general';
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  started: boolean;
  completed: boolean;
  timeLeft: number;
  answers: QuizAnswer[];
  totalQuestions: number;
}

export interface QuizAnswer {
  questionIndex: number;
  answer: number;
  correct: boolean;
  timeSpent?: number;
}

export interface MemoryGameState {
  cards: string[];
  flippedCards: number[];
  matchedCards: number[];
  moves: number;
  started: boolean;
  completed: boolean;
  timeLeft: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

/**
 * Interfaces para experimentos
 */
export interface Experiment {
  id: string;
  title: string;
  difficulty: DifficultyLevel;
  time: string;
  age: string;
  materials: string[];
  steps: string[];
  safety: string;
  science: string;
  color: string;
  category?: 'electricidad' | 'magnetismo' | 'energia' | 'circuitos';
  videoUrl?: string;
  images?: string[];
}

export interface ExperimentProgress {
  experimentId: string;
  completedSteps: number[];
  startedAt: string;
  completedAt?: string;
  notes?: string;
}

/**
 * Interfaces para colorear
 */
export interface ColoringPage {
  id: string;
  name: string;
  emoji: string;
  category: 'energia' | 'electrohuila' | 'seguridad' | 'naturaleza';
  difficulty: 'simple' | 'medium' | 'complex';
  description?: string;
}

export interface ColoringProgress {
  pageId: string;
  colors: string[];
  completedAt: string;
  timeSpent: number;
  saved: boolean;
}

/**
 * Interfaces para componentes
 */
export interface HeaderProps {
  currentSection: SectionType;
  setCurrentSection: (section: SectionType) => void;
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playSound: (sound: SoundType) => void;
}

export interface SectionProps {
  isDarkMode: boolean;
  soundEnabled: boolean;
  playSound: (sound: SoundType) => void;
  userProgress: UserProgress;
  setUserProgress: (progress: UserProgress | ((prev: UserProgress) => UserProgress)) => void;
  setCurrentSection: (section: SectionType) => void;
}

/**
 * Interfaces para configuración
 */
export interface AppConfig {
  version: string;
  features: {
    soundEnabled: boolean;
    darkModeEnabled: boolean;
    offlineMode: boolean;
    analytics: boolean;
  };
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
}

/**
 * Interfaces para animaciones
 */
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  repeat?: boolean;
}

/**
 * Tipos para eventos personalizados
 */
export interface GameCompletedEvent {
  gameType: 'quiz' | 'memory' | 'circuit';
  score: number;
  timeSpent: number;
  difficulty: DifficultyLevel;
}

export interface ExperimentCompletedEvent {
  experimentId: string;
  completionTime: number;
  stepsCompleted: number;
  totalSteps: number;
}

/**
 * Utilidades de tipo
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Estados de carga
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

/**
 * Configuración de temas
 */
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  animations: {
    enabled: boolean;
    speed: 'slow' | 'normal' | 'fast';
  };
}

/**
 * Estadísticas de uso
 */
export interface UsageStats {
  totalSessions: number;
  totalTimeSpent: number; // en minutos
  sectionsVisited: Record<SectionType, number>;
  gamesPlayed: Record<string, number>;
  experimentsCompleted: string[];
  averageQuizScore: number;
  favoriteSection: SectionType;
  lastVisit: string;
  streak: number; // días consecutivos de uso
}

/**
 * Configuración de accesibilidad
 */
export interface AccessibilityConfig {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

/**
 * Tipos de exportación para facilitar el uso
 */
export default {
  SectionType,
  SoundType,
  DifficultyLevel,
  UserProgress,
  QuizQuestion,
  Experiment,
  ColoringPage,
  HeaderProps,
  SectionProps,
  AppConfig,
  LoadingState,
  ThemeConfig,
  UsageStats,
  AccessibilityConfig
};