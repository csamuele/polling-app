import React from "react";
import moment from 'moment'
import type { Question } from "@lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useQuestion } from "./QuestionContextProvider";
import { QuestionForm } from "./QuestionForm";
import { useState } from "react";
import $api from "@lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { useKeycloak } from "@react-keycloak/web";

interface QuestionCardProps {
    question: Question;
    canEdit?: boolean;
    onDelete?: (id: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({question, canEdit, onDelete}) => {
    const { setQuestion } = useQuestion();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { keycloak } = useKeycloak();
    const { mutate } = $api.useMutation("put", "/api/questions/{id}/", {
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ["get", "/api/user-questions/"] })
        }
    })
    const handleDelete = () => {
        if (onDelete) {
            onDelete(question.id)
        }
    }
    const handleEdit = () => {
        setQuestion(question)
        setOpen(true)
    }
    const handleSave = (question: Question) => {
        mutate({
            body: question,
            params: { path: { id: question.id } }
        })
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold mb-2">{question.question_text}</h3>
                <div className="flex space-x-2">
                    {canEdit && 
                        <button className="hover:text-blue-600 text-blue-500 px-2 py-1 rounded" onClick={handleEdit}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>}
                    {onDelete && 
                        <button className="hover:text-red-600 text-red-500 px-2 py-1 rounded" onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} />    
                        </button>}
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
            <div>
                <h4 className="font-semibold text-lg mb-2">Choices:</h4>
                {question.choices.map(choice => {
                return (
                    <div key={choice.id} className="flex items-center justify-between mb-2">
                        <span>{choice.choice_text}</span>
                        <span>{choice.votes} votes</span>
                    </div>
                )
            })}
            </div>
            {keycloak.authenticated &&
                <div className="mt-4 flex align-middle">
                    <button className="w-full text-blue-500 py-2 px-4 hover:text-blue-700">
                        Vote
                    </button>
                </div>
                }
        <QuestionForm open={open} onClose={() => setOpen(false)} onSave={handleSave}/>
        </div>
    )
}
