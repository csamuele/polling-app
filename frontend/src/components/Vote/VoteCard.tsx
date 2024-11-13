import React from "react";
import moment from 'moment'
import type { CreateVote, Vote } from "@lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import $api from "@lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { VoteForm } from "@components/Vote";
import { useQuestion } from "@components/Question";
import { useSearchParams } from "react-router-dom";

interface VoteCardProps {
    vote: Vote;
    canEdit?: boolean;
    onDelete?: (id: number) => void;
}

export const VoteCard: React.FC<VoteCardProps> = ({vote, canEdit, onDelete}) => {
    const { question } = vote;
    const { setQuestion } = useQuestion();
    const queryClient = useQueryClient();
    const [searchParams, setSearchParams] = useSearchParams();

    const { mutate: mutateVote } = $api.useMutation("put", "/api/votes/{id}/", {
        onSuccess: () => {
            setSearchParams({})
            setQuestion(null)
            queryClient.invalidateQueries({ queryKey: ["get"] })
        }
    })
    const handleEdit = () => {
        setQuestion(question)
        setSearchParams({ edit: "true"})
    }

    const handleDelete = () => {
        if (onDelete) {
            onDelete(vote.id)
        }
    }
    const handleSaveVote = (newVote: CreateVote) => {
        mutateVote({
            body: newVote,
            params: { path: { id: vote.id } }
        })
    }
    return (
        <div className="bg-white shadow-md rounded-lg p-4 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{question.question_text}</h3>
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
                <h4 className="font-semibold text-lg mb-2 dark:text-white">Choices:</h4>
                {question.choices.map(choice => {
                return (
                    <div key={choice.id} className="relative flex items-center justify-between mb-2">
                        {vote.choices.some(voteChoice => voteChoice.id === choice.id) && <div
                            className={`absolute inset-0 bg-violet-200 rounded-sm dark:bg-violet-900`}
                        />}
                        <span className="relative z-10 px-1 dark:text-white">{choice.choice_text}</span>
                    </div>
                )
            })}
            </div>
        <VoteForm open={searchParams.has("edit")} onClose={() => setSearchParams({})} onSave={handleSaveVote} currentVotes={vote.choices.map(choice=> choice.id)}/>
        </div>
    )
}
