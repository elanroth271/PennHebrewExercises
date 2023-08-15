export interface Question {
    text: string;
    options: string[];
    correct: number;
};

export interface QuestionParagraph {
    questions: Question[]
}

export interface QuizSection {
    engInstruction: string;
    hebInstruction: string;
    referenceText: string;
    referenceAudio: string
    questionParagraphs: QuestionParagraph[];
};
export interface Quiz {
    title: string;
    sections: QuizSection[];
};