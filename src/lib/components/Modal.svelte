<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { theme } from "$lib/stores/theme"; // added support for theme
  export let title: string = "";

  const dispatch = createEventDispatcher();
  function closeModal() {
    dispatch("close");
  }
</script>

<div class="modal-overlay {$theme}" on:click={closeModal}>
  <div class="modal" on:click|stopPropagation>
    <header>
      <h2>{title}</h2>
      <button class="close" on:click={closeModal}>X</button>
    </header>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</div>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* default background is overriden by theme rules below */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal {
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    max-width: 800px;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    
  }
  .oled .modal {
    background: #1a1a1a;
    color: #ffffff;
    border: 1px solid #333;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  .close {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  /* Add CSS to style modal based on theme */
</style>
