import { on } from 'events';
import React, { useState } from 'react';

interface QuestionFormProps {
    isOpen: boolean;
    onClose: () => void;
}
const QuestionForm: React.FC<QuestionFormProps> = ({isOpen, onClose}) => {
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-1/3">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-semibold">Modal Title</h2>
                        </div>
                        <div className="p-4">
                            <p>Modal content goes here...</p>
                        </div>
                        <div className="flex justify-end p-4 border-t">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionForm;