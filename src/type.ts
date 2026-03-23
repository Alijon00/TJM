export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  readiness: number; // Процент готовности (0-100)
  category: 'Education' | 'Legal' | 'Tech' | 'Diplomacy';
}