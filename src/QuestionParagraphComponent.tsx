import React, {useState, ChangeEvent} from 'react'
import {Question} from './types'
import {cleanRTLString} from './utils/stringParser'
interface questionPropsType {
    question: Question;
    showCorrect: boolean;
}
interface paragraphPropsType {
    questions: Question[];
    showCorrect: boolean;
}

function QuestionParagraphComponent(props: paragraphPropsType) {
    return <p className = "QuestionParagraph">
        {props.questions.map((q: Question) => {
            return <QuestionComponent question = {q} showCorrect = {props.showCorrect}/>
        })}
    </p>
}

function QuestionComponent(props: questionPropsType) {

    let qParts = cleanRTLString(props.question.text).split("_")

    
    

    const [chosenAns, chooseAns] = useState(-1)

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        chooseAns(Number(event.target.value))
    }
    return <span>
        {qParts[0]}

    <select value = {chosenAns} onChange={handleChange}>
        <option value = {-1}>Select</option>
        {props.question.options.map((option, ind) => {
            return <option value = {ind}>{option}</option>
        })}
    </select>
    {props.showCorrect && props.question.correct === chosenAns && <span className = {"checkmark"}>✔</span>}
    {props.showCorrect && props.question.correct !== chosenAns && <span className = {"wrongmark"}>✖</span>}
    {qParts[1]} 
    </span>
}

export default QuestionParagraphComponent