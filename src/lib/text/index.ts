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
  language: Language;
  difficulty: Difficulty;
}

const fr = [
  {
    id: 'french-1',
    title: 'French Practice',
    content: 'La vie est belle. Apprenons à taper en français avec des accents.',
    hasSpecialChars: false,
    language: Language.French,
    difficulty: Difficulty.Easy
  },
] satisfies TextContent[];

const en = [
  {
    id: 'basic-1',
    title: 'Basic Practice',
    content: 'The quick brown fox jumps over the lazy dog. Simple words help build typing speed.',
    hasSpecialChars: false,
    language: Language.English,
    difficulty: Difficulty.Easy
  },
  {
    id: 'lorem-1',
    title: 'Lorem Practice',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    hasSpecialChars: false,
    language: Language.English,
    difficulty: Difficulty.Easy
  },
  {
    id: 'special-1',
    title: 'Special Characters',
    content: 'Hello, World! How are you? Let\'s practice with @#$%^&*()_+ symbols!',
    hasSpecialChars: true,
    language: Language.English,
    difficulty: Difficulty.Medium
  },
  {
    id: 'code-1',
    title: 'Code Practice',
    content: 'function hello() { return "Hello, World!"; } // Basic JavaScript function',
    hasSpecialChars: true,
    language: Language.English,
    difficulty: Difficulty.Hard
  },
] satisfies TextContent[];

export const texts = [...en, ...fr] as TextContent[];