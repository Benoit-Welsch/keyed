<!-- CardButton.svelte -->
<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import type { TextContent } from "$lib/text";

  export let text: TextContent;
  export let selected: boolean = false;
  export let size: "medium" | "large" = "medium";
</script>

<button
  class="card-button {$theme}"
  class:selected
  class:medium={size === "medium"}
  on:click
>
  <h2 class="title">
    {text.title}
    <span class="badge char">{text.content.length}</span>
  </h2>
  <div class="badges">
    <span class="badge language">{text.language}</span>
    <span class="badge difficulty {text.difficulty}">{text.difficulty}</span>
    <span class="badge type">{text.type}</span>
    {#if text.hasSpecialChars}
      <span class="badge special">Special Chars</span>
    {/if}
  </div>
</button>

<style>
  .card-button {
    flex: 1;
    min-width: 305px;
    padding: 0.8rem;
    border-radius: 0.5rem;
    border: 2px solid rgba(128, 128, 128, 0.2);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    align-items: flex-start;
    transition:
      transform 0.2s,
      border-color 0.2s;
  }

  .card-button.light {
    background: none;
    color: #000000;
  }

  .card-button.oled {
    background-color: hsla(0, 0%, 10%, 0.5);
    color: #ffffff;
    border-color: #333;
  }

  .card-button:hover {
    transform: translateY(-2px);
    border-color: #4caf50;
  }

  .card-button.selected {
    border-color: #4caf50;
  }

  .card-button.light.selected {
    background-color: rgba(76, 175, 80, 0.1);
  }

  .card-button.oled.selected {
    background-color: rgba(76, 175, 80, 0.2);
  }

  .card-button.medium {
    min-width: 250px;
    padding: 0.6rem;
  }

  .card-button.medium .title {
    font-size: 1rem;
  }

  .card-button.medium .badge {
    font-size: 0.75rem;
    padding: 0.15rem 0.3em;
  }

  .title {
    font-weight: bold;
    margin: 0;
    display: flex;
    width: 100%;
  }

  .badges {
    display: flex;
    gap: 0.3rem;
    width: 100%;
    flex-wrap: wrap;
  }

  .badge {
    padding: 0.2rem 0.4em;
    border-radius: 0.25rem;
    font-size: 0.85rem;
    text-transform: capitalize;
    color: white;
  }

  .badge.difficulty.easy {
    background-color: #4caf50;
  }

  .badge.difficulty.medium {
    background-color: #ff9800;
  }

  .badge.difficulty.hard {
    background-color: #f44336;
  }

  .badge.special {
    background-color: #2196f3;
  }

  .badge.language {
    background-color: #8e2092;
  }

  .badge.type {
    background-color: #29a796;
  }

  .badge.char {
    background-color: #536974;
    margin-left: auto;
  }
</style>
