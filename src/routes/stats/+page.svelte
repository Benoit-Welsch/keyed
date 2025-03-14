<script lang="ts">
  import { stats } from "$lib/stores/stats";
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { theme } from "$lib/stores/theme";

  let chartEl: HTMLDivElement;
  let showRawStats = false;

  onMount(() => {
    const chart = echarts.init(chartEl);
    // Use the Stats interface: $stats is an object where key is text and value is { attempts: [...] }
    const series = Object.entries($stats).map(([text, { attempts }]) => {
      const sortedAttempts = attempts
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp);
      return {
        name: text,
        type: "line",
        data: sortedAttempts.map((attempt, idx) => [idx + 1, attempt.wpm]),
      };
    });
    const option = {
      title: { text: "WPM Evolution per Text" },
      tooltip: { trigger: "axis" },
      legend: { data: series.map((s) => s.name) },
      xAxis: { type: "value", name: "Attempt", interval: 1 },
      yAxis: { type: "value", name: "WPM", scale: true },
      series: series,
    };
    chart.setOption(option);
    window.addEventListener("resize", () => chart.resize());
    return () => chart.dispose();
  });
</script>

<main>
  <h1>Stats</h1>
  <div bind:this={chartEl} style="width: 100%; height: 400px;"></div>
  <button on:click={() => (showRawStats = !showRawStats)} class={$theme}>
    {showRawStats ? "Hide" : "Show"} Raw Stats
  </button>
  {#if showRawStats}
    <div class="accordion-content {$theme}">
      <pre>{JSON.stringify($stats, null, 2)}</pre>
    </div>
  {/if}
</main>

<style>
  button {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #e0e0e0;
  }

  button:active {
    background-color: #d0d0d0;
  }

  button.oled {
    background-color: #1a1a1a;
    border: 1px solid #333;
    color: #ffffff;
  }

  button.oled:hover {
    background-color: #333;
  }

  button.oled:active {
    background-color: #444;
  }

  .accordion-content {
    margin-top: 16px;
    border-radius: 4px;
  }
</style>
