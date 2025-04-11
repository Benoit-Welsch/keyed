<script lang="ts">
  import { theme } from "$lib/stores/theme";

  export let type:
    | "language"
    | "type"
    | "special"
    | "easy"
    | "medium"
    | "hard"
    | undefined = undefined;
  export let value: string;
</script>

<span class="badge {$theme} {type}">
  {value}
</span>

<style>
  .badge {
    padding: 0.15rem 0.3rem;
    border-radius: 4px;
    font-size: 0.8rem;
    text-transform: capitalize;
    color: white;
  }

  .badge.oled {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .badge.light {
    background-color: hsla(0, 0%, 10%, 0.5);
  }

  /* Language badge */
  .badge.language {
    background-color: #8e2092;
  }

  /* Type badge */
  .badge.type {
    background-color: #29a796;
  }

  /* Special badge */
  .badge.special {
    background-color: #2196f3;
  }

  /* Difficulty badges */
  .badge.easy {
    background-color: #4caf50;
  }

  .badge.medium {
    background-color: #ff9800;
  }

  .badge.hard {
    background-color: #f44336;
  }

  .badge.char {
    background-color: #536974;
    margin-left: auto;
  }
</style>
