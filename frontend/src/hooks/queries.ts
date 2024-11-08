import { useQuery } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths } from '@lib/api/api';
import client from '@lib/api';

type UseQueryOptions<T> = ParamsOption<T> & 
    RequestBodyOption<T> & {
        reactQuery?: {
            enabled?: boolean;
            refetchInterval?: number;
        }
    }

export function getQuestions({ reactQuery }: UseQueryOptions<paths['/api/questions/']['get']>) {
    return useQuery({
        ...reactQuery,
        queryKey: ['questions'],
        queryFn: async ({ signal }) => {
            const { data } = await client.GET('/api/questions/', { 
                signal,
        });
        return data;
    }
    });

}