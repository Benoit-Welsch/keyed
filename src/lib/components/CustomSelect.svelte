<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { clickOutside } from "$lib/actions/clickOutside";

  export let options: string[] = [];
  export let value = "";
  export let placeholder = "Select an option";
  export let label = "";
  export let name = "";
  export let id = "";

  let isOpen = false;
  let selectedLabel = "";
  let maxWidth = "0px";

  // Add "All" option to the list while preserving the original options
  $: allOptions = ["All", ...options];
  $: selectedLabel = value || placeholder;
  
  // Calculate the maximum width based on all possible options including placeholder
  $: {
    if (typeof document !== 'undefined') {
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.style.fontSize = '0.95rem';
      document.body.appendChild(span);
      
      const allTexts = [placeholder, ...allOptions];
      const widths = allTexts.map(text => {
        span.textContent = text;
        return span.offsetWidth;
      });
      
      document.body.removeChild(span);
      // Add some padding for the arrow and margins
      maxWidth = `${Math.max(...widths) + 50}px`;
    }
  }

  const dispatch = createEventDispatcher();

  function handleSelect(option: string) {
    // Convert "All" selection to empty string to maintain existing behavior
    const selectedValue = option === "All" ? "" : option;
    value = selectedValue;
    isOpen = false;
    dispatch("change", { value: selectedValue });
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }
</script>

<div class="custom-select {$theme}" use:clickOutside={() => (isOpen = false)}>
  {#if label}
    <label class="select-label" on:click={toggleDropdown}>{label}</label>
  {/if}
  <button
    type="button"
    class="select-button"
    style="min-width: {maxWidth}"
    on:click={toggleDropdown}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
  >
    <span class="selected-value">{selectedLabel}</span>
    <span class="arrow" class:open={isOpen}>▼</span>
  </button>

  <select {id} {value} {name}></select>

  {#if isOpen}
    <div class="options-container" style="min-width: {maxWidth}" transition:slide={{ duration: 200 }}>
      {#each allOptions as option}
        <button
          class="option"
          class:selected={value === (option === "All" ? "" : option)}
          on:click={() => handleSelect(option)}
          role="option"
          aria-selected={value === (option === "All" ? "" : option)}
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
    font-size: 0.9rem;
  }

  .select-button {
    padding: 0.3rem;
    border: 2px solid transparent;
    border-radius: 0.5rem;
    background: none;
    font-weight: bold;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: capitalize;
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
    top: 100%;
    left: 0%;
    margin-top: 0.3rem;
    border-radius: 0.6rem;
    overflow: hidden;
    z-index: 10;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
    padding: 0.3rem 0.6rem;
    border: none;
    background: none;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: capitalize;
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

  select{
    display: none;
  }
</style>
