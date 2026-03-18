const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Encrypt
function encryptVigenere() {

    let p = document.getElementById("plaintext").value;
    let key = document.getElementById("keyword").value.toUpperCase();

    let c = "";
    let j = 0;
    let n = alpha.length;

    for (let ch of p) {

        if (/[a-zA-Z]/.test(ch)) {

            let isLower = (ch === ch.toLowerCase());
            let upperChar = ch.toUpperCase();

            let x = (alpha.indexOf(upperChar) +
                     alpha.indexOf(key[j++])) % n;

            j = j % key.length;

            let cipherChar = alpha[x];

            if (isLower)
                c += cipherChar.toLowerCase();
            else
                c += cipherChar;

        } else {
            c += ch;
        }
    }

    document.getElementById("ciphertext").value = c;
}
function decryptVigenere() {

    let d = document.getElementById("ciphertext").value;
    let key = document.getElementById("keyword").value.toUpperCase();

    let decrypted = "";
    let j = 0;
    let n = alpha.length;

    for (let ch of d) {

        if (/[a-zA-Z]/.test(ch)) {

            let isLower = (ch === ch.toLowerCase());
            let upperChar = ch.toUpperCase();

            let x = (alpha.indexOf(upperChar) -
                     alpha.indexOf(key[j++]) + n) % n;

            j = j % key.length;

            let plainChar = alpha[x];

            if (isLower)
                decrypted += plainChar.toLowerCase();
            else
                decrypted += plainChar;

        } else {
            decrypted += ch;
        }
    }

    document.getElementById("decryptedtext").value = decrypted;
}
function stepVigenere() {

    let text = document.getElementById("plaintext").value;
    let key = document.getElementById("keyword").value.toUpperCase();

    let stepsDiv = document.getElementById("stepsOutput");
    let box = document.getElementById("stepsBox");

    stepsDiv.innerHTML = "";
    box.style.display = "block";

    let j = 0;
    let n = alpha.length;

    for (let ch of text) {

        if (/[a-zA-Z]/.test(ch)) {

            let upperChar = ch.toUpperCase();
            let keyChar = key[j % key.length];

            let textIndex = alpha.indexOf(upperChar);
            let keyIndex = alpha.indexOf(keyChar);

            let resultIndex = (textIndex + keyIndex) % n;
            let resultChar = alpha[resultIndex];

            stepsDiv.innerHTML += `
                <p>
                ${upperChar} (${textIndex}) + 
                ${keyChar} (${keyIndex}) 
                = ${resultChar} (${resultIndex})
                </p>
            `;

            j++;
        }
    }
}function showVigenereAlignment() {

    let text = document.getElementById("plaintext").value;
    let key = document.getElementById("keyword").value.toUpperCase();

    let displayDiv = document.getElementById("vigenereDisplay");
    let hint = document.getElementById("keywordHint");

    if (key === "") {
        displayDiv.style.display = "none";
        hint.style.display = "block";
        return;
    }

    hint.style.display = "none";
    displayDiv.style.display = "block";

    let repeatedKey = "";
    let shifts = "";

    let j = 0;

    for (let ch of text) {

        if (/[a-zA-Z]/.test(ch)) {

            let keyChar = key[j % key.length];
            repeatedKey += keyChar;
            shifts += alpha.indexOf(keyChar).toString().padStart(2, " ") + " ";
            j++;

        } else {
            repeatedKey += ch;
            shifts += "   ";
        }
    }

    displayDiv.innerHTML =
        "Plain : " + text.toUpperCase() + "\n" +
        "Key   : " + repeatedKey + "\n" +
        "Shift : " + shifts;
}