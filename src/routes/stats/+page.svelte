<script lang="ts">
  import { stats } from "$lib/stores/stats";
  import { onMount } from "svelte";
  import * as echarts from "echarts";

  let chartEl: HTMLDivElement;

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
      yAxis: { type: "value", name: "WPM" },
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
  <pre>{JSON.stringify($stats, null, 2)}</pre>
</main>
