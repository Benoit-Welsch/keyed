<!-- TypingPractice.svelte -->
<script lang="ts">
  import { theme } from "$lib/stores/theme";
  import { currentText } from "$lib/stores/typing";
  import { onDestroy, onMount } from "svelte";
  import { browser } from "$app/environment";
  import { stats } from "$lib/stores/stats";
  import { isMac, isMobile } from "$lib/stores/device";

  let input = "";
  let currentIndex = 0;
  let mistakes = 0;
  let correctChars = 0;
  let correctWords = 0;
  let currentWordStart = 0;
  let currentWordMistakes = 0;  // Track mistakes in current word
  let isFinished = false;
  let startTime: number | null = null;
  let elapsedTime = 0;
  let timer: number;
  let currentWPM = 0;
  let currentCPM = 0;
  let inputElement: HTMLInputElement;
  let typedChars: string[] = [];  // Track typed characters

  $: accuracy =
    currentIndex === 0 ? 100 : ((currentIndex - mistakes) / currentIndex) * 100;
  $: progress = (currentIndex / $currentText.content.length) * 100;

  $: {
    $currentText;
    reset();
  }

  onMount(() => {
    const handleWindowKeydown = (event: KeyboardEvent) => {
      if ((event.key.toLowerCase() === "r" && event.altKey) || event.key === "®") {
        event.preventDefault();
        reset();
      }
    };

    window.addEventListener("keydown", handleWindowKeydown);
    inputElement?.focus();

    return () => {
      window.removeEventListener("keydown", handleWindowKeydown);
    };
  });

  function updateTimer() {
    if (startTime && !isFinished && browser) {
      elapsedTime = Date.now() - startTime;
      currentWPM = calculateWPM();
      currentCPM = calculateCPM(); 
      timer = window.requestAnimationFrame(updateTimer);
    }
  }

  function calculateWPM() {
    if (!startTime || correctWords === 0) return 0;
    const minutes = elapsedTime / 1000 / 60;
    return Math.round(correctWords / minutes);
  }

  function calculateCPM() {
    if (!startTime || correctChars === 0) return 0;
    const minutes = elapsedTime / 1000 / 60;
    return Math.round(correctChars / minutes);
  }

  function handleKeydown(event: KeyboardEvent) {
    if (
      (event.key.toLowerCase() === "r" && event.altKey) ||
      event.key === "®"
    ) {
      event.preventDefault();
      reset();
      return;
    }

    if (isFinished) return;

    if (!startTime) {
      startTime = Date.now();
      updateTimer();
    }

    // Handle backspace
    if (event.key === "Backspace") {
      if (currentIndex > 0) {
        // Check if we're backspacing into the previous word
        if (currentIndex > 0 && $currentText.content[currentIndex - 1] === ' ') {
          correctWords = Math.max(0, correctWords - 1);
          // Find the start of the previous word
          const textUpToCurrent = $currentText.content.slice(0, currentIndex - 1);
          currentWordStart = textUpToCurrent.lastIndexOf(' ') + 1;
          currentWordMistakes = 0;  // Reset word mistakes
        }
        currentIndex--;
        typedChars[currentIndex] = '';  // Remove the last typed character
      }
      return;
    }

    // Ignore special keys that aren't regular characters
    if (event.key.length !== 1) return;

    const expectedChar = $currentText.content[currentIndex];

    // Check if this will be the last character
    const isLastChar = currentIndex === $currentText.content.length - 1;

    if (event.key === expectedChar) {
      correctChars++;
      typedChars[currentIndex] = event.key;  // Store the typed character

      // Check if we just typed a space or if this is the last character
      if (expectedChar === ' ' || isLastChar) {
        // If we had no mistakes in this word, increment the word count
        if (currentWordMistakes === 0) {
          correctWords++;
        }
        currentWordStart = currentIndex + 1;
        currentWordMistakes = 0;  // Reset for next word
      }

      currentIndex++;

      // Handle completion after successful last character
      if (currentIndex === $currentText.content.length) {
        isFinished = true;
        if (browser) {
          window.cancelAnimationFrame(timer);
        }
        // Calculate final stats based on total time and counts
        const finalMinutes = elapsedTime / 1000 / 60;
        const finalWPM = Math.round(correctWords / finalMinutes);
        const finalCPM = Math.round(correctChars / finalMinutes);

        // Update stats: store each attempt in an array per key.
        stats.update((current) => {
          const key = $currentText.id || $currentText.content;
          const prevAttempts = current[key]?.attempts || [];
          const newAttempt = {
            wpm: finalWPM,
            cpm: finalCPM,
            accuracy,
            elapsedTime,
            timestamp: Date.now(),
          };
          return {
            ...current,
            [key]: {
              ...(current[key] || {}),
              attempts: [...prevAttempts, newAttempt],
            },
          };
        });
      }
    } else {
      mistakes++;
      currentWordMistakes++;  // Track mistake in current word
      typedChars[currentIndex] = event.key;  // Store the wrong character
      currentIndex++;
    }
  }

  function reset() {
    input = "";
    currentIndex = 0;
    mistakes = 0;
    correctChars = 0;
    correctWords = 0;
    currentWordStart = 0;
    currentWordMistakes = 0;
    typedChars = [];  // Reset typed characters
    isFinished = false;
    startTime = null;
    elapsedTime = 0;
    currentWPM = 0;
    currentCPM = 0;
    progress = 0;

    if (browser) {
      window.cancelAnimationFrame(timer);
    }

    // Focus the input after reset
    setTimeout(() => {
      inputElement?.focus();
    }, 0);
  }

  onDestroy(() => {
    if (browser && timer) {
      window.cancelAnimationFrame(timer);
    }
  });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="typing-practice {$theme}" class:finished={isFinished}>
  <div class="stats">
    <div class="stat wpm">WPM: {currentWPM}</div>
    <div class="stat cpm">CPM: {currentCPM}</div>
    <!-- new stat for CPM -->
    <div class="stat time">Time: {(elapsedTime / 1000).toFixed(1)}s</div>
    <div class="stat accuracy">Accuracy: {accuracy.toFixed(1)}%</div>
    <div class="stat progress">Progress: {Math.round(progress)}%</div>
    <div class="progress-bar">
      <div class="progress" style="width: {progress}%"></div>
    </div>
  </div>

  <div class="text-display">
    {#each $currentText.content.split("") as char, i}
      <span
        class:correct={(i < currentIndex || (isFinished && i === currentIndex - 1)) && typedChars[i] === char}
        class:incorrect={(i < currentIndex || (isFinished && i === currentIndex - 1)) && typedChars[i] !== char}
        class:current={i === currentIndex && !isFinished}
      >
        {char}
      </span>
    {/each}
  </div>

  <input
    bind:this={inputElement}
    type="text"
    bind:value={input}
    disabled={isFinished}
    placeholder="Start typing..."
    class="typing-input"
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"
    on:keydown={handleKeydown}
  />

  <div class="controls">
    <button on:click={reset}>
      Reset
      {#if isMac}
        <span class="shortcut">⌥R</span>
      {:else if !isMobile}
        <span class="shortcut">Alt+R</span>
      {/if}
    </button>
    {#if isFinished}
      <div class="completion-message">
        Great job! You completed the text with {accuracy.toFixed(1)}% accuracy
        at {currentWPM} WPM in {(elapsedTime / 1000).toFixed(1)} seconds.
      </div>
    {/if}
  </div>
</div>

<style>
  .typing-practice {
    padding: 0.3rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .text-selector {
    margin-bottom: 2rem;
  }

  .text-options {
    display: flex;
    gap: 0.9rem;
    flex-wrap: wrap;
  }

  .typing-practice.light {
    background-color: #ffffff;
    color: #000000;
  }

  .typing-practice.oled {
    background-color: #000000;
    color: #ffffff;
  }

  .stats {
    display: flex;
    gap: 0.9rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .stat {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: rgba(128, 128, 128, 0.1);
  }

  .text-display {
    font-family: monospace;
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 2rem 0;
    white-space: pre-wrap;
  }

  .correct {
    color: #4caf50;
    background-color: rgba(76, 175, 80, 0.1);
  }

  .incorrect {
    color: #f44336;
    background-color: rgba(244, 67, 54, 0.1);
    text-decoration: underline wavy;
  }

  .current {
    background-color: rgba(128, 128, 128, 0.2);
    border-left: 2px solid #666;
  }

  .typing-input {
    width: calc(100% - 2rem);
    padding: 1rem;
    font-family: monospace;
    font-size: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .light .typing-input {
    background-color: #ffffff;
    color: #000000;
  }

  .oled .typing-input {
    background-color: #1a1a1a;
    color: #ffffff;
    border-color: #333;
  }

  .controls {
    display: flex;
    gap: 0.9rem;
  }

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .light button {
    background-color: #f0f0f0;
    color: #000000;
  }

  .oled button {
    background-color: #333;
    color: #ffffff;
  }

  .progress-bar {
    width: 100%;
    height: 0.5rem;
    background-color: rgba(128, 128, 128, 0.1);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .progress-bar .progress {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.2s ease;
  }

  .finished .typing-input {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .time-up {
    background-color: #ff9800;
    color: white;
  }

  .challenge-ended {
    border-color: #ff9800;
  }

  .completion-message {
    color: #4caf50;
    font-weight: 500;
    margin-left: 1rem;
  }

  .shortcut {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-left: 0.5rem;
  }

  .stats > .wpm {
    width: 80px;
  }

  .stats > .time {
    width: 90px;
  }

  .stats > .accuracy {
    width: 135px;
  }

  .stats > .progress {
    width: 115px;
  }

  .stats > .cpm {
    width: 80px;
  }
</style>
