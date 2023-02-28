import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Answers from "./Answers";
import NavigationButton from "./NavigationButton";

export default function Question({ questions, hideExercise, finishTest }) {
  let arr=[];
    const initialState = {
        currentQuestion: 0,
        answers: [],
        numberOfQuestions: questions.length,
        correctAnswers: [],
    };
    const [state, setState] = useState(initialState);
    const { currentQuestion, answers, numberOfQuestions } = state;
    const question = questions[currentQuestion];


    const submitAnswer = () => {
        let totalScore = 0;
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].correctAnswer) 
            {  arr.push(answers[i] + "  correct ")
                totalScore++;
            }
            else
            answers[i] == undefined ? arr.push("Not attempt"):arr.push(answers?.[i] + "  Incorrect ")
        }
        arr.push(totalScore)
        finishTest(totalScore,arr);
    };
    const answerQuestion = (answer) => {
        answers[currentQuestion] = answer;
        setState({
            ...state,
            answers,
        });
    };

    const moveQuestion = (direction) => {
        switch (direction) {
            case "next": {
                if (currentQuestion === numberOfQuestions - 1) {
                    submitAnswer();
                    return;
                }
                setState({
                    ...state,
                    currentQuestion: currentQuestion + 1,
                });
                break;
            }
            case "prev": {
                setState({
                    ...state,
                    currentQuestion: currentQuestion - 1,
                });
            }
        }
    };

    return (
        <div>
            <button className="flex items-center gap-1 bg-gray-400 p-2 rounded-sm shadow-md text-white" onClick={hideExercise}>
                <span>
                    <FaArrowLeft />
                </span>
                <span>Back</span>
            </button>
            <h1 className="text-2xl mt-2 capitalize">{`${
                state.currentQuestion + 1
            }. ${question.question}`}</h1>
            <Answers
                answers={question.answers}
                answerQuestion={answerQuestion}
                state={state}
            />

            <NavigationButton state={state} moveQuestion={moveQuestion} />
        </div>
    );
}
