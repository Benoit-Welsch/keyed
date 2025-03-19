<script lang="ts">
  import { currentText } from "$lib/stores/typing";
  import { textFilter } from "$lib/stores/textFilter";
  import TextFilter from "./TextFilter.svelte";
  import { onMount } from "svelte";
  import CardButton from "./CardButton.svelte";
  import { theme } from "$lib/stores/theme";
    import type { TextContent } from "$lib/text";

  let languages: string[] = [];
  let difficulties: string[] = [];
  let types: string[] = [];

  export let texts: TextContent[] = [];

  onMount(async () => {
    // Extract unique languages and difficulties
    languages = [...new Set(texts.map((text) => text.language))];
    difficulties = [...new Set(texts.map((text) => text.difficulty))];
    types = [...new Set(texts.map((text) => text.type))];
  });

  $: filteredTexts = texts.filter((text) => {
    const filter = $textFilter;

    // Check if text matches all filter criteria
    return (
      (!filter.language || text.language === filter.language) &&
      (!filter.difficulty || text.difficulty === filter.difficulty) &&
      (filter.includeSpecialChars || !text.hasSpecialChars) &&
      (filter.type === "" || text.type === filter.type)
    );
  });
</script>

<div
  class="text-selector"
  class:light={$theme === "light"}
  class:oled={$theme === "oled"}
>
  <TextFilter
    {languages}
    {difficulties}
    {types}
    onFilterChange={(event) => textFilter.updateFilter(event)}
  />
  <div class="text-options">
    {#each filteredTexts as text}
      <CardButton
        {text}
        selected={$currentText && $currentText.id === text.id}
        on:click={() => currentText.set(text)}
      />
    {/each}
  </div>
</div>

<style>
  .text-selector {
    margin-bottom: 0.9rem;
    border-radius: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 0.9rem;
    max-height: 500px;
    overflow-y: auto;
  }

  .text-selector.light {
    background-color: #ffffff;
    color: #333333;
    border: 1px solid #e0e0e0;
  }

  .text-selector.oled {
    background-color: hsla(0, 0%, 10%, 0.5);
    color: #ffffff;
    border: 1px solid #333333;
  }

  .text-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 0.6rem;
    margin-top: 0.9rem;
  }
</style>
