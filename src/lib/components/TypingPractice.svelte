<!-- TypingPractice.svelte -->
<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import { currentText } from '$lib/stores/typing';
    import { onDestroy } from 'svelte';
    import { browser } from '$app/environment';
    import { stats } from '$lib/stores/stats';

    let input = '';
    let currentIndex = 0;
    let mistakes = 0;
    let isFinished = false;
    let startTime: number | null = null;
    let elapsedTime = 0;
    let timer: number;
    let currentWPM = 0;
    let currentCPM = 0; // new variable for characters per minute

    $: accuracy = currentIndex === 0 ? 100 : ((currentIndex - mistakes) / currentIndex) * 100;
    $: progress = (currentIndex / $currentText.content.length) * 100;
    
    $: {
        $currentText;  // Track changes to currentText
        reset();
    }

    function updateTimer() {
        if (startTime && !isFinished && browser) {
            elapsedTime = Date.now() - startTime;
            currentWPM = calculateWPM();
            currentCPM = calculateCPM(); // update CPM every frame
            timer = window.requestAnimationFrame(updateTimer);
        }
    }
    
    function calculateWPM() {
        if (!startTime || currentIndex === 0) return 0;
        const minutes = elapsedTime / 1000 / 60; // convert ms to minutes
        const words = currentIndex / 5; // standard: 5 characters = 1 word
        return Math.round(words / minutes);
    }

    function calculateCPM() { // new function for CPM
        if (!startTime || currentIndex === 0) return 0;
        const minutes = elapsedTime / 1000 / 60;
        return Math.round(currentIndex / minutes);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (isFinished) return;
        
        if (!startTime) {
            startTime = Date.now();
            updateTimer();
        }

        // Handle backspace
        if (event.key === 'Backspace') {
            if (currentIndex > 0) {
                currentIndex--;
                input = input.slice(0, -1);
            }
            return;
        }

        // Ignore special keys
        if (event.key.length !== 1) return;
        
        // Prevent default to handle the input manually
        event.preventDefault();

        const expectedChar = $currentText.content[currentIndex];
        const typedChar = event.key;

        if (typedChar === expectedChar) {
            input += typedChar;
            currentIndex++;
        } else {
            input += typedChar;
            currentIndex++;
            mistakes++;
        }

        if (currentIndex === $currentText.content.length) {
            isFinished = true;
            if (browser) {
                window.cancelAnimationFrame(timer);
            }
            // Update stats: store each attempt in an array per key.
            stats.update(current => {
                const key = $currentText.id || $currentText.content;
                const prevAttempts = current[key]?.attempts || [];
                const newAttempt = {
                    wpm: currentWPM,
                    cpm: currentCPM,
                    accuracy,
                    elapsedTime,
                    timestamp: Date.now()
                };
                return {
                    ...current,
                    [key]: {
                        // Preserve other properties if needed.
                        ...(current[key] || {}),
                        attempts: [...prevAttempts, newAttempt]
                    }
                };
            });
        }
    }

    function reset() {
        input = '';
        currentIndex = 0;
        mistakes = 0;
        isFinished = false;
        startTime = null;
        elapsedTime = 0;
        currentWPM = 0;
        currentCPM = 0; // reset the CPM counter
        progress = 0;

        if (browser) {
            window.cancelAnimationFrame(timer);
        }
    }

    onDestroy(() => {
        if (browser && timer) {
            window.cancelAnimationFrame(timer);
        }
    });
</script>

<div class="typing-practice {$theme}" class:finished={isFinished}>
    <div class="stats">
        <div class="stat wpm">WPM: {currentWPM}</div>
        <div class="stat cpm">CPM: {currentCPM}</div> <!-- new stat for CPM -->
        <div class="stat time">Time: {(elapsedTime / 1000).toFixed(1)}s</div>
        <div class="stat accuracy">Accuracy: {accuracy.toFixed(1)}%</div>
        <div class="stat progress">Progress: {Math.round(progress)}%</div>
        <div class="progress-bar">
            <div class="progress" style="width: {progress}%"></div>
        </div>
    </div>

    <div class="text-display">
        {#each $currentText.content.split('') as char, i}
            <span 
                class:correct={i < currentIndex && input[i] === char}
                class:incorrect={i < currentIndex && input[i] !== char}
                class:current={i === currentIndex}
            >
                {char}
            </span>
        {/each}
    </div>

    <input
        type="text"
        value={input}
        on:keydown={handleKeydown}
        disabled={isFinished}
        placeholder="Start typing..."
        class="typing-input"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
    />

    <div class="controls">
        <button on:click={reset}>Reset</button>
        {#if isFinished}
            <div class="completion-message">
                Great job! You completed the text with {accuracy.toFixed(1)}% accuracy at {currentWPM} WPM in {(elapsedTime / 1000).toFixed(1)} seconds.
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