<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import CustomSelect from './CustomSelect.svelte';

    export let languages: string[] = [];
    export let difficulties: string[] = [];
    export let onFilterChange: (event: { language: string; difficulty: string; includeSpecialChars: boolean }) => void;
    
    let selectedLanguage = '';
    let selectedDifficulty = '';
    let excludeSpecialChars = false;

    function handleFilterChange() {
        onFilterChange({
            language: selectedLanguage,
            difficulty: selectedDifficulty,
            includeSpecialChars: !excludeSpecialChars
        });
    }
</script>

<div class="filter-container {$theme}">
    <div class="filter-group">
        <CustomSelect
            options={languages}
            bind:value={selectedLanguage}
            label="Language"
            placeholder="All Languages"
            on:change={handleFilterChange}
        />
    </div>

    <div class="filter-group">
        <CustomSelect
            options={difficulties}
            bind:value={selectedDifficulty}
            label="Difficulty"
            placeholder="All Difficulties"
            on:change={handleFilterChange}
        />
    </div>

    <div class="filter-group checkbox">
        <label>
            <input 
                type="checkbox" 
                bind:checked={excludeSpecialChars}
                on:change={handleFilterChange}
            >
            Exclude Special Characters
        </label>
    </div>
</div>

<style>
    .filter-container {
        padding: 1.5rem;
        border-radius: 0.75rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    }

    .filter-container.light {
        background-color: #ffffff;
        color: #333333;
        border: 1px solid #e0e0e0;
    }

    .filter-container.oled {
        background-color: #1a1a1a;
        color: #ffffff;
        border: 1px solid #333333;
    }

    .filter-group {
        margin-bottom: 1rem;
        width: 100%;
        max-width: 300px;
    }

    .filter-group.checkbox {
        margin-bottom: 0;
    }

    label {
        min-width: 100px;
        font-weight: 500;
        font-size: 0.95rem;
    }

    input[type="checkbox"] {
        margin-right: 0.75rem;
        width: 1.1rem;
        height: 1.1rem;
        cursor: pointer;
    }

    .checkbox label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
</style> 