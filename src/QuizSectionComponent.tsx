import React, {useState} from 'react'
import QuestionComponent from './QuestionComponent'
import {QuizSection, Question} from './types'
interface propsType {
    quizSection: QuizSection;
}


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
    <div className = "QuestionsContainer">
    {sect.questions.map((q: Question) => {
      return <QuestionComponent question = {q} showCorrect = {showCorrect}/>
    })}
    </div>
    <button onClick = {toggle}>Toggle Answers</button>
  </div>
}

export default QuizSectionComponent