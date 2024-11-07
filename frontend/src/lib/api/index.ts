import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from '@lib/api/api';

const throwOnError: Middleware = {
    async onResponse({ response }) {
        if (!response.ok) {
            const body = response.headers.get('Content-Type')?.includes('application/json')
                ? await response.json()
                : await response.text();
            throw new Error(`HTTP Error ${response.status}: ${body}`);
        }
        return undefined;
    },
};

const client = createClient<paths>({ baseUrl: 'http://localhost:8000/' });
client.use(throwOnError);

export default client;