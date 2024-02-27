import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';

// Components
import QuestionCard from './components/QuestionCard';

// Types
import { QuestionState } from './API';

// Styles
import { GlobalStyle, Wrapper } from './App.styles';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
  fact: string;
}

//const TOTAL_QUESTIONS = 13;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState<QuestionState>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject>([]);
  const [rounds, setRounds] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [init, setInit] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions();

    setQuestions(newQuestions);
    setRounds(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setInit(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Collect user answer
      const answer = e.currentTarget.value;

      // Check answer against correct answer
      const correct = questions[number].name === answer;

      // End game if answer correct
      if (correct) { 
        setGameOver(true);
      }

      // Save answer in the array to access later
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].name,
        fact:
          "This album was released in " + questions[number].year_released
          + ". It has a total of " + questions[number].tracks + " tracks. "
          + "Total length of the album is " + questions[number].length + " minutes.",
        

      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move on to the next question / retry round
    if(!gameOver){
    const nextQuestion = number + 1;
      setNumber(nextQuestion);
      setRounds (prev => prev + 1)
    }
  }

  return (
    <>
    <GlobalStyle />
      <Wrapper>
        <h1>BEATLES QUIZ</h1>

        {gameOver ? (
          <>
          {init && <div className='container'>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <label >Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          </div>}
            <button 
              className="start" 
              onClick={startQuiz}
              disabled={name.length > 0 && email.length ? false : true}>
              Start
            </button>
        </>
        ) : null }

        {!gameOver ? <p className="rounds">Rounds: {rounds}</p> : null }
        {gameOver && !init ? <p className='fact'>{userAnswers[0]?.fact}</p> : null}
        {loading ? <p>Loading Question... </p> : null}

        {!loading && !init && (
          <QuestionCard 
            imgID={questions[number].cover_image_id}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver && !loading && userAnswers.length === number + 1 ? (
        <button className="next" onClick={nextQuestion}>
          Retry
        </button>
        ) : null}
      </Wrapper>
      </>
  );
}

export default App
