export interface Question {
    text: string;
    options: string[];
    correct: number;
    endOfLine: boolean;
};
export interface QuizSection {
    engInstruction: string;
    hebInstruction: string;
    referenceText: string;
    questions: Question[];
};
export interface Quiz {
    title: string;
    sections: QuizSection[];
  };