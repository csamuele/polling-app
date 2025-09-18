import $api from '@lib/api';


export function useQuestions() {
    const useGetQuestions = $api.useQuery(
        'get',
        '/api/questions/',

    )
    const useCreateQuestion = $api.useMutation(
        'post',
        '/api/questions/',

    )
    return {
        useGetQuestions,
        useCreateQuestion,
    }

}
// export function useGetQuestions({ reactQuery }: UseQueryOptions<paths['/api/questions/']['get']>) {
//     return useQuery({
//         ...reactQuery,
//         queryKey: ['questions'],
//         queryFn: async ({ signal }) => {
//             const { data } = await client.GET('/api/questions/', { 
//                 signal,
//         });
//         return data;
//     }
//     });

// }


// export function useCreateQuestion({ reactQuery, body }: UseQueryOptions<paths['/api/questions/']['post']>) {
//     return useMutation({
//         ...reactQuery,
//         mutationKey: ['questions'],
//         mutationFn: async () => {
//             const { data } = await client.POST('/api/questions/', { 
//                 body,
//             });
//             return data;
//         },
//         onSuccess: () => {
//             ;
//     });
// }

            
