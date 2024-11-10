import React, { useContext, createContext, useState } from "react";
import { Question } from "@lib/api/";

interface QuestionContextValue {
    question?: Question | null;
    setQuestion: (question: null | Question) => void;
}

const QuestionContext = createContext<QuestionContextValue | undefined>(undefined);

export const QuestionContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [question, setQuestion] = useState<Question | null>(null);

    return (
        <QuestionContext.Provider value={{ question, setQuestion }}>
            {children}
        </QuestionContext.Provider>
    )
}

export const useQuestion = () => {
    const context = useContext(QuestionContext);
    if (!context) {
        throw new Error('useQuestion must be used within a QuestionContextProvider');
    }
    return context;
}