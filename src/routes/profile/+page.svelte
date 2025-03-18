<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { theme } from '$lib/stores/theme';
    import type { ActionData } from './$types';
    export let form: ActionData;

    // Redirect to login if not authenticated
    if ($page.data.error) {
        goto('/auth');
    }
</script>

<div class="container {$theme}">
    <div class="profile-container">
        <h1>Profile Settings</h1>
        
        {#if form?.error}
            <div class="error">{form.error}</div>
        {/if}

        {#if form?.success}
            <div class="success">{form.success}</div>
        {/if}

        <div class="password-section">
            <h2>Change Password</h2>
            <form method="POST" action="?/updatePassword">
                <div class="form-group">
                    <label for="currentPassword">Current Password</label>
                    <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                    />
                </div>

                <button type="submit">Update Password</button>
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    .container.light {
        background-color: #ffffff;
        color: #000000;
    }

    .container.oled {
        background-color: #000000;
        color: #ffffff;
    }

    .profile-container {
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
        padding: 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .light .profile-container {
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
    }

    .oled .profile-container {
        background-color: hsla(0, 0%, 10%, 0.5);
        border: 1px solid #333;
    }

    h1 {
        margin-bottom: 1.5rem;
        font-size: 1.6rem;
        color: inherit;
    }

    h2 {
        margin-bottom: 1.2rem;
        font-size: 1.2rem;
        color: inherit;
    }

    .password-section {
        margin-top: 1.5rem;
    }

    .form-group {
        margin-bottom: 1rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: inherit;
    }

    input {
        width: 100%;
        padding: 0.6rem;
        border-radius: 0.5rem;
        border: 2px solid rgba(128, 128, 128, 0.2);
        transition: border-color 0.2s;
    }

    .light input {
        background-color: #ffffff;
        color: #333333;
    }

    .oled input {
        background-color: hsla(0, 0%, 10%, 0.5);
        color: #ffffff;
        border-color: #333;
    }

    input:focus {
        border-color: #2196F3;
        outline: none;
    }

    button {
        width: 100%;
        padding: 0.6rem;
        background: #2196F3;
        color: white;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 0.95rem;
        font-weight: 500;
        transition: all 0.2s;
    }

    button:hover {
        background: #1976D2;
        transform: translateY(-2px);
    }

    .error {
        color: #d32f2f;
        margin-bottom: 1rem;
        padding: 0.8rem;
        background: rgba(211, 47, 47, 0.1);
        border-radius: 0.5rem;
    }

    .success {
        color: #2e7d32;
        margin-bottom: 1rem;
        padding: 0.8rem;
        background: rgba(46, 125, 50, 0.1);
        border-radius: 0.5rem;
    }
</style>
