function getColumnOrder(keyword) {

    let keyArray = keyword
        .toUpperCase()
        .split("")
        .map((char, index) => ({ char, index }));

    keyArray.sort((a, b) => {
        if (a.char < b.char) return -1;
        if (a.char > b.char) return 1;
        return a.index - b.index;
    });

    return keyArray.map(item => item.index);
}


function encryptColumnar() {

    let text = document.getElementById("plaintext").value;
    let key = document.getElementById("keyword").value.toUpperCase();

    let cols = key.length;
    if (cols === 0) return;

    // ✨ Padding
    while (text.length % cols !== 0) {
        text += "X";
    }

    let rows = text.length / cols;

    let grid = [];
    let index = 0;

    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            grid[r][c] = text[index++];
        }
    }

    let order = getColumnOrder(key);

    let cipher = "";

    for (let i = 0; i < cols; i++) {
        let col = order[i];
        for (let r = 0; r < rows; r++) {
            cipher += grid[r][col];
        }
    }

    document.getElementById("ciphertext").value = cipher;
}

function decryptColumnar() {

    let cipher = document.getElementById("ciphertext").value;
    let key = document.getElementById("keyword").value.toUpperCase();

    let cols = key.length;
    if (cols === 0) return;

    let rows = Math.ceil(cipher.length / cols);

    let keyOrder = getColumnOrder(key);

    let grid = Array.from({ length: rows }, () => Array(cols).fill(""));

    let fullCols = cipher.length % cols;
    let colLengths = Array(cols).fill(Math.floor(cipher.length / cols));

    if (fullCols !== 0) {
        for (let i = 0; i < fullCols; i++) {
            colLengths[keyOrder[i]]++;
        }
    }

    let index = 0;

    for (let i = 0; i < cols; i++) {

        let col = keyOrder[i];

        for (let r = 0; r < colLengths[col]; r++) {
            grid[r][col] = cipher[index++];
        }
    }

    let plain = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] !== "")
                plain += grid[r][c];
        }
    }

    document.getElementById("decryptedtext").value = plain;
}

function showColumnarTable() {

    let text = document.getElementById("plaintext").value;
    let key = document.getElementById("keyword").value;

    let cols = key.length;
    if (cols === 0) return;

    let rows = Math.ceil(text.length / cols);

    let output = key.toUpperCase() + "\n";

    let index = 0;

    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < cols; c++) {

            if (index < text.length)
                output += text[index++] + " ";
            else
                output += "  ";
        }

        output += "\n";
    }

    document.getElementById("tableDisplay").innerHTML = output;
}
function toggleTable() {

    let section = document.getElementById("tableSection");
    let button = document.getElementById("toggleBtn");

    if (section.style.display === "none" || section.style.display === "") {

        section.style.display = "block";
        button.textContent = "Hide Table Visualization";

    } else {

        section.style.display = "none";
        button.textContent = "Show Table Visualization";
    }
}