import { useState } from "react";

const useFetch = <Message, Response>(url: string, method: 'get' | 'post' | 'put' | 'delete', successMessage: Message | null = null) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (data?: Message, setData?: (response: Response | null) => void, setMessage?: (message: Message | null) => void) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        setIsPending(true);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            if (setData) {
                setData(responseData);
            }
            if (setMessage && successMessage) {
                setMessage(successMessage);
            }
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            if (setData) {
                setData(null);
            }
            if (setMessage) {
                setMessage(null);
            }
        } finally {
            setIsPending(false);
        }
        return { data, isPending, error, fetchData };
    };

    return fetchData;
}

export default useFetch