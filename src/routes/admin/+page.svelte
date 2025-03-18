<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import type { TextContent } from '$lib/text';
    import { Language, Difficulty, Type } from '$lib/text';
    import { theme } from '$lib/stores/theme';
    import Badge from '$lib/components/Badge.svelte';
    import TextFilter from '$lib/components/TextFilter.svelte';
    import { textFilter } from '$lib/stores/textFilter';
    
    // Redirect to login if not authenticated
    if ($page.data.user?.role !== 'admin') {
        goto('/login');
    }

    export let data: {
        user: { username: string; role: string };
        texts: TextContent[];
        userCount: number;
    };

    let showAddForm = false;
    let editingText: TextContent | null = null;
    let deleteConfirmationId: string | number | null = null;
    let formData = {
        title: '',
        content: '',
        language: Language.English,
        difficulty: Difficulty.Easy,
        type: Type.Normal,
        hasSpecialChars: false
    };

    // Extract unique values for filters
    $: languages = [...new Set(data.texts.map((text) => text.language))];
    $: difficulties = [...new Set(data.texts.map((text) => text.difficulty))];
    $: types = [...new Set(data.texts.map((text) => text.type))];

    // Filter texts based on filter criteria
    $: filteredTexts = data.texts.filter((text) => {
        const filter = $textFilter;
        return (
            (!filter.language || text.language === filter.language) &&
            (!filter.difficulty || text.difficulty === filter.difficulty) &&
            (filter.includeSpecialChars || !text.hasSpecialChars) &&
            (filter.type === "" || text.type === filter.type)
        );
    });

    function resetForm() {
        formData = {
            title: '',
            content: '',
            language: Language.English,
            difficulty: Difficulty.Easy,
            type: Type.Normal,
            hasSpecialChars: false
        };
        editingText = null;
        showAddForm = false;
        deleteConfirmationId = null;
    }

    function editText(text: TextContent) {
        editingText = text;
        formData = {
            title: text.title,
            content: text.content,
            language: text.language as Language,
            difficulty: text.difficulty as Difficulty,
            type: text.type as Type,
            hasSpecialChars: text.hasSpecialChars
        };
        showAddForm = true;
    }

    function confirmDelete(id: string | number) {
        deleteConfirmationId = id;
    }

    function cancelDelete() {
        deleteConfirmationId = null;
    }

    type BadgeVariant = 'Easy' | 'Medium' | 'Hard' | 'English' | 'French' | 'Spanish' | 'German' | 'Italian' | 'Normal' | 'Code' | 'Special' | 'Lorem' | 'special' | 'char';

    // Helper function to get the correct variant for badges
    function getBadgeVariant(value: string, type: 'language' | 'difficulty' | 'type'): BadgeVariant {
        const variants = {
            language: {
                [Language.English]: 'English' as const,
                [Language.French]: 'French' as const,
                [Language.Spanish]: 'Spanish' as const,
                [Language.German]: 'German' as const,
                [Language.Italian]: 'Italian' as const
            },
            difficulty: {
                [Difficulty.Easy]: 'Easy' as const,
                [Difficulty.Medium]: 'Medium' as const,
                [Difficulty.Hard]: 'Hard' as const
            },
            type: {
                [Type.Normal]: 'Normal' as const,
                [Type.Code]: 'Code' as const,
                [Type.Special]: 'Special' as const,
                [Type.Lorem]: 'Lorem' as const
            }
        };
        return variants[type][value as keyof typeof variants[typeof type]] || value as BadgeVariant;
    }
</script>

