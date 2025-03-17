<script lang="ts">
  import "../app.css";
  import { theme } from "$lib/stores/theme";
</script>

<div class="app {$theme}">
  <header>
    <nav>
      <h1><a href="/">KeYed</a></h1>
      <a href="/stats">Stats</a>
    </nav>
    <button on:click={() => theme.toggle()}>
      {$theme === "light" ? "🌙" : "☀️"}
    </button>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>Practice your typing skills</p>
  </footer>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .light {
    background-color: #ffffff;
    color: #000000;
  }

  .oled {
    background-color: #000000;
    color: #ffffff;
  }

  header {
    padding: 0.3rem 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
    filter: brightness(0.9);
  }

  a:hover {
    text-decoration: underline;
    filter: brightness(1);
  }

  main {
    flex: 1;
    padding: 0.9rem;
  }

  footer {
    padding: 0.3rem;
    text-align: center;
    border-top: 1px solid rgba(128, 128, 128, 0.2);
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    background: none;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
</style>
