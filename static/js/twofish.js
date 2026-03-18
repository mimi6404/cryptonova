function encryptTwofish() {
    const plaintext = document.getElementById("plaintext").value;
    const key = document.getElementById("key").value;

    if (!plaintext || !key) {
        alert("Please enter plaintext and key");
        return;
    }

    const encrypted = sjcl.encrypt(key, plaintext);
    document.getElementById("ciphertext").value = encrypted;
}

function decryptTwofish() {
    const ciphertext = document.getElementById("ciphertext").value;
    const key = document.getElementById("key").value;

    if (!ciphertext || !key) {
        alert("Missing ciphertext or key");
        return;
    }

    try {
        const decrypted = sjcl.decrypt(key, ciphertext);
        document.getElementById("decryptedtext").value = decrypted;
    } catch (e) {
        alert("Invalid key or corrupted data");
    }
}

function toggleExplanation() {
    const section = document.getElementById("explanation");
    section.style.display =
        section.style.display === "none" ? "block" : "none";
}