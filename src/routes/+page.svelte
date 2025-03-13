<!-- +page.svelte -->
<script lang="ts">
  import TypingPractice from "$lib/components/TypingPractice.svelte";
  import TextSelector from "$lib/components/TextSelector.svelte";
</script>

<div class="container">
  <TextSelector />
  <TypingPractice />
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
