import React from "react"
import $api from "@lib/api"
import { QuestionGrid } from "@components/Question"

const Home: React.FC = () => {
    const {
        data: questions,
        error,
        isLoading,
    } = $api.useQuery("get", "/api/questions/")

    return (
        <div className="container mx-auto p-4 ">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Recent Questions
            </h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {questions && (
                <QuestionGrid
                    questions={questions}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </div>
    )
}

export default Home
