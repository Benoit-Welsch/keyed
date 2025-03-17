<script lang="ts">
  import { currentText } from "$lib/stores/typing";
  import { textFilter } from "$lib/stores/textFilter";
  import TextFilter from "./TextFilter.svelte";
  import { onMount } from "svelte";
  import { texts } from "$lib/text";
  import CardButton from "./CardButton.svelte";

  let languages: string[] = [];
  let difficulties: string[] = [];
  let types: string[] = [];

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

<div class="text-selector">
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
        selected={$currentText.id === text.id}
        on:click={() => currentText.set(text)}
      />
    {/each}
  </div>
</div>

<style>
  .text-selector {
    margin-bottom: 0.9rem;
  }

  .text-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    gap: 0.9rem;
    margin-top: 0.9rem;
  }
</style>
