import React, {useState, ChangeEvent} from 'react'
import {Question} from './types'

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

    let qParts = (props.question.text).split("_")

    
    if(qParts[0] === "\u200F \u200F") {
        //console.log("Reversing")

        qParts[0] = qParts[1]
        qParts[1] = "\u200F \u200F"
        //console.log(props)
        //console.log(qParts)
    } else if(qParts[1] === "\u200F \u200F") {
        console.log("Reversing")
        console.log(qParts[0].replace(/\u200F/g, '').trim()[0])
        if(qParts[0].replace(/\u200F/g, '').trim()[0] === ".") {
            console.log("Slicing")
            qParts[0] =  qParts[0].replace(/\u200F/g, '').trim().slice(1)
        }
        qParts[1] = qParts[0] + ".\u200F"
        qParts[0] = "\u200F \u200F"
        console.log(props)
        console.log(qParts)
    }

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