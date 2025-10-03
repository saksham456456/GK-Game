
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export enum GameState {
  START,
  GYAAN_INSTRUCTIONS,
  SELECT_DIFFICULTY,
  LOADING,
  PLAYING,
  FINISHED,
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | "Saksham's Level";