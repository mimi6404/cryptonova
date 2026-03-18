function generateKeys() {

    let crypt = new JSEncrypt({ default_key_size: 1024 });
    crypt.getKey();

    document.getElementById("publicKey").value = crypt.getPublicKey();
    document.getElementById("privateKey").value = crypt.getPrivateKey();
}


function encryptRSA() {

    let publicKey = document.getElementById("publicKey").value;
    let text = document.getElementById("plaintext").value;

    if (!publicKey || !text) return;

    let crypt = new JSEncrypt();
    crypt.setPublicKey(publicKey);

    let encrypted = crypt.encrypt(text);

    document.getElementById("ciphertext").value = encrypted;
}


function decryptRSA() {

    let privateKey = document.getElementById("privateKey").value;
    let cipher = document.getElementById("ciphertext").value;

    if (!privateKey || !cipher) return;

    let crypt = new JSEncrypt();
    crypt.setPrivateKey(privateKey);

    let decrypted = crypt.decrypt(cipher);

    document.getElementById("decryptedtext").value = decrypted;
}


function toggleExplanation() {

    let exp = document.getElementById("explanation");

    if (exp.style.display === "none" || exp.style.display === "") {
        exp.style.display = "block";
    } else {
        exp.style.display = "none";
    }
}