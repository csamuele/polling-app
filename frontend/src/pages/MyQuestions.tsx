import React from "react";
import { QuestionGrid } from "@components/Question";
import $api from "@lib/api";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const MyQuestions: React.FC = () => {
    const { data: questions, error, isLoading } = useQuery(
        $api.queryOptions('get', '/api/user-questions/',{
            queryKey: ['questions']
        })
    )
    const queryClient = useQueryClient();

    const { mutate } = $api.useMutation('delete', '/api/questions/{id}/', {
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['get', '/api/user-questions/']});
        },
    });
    const handleDelete =  (id: number) => {
        const res =  mutate({ params: { path: {id}}});
        return res;
    };
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Questions</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {questions && <QuestionGrid questions={questions} isLoading={isLoading} error={error} onDelete={handleDelete}/>}
        </div>
    );
};

export default MyQuestions;