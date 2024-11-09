import React from "react";
import moment from 'moment'
import $api from '@lib/api';
export const Home: React.FC = () => {
    const { data: questions , error, isLoading } = $api.useQuery('get', '/api/questions/')

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Recent Questions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {questions && questions.map((question) => (
                <div key={question.url} className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-2">{question.question_text}</h3>
                    <p className="text-gray-500 mb-4">
                    Published {moment(question.pub_date).fromNow()}
                    </p>
                    <div>
                    <h4 className="font-semibold text-lg mb-2">Choices:</h4>
                    {question.choices.map(choice => {
                        return (
                            <div key={choice.url} className="flex items-center justify-between mb-2">
                                <span>{choice.choice_text}</span>
                                <span>{choice.votes} votes</span>
                            </div>
                        )
                    })}
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
 
