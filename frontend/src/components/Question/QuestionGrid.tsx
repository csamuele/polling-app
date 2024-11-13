import React from "react";
import type { QuestionRead } from "@lib/api";
import { QuestionCard } from "@components/Question";

interface QuestionGridProps {
    questions: QuestionRead[];
    isLoading: boolean;
    error: null;
    canEdit?: boolean;
    onDelete?: (id: number) => void;
}

export const QuestionGrid: React.FC<QuestionGridProps> = ({questions, isLoading, error, canEdit, onDelete}) => {

    return (
        <div className="container mx-auto">
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
 
