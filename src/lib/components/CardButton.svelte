<!-- CardButton.svelte -->
<script lang="ts">
  import type { TextContent } from "$lib/stores/typing";
  import { theme } from "$lib/stores/theme";

  export let text: TextContent;
  export let selected: boolean = false;
</script>

<button class="card-button {$theme}" class:selected on:click>
  <h2 class="title">
    {text.title}
    <span class="badge char">{text.content.length}</span>
  </h2>
  <div class="badges">
    <span class="badge difficulty {text.difficulty}">{text.difficulty}</span>
    {#if text.hasSpecialChars}
      <span class="badge special">Special Chars</span>
    {/if}
    <span class="badge language">{text.language}</span>
    <span class="badge type">{text.type}</span>
  </div>
</button>

<style>
  .card-button {
    flex: 1;
    min-width: 305px;
    padding: 1rem;
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
    background: rgba(255, 255, 255, 0.05);
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
    font-size: 0.8rem;
    color: white;
    text-transform: capitalize;
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
    background-color: #9c27b0;
  }

  .badge.type {
    background-color: #2aceb8;
  }

  .badge.char {
    background-color: #607d8b;
    margin-left: auto;
  }
</style>