<div class="admin-container {$theme}">
    <p>You are logged in as: </p>

    <div class="stats-section">
        <h2>Statistics</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Users</h3>
                <p class="stat-value">{data.userCount}</p>
            </div>
            <div class="stat-card">
                <h3>Total Texts</h3>
                <p class="stat-value">{data.texts.length}</p>
            </div>
        </div>
    </div>

    <div class="text-management">
        <button class="add-button" on:click={() => showAddForm = true}>
            Add New Text
        </button>

        {#if showAddForm}
            <form method="POST" action="?/{editingText ? 'updateText' : 'addText'}" class="text-form">
                {#if editingText}
                    <input type="hidden" name="id" value={editingText.id} />
                {/if}
                
                <div class="form-group">
                    <label for="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        bind:value={formData.title}
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        bind:value={formData.content}
                        required
                    ></textarea>
                </div>

                <div class="form-group">
                    <label for="language">Language</label>
                    <select id="language" name="language" bind:value={formData.language} required>
                        {#each Object.values(Language) as lang}
                            <option value={lang}>{lang}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-group">
                    <label for="difficulty">Difficulty</label>
                    <select id="difficulty" name="difficulty" bind:value={formData.difficulty} required>
                        {#each Object.values(Difficulty) as diff}
                            <option value={diff}>{diff}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-group">
                    <label for="type">Type</label>
                    <select id="type" name="type" bind:value={formData.type} required>
                        {#each Object.values(Type) as t}
                            <option value={t}>{t}</option>
                        {/each}
                    </select>
                </div>

                <div class="form-group checkbox">
                    <label>
                        <input
                            type="checkbox"
                            name="hasSpecialChars"
                            bind:checked={formData.hasSpecialChars}
                        />
                        Has Special Characters
                    </label>
                </div>

                <div class="form-actions">
                    <button type="submit">{editingText ? 'Update' : 'Add'} Text</button>
                    <button type="button" class="cancel" on:click={resetForm}>Cancel</button>
                </div>
            </form>
        {/if}

        <div class="texts-list">
            <TextFilter
                {languages}
                {difficulties}
                {types}
                onFilterChange={(event) => textFilter.updateFilter(event)}
            />
            <div class="text-options">
                {#each filteredTexts as text}
                    <div class="text-card">
                        <div class="text-info">
                            <h4>{text.title}</h4>
                            <p class="text-meta">
                                <Badge type="language" value={text.language} />
                                <Badge 
                                    type={text.difficulty.toLowerCase() as "easy" | "medium" | "hard"} 
                                    value={text.difficulty} 
                                />
                                <Badge type="type" value={text.type} />
                                {#if text.hasSpecialChars}
                                    <Badge type="special" value="Special Chars" />
                                {/if}
                            </p>
                            <p class="text-preview">{text.content.substring(0, 100)}...</p>
                        </div>
                        <div class="text-actions">
                            <button class="edit" on:click={() => editText(text)}>Edit</button>
                            {#if deleteConfirmationId === text.id}
                                <div class="delete-confirmation">
                                    <span>Are you sure?</span>
                                    <form method="POST" action="?/deleteText" style="display: inline;">
                                        <input type="hidden" name="id" value={text.id} />
                                        <button type="submit" class="delete">Yes, Delete</button>
                                        <button type="button" class="cancel" on:click={cancelDelete}>Cancel</button>
                                    </form>
                                </div>
                            {:else}
                                <button class="delete" on:click={() => confirmDelete(text.id)}>Delete</button>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .admin-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .admin-container.light {
        background: #ffffff;
        color: #333333;
    }

    .admin-container.oled {
        background: #000000;
        color: #ffffff;
    }

    h1 {
        color: inherit;
        margin-bottom: 1rem;
    }

    .stats-section {
        margin: 1rem 0;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .light .stats-section {
        background: #ffffff;
        border: 1px solid #e0e0e0;
    }

    .oled .stats-section {
        background: hsla(0, 0%, 10%, 0.5);
        border: 1px solid #333333;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .stat-card {
        padding: 1.5rem;
        border-radius: 0.5rem;
        text-align: center;
        border: 2px solid rgba(128, 128, 128, 0.2);
        transition: transform 0.2s, border-color 0.2s;
    }

    .light .stat-card {
        background: #ffffff;
    }

    .oled .stat-card {
        background: hsla(0, 0%, 10%, 0.5);
        border-color: #333;
    }

    .stat-card:hover {
        transform: translateY(-2px);
        border-color: #4caf50;
    }

    .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: #4caf50;
        margin: 0.5rem 0 0;
    }

    .add-button {
        background: #2196F3;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-bottom: 1.5rem;
        transition: all 0.2s;
        font-weight: 500;
    }

    .add-button:hover {
        background: #1976D2;
        transform: translateY(-2px);
    }

    .text-form {
        padding: 1.5rem;
        border-radius: 0.75rem;
        margin-bottom: 2rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .light .text-form {
        background: #ffffff;
        border: 1px solid #e0e0e0;
    }

    .oled .text-form {
        background: hsla(0, 0%, 10%, 0.5);
        border: 1px solid #333333;
    }

    .form-group {
        margin-bottom: 1.2rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: inherit;
    }

    .form-group input[type="text"],
    .form-group textarea,
    .form-group select {
        width: 100%;
        padding: 0.8rem;
        border-radius: 0.5rem;
        border: 2px solid rgba(128, 128, 128, 0.2);
        transition: border-color 0.2s;
    }

    .light .form-group input[type="text"],
    .light .form-group textarea,
    .light .form-group select {
        background: #ffffff;
        color: #333333;
    }

    .oled .form-group input[type="text"],
    .oled .form-group textarea,
    .oled .form-group select {
        background: hsla(0, 0%, 10%, 0.5);
        color: #ffffff;
        border-color: #333;
    }

    .form-group input[type="text"]:focus,
    .form-group textarea:focus,
    .form-group select:focus {
        border-color: #2196F3;
        outline: none;
    }

    .form-group textarea {
        min-height: 120px;
        resize: vertical;
    }

    .form-group.checkbox {
        display: flex;
        align-items: center;
    }

    .form-group.checkbox label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .form-actions button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s;
    }

    .form-actions button[type="submit"] {
        background: #2196F3;
        color: white;
    }

    .form-actions button[type="submit"]:hover {
        background: #1976D2;
        transform: translateY(-2px);
    }

    .form-actions button.cancel {
        background: #f44336;
        color: white;
    }

    .form-actions button.cancel:hover {
        background: #d32f2f;
        transform: translateY(-2px);
    }

    .text-options {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        gap: 0.9rem;
        margin-top: 0.9rem;
    }

    .text-card {
        padding: 1.2rem;
        border-radius: 0.5rem;
        border: 2px solid rgba(128, 128, 128, 0.2);
        transition: transform 0.2s, border-color 0.2s;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .light .text-card {
        background: #ffffff;
    }

    .oled .text-card {
        background: hsla(0, 0%, 10%, 0.5);
        border-color: #333;
    }

    .text-card:hover {
        transform: translateY(-2px);
        border-color: #2196F3;
    }

    .text-info {
        flex: 1;
    }

    .text-info h4 {
        margin: 0 0 0.8rem;
        color: inherit;
        font-size: 1.1rem;
    }

    .text-meta {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.8rem;
        flex-wrap: wrap;
    }

    .text-preview {
        color: inherit;
        opacity: 0.8;
        font-size: 0.9rem;
        margin: 0;
        line-height: 1.5;
    }

    .text-actions {
        display: flex;
        gap: 0.8rem;
        margin-top: auto;
    }

    .text-actions button {
        padding: 0.4rem 0.8rem;
        border: none;
        border-radius: 0.4rem;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s;
    }

    .text-actions .edit {
        background: #2196F3;
        color: white;
    }

    .text-actions .edit:hover {
        background: #1976D2;
        transform: translateY(-2px);
    }

    .text-actions .delete {
        background: #f44336;
        color: white;
    }

    .text-actions .delete:hover {
        background: #d32f2f;
        transform: translateY(-2px);
    }

    .delete-confirmation {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        background: #f44336;
        padding: 0.4rem 0.8rem;
        border-radius: 0.4rem;
        color: white;
    }

    .delete-confirmation span {
        font-size: 0.9rem;
    }

    .delete-confirmation button {
        padding: 0.4rem 0.8rem;
        border: none;
        border-radius: 0.4rem;
        cursor: pointer;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.2s;
    }

    .delete-confirmation button.delete {
        background: #d32f2f;
        color: white;
    }

    .delete-confirmation button.delete:hover {
        background: #b71c1c;
        transform: translateY(-2px);
    }

    .delete-confirmation button.cancel {
        background: #757575;
        color: white;
    }

    .delete-confirmation button.cancel:hover {
        background: #616161;
        transform: translateY(-2px);
    }
</style>
