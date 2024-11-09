import React from 'react';
import { Modal } from '@components/Utils';
import type { components } from '@lib/api';
import $api from '@lib/api';
import { useQueryClient } from '@tanstack/react-query';

interface QuestionFormProps {
    open: boolean;
    handleClose: () => void;
    question: components['schemas']['Question'];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ open, handleClose, question, handleChange }) =>  {
    const queryClient = useQueryClient();
    
    const { mutate } = $api.useMutation('post', '/api/questions/', {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get']});
        }
    });
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question) return;
        const res = await mutate({body: question});
        handleClose();
    }
    return (     
            <Modal isOpen={open} onClose={handleClose} title="New Question">
                <form onSubmit={handleSave}>
                    <div>
                        <input 
                            type="text" 
                            placeholder="Question" 
                            className="block mb-4 text-lg" 
                            value={question?.question_text} 
                            name="question_text"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Choices</h2>
                        <input type="text" placeholder="Option 1" className="block mb-2" />
                        <input type="text" placeholder="Option 2" className="block mb-2" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit"  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mt-2">Create</button>
                    </div>
                </form>
            </Modal>
    );
};