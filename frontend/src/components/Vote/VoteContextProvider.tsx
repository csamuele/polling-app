import React, { useContext, createContext, useState } from "react";
import { Vote } from "@lib/api/";

interface VoteContextValue {
    vote?: Vote | null;
    setVote: (Vote: null | Vote) => void;
}

const VoteContext = createContext<VoteContextValue | undefined>(undefined);

export const VoteContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [Vote, setVote] = useState<Vote | null>(null);

    return (
        <VoteContext.Provider value={{ vote: Vote, setVote }}>
            {children}
        </VoteContext.Provider>
    )
}

export const useVote = () => {
    const context = useContext(VoteContext);
    if (!context) {
        throw new Error('useVote must be used within a VoteContextProvider');
    }
    return context;
}