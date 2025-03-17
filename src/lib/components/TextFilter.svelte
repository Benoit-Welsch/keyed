<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import CustomSelect from "./CustomSelect.svelte";

  export let languages: string[] = [];
  export let difficulties: string[] = [];
  export let types: string[] = [];

  export let onFilterChange: (event: {
    language: string;
    difficulty: string;
    includeSpecialChars: boolean;
    type: string;
  }) => void;

  let selectedLanguage = "";
  let selectedDifficulty = "";
  let specialChars = true;
  let selectedType = "";
  function handleFilterChange() {
    onFilterChange({
      language: selectedLanguage,
      difficulty: selectedDifficulty,
      includeSpecialChars: specialChars,
      type: selectedType,
    });
  }
</script>

<div class="filter-container {$theme}">
  <div class="filter-group">
    <CustomSelect
      options={languages}
      bind:value={selectedLanguage}
      placeholder="All Languages"
      on:change={handleFilterChange}
    />
  </div>

  <div class="filter-group">
    <CustomSelect
      options={difficulties}
      bind:value={selectedDifficulty}
      placeholder="All Difficulties"
      on:change={handleFilterChange}
    />
  </div>

  <div class="filter-group">
    <CustomSelect
      options={types}
      bind:value={selectedType}
      placeholder="All Types"
      on:change={handleFilterChange}
    />
  </div>
  <div class="filter-group checkbox">
    <label>
      <input
        type="checkbox"
        bind:checked={specialChars}
        on:change={handleFilterChange}
      />
      Special Characters
    </label>
  </div>
</div>

<style>
  .filter-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    gap: 0.6em;
  }

  .filter-group {
    max-width: 310px;
  }

  .filter-group.checkbox {
    margin-bottom: 0;
  }

  label {
    min-width: 100px;
    font-weight: 500;
    font-size: 0.9rem;
  }

  input[type="checkbox"] {
    margin-right: 0.6rem;
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
