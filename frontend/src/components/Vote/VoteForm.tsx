import React from "react"
import { NewEditView } from "@components/Utils"
import type { CreateVote } from "@lib/api"
import { useQuestion } from "@components/Question"

interface VoteFormProps {
    open: boolean
    onClose: () => void
    onSave: (choices: CreateVote) => void
    currentVotes?: number[]
}

export const VoteForm: React.FC<VoteFormProps> = ({
    open,
    onClose,
    onSave,
    currentVotes,
}) => {
    const { question } = useQuestion()
    const [choices, setChoices] = React.useState<number[]>(currentVotes || [])
    const onChange = (choiceId: number) => {
        setChoices((prevChoices) => {
            if (prevChoices.includes(choiceId)) {
                return prevChoices.filter(
                    (prevChoiceId) => prevChoiceId !== choiceId,
                )
            }
            return [...prevChoices, choiceId]
        })
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const vote = {
            choices: choices,
        } as CreateVote
        setChoices([])
        onSave(vote)
    }

    return (
        <NewEditView
            open={open}
            onClose={onClose}
            title={question ? question.question_text : ""}
        >
            <form onSubmit={handleSave} className="lg:w-[440px] mx-auto">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Choices</h2>
                    {question?.choices.map((choice) =>
                        choice.id ? (
                            <div
                                key={choice.id}
                                className="flex items-center mb-1"
                            >
                                <input
                                    type="checkbox"
                                    id={`choice-${choice.id}`}
                                    name={choice.choice_text}
                                    value={choice.id}
                                    checked={choices.includes(choice.id)}
                                    onChange={() => onChange(choice.id!)}
                                    className="peer relative appearance-none w-4 h-4 
                                                border rounded-full dark:border-white border-gray-900
                                                cursor-pointer  
                                                dark:checked:bg-white checked:bg-gray-700"
                                />
                                <label
                                    htmlFor={`choice-${choice.id}`}
                                    className="ml-2 text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    {choice.choice_text}
                                </label>
                            </div>
                        ) : null,
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2"
                    >
                        Vote
                    </button>
                </div>
            </form>
        </NewEditView>
    )
}
