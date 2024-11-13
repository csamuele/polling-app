import createFetchClient, { type Middleware } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from '@lib/api/api';
import keycloak from '../../keycloak';

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

const authMiddleware: Middleware = {
    async onRequest({ request }) {
        const token = keycloak.token;
        if (keycloak.authenticated) {
            request.headers.set('Authorization', `Bearer ${token}`);
        }
        return undefined;
    }
}

export const fetchClient = createFetchClient<paths>({ baseUrl: 'http://localhost:8000/' });
fetchClient.use(authMiddleware);
fetchClient.use(throwOnError);
const $api = createClient(fetchClient);

export default $api;
import type { components } from "@lib/api/api";
type Schemas = components["schemas"];
export type QuestionWrite = Schemas["QuestionWrite"];
export type QuestionRead = Schemas["QuestionRead"];
export type ChoiceRead = Schemas["ChoiceRead"];
export type ChoiceWrite = Schemas["ChoiceWrite"];
export type PatchedQuestionWrite = Schemas["PatchedQuestionWrite"];
export type Vote = Schemas["Vote"];
export type CreateVote = Schemas["CreateVote"];

export type {$defs, operations, paths, webhooks} from './api.ts';