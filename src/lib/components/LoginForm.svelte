<script lang="ts">
    import { enhance } from '$app/forms';
    
    let username = '';
    let password = '';
    let error = '';
</script>

<div class="login-container">
    <form method="POST" action="/api/login" use:enhance>
        <h2>Login</h2>
        
        {#if error}
            <div class="error">{error}</div>
        {/if}
        
        <div class="form-group">
            <label for="username">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                bind:value={username}
                required
            />
        </div>
        
        <div class="form-group">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                bind:value={password}
                required
            />
        </div>
        
        <button type="submit">Login</button>
    </form>
</div>

<style>
    .login-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background: white;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: #45a049;
    }

    .error {
        color: red;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: #ffebee;
        border-radius: 4px;
    }
</style> 