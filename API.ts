import { shuffleArray, numBet } from "./utils";

export type Question = {
    name: string;
    year_released: number;
    tracks: number;
    length: string;
    cover_image_path: string;
    cover_image_id: number;
    incorrect_answers: string[];
}

export type QuestionState = Question & { answers: string[]};

const generateIncorrectAnswers = (data: [], correctAnswer: string): [] => {
    let incorrectAnswers: [] = [];
    
    for(let i = 0; i < 2; i++){
        let incorrectAnswer: string = "";
        do {
            incorrectAnswer = data[numBet(data.length)].name;
        }
        while( incorrectAnswer === correctAnswer);
        incorrectAnswers.push(incorrectAnswer);
    }

    return incorrectAnswers;
}

export const fetchQuizQuestions = async () => {
    const endpoint = `https://frontend-interview.evidentinsights.com`;
    const data = await (await fetch(endpoint)).json();

    return shuffleArray(data.albums.map((question: Question) => (
        {
            ...question, 
            answers: shuffleArray([
                ...generateIncorrectAnswers(data.albums, question.name), 
                question.name
            ])
        })
    ))

}