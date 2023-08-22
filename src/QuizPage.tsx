import { useState, useEffect } from "react";
import './App.css';
import {Quiz, QuizSection, Question, QuestionParagraph} from './types'
import QuizSectionComponent from './QuizSectionComponent'
interface PropsType {
  _id: string;
}

type QuerySection = {
  instructionseng: string;
  instructionsheb: string;
  referencetext: string;
  referenceaudio: string;
  questions: QueryQuestion[];
};
type QueryQuestion = {
  text: string;
  correct: boolean[];
  answers: string[];
  endline: boolean;
};



function QuizPage(props: PropsType) {
  const [quiz, setQuiz] = useState<Quiz>();

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await fetch(process.env.REACT_APP_SANITY_QUIZ_URL!.replace("insert_id", props._id));
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        const data = await response.json();
        let tempSections: QuizSection[] = [];
        data.result[0].sections.forEach((sectRes: QuerySection) => {
          let tempQuestionsPgs: QuestionParagraph[] = [{questions: []}];
          
          sectRes.questions.forEach((qRes: QueryQuestion) => {
           
            tempQuestionsPgs[tempQuestionsPgs.length - 1].questions.push({
              text:qRes.text,
              options: qRes.answers,
              correct: qRes.correct.findIndex((value) => value === true),
            });
            if(qRes.endline) {
              tempQuestionsPgs.push({questions: []})
            }
          });
          let refAud = ""
          if(sectRes.referenceaudio) {
            refAud = sectRes.referenceaudio.split('/')[5]
          }
          tempSections.push({
            engInstruction: sectRes.instructionseng,
            hebInstruction: sectRes.instructionsheb,
            referenceText: sectRes.referencetext,
            referenceAudio: refAud,
            questionParagraphs: tempQuestionsPgs,
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
