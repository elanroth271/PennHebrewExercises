import React, {useState, ChangeEvent} from 'react'
import {Question} from './types'

interface propsType {
    question: Question;
    showCorrect: boolean;
}



function QuestionComponent(props: propsType) {
    let qParts = (" " + props.question.text + " ").split("_")

    const [chosenAns, chooseAns] = useState(-1)

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        chooseAns(Number(event.target.value))
    }
    return <p className = "Question">{qParts[0]}
    <select value = {chosenAns} onChange={handleChange}>
        <option value = {-1}>Select</option>
        {props.question.options.map((option, ind) => {
            return <option value = {ind}>{option}</option>
        })}
    </select>
    {qParts[1]} 
    {props.showCorrect && props.question.correct === chosenAns && <span className = {"checkmark"}>✔</span>}
    {props.showCorrect && props.question.correct !== chosenAns && <span className = {"wrongmark"}>✖</span>}
    </p>
}

export default QuestionComponent