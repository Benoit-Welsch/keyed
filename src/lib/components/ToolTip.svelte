<script lang="ts">
  import CardButton from "./CardButton.svelte";

  let tooltipVisible = false;
  let tooltipRef: HTMLDivElement | null = null;
  let containerRef: HTMLDivElement | null = null;
  let styleLeft = "50%";
  let styleTop = "-9999px";

  // Update tooltip position relative to container
  function updatePosition() {
    if (!tooltipRef || !containerRef) return;
    const tooltipRect = tooltipRef.getBoundingClientRect();
    const containerRect = containerRef.getBoundingClientRect();

    // Calculate centered position relative to container
    let left = containerRect.width / 2 - tooltipRect.width / 2;
    let top = -tooltipRect.height - 5; // default is above container

    // Check if the tooltip is off screen at left edge
    if (containerRect.left + left < 5) {
      left = 5 - containerRect.left;
    }
    // Check right edge
    if (containerRect.left + left + tooltipRect.width > window.innerWidth - 5) {
      left = window.innerWidth - containerRect.left - tooltipRect.width - 5;
    }
    // If tooltip at top goes off screen, show it below the icon
    if (containerRect.top + top < 5) {
      top = containerRect.height + 5;
    }

    styleLeft = `${left}px`;
    styleTop = `${top}px`;
  }

  function showTooltip() {
    tooltipVisible = true;
    // Allow tooltip to render before calculating position
    requestAnimationFrame(updatePosition);
  }

  function hideTooltip() {
    tooltipVisible = false;
  }
</script>

<div class="tooltip-container" bind:this={containerRef}>
  <div
    class="icon"
    role="button"
    tabindex="0"
    on:mouseenter={showTooltip}
    on:mouseleave={hideTooltip}
  >
    i
  </div>
  {#if tooltipVisible}
    <div
      class="tooltip-box"
      bind:this={tooltipRef}
      style="left: {styleLeft}; top: {styleTop};"
    >
      <slot>Here is some useful description that informs the user.</slot>
    </div>
  {/if}
</div>

<style>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }
  .icon {
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 50%;
    width: 0.8rem;
    height: 0.8rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #333;
    background-color: #f0f0f0;
    user-select: none;
    filter: brightness(0.9);
  }
  .tooltip-box {
    position: absolute;
    z-index: 10;
    background-color: #333;
    color: #fff;
    padding: 0.3rem 0.6rem;
    border-radius: 0.6rem;
    font-size: 0.875rem;
    max-width: 220px;
    text-align: center;
    pointer-events: none;
    white-space: normal;
  }
</style>
