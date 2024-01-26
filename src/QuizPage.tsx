import { useState, useEffect } from "react";
import './App.css';
import {Quiz, QuizSection, Question, QuestionParagraph} from './QuizTypes'
import QuizSectionComponent from './QuizSectionComponent'
import {Link} from 'react-router-dom';

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
  const randBgImg = `assets/SamplePhotos/P${hashStringToNumber(props._id)}.jpg`
  function hashStringToNumber(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return hash % 42 + 1; // +1 to ensure the range is 1 to 42
}

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
          
          sectRes.questions.forEach((qRes: QueryQuestion, index: number) => {
           
            tempQuestionsPgs[tempQuestionsPgs.length - 1].questions.push({
              text:qRes.text,
              options: qRes.answers,
              correct: qRes.correct.findIndex((value) => value === true),
            });
            if(qRes.endline && index < sectRes.questions.length - 1) {
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
    <div className="HomePageContainer">
      <div className="graphicBg">
        <img src={randBgImg} width="100%" height="100%" />
      </div>
    <div className = "QuizPage">
      {quiz && (
        <>
          <Link to = {"/"}><p className = "backLink">BACK</p></Link>
          <h1 className = "QuizTitle">{quiz.title}</h1>
          {quiz.sections.map((sect: QuizSection) => {
            
            return <QuizSectionComponent quizSection={sect}/>;
          })}
        </>
      )}
    </div>
    </div>
  );
}

export default QuizPage;
