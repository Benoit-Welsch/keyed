import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import auto from '@sveltejs/adapter-auto';
import cloudFlare from '@sveltejs/adapter-cloudflare';


const adapter = false ? auto() : cloudFlare({
	routes: {
		include: ['/*'],
		exclude: ['<all>']
	},
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter
	}
};

export default config;
