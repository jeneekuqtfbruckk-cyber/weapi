import { create } from 'zustand';

interface UserState {
    atomBalance: number;
    spendAtoms: (amount: number) => boolean; // Returns true if successful
    addAtoms: (amount: number) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    atomBalance: 100, // Starting balance for demo
    spendAtoms: (amount) => {
        const current = get().atomBalance;
        if (current >= amount) {
            set({ atomBalance: current - amount });
            return true;
        }
        return false;
    },
    addAtoms: (amount) => set((state) => ({ atomBalance: state.atomBalance + amount })),
}));
