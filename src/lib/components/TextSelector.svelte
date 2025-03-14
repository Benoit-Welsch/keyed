<script lang="ts">
  import { currentText } from "$lib/stores/typing";
  import { textFilter } from "$lib/stores/textFilter";
  import TextFilter from "./TextFilter.svelte";
  import { onMount } from "svelte";
  import { texts } from "$lib/text";
  import CardButton from "./CardButton.svelte";

  let languages: string[] = [];
  let difficulties: string[] = [];

  onMount(async () => {
    // Extract unique languages and difficulties
    languages = [...new Set(texts.map((text) => text.language))];
    difficulties = [...new Set(texts.map((text) => text.difficulty))];
  });

  $: filteredTexts = texts.filter((text) => {
    const filter = $textFilter;

    if (filter.language && text.language !== filter.language) return false;
    if (filter.difficulty && text.difficulty !== filter.difficulty)
      return false;
    if (!filter.includeSpecialChars && text.hasSpecialChars) return false;

    return true;
  });
</script>

<div class="text-selector">
  <TextFilter
    {languages}
    {difficulties}
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
    margin-bottom: 2rem;
  }

  .text-options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 0.9rem;
    margin-top: 0.9rem;
  }
</style>
