function encryptRailFence() {

    let text = document.getElementById("plaintext").value;
    let rails = parseInt(document.getElementById("rails").value);

    if (rails < 2) return;

    let fence = Array.from({ length: rails }, () => []);

    let directionDown = false;
    let row = 0;

    for (let char of text) {

        fence[row].push(char);

        if (row === 0 || row === rails - 1)
            directionDown = !directionDown;

        row += directionDown ? 1 : -1;
    }

    let result = fence.flat().join("");
    document.getElementById("ciphertext").value = result;
}


function decryptRailFence() {

    let cipher = document.getElementById("ciphertext").value;
    let rails = parseInt(document.getElementById("rails").value);

    if (rails < 2) return;

    let pattern = [];
    let directionDown = false;
    let row = 0;

    for (let i = 0; i < cipher.length; i++) {

        pattern.push(row);

        if (row === 0 || row === rails - 1)
            directionDown = !directionDown;

        row += directionDown ? 1 : -1;
    }

    let railCounts = Array(rails).fill(0);
    pattern.forEach(r => railCounts[r]++);

    let railsArray = [];
    let index = 0;

    for (let r = 0; r < rails; r++) {
        railsArray[r] = cipher.slice(index, index + railCounts[r]).split("");
        index += railCounts[r];
    }

    let result = "";
    let railPositions = Array(rails).fill(0);

    for (let r of pattern) {
        result += railsArray[r][railPositions[r]++];
    }

    document.getElementById("decryptedtext").value = result;
}
function stepRailFence() {

    let text = document.getElementById("plaintext").value;
    let rails = parseInt(document.getElementById("rails").value);

    let display = document.getElementById("railDisplay");
    display.innerHTML = "";

    if (rails < 2) return;

    let fence = Array.from({ length: rails }, () => Array(text.length).fill(" "));

    let directionDown = false;
    let row = 0;

    for (let col = 0; col < text.length; col++) {

        fence[row][col] = text[col];

        if (row === 0 || row === rails - 1)
            directionDown = !directionDown;

        row += directionDown ? 1 : -1;
    }

    for (let r = 0; r < rails; r++) {
        display.innerHTML += fence[r].join("") + "\n";
    }
}