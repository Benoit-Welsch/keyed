<script lang="ts">
  import TypingPractice from "$lib/components/TypingPractice.svelte";
  import TextSelector from "$lib/components/TextSelector.svelte";
  import type { PageProps } from "./$types";
    import { currentText } from "$lib/stores/typing";

  const { data }: PageProps = $props();

  currentText.update((text) => {
    if (!text) {
      return data.texts[0];
    }
    return text;
  });

</script>
{#if !data.texts}
  <p>Loading...</p>
{:else}
  <div class="container">
    <TextSelector texts={data.texts}/>
    <TypingPractice />
  </div>
{/if}

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
