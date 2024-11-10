import React, { useState } from "react";
import type { Question } from "@lib/api"
import { QuestionForm } from "@components/Question";
import { useKeycloak } from "@react-keycloak/web";
import { useQuestion } from "@components/Question";
import $api from "@lib/api";
import { useQueryClient } from "@tanstack/react-query";

export const NewQuestion: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { question, setQuestion } = useQuestion()
    const { keycloak } = useKeycloak()
    const queryClient = useQueryClient()
    const { mutate } = $api.useMutation("post", "/api/questions/", {
        onSuccess: () => {
            handleClose()
            setQuestion(null)
            queryClient.invalidateQueries({ queryKey: ["get", "/api/questions/"] })
            queryClient.invalidateQueries({ queryKey: ["get", "/api/user-questions/"] })
        }
    })

    const handleOpen = () => {
        setOpen(true)
        setQuestion({
            question_text: "", 
            pub_date: new Date().toISOString(),
            choices: [
                { choice_text: "", votes: 0 },
                { choice_text: "", votes: 0 },
            ]
        } as Question)
    }
    const handleClose = () => {
        setOpen(false)
        setQuestion(null)
    
    }

    const handleSave = (question: Question) => {
        mutate({
            body: question
        })
    }



    return (
        <>
            <div>
                <button onClick={handleOpen}>New Question</button>
            </div>
            { keycloak.authenticated && question && (
                <QuestionForm open={open} onClose={handleClose} onSave={handleSave}/>
            )}
            
        </>
    )
}