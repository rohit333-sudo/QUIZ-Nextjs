import Head from "next/head";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Question from "../components/Question";
import ExerciseList from "../components/ExerciseList";

export function getServerSideProps() {
  const exercises = [
    { id: 0, title: "Gk Question" },
 
  ];

  return {
    props: {
      exercises,
    },
  };
}

export function getQuestions(exerciseId) {
  const questions = [
    {
      id: 0,
      exerciseId: 0,
      question: "what is the capital of India?",
      answers: ["kerala", "Delhi", "New Delhi", "Himachal", "Dehradun"],
      correctAnswer: "c",
    },
    {
      id: 2,
      exerciseId: 0,
      question: "what is the capital of Canada?",
      answers: [
        "Delhi",
        "ottawa",
        "Russia",
        "Ukrine",
        "USA",
      ],
      correctAnswer: "b",
    },
    {
      id: 3,
      exerciseId: 0,
      question: "Canberra is the capital city of which island continent?",
      answers: ["Australia",  "Ukrine", "Russia", "Delhi", "Brazil"],
      correctAnswer: "a",
    },
    {
      id: 4,
      exerciseId: 0,
      question:
        "What is the capital of Iraq",
      answers: [
        "Baghdad",
        "Iran",
        "Tehra",
        "USA",
        "Turkey",
      ],
      correctAnswer: "a",
    }
  ];
  return questions;

//   return questions.filter((items) => items.exerciseId === exerciseId);
}

export default function Home({ exercises }) {
  const initialState = {
    isExerciseShown: false,
    exerciseId: null,
    questions: [],
    isExerciseDone: false,
    score: 0,
  };
let AllData=[]
  const [state, setState] = useState(initialState);
  const { isExerciseShown, questions, isExerciseDone, score } = state;
  const [history, setHistory] = useState(null);
  const showExercise = (id) => {
    setState({
      ...state,
      exerciseId: id,
      questions: getQuestions(id),
      isExerciseShown: true,
    });
  };
  const hideExercise = () => {
    setState(initialState);
  };
  
  // =======================================================================


  const finishTest = (score,arr) => {
    setState({
      ...state,
      isExerciseDone: true,
      score,
    });

    // console.log(arr)
   let val=JSON.parse(localStorage.getItem("data"))
//    console.log(val)
if(!val)
  localStorage.setItem("data",JSON.stringify([Object.assign({},arr)]))
  else{
    val.push(Object.assign({},arr))
  localStorage.setItem("data",JSON.stringify(val))
  } 
  loadHistory();
  };


//   ==================================================================================

const loadHistory=()=>{
    setHistory(JSON.parse(localStorage.getItem("data")))
//  let a=(JSON.parse(localStorage.getItem("data")))
}

  return (
    <>
      <div className="container">
        <div className="row">
          {/* <div className="col-6"> */}
          <Head>
            <title>Quiz</title>
            <meta name="description" content="Quiz app in next js" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
          </Head>
          <div className="bg-blue-200 p-6 rounded-md shadow-2xl border border-5" id='col-6'>
            {/* //m-auto mt-[120px] w-1/2*/}
            <main className="">
              {!isExerciseShown ? (
                <ExerciseList exercises={exercises} func={showExercise} />
              ) : isExerciseDone ? (
                <div>
                  <h3 style={{fontWeight:"bold"}} className="my-4">
                    You answered {score}/{questions.length} correct 
                    <h1>{(score/questions.length)*100}% Result </h1>
                  </h3>

                  <button
                    className="flex items-center gap-1 bg-gray-400 p-2 rounded-sm shadow-md text-white"
                    onClick={hideExercise}
                  >
                    <span>
                      <FaArrowLeft />
                    </span>
                    <span>Back</span>
                  </button>
                </div>
              ) : (
                <Question
                  questions={questions}
                  hideExercise={hideExercise}
                  finishTest={finishTest}
                />
              )}
            </main>
          </div>
          
          <div className="col-6">
          { history != null ?
          <div> <div> <button onClick={()=>{setHistory(null)}} className="btn btn-primary my-4"> Hide Details </button></div>
<div>
<table className="table table-hover table-dark ">
  <thead>
    <tr>
      <th scope="col"> ATTEMPTS</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
        <th scope="col">SCORE </th>
       <th scope="col">PERCENTAGE</th>

    </tr>
  </thead>
  <tbody>
{
history.map((val,idx)=>
{
 return (  
      <tr className="p-3 m-3">
      <th scope="row">{idx+1}</th>
      <td>{val['0']}</td>
<td>{val['1']} </td>
<td>{val['2']}</td>
<td>{val['3']}</td>

  <td>{val['4']}</td>    
<td> {(val['4']/Object.keys(history).length)*100}%  </td>
    </tr>
 )
 }
)
} 
   </tbody>
    </table>

    </div>
 
</div>


  
  
  :<div><button onClick={()=>{loadHistory()}}  className="btn btn-success" > show Details </button></div>
              }
          </div>
        </div>
      </div>
    </>
  );
}






