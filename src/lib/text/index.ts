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

export enum Type {
  Normal = 'normal',
  Code = 'code',
  Special = 'special',
  Lorem = 'lorem',
}

export interface TextContent {
  id: number | string;
  title: string;
  content: string;
  hasSpecialChars: boolean;
  language: string | Language;
  difficulty: string | Difficulty;
  type: string | Type;
}

const fr = [
  {
    id: 'french-1',
    title: 'French Practice',
    content: 'La vie est belle. Apprenons à taper en français avec des accents.',
    hasSpecialChars: false,
    language: Language.French,
    difficulty: Difficulty.Easy,
    type: Type.Normal,
  },
] satisfies TextContent[];

const en = [
  {
    id: 'basic-1',
    title: 'Basic Practice',
    content: 'The quick brown fox jumps over the lazy dog. Simple words help build typing speed.',
    hasSpecialChars: false,
    language: Language.English,
    difficulty: Difficulty.Easy,
    type: Type.Normal,
  },
  {
    id: 'lorem-1',
    title: 'Lorem Practice',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    hasSpecialChars: false,
    language: Language.English,
    difficulty: Difficulty.Easy,
    type: Type.Lorem,
  },
  {
    id: 'long-1',
    title: 'Extended English Practice I',
    content: 'This is a long English text meant for advanced practice. The text contains multiple sentences to help improve typing skills. It explains various aspects of programming, including variables, functions, and algorithms, with an emphasis on clarity and structure. Moreover, it elaborates on the differences between imperative and declarative programming paradigms, making it an ideal candidate for long-form typing exercises.',
    hasSpecialChars: false,
    language: Language.English,
    difficulty: Difficulty.Medium,
    type: Type.Normal,
  },
  {
    id: 'long-2',
    title: 'Extended English Practice II',
    content: 'Here is another extended text in English, designed to challenge and develop typing endurance. The passage describes the evolution of technology, highlighting major milestones in computer science history. It also discusses the impact of digital transformation on everyday life, inviting readers to reflect on the convergence of technology, art, and society. This comprehensive text offers both educational content and abundant material for practicing speed and accuracy.',
    hasSpecialChars: false,
    language: Language.English,
    difficulty: Difficulty.Medium,
    type: Type.Normal,
  },
  {
    id: 'special-1',
    title: 'Special Characters',
    content: 'Hello, World! How are you? Let\'s practice with @#$%^&*()_+ symbols!',
    hasSpecialChars: true,
    language: Language.English,
    difficulty: Difficulty.Medium,
    type: Type.Special,
  },
  {
    id: 'code-1',
    title: 'Code Practice',
    content: 'function hello() { return "Hello, World!"; } // Basic JavaScript function',
    hasSpecialChars: true,
    language: Language.English,
    difficulty: Difficulty.Hard,
    type: Type.Code,
  },
] satisfies TextContent[];

export const texts = [...en, ...fr] as TextContent[];