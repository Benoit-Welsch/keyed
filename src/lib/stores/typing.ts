import type { TextContent } from '$lib/text';
import { writable } from 'svelte/store';

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export enum Language {
  English = 'english',
  French = 'french',
  Spanish = 'spanish',
  German = 'german',
  Italian = 'italian'
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  difficulty: Difficulty;
  date: string;
  textId: string;
}

export let currentText = writable<TextContent>();
export let stats = writable<TypingStats[]>([]);
