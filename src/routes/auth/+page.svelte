<script lang="ts">
    import type { ActionData } from './$types';
    import { theme } from "$lib/stores/theme";
    export let form: ActionData;

    let activeTab = 'login';
</script>

<div class="container {$theme}">
    <div class="auth-container">
        <div class="tabs">
            <button 
                class="tab-button {activeTab === 'login' ? 'active' : ''}" 
                on:click={() => activeTab = 'login'}
            >
                Login
            </button>
            <button 
                class="tab-button {activeTab === 'register' ? 'active' : ''}" 
                on:click={() => activeTab = 'register'}
            >
                Register
            </button>
        </div>

        {#if form?.error}
            <div class="error">{form.error}</div>
        {/if}

        {#if form?.success}
            <div class="success">Registration successful! Please login.</div>
        {/if}

        {#if activeTab === 'login'}
            <form method="POST" action="?/login">
                <div class="form-group">
                    <label for="login-username">Username</label>
                    <input
                        type="text"
                        id="login-username"
                        name="username"
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        required
                    />
                </div>
                
                <button type="submit">Login</button>
            </form>
        {:else}
            <form method="POST" action="?/register">
                <div class="form-group">
                    <label for="register-username">Username</label>
                    <input
                        type="text"
                        id="register-username"
                        name="username"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input
                        type="email"
                        id="register-email"
                        name="email"
                        required
                    />
                </div>
                
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="register-confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="register-confirm-password"
                        name="confirmPassword"
                        required
                    />
                </div>
                
                <button type="submit">Register</button>
            </form>
        {/if}
    </div>
</div>

<style>
    .container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .container.light {
        background-color: #ffffff;
        color: #000000;
    }

    .container.oled {
        background-color: #000000;
        color: #ffffff;
    }

    .auth-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border-radius: 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .light .auth-container {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
    }

    .oled .auth-container {
        background-color: hsla(0, 0%, 10%, 0.5);
        border: 1px solid #333;
    }

    .tabs {
        display: flex;
        margin-bottom: 2rem;
        border-bottom: 2px solid rgba(128, 128, 128, 0.2);
    }

    .tab-button {
        flex: 1;
        padding: 0.75rem;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
    }

    .tab-button:hover {
        opacity: 1;
    }

    .tab-button.active {
        color: #666666;
        border-bottom-color: #666666;
        opacity: 1;
    }

    .light .tab-button.active {
        color: #666666;
        border-bottom-color: #666666;
    }

    .oled .tab-button.active {
        color: white;
        border-bottom-color: #999999;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: inherit;
        opacity: 0.9;
    }

    input {
        width: 100%;
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-size: 1rem;
    }

    .light input {
        background-color: #ffffff;
        border: 1px solid #ddd;
        color: #000000;
    }

    .oled input {
        background-color: #1a1a1a;
        border: 1px solid #333;
        color: #ffffff;
    }

    button:not(.tab-button) {
        width: 100%;
        padding: 0.75rem;
        background: #666666;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-top: 1rem;
        font-size: 1rem;
        transition: background-color 0.2s;
    }

    button:hover:not(.tab-button) {
        background: #555555;
    }

    .error {
        color: #d32f2f;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: rgba(211, 47, 47, 0.1);
        border-radius: 0.5rem;
    }

    .success {
        color: #666666;
        margin-bottom: 1rem;
        padding: 0.5rem;
        background: rgba(102, 102, 102, 0.1);
        border-radius: 0.5rem;
    }
</style>
