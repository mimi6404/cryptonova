function encryptAES() {

    let text = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

    if (!text || !key) return;

    let encrypted = CryptoJS.AES.encrypt(text, key).toString();

    document.getElementById("ciphertext").value = encrypted;
}


function decryptAES() {

    let cipher = document.getElementById("ciphertext").value;
    let key = document.getElementById("key").value;

    if (!cipher || !key) return;

    let bytes = CryptoJS.AES.decrypt(cipher, key);
    let decrypted = bytes.toString(CryptoJS.enc.Utf8);

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