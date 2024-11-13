import React from "react";
import { QuestionGrid } from "@components/Question";
import $api, {fetchClient} from "@lib/api";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";

const MyQuestions: React.FC = () => {

    const { data: questions, error, isLoading } = useQuery(
        $api.queryOptions('get', '/api/user-questions/',)
    )
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: number) => fetchClient.DELETE("/api/questions/{id}/", { 
            params: { path: {id}},
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get']});
        },
        

    })
    const handleDelete =  (id: number) => {
        const res =  mutation.mutate(id);
        return res;
    };

    


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">My Questions</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {questions && <QuestionGrid questions={questions} isLoading={isLoading} error={error} canEdit onDelete={handleDelete}/>}

        </div>
    );
};

export default MyQuestions;