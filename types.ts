
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export enum GameState {
  START,
  SELECT_DIFFICULTY,
  LOADING,
  PLAYING,
  FINISHED,
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';