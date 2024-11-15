/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/api/choices/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description API endpoint that allows choices to be viewed or edited. */
        get: operations["api_choices_list"];
        put?: never;
        /** @description API endpoint that allows choices to be viewed or edited. */
        post: operations["api_choices_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/choices/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description API endpoint that allows choices to be viewed or edited. */
        get: operations["api_choices_retrieve"];
        /** @description API endpoint that allows choices to be viewed or edited. */
        put: operations["api_choices_update"];
        post?: never;
        /** @description API endpoint that allows choices to be viewed or edited. */
        delete: operations["api_choices_destroy"];
        options?: never;
        head?: never;
        /** @description API endpoint that allows choices to be viewed or edited. */
        patch: operations["api_choices_partial_update"];
        trace?: never;
    };
    "/api/questions/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description API endpoint that returns the 5 most recent questions. */
        get: operations["api_questions_list"];
        put?: never;
        /** @description API endpoint that returns the 5 most recent questions. */
        post: operations["api_questions_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/questions/{id}/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description API endpoint that returns the 5 most recent questions. */
        get: operations["api_questions_retrieve"];
        /** @description API endpoint that returns the 5 most recent questions. */
        put: operations["api_questions_update"];
        post?: never;
        /** @description API endpoint that returns the 5 most recent questions. */
        delete: operations["api_questions_destroy"];
        options?: never;
        head?: never;
        /** @description API endpoint that returns the 5 most recent questions. */
        patch: operations["api_questions_partial_update"];
        trace?: never;
    };
    "/api/questions/{id}/choices/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description API endpoint that returns all the choices for a particular question. */
        get: operations["api_questions_choices_list"];
        put?: never;
        /** @description API endpoint that returns all the choices for a particular question. */
        post: operations["api_questions_choices_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/questions/batch_fetch/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description API endpoint that returns the 5 most recent questions. */
        get: operations["api_questions_batch_fetch_retrieve"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/register/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["users_register_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Choice: {
            /** Format: uri */
            readonly url: string;
            choice_text: string;
            votes?: number;
            /** Format: uri */
            question: string;
        };
        PatchedChoice: {
            /** Format: uri */
            readonly url?: string;
            choice_text?: string;
            votes?: number;
            /** Format: uri */
            question?: string;
        };
        PatchedQuestion: {
            /** Format: uri */
            readonly url?: string;
            question_text?: string;
            /**
             * Date published
             * Format: date-time
             */
            pub_date?: string;
            readonly choices?: components["schemas"]["Choice"][];
            /** Format: uri */
            readonly choices_url?: string;
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            readonly user?: string;
        };
        Question: {
            /** Format: uri */
            readonly url: string;
            question_text: string;
            /**
             * Date published
             * Format: date-time
             */
            pub_date: string;
            readonly choices: components["schemas"]["Choice"][];
            /** Format: uri */
            readonly choices_url: string;
            /** @description Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
            readonly user: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    api_choices_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"][];
                };
            };
        };
    };
    api_choices_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Choice"];
                "application/x-www-form-urlencoded": components["schemas"]["Choice"];
                "multipart/form-data": components["schemas"]["Choice"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"];
                };
            };
        };
    };
    api_choices_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this choice. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"];
                };
            };
        };
    };
    api_choices_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this choice. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Choice"];
                "application/x-www-form-urlencoded": components["schemas"]["Choice"];
                "multipart/form-data": components["schemas"]["Choice"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"];
                };
            };
        };
    };
    api_choices_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this choice. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    api_choices_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this choice. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedChoice"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedChoice"];
                "multipart/form-data": components["schemas"]["PatchedChoice"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"];
                };
            };
        };
    };
    api_questions_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"][];
                };
            };
        };
    };
    api_questions_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Question"];
                "application/x-www-form-urlencoded": components["schemas"]["Question"];
                "multipart/form-data": components["schemas"]["Question"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
        };
    };
    api_questions_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this question. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
        };
    };
    api_questions_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this question. */
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Question"];
                "application/x-www-form-urlencoded": components["schemas"]["Question"];
                "multipart/form-data": components["schemas"]["Question"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
        };
    };
    api_questions_destroy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this question. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    api_questions_partial_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description A unique integer value identifying this question. */
                id: number;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": components["schemas"]["PatchedQuestion"];
                "application/x-www-form-urlencoded": components["schemas"]["PatchedQuestion"];
                "multipart/form-data": components["schemas"]["PatchedQuestion"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
        };
    };
    api_questions_choices_list: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"][];
                };
            };
        };
    };
    api_questions_choices_create: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Choice"];
                "application/x-www-form-urlencoded": components["schemas"]["Choice"];
                "multipart/form-data": components["schemas"]["Choice"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Choice"];
                };
            };
        };
    };
    api_questions_batch_fetch_retrieve: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Question"];
                };
            };
        };
    };
    users_register_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description No response body */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
