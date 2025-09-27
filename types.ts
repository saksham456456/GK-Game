
export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export enum GameState {
  START,
  LOADING,
  PLAYING,
  FINISHED,
}