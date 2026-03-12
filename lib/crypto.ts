// lib/crypto.ts

/**
 * Utility functions for True End-to-End Encryption (E2EE)
 * using the browser's native Web Crypto API.
 */

// 1. Generate RSA-OAEP Key Pair for Asymmetric Encryption
export async function generateKeyPair(): Promise<CryptoKeyPair> {
    return await window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]), // 65537
            hash: "SHA-256",
        },
        true, // extractable
        ["encrypt", "decrypt"]
    );
}

// 2. Export Key to Base64 String (for storage/transmission)
export async function exportKey(key: CryptoKey, type: 'spki' | 'pkcs8'): Promise<string> {
    const exported = await window.crypto.subtle.exportKey(type, key);
    return Buffer.from(exported).toString('base64');
}

// 3. Import Key from Base64 String
export async function importPublicKey(base64Key: string): Promise<CryptoKey> {
    const binaryDer = Buffer.from(base64Key, 'base64');
    return await window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );
}

export async function importPrivateKey(base64Key: string): Promise<CryptoKey> {
    const binaryDer = Buffer.from(base64Key, 'base64');
    return await window.crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );
}

// 4. Generate AES-GCM Session Key for Symmetric Encryption
export async function generateSessionKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
}

export async function exportSessionKey(key: CryptoKey): Promise<Uint8Array> {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return new Uint8Array(exported);
}

export async function importSessionKey(rawKey: Uint8Array): Promise<CryptoKey> {
    return await window.crypto.subtle.importKey(
        "raw",
        rawKey as any,
        "AES-GCM",
        true,
        ["encrypt", "decrypt"]
    );
}

// 5. Asymmetric Encryption (Encrypting the Session Key with RSA)
export async function encryptSessionKeyWithRSA(sessionKeyRaw: Uint8Array, publicKey: CryptoKey): Promise<string> {
    const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        sessionKeyRaw as any
    );
    return Buffer.from(encrypted).toString('base64');
}

export async function decryptSessionKeyWithRSA(encryptedSessionKeyBase64: string, privateKey: CryptoKey): Promise<Uint8Array> {
    const encryptedBytes = Buffer.from(encryptedSessionKeyBase64, 'base64');
    const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedBytes as any
    );
    return new Uint8Array(decrypted);
}

// 6. Symmetric Encryption (Encrypting the Message with AES)
export async function encryptMessageWithAES(message: string, sessionKey: CryptoKey): Promise<{ ciphertext: string, iv: string }> {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedMessage = new TextEncoder().encode(message);

    const ciphertextBuf = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv as any },
        sessionKey,
        encodedMessage as any
    );

    return {
        ciphertext: Buffer.from(ciphertextBuf).toString('base64'),
        iv: Buffer.from(iv).toString('base64'),
    };
}

export async function decryptMessageWithAES(ciphertextBase64: string, ivBase64: string, sessionKey: CryptoKey): Promise<string> {
    const ciphertext = Buffer.from(ciphertextBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');

    const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: new Uint8Array(iv) as any },
        sessionKey,
        new Uint8Array(ciphertext) as any
    );

    return new TextDecoder().decode(decrypted);
}

// --- IndexedDB Storage Helper for Private Key ---
export const KeyStore = {
    async openDB() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open("AtheleosE2EE", 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (e: any) => {
                const db: IDBDatabase = e.target.result;
                if (!db.objectStoreNames.contains("keys")) {
                    db.createObjectStore("keys", { keyPath: "id" });
                }
            };
        });
    },

    async savePrivateKey(privateKeyBase64: string) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction("keys", "readwrite");
            const store = tx.objectStore("keys");
            store.put({ id: "my_private_key", value: privateKeyBase64 });
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    },

    async getPrivateKey(): Promise<string | null> {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction("keys", "readonly");
            const store = tx.objectStore("keys");
            const request = store.get("my_private_key");
            request.onsuccess = () => resolve(request.result ? request.result.value : null);
            request.onerror = () => reject(request.error);
        });
    },

    async clearKeys() {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction("keys", "readwrite");
            const store = tx.objectStore("keys");
            store.clear();
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => reject(tx.error);
        });
    }
};
