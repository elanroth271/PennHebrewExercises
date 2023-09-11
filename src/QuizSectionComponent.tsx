import React, {useState} from 'react'
import QuestionParagraphComponent from './QuestionParagraphComponent'
import {QuizSection, Question, QuestionParagraph} from './types'
interface propsType {
    quizSection: QuizSection;
}


function QuizSectionComponent(props: propsType) {

    const [globalShowCorrect, setGlobalShowCorrect] = useState(false)
  
    let sect = props.quizSection



    return <div className = "QuizSection">
    <h2 className = "EngInstructions">{sect.engInstruction}</h2>
    <h2 className = "HebInstructions">{sect.hebInstruction}</h2>
    <h3 className = "ReferenceText">{sect.referenceText}</h3>
    {sect.referenceAudio !== '' &&
    <audio controls = {true}>
    <source src={"https://docs.google.com/uc?export=open&id=" + sect.referenceAudio}/>
    </audio>  
    }
    <div className = "QuestionsContainer">
    {sect.questionParagraphs.map((q: QuestionParagraph) => {
      return <QuestionParagraphComponent questions = {q.questions} globalShowCorrect = {globalShowCorrect}/>
    })}
    </div>
    <p>{sect.questionParagraphs.length}</p>
   {sect.questionParagraphs.length > 1 && <button onClick = {() => {setGlobalShowCorrect(!globalShowCorrect)}}>{globalShowCorrect ? "Hide All" : "Check All"}</button>}
  </div>
}

export default QuizSectionComponent