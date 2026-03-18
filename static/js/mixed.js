const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Generate cipher alphabet using keyword
function generateCipherAlphabet(keyword) {

    keyword = keyword.toUpperCase();

    let uniqueKey = "";
    for (let char of keyword) {
        if (alpha.includes(char) && !uniqueKey.includes(char)) {
            uniqueKey += char;
        }
    }

    let remaining = "";
    for (let char of alpha) {
        if (!uniqueKey.includes(char)) {
            remaining += char;
        }
    }

    return uniqueKey + remaining;
}

// Encrypt
function encryptMixed() {

    let text = document.getElementById("plaintext").value; // ❌ حذفنا toUpperCase
    let keyword = document.getElementById("keyword").value;

    let cipherAlpha = generateCipherAlphabet(keyword);

    let result = "";

    for (let ch of text) {

        let isLower = (ch === ch.toLowerCase());
        let upperChar = ch.toUpperCase();

        let index = alpha.indexOf(upperChar);

        if (index !== -1) {

            let cipherChar = cipherAlpha[index];

            if (isLower) {
                result += cipherChar.toLowerCase();
            } else {
                result += cipherChar;
            }

        } else {
            result += ch;
        }
    }

    document.getElementById("ciphertext").value = result;
}

// Decrypt
function decryptMixed() {

    let text = document.getElementById("ciphertext").value; // ❌ حذفنا toUpperCase
    let keyword = document.getElementById("keyword").value;

    let cipherAlpha = generateCipherAlphabet(keyword);

    let result = "";

    for (let ch of text) {

        let isLower = (ch === ch.toLowerCase());
        let upperChar = ch.toUpperCase();

        let index = cipherAlpha.indexOf(upperChar);

        if (index !== -1) {

            let plainChar = alpha[index];

            if (isLower) {
                result += plainChar.toLowerCase();
            } else {
                result += plainChar;
            }

        } else {
            result += ch;
        }
    }

    document.getElementById("decryptedtext").value = result;
}
function stepMixed() {

    let text = document.getElementById("plaintext").value;
    let keyword = document.getElementById("keyword").value;

    let cipherAlpha = generateCipherAlphabet(keyword);

    let stepsDiv = document.getElementById("stepsOutput");
    let box = document.getElementById("stepsBox");

    stepsDiv.innerHTML = "";
    box.style.display = "block";

    for (let ch of text) {

        if (/[a-zA-Z]/.test(ch)) {

            let upperChar = ch.toUpperCase();
            let index = alpha.indexOf(upperChar);
            let cipherChar = cipherAlpha[index];

            stepsDiv.innerHTML += `
                <p>
                ${upperChar} → index ${index} → ${cipherChar}
                </p>
            `;
        }
    }
}

function showCipherAlphabet() {

    let keyword = document.getElementById("keyword").value;
    let cipherAlpha = generateCipherAlphabet(keyword);

    let displayDiv = document.getElementById("alphabetDisplay");

    displayDiv.innerHTML =
        "Plain :  " + alpha + "\n" +
        "Cipher:  " + cipherAlpha;
}