import { create } from 'zustand';

interface UserState {
    atomBalance: number;
    spendAtoms: (amount: number) => void;
    addAtoms: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
    atomBalance: 100, // Initial free atoms
    spendAtoms: (amount) => set((state) => ({ atomBalance: state.atomBalance - amount })),
    addAtoms: (amount) => set((state) => ({ atomBalance: state.atomBalance + amount })),
}));
