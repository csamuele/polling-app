import React from "react";
import moment from 'moment'
import type { components } from "@lib/api";
// import $api from "@lib/api";
// import { useQueryClient } from "@tanstack/react-query";




interface QuestionCardProps {
    question: components['schemas']['Question'];
    onEdit?: (question: components['schemas']['PatchedQuestion']) => void;
    onDelete?: (id: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({question, onEdit, onDelete}) => {

    // const queryClient = useQueryClient();
    // const { mutate } = $api.useMutation("delete", "/api/questions/{id}/", {
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ["get", "/api/user-questions/"] });
    //     },
    // });
    
    const handleDelete = () => {
        if (onDelete) {
            onDelete(question.id)
        }
    }

    const handleEdit = () => {
        if (onEdit) {
            onEdit(question)
        }
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold mb-2">{question.question_text}</h3>
                <div className="flex space-x-2">
                    {onEdit && <button className="hover:text-blue-600 text-blue-500 px-2 py-1 rounded" onClick={handleEdit}>Edit</button>}
                    {onDelete && <button className="hover:text-red-600 text-red-500 px-2 py-1 rounded" onClick={handleDelete}>Delete</button>}
                </div>
            </div>
            <p className="text-gray-500 mb-4">
                Published {moment(question.pub_date).fromNow()}
            </p>
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
        </div>
    )
}
