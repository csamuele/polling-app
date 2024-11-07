import React from "react";
import moment from 'moment'
import { getQuestions } from "@hooks/queries";

export const Home: React.FC = () => {
    const questions = getQuestions({});

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Recent Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {questions.isLoading && <p>Loading...</p>}
            {questions.error && <p>Error: {questions.error.message}</p>}
            {questions.data && questions.data.map((question) => (
                <div key={question.url} className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">{question.question_text}</h3>
                    <p className="text-gray-500 mb-4">
                    Published {moment(question.pub_date).fromNow()}
                    </p>
                    <div>
                    <h4 className="font-semibold text-lg mb-2">Choices:</h4>
                    <ul>
                        <li>Choice 1</li>
                        <li>Choice 2</li>
                        <li>Choice 3</li>
                    </ul>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
 
