import { writable } from "svelte/store";

const LOCAL_KEY = "typingStats";

function loadStats() {
	if (typeof localStorage !== "undefined") {
		const stored = localStorage.getItem(LOCAL_KEY);
		return stored ? JSON.parse(stored) : {};
	}
	return {};
}

function createStatsStore() {
	const stats = writable(loadStats());
	stats.subscribe((current) => {
		if (typeof localStorage !== "undefined") {
			localStorage.setItem(LOCAL_KEY, JSON.stringify(current));
		}
	});
	return stats;
}

export const stats = createStatsStore();

