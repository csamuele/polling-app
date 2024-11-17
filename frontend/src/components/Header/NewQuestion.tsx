import React from "react"
import type { QuestionWrite } from "@lib/api"
import { QuestionForm } from "@components/Question"
import { useKeycloak } from "@react-keycloak/web"
import { useQuestion } from "@components/Question"
import $api from "@lib/api"
import { useQueryClient } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const NewQuestion: React.FC = () => {
    const { question, setQuestion } = useQuestion()
    const { keycloak } = useKeycloak()
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams()
    const { mutate } = $api.useMutation("post", "/api/questions/", {
        onSuccess: () => {
            handleClose()
            setQuestion(null)
            queryClient.invalidateQueries({
                queryKey: ["get", "/api/questions/"],
            })
            queryClient.invalidateQueries({
                queryKey: ["get", "/api/user-questions/"],
            })
        },
    })

    const handleOpen = () => {
        setSearchParams({ new: "true" })
        setQuestion({
            question_text: "",
            pub_date: new Date().toISOString(),
            choices: [
                { choice_text: "", votes: 0 },
                { choice_text: "", votes: 0 },
            ],
        } as QuestionWrite)
    }
    const handleClose = () => {
        setSearchParams({})
        setQuestion(null)
    }

    const handleSave = (question: QuestionWrite) => {
        mutate({
            body: question,
        })
    }

    return (
        <>
            <div>
                <button onClick={handleOpen}>New Question</button>
            </div>
            {keycloak.authenticated && question && (
                <QuestionForm
                    open={searchParams.has("new")}
                    onClose={handleClose}
                    onSave={handleSave}
                    title="New Question"
                />
            )}
        </>
    )
}
