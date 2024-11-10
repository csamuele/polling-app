import React from "react";
import type { Question } from "@lib/api";
import { QuestionCard } from "@components/Question";

interface QuestionGridProps {
    questions: Question[];
    isLoading: boolean;
    error: null;
    canEdit?: boolean;
    onDelete?: (id: number) => void;
}

export const QuestionGrid: React.FC<QuestionGridProps> = ({questions, isLoading, error, canEdit, onDelete}) => {

    return (
        <div className="container mx-auto p-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {questions && questions.map((question) => (
                <QuestionCard key={question.id} question={question} canEdit={canEdit} onDelete={onDelete}/>
            ))}
            </div>
        </div>
    )
}
 
