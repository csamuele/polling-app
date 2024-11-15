import React from "react"
import type { Vote } from "@lib/api"
import { VoteCard } from "@components/Vote"

interface VoteGridProps {
    votes: Vote[]
    isLoading: boolean
    error: null
    canEdit?: boolean
    onDelete?: (id: number) => void
}

export const VoteGrid: React.FC<VoteGridProps> = ({
    votes,
    isLoading,
    error,
    canEdit,
    onDelete,
}) => {
    return (
        <div className="container mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {votes &&
                    votes.map((vote) => (
                        <VoteCard
                            key={vote.id}
                            vote={vote}
                            canEdit={canEdit}
                            onDelete={onDelete}
                        />
                    ))}
            </div>
        </div>
    )
}
