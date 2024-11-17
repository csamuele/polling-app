import React from "react"
import moment from "moment"
import type { CreateVote, QuestionRead, QuestionWrite } from "@lib/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons"
import { useQuestion } from "./QuestionContextProvider"
import { QuestionForm } from "./QuestionForm"
import $api from "@lib/api"
import { useQueryClient } from "@tanstack/react-query"
import { useKeycloak } from "@react-keycloak/web"
import { VoteForm } from "@components/Vote"
import { useSearchParams } from "react-router-dom"

interface QuestionCardProps {
    question: QuestionRead
    canEdit?: boolean
    onDelete?: (id: number) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    canEdit,
    onDelete,
}) => {
    const { question: currentQuestion, setQuestion } = useQuestion()
    const queryClient = useQueryClient()
    const { keycloak } = useKeycloak()
    const [searchParams, setSearchParams] = useSearchParams()
    const { mutate: mutateQuestion } = $api.useMutation(
        "put",
        "/api/questions/{id}/",
        {
            onSuccess: () => {
                setSearchParams({})
                setQuestion(null)
                queryClient.invalidateQueries({ queryKey: ["get"] })
            },
        },
    )
    const { mutate: mutateVote } = $api.useMutation(
        "post",
        "/api/questions/{id}/vote/",
        {
            onSuccess: () => {
                setSearchParams({})
                setQuestion(null)
                queryClient.invalidateQueries({ queryKey: ["get"] })
            },
        },
    )
    const handleDelete = () => {
        if (onDelete) {
            onDelete(question.id)
        }
    }
    const handleEdit = () => {
        setQuestion(question)
        setSearchParams({ edit: "true" })
    }
    const handleSave = (question: QuestionWrite) => {
        mutateQuestion({
            body: question,
            params: { path: { id: question.id } },
        })
    }
    const handleVote = () => {
        setQuestion(question)
        setSearchParams({ vote: "true" })
    }
    const handleSaveVote = (vote: CreateVote) => {
        try {
            if (!currentQuestion) {
                throw new Error("No question selected")
            }
            mutateVote({
                body: vote,
                params: { path: { id: currentQuestion.id } },
            })
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                    {question.question_text}
                </h3>
                <div className="flex space-x-2">
                    {canEdit && (
                        <button
                            className="hover:text-blue-600 text-blue-500 px-2 py-1 rounded"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            className="hover:text-red-600 text-red-500 px-2 py-1 rounded"
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-500 mb-4">
                    Published {moment(question.pub_date).fromNow()}
                </p>
                <p className="text-gray-500 mb-4">
                    Total Votes: {question.votes}
                </p>
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold text-lg mb-2 dark:text-white">
                    Choices:
                </h4>
                {question.choices.map((choice) => {
                    return (
                        <div
                            key={choice.id}
                            className="relative flex items-center justify-between mb-2"
                        >
                            {question.votes > 0 && (
                                <div
                                    className={`absolute inset-0 bg-violet-200 rounded-sm dark:bg-violet-900`}
                                    style={{
                                        width: `${(choice.votes / question.votes) * 100}%`,
                                    }}
                                />
                            )}
                            <span className="relative z-10 px-1 dark:text-white">
                                {choice.choice_text}
                            </span>
                            <span className="relative z-10 px-1 dark:text-white">
                                {choice.votes} votes
                            </span>
                        </div>
                    )
                })}
            </div>
            {keycloak.authenticated && (
                <div className="mt-4 flex-end flex align-middle">
                    <button
                        onClick={handleVote}
                        className="w-full text-blue-500 py-2 px-4 hover:text-blue-700"
                    >
                        Vote
                    </button>
                </div>
            )}
            <QuestionForm
                open={searchParams.has("edit")}
                onClose={() => setSearchParams({})}
                onSave={handleSave}
                title="Edit Question"
            />
            <VoteForm
                open={searchParams.has("vote")}
                onClose={() => setSearchParams({})}
                onSave={handleSaveVote}
            />
        </div>
    )
}
