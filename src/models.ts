export interface Question {
  id: number;
  text: string;
}

export interface MultipleChoicesQuestion extends Question {
  options: string[];
  answer: string;
}

export interface TrueFalseQuestion extends Question {
  answer: boolean;
}

export type QuizQuestion = MultipleChoicesQuestion | TrueFalseQuestion;

export interface UserResponse {
  questionId: number;
  answer: string | boolean;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}
