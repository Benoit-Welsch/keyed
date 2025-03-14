<script lang="ts">
	import { theme } from '$lib/stores/theme';
</script>

<div class="app {$theme}">
	<header>
		<h1>KeyMaster</h1>
		<button on:click={() => theme.toggle()}>
			{$theme === 'light' ? '🌙' : '☀️'}
		</button>
	</header>

	<main>
		<slot />
	</main>

	<footer>
		<p>Practice your typing skills with KeyMaster</p>
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
		padding: 1rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid rgba(128, 128, 128, 0.2);
	}

	main {
		flex: 1;
		padding: 0.9rem;
	}

	footer {
		padding: 1rem;
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

	:global(body) {
		margin: 0;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
</style>
