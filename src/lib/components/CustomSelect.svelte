<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import { createEventDispatcher } from 'svelte';
    import { slide } from 'svelte/transition';
    import { clickOutside } from '$lib/actions/clickOutside';

    export let options: string[] = [];
    export let value = '';
    export let placeholder = 'Select an option';
    export let label = '';

    let isOpen = false;
    let selectedLabel = '';

    // Add "All" option to the list while preserving the original options
    $: allOptions = ['All', ...options];
    $: selectedLabel = value || placeholder;

    const dispatch = createEventDispatcher();

    function handleSelect(option: string) {
        // Convert "All" selection to empty string to maintain existing behavior
        const selectedValue = option === 'All' ? '' : option;
        value = selectedValue;
        isOpen = false;
        dispatch('change', { value: selectedValue });
    }

    function toggleDropdown() {
        isOpen = !isOpen;
    }
</script>

<div 
    class="custom-select {$theme}"
    use:clickOutside={() => isOpen = false}
>
    {#if label}
        <label class="select-label" on:click={toggleDropdown}>{label}</label>
    {/if}
    <button 
        type="button" 
        class="select-button" 
        on:click={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
    >
        <span class="selected-value">{selectedLabel}</span>
        <span class="arrow" class:open={isOpen}>▼</span>
    </button>

    {#if isOpen}
        <div class="options-container" transition:slide={{ duration: 200 }}>
            {#each allOptions as option}
                <button
                    class="option"
                    class:selected={value === (option === 'All' ? '' : option)}
                    on:click={() => handleSelect(option)}
                    role="option"
                    aria-selected={value === (option === 'All' ? '' : option)}
                >
                    {option}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .custom-select {
        position: relative;
        user-select: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.6rem;
    }

    .select-label {
        display: block;
        font-weight: 500;
        font-size: 0.95rem;
    }

    .select-button {
        padding: 0.6rem;
        border: 2px solid transparent;
        border-radius: 0.5rem;
        background: none;
        font-size: 0.95rem;
        text-align: left;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .light .select-button {
        background-color: #ffffff;
        color: #000000;
        border-color: #e0e0e0;
    }

    .oled .select-button {
        background-color: #1a1a1a;
        color: #ffffff;
        border-color: #333;
    }

    .select-button:hover {
        border-color: #666;
    }

    .select-button:focus {
        outline: none;
        border-color: #4299e1;
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    .arrow {
        font-size: 0.8rem;
        transition: transform 0.2s ease;
    }

    .arrow.open {
        transform: rotate(180deg);
    }

    .options-container {
        position: absolute;
        width: 68%;
        top: 100%;
        left: 32%;
        right: 0;
        margin-top: 0.5rem;
        border-radius: 0.5rem;
        overflow: hidden;
        z-index: 10;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .light .options-container {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
    }

    .oled .options-container {
        background-color: #1a1a1a;
        border: 1px solid #333;
    }

    .option {
        width: 100%;
        padding: 0.75rem 1rem;
        border: none;
        background: none;
        font-size: 0.95rem;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .light .option {
        color: #000000;
    }

    .oled .option {
        color: #ffffff;
    }

    .option:hover {
        background-color: rgba(128, 128, 128, 0.1);
    }

    .option.selected {
        background-color: rgba(66, 153, 225, 0.1);
        color: #4299e1;
    }

    .selected-value {
        flex: 1;
        margin-right: 1rem;
    }
</style> 