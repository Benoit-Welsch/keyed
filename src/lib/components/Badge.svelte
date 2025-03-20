<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { Language, Difficulty, Type } from "$lib/text";

  export let type:
    | "language"
    | "type"
    | "special"
    | "easy"
    | "medium"
    | "hard" = "easy";
  export let value: string;
</script>

<span class="badge {$theme} {type}">
  {value}
</span>

<style>
  .badge {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    text-transform: capitalize;
    color: white;
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
