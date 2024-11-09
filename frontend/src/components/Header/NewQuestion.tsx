import React, { useState } from "react";
import type { components } from "@lib/api"
import { QuestionForm } from "@components/Question";
import { useKeycloak } from "@react-keycloak/web";

export const NewQuestion: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [question, setQuestion] = useState<components['schemas']['Question'] | null>(null)
    const { keycloak } = useKeycloak()

    const handleOpen = () => {
        setOpen(true)
        setQuestion({question_text: "", pub_date: new Date().toISOString()} as components['schemas']['Question'])
    }
    const handleClose = () => {
        setOpen(false)
        setQuestion(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value,
        } as components['schemas']['Question']);
    }



    return (
        <>
            <div>
                <button onClick={handleOpen}>New Question</button>
            </div>
            { keycloak.authenticated && question && (
                <QuestionForm open={open} handleClose={handleClose} question={question} handleChange={handleChange} />
            )}
            
        </>
    )
}