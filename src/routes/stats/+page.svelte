<script lang="ts">
  import { stats } from "/workspaces/key-master/src/lib/stores/stats";
  import CustomSelect from "/workspaces/key-master/src/lib/components/CustomSelect.svelte";
  import { texts } from "$lib/text";

  let availableTexts: string[] = [];
  let filterText = "";

  function handleFilterChange(event) {
  }

  // let filteredStats = [];
  // let averageValue = $stats.length
  //   ? $stats.reduce((acc, stat) => acc + (stat.value || 0), 0) / $stats.length
  //   : 0;

  // stats.subscribe((value) => {
  //   texts.filter((text) => {
  //     if (value[text.id]) {
  //       availableTexts.push(text.title);
  //     }
  //   });

  //   averageValue = filteredStats.length
  //     ? filteredStats.reduce((acc, stat) => acc + (stat.value || 0), 0) / filteredStats.length
  //     : 0;
  // });

  // $: filteredStats = $stats.filter(stat => stat.text === filterText);
  // $: averageValue = filteredStats.length
  // 	? filteredStats.reduce((acc, stat) => acc + (stat.value || 0), 0) / filteredStats.length
  // 	: 0;

  // function handleFilterChange(event) {
  // 	// "All" will yield an empty string per CustomSelect behavior.
  // 	filterText = event.detail.value;
  // }
</script>

<main>
  <h1>Stats</h1>
  <!-- Replace the text input with the CustomSelect -->
  <!-- <CustomSelect
    options={availableTexts}
    value={filterText}
    label="Select Text"
    on:change={handleFilterChange}
  /> -->
  <!-- <pre>{JSON.stringify(filteredStats, null, 2)}</pre> -->
  <pre>{JSON.stringify($stats, null, 2)}</pre>
</main>
