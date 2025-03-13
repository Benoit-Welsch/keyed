import { writable } from 'svelte/store';

interface FilterState {
    language: string;
    difficulty: string;
    includeSpecialChars: boolean;
}

function createTextFilterStore() {
    const { subscribe, set, update } = writable<FilterState>({
        language: '',
        difficulty: '',
        includeSpecialChars: true
    });

    return {
        subscribe,
        updateFilter: (filter: Partial<FilterState>) => {
            update(state => ({ ...state, ...filter }));
        },
        reset: () => {
            set({
                language: '',
                difficulty: '',
                includeSpecialChars: true
            });
        }
    };
}

export const textFilter = createTextFilterStore(); 