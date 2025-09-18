import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths } from '@lib/api/api';
import $api from '@lib/api';
import { useMutation } from '@tanstack/react-query';

type UseQueryOptions<T> = ParamsOption<T> & 
    RequestBodyOption<T> & {
        reactQuery?: {
            enabled?: boolean;
            refetchInterval?: number;
        }
    }

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

            
