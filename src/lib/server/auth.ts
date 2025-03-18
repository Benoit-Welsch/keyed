/**
 * Hash a password using SHA-256
 * @param password The plain text password to hash
 * @returns The hashed password as a hex string
 */
export async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify a password against a hash
 * @param password The plain text password to verify
 * @param hash The hashed password to verify against
 * @returns Whether the password matches the hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
} 