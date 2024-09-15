import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';

function Quizzes({ question, shuffledAnswers, correctAnswer, selectedAnswer, updateAnswer, finish }) {
    function clickAnswer(answer, currentQuestion) {
        updateAnswer(currentQuestion, answer);
    }

    const responses = shuffledAnswers.map((res, index) => {
        return (
            <div
                key={index}
                className={`quizz-options 
                            ${res === selectedAnswer ? 'selected-answer' : ''}
                            ${finish && res === selectedAnswer && selectedAnswer !== correctAnswer ? 'quizz-incorrect' : ''}
                            ${finish && res === correctAnswer ? 'quizz-correct' : ''}
                            `}
                onClick={!finish ? () => clickAnswer(res, question) : () => {}}>
                {decode(res)}
            </div>
        );
    });

    return (
        <section>
            <h4 className="quizz-question">{decode(question)}</h4>
            <div className="quizz-options-container">{responses}</div>
            <hr />
        </section>
    );
}

Quizzes.propTypes = {
    question: PropTypes.string.isRequired,
    shuffledAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctAnswer: PropTypes.string.isRequired,
    selectedAnswer: PropTypes.string.isRequired,
    updateAnswer: PropTypes.func.isRequired,
    finish: PropTypes.bool.isRequired,
};

export default Quizzes;
