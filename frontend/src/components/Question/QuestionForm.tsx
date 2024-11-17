import React, { useEffect } from "react"
import { NewEditView } from "@components/Utils"
import type { ChoiceWrite } from "@lib/api"
import { useQuestion } from "./QuestionContextProvider"
import type { QuestionWrite } from "@lib/api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
interface QuestionFormProps {
    open: boolean
    onClose: () => void
    onSave: (question: QuestionWrite) => void
    title: string
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
    open,
    onClose,
    onSave,
    title,
}) => {
    const { question, setQuestion } = useQuestion()
    const [choices, setChoices] = React.useState<ChoiceWrite[]>([])

    useEffect(() => {
        if (question) {
            setChoices(question.choices)
        }
    }, [question])
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value,
        } as QuestionWrite)
    }
    const handleAddChoice = () => {
        setChoices([...choices, { choice_text: "" } as ChoiceWrite])
    }

    const handleEditChoice = (index: number, value: string) => {
        const newChoices = [...choices]
        newChoices[index].choice_text = value
        setChoices(newChoices)
    }

    const handleDeleteChoice = (index: number) => {
        const newChoices = [...choices]
        newChoices.splice(index, 1)
        setChoices(newChoices)
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        const updatedQuestion = {
            ...question,
            choices,
        } as QuestionWrite

        onSave(updatedQuestion)
    }

    return (
        <NewEditView open={open} onClose={onClose} title={title}>
            <form onSubmit={handleSave} className="lg:w-[440px] mx-auto">
                <div>
                    <input
                        type="text"
                        placeholder="Question"
                        className="block mb-4 text-lg lg:w-1/2 w-full"
                        value={question?.question_text}
                        name="question_text"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Choices</h2>
                    {choices.map((choice, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between px-4 border rounded-md dark:border-gray-700 border-gray-200 mb-2"
                        >
                            <input
                                key={index}
                                type="text"
                                placeholder="Choice"
                                className="block mr-5 my-2 flex-grow"
                                value={choice.choice_text}
                                name="choice_text"
                                onChange={(e) =>
                                    handleEditChoice(index, e.target.value)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteChoice(index)}
                                className="text-red-500"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddChoice}
                        className="text-blue-500"
                    >
                        Add Choice
                    </button>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2"
                    >
                        Save
                    </button>
                </div>
            </form>
        </NewEditView>
    )
}
