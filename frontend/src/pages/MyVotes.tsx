import React from "react"
import { VoteGrid } from "@components/Vote"
import $api, { fetchClient } from "@lib/api"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { VoteContextProvider } from "@components/Vote"

const MyVotes: React.FC = () => {
    const {
        data: votes,
        error,
        isLoading,
    } = useQuery($api.queryOptions("get", "/api/user-votes/"))
    const queryClient = useQueryClient()

    const deleteVoteMutation = useMutation({
        mutationFn: (id: number) =>
            fetchClient.DELETE("/api/votes/{id}/", {
                params: { path: { id } },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get"] })
        },
    })
    const handleDelete = (id: number) => {
        const res = deleteVoteMutation.mutate(id)
        return res
    }

    return (
        <VoteContextProvider>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6">My Votes</h2>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {votes && (
                    <VoteGrid
                        votes={votes}
                        isLoading={isLoading}
                        error={error}
                        canEdit
                        onDelete={handleDelete}
                    />
                )}
            </div>
        </VoteContextProvider>
    )
}

export default MyVotes
