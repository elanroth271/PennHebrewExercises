import React, {useState} from 'react'
import QuestionComponent from './QuestionComponent'
interface propsType {
    quizSection: QuizSection;
}
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

function QuizSectionComponent(props: propsType) {


    let sect = props.quizSection

    const [showCorrect, setShowCorrect] = useState(false)


    const toggle = () => {
      setShowCorrect(!showCorrect)
    }

    return <div className = "QuizSection">
    <h2 className = "EngInstructions">{sect.engInstruction}</h2>
    <h2 className = "HebInstructions">{sect.hebInstruction}</h2>
    <h3 className = "ReferenceText">{sect.referenceText}</h3>
    {sect.questions.map((q: Question) => {
      return <QuestionComponent question = {q} showCorrect = {showCorrect}/>
    })}
    <button onClick = {toggle}>Toggle Answers</button>
  </div>
}

export default QuizSectionComponent