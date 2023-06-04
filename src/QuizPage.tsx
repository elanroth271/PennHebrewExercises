import React, { useState, useEffect } from "react";
import './App.css';
import QuestionComponent from './QuestionComponent'
import QuizSectionComponent from './QuizSectionComponent'
interface PropsType {
  _id: string;
}

type QuerySection = {
  instructionseng: string;
  instructionsheb: string;
  referencetext: string;
  questions: QueryQuestion[];
};
type QueryQuestion = {
  text: string;
  correct: boolean[];
  answers: string[];
};

type Question = {
  text: string;
  options: string[];
  correct: number;
};

type QuizSection = {
  engInstruction: string;
  hebInstruction: string;
  referenceText: string;
  questions: Question[];
};

type Quiz = {
  title: string;
  sections: QuizSection[];
};
function QuizPage(props: PropsType) {
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(
          `${
            process.env.REACT_APP_SANITY_QUIZ_URL_ONE +
            props._id +
            process.env.REACT_APP_SANITY_QUIZ_URL_TWO
          }`
        );
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();

        let tempSections: QuizSection[] = [];
        data.result[0].sections.forEach((sectRes: QuerySection) => {
          let tempQuestions: Question[] = [];
          sectRes.questions.forEach((qRes: QueryQuestion) => {
            tempQuestions.push({
              text: qRes.text,
              options: qRes.answers,
              correct: qRes.correct.findIndex((value) => value === true),
            });
          });
          tempSections.push({
            engInstruction: sectRes.instructionseng,
            hebInstruction: sectRes.instructionsheb,
            referenceText: sectRes.referencetext,
            questions: tempQuestions,
          });
        });
        setQuiz({ title: data.result[0].name, sections: tempSections });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [props._id]);
  return (
    <div className = "QuizPage">
      {quiz && (
        <>
          <h1 className = "QuizTitle">{quiz.title}</h1>
          {quiz.sections.map((sect: QuizSection) => {
            
            return <QuizSectionComponent quizSection={sect}/>;
          })}
        </>
      )}
    </div>
  );
}

export default QuizPage;
