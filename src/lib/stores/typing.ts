import { texts } from '$lib/text';
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

export interface TextContent {
    id: string;
    title: string;
    content: string;
    hasSpecialChars: boolean;
    language : Language;
    difficulty: Difficulty;
}

export interface TypingStats {
    wpm: number;
    accuracy: number;
    difficulty: Difficulty;
    date: string;
    textId: string;
}

export let currentText = writable<TextContent>(texts[0]);
export let stats = writable<TypingStats[]>([]);
