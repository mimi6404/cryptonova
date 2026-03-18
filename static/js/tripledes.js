function encrypt3DES() {

    let text = document.getElementById("plaintext").value;
    let key = document.getElementById("key").value;

    if (!text || !key) return;

    let encrypted = CryptoJS.TripleDES.encrypt(text, key).toString();

    document.getElementById("ciphertext").value = encrypted;
}


function decrypt3DES() {

    let cipher = document.getElementById("ciphertext").value;
    let key = document.getElementById("key").value;

    if (!cipher || !key) return;

    let bytes = CryptoJS.TripleDES.decrypt(cipher, key);
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