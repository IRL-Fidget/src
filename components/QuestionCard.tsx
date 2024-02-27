import React from "react";
import { imageSelector } from "../utils";

// Types
import { AnswerObject } from "../App";

// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    imgID: number;

}

const QuestionCard: React.FC<Props> = ({ 
    answers, 
    callback, 
    userAnswer, 
    imgID
    }) => (
    <Wrapper>

        <img className="album-cover" alt='albumArt' style={{ width: 500 }} src={imageSelector(imgID)}></img>
        <div>
            {answers.map(answer => (
                <ButtonWrapper 
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}    
                >
                    <button disabled={!!userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer}} />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
        <p></p>
    </Wrapper>
    );

export default QuestionCard;