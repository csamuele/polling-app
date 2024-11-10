import React, { useEffect } from 'react';
import { Modal } from '@components/Utils';
import type { Choice } from '@lib/api';
import { useQuestion } from './QuestionContextProvider';
import type { Question } from '@lib/api';

interface QuestionFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (question: Question) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ open, onClose, onSave }) =>  {
    const { question, setQuestion } = useQuestion();
    const [choices, setChoices] = React.useState<Choice[]>([]);

    useEffect(() => {
        if (question) {
            setChoices(question.choices);
        }
    }, [question]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion({
            ...question,
            [e.target.name]: e.target.value,
        } as Question);
    }
    const handleAddChoice = () => {
        setChoices([...choices, { choice_text: "", votes: 0 } as Choice]);
    }

    const handleEditChoice = (index: number, value: string) => {
        const newChoices = [...choices];
        newChoices[index].choice_text = value;
        setChoices(newChoices);
    }

    const handleDeleteChoice = (index: number) => {
        const newChoices = [...choices];
        newChoices.splice(index, 1);
        setChoices(newChoices);
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedQuestion = {
            ...question,
            choices,
        } as Question;

        onSave(updatedQuestion);
    }

   
    return (     
            <Modal isOpen={open} onClose={onClose} title="New Question">
                <form onSubmit={handleSave} className='w-[440px] mx-auto' >
                    <div>
                        <input 
                            type="text" 
                            placeholder="Question" 
                            className="block mb-4 text-lg w-full" 
                            value={question?.question_text} 
                            name="question_text"
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Choices</h2>
                        {choices.map((choice, index) => (
                            <div key={index} className="flex items-center justify-between mb-2">
                                <input 
                                    key={index}
                                    type="text" 
                                    placeholder="Choice" 
                                    className="block mr-2 w-[225px] flex-grow" 
                                    value={choice.choice_text} 
                                    name="choice_text"
                                    onChange={(e) => handleEditChoice(index, e.target.value)}
                                />
                                <button type="button" onClick={() => handleDeleteChoice(index)} className="text-red-500">Delete</button>
                            </div>
                            ))}
                        <button type="button" onClick={handleAddChoice} className="text-blue-500">Add Choice</button>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit"  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2">Save</button>
                    </div>
                </form>
            </Modal>
    );
};