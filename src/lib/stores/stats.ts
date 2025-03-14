import { writable } from "svelte/store";

const LOCAL_KEY = "typingStats";

interface Stats { [key: string]: { attempts: [{ wpm: number, accuracy: number, elapsedTime: number, timestamp: number }] } }

function loadStats() {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : {} as Stats;
  }
  return {};
}

function createStatsStore() {
  const stats = writable<Stats>(loadStats());
  stats.subscribe((current) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(current));
    }
  });
  return stats;
}

export const stats = createStatsStore();

