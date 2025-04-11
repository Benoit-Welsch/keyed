<script lang="ts">
  let { progress }: { progress: number } = $props();
</script>

<div class="progress-bar">
  <div class="progress" style="width: {progress}%"></div>
</div>

<style>
  .progress-bar {
    width: 100%;
    height: 0.5rem;
    background-color: rgba(128, 128, 128, 0.1);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .progress-bar .progress {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.2s ease;
  }
</style>
