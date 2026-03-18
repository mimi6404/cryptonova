function caesarCipher(text, shift, mode) {
    let result = "";
    let stepsContainer = document.getElementById("steps");
    stepsContainer.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
        let ch = text[i];
        let stepText = "";

        if (ch >= 'a' && ch <= 'z') {
            let base = 97;
            let pos = ch.charCodeAt(0) - base;
            let newPos = mode === "encrypt"
                ? (pos + shift) % 26
                : (pos - shift + 26) % 26;

            let newChar = String.fromCharCode(newPos + base);
            result += newChar;

            stepText = `${ch} (${pos}) → ${newChar} (${newPos})`;
        }

        else if (ch >= 'A' && ch <= 'Z') {
            let base = 65;
            let pos = ch.charCodeAt(0) - base;
            let newPos = mode === "encrypt"
                ? (pos + shift) % 26
                : (pos - shift + 26) % 26;

            let newChar = String.fromCharCode(newPos + base);
            result += newChar;

            stepText = `${ch} (${pos}) → ${newChar} (${newPos})`;
        }

        else if (ch >= '0' && ch <= '9') {
            let base = 48;
            let pos = ch.charCodeAt(0) - base;
            let newPos = mode === "encrypt"
                ? (pos + shift) % 10
                : (pos - shift + 10) % 10;

            let newChar = String.fromCharCode(newPos + base);
            result += newChar;

            stepText = `${ch} (${pos}) → ${newChar} (${newPos})`;
        }

        else {
            result += ch;
            stepText = `${ch} (no change)`;
        }

        // Create animated step line
        let stepDiv = document.createElement("div");
        stepDiv.classList.add("step-item");
        stepDiv.style.animationDelay = (i * 0.1) + "s";
        stepDiv.textContent = stepText;
        stepsContainer.appendChild(stepDiv);
    }

    return result;
}

function encryptText() {
    let text = document.getElementById("text").value;
    let shift = parseInt(document.getElementById("shift").value);
    document.getElementById("ciphertext").value =
        caesarCipher(text, shift, "encrypt");
}

function decryptText() {
    let text = document.getElementById("ciphertext").value;
    let shift = parseInt(document.getElementById("shift").value);
    document.getElementById("decryptedtext").value =
        caesarCipher(text, shift, "decrypt");
}