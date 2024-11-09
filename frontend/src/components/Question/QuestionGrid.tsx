import React from "react";
import type { components } from "@lib/api";
import { QuestionCard } from "@components/Question";

interface QuestionGridProps {
    questions: components['schemas']['Question'][];
    isLoading: boolean;
    error: null;
    onEdit?: () => void;
    onDelete?: (id: number) => void;
}

export const QuestionGrid: React.FC<QuestionGridProps> = ({questions, isLoading, error, onEdit, onDelete}) => {

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {questions && questions.map((question) => (
                <QuestionCard key={question.id} question={question} onEdit={onEdit} onDelete={onDelete}/>
            ))}
            </div>
        </div>
    )
}
 
