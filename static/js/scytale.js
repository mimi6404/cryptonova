// =======================
// BASIC ENCRYPT / DECRYPT
// =======================

function encryptScytale() {

    let text = document.getElementById("plaintext").value;
    let rows = parseInt(document.getElementById("rows").value);

    if (!rows || rows < 1) return;

    let cols = Math.ceil(text.length / rows);
    let grid = Array.from({ length: rows }, () => Array(cols).fill(""));

    let index = 0;

    // Write vertically
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            if (index < text.length)
                grid[r][c] = text[index++];
        }
    }

    // Read horizontally
    let cipher = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c])
                cipher += grid[r][c];
        }
    }

    document.getElementById("ciphertext").value = cipher;
    displayTable(grid);
}


function decryptScytale() {

    let cipher = document.getElementById("ciphertext").value;
    let rows = parseInt(document.getElementById("rows").value);

    if (!rows || rows < 1) return;

    let cols = Math.ceil(cipher.length / rows);
    let grid = Array.from({ length: rows }, () => Array(cols).fill(""));

    let index = 0;

    // Fill row by row
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (index < cipher.length)
                grid[r][c] = cipher[index++];
        }
    }

    // Read vertically
    let plain = "";

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            if (grid[r][c])
                plain += grid[r][c];
        }
    }

    document.getElementById("decryptedtext").value = plain;
    displayTable(grid);
}


// =======================
// TABLE DISPLAY
// =======================

function displayTable(grid) {

    let output = "";

    for (let r = 0; r < grid.length; r++) {
        output += grid[r].join(" ") + "\n";
    }

    document.getElementById("tableDisplay").innerHTML = output;
}


// =======================
// TOGGLE TABLE
// =======================

function toggleScytaleTable() {

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


// =======================
// ANIMATION MODE
// =======================

let scytaleGrid = [];
let currentCol = 0;
let currentRow = 0;
let totalCols = 0;
let totalRows = 0;
let animationInterval = null;

function startScytaleAnimation() {

    let text = document.getElementById("plaintext").value;
    let rows = parseInt(document.getElementById("rows").value);

    if (!rows || rows < 1) return;

    totalRows = rows;
    totalCols = Math.ceil(text.length / rows);

    scytaleGrid = Array.from({ length: totalRows },
        () => Array(totalCols).fill(" "));

    currentCol = 0;
    currentRow = 0;

    document.getElementById("tableSection").style.display = "block";
    document.getElementById("toggleBtn").textContent = "Hide Table Visualization";
    document.getElementById("tableDisplay").innerHTML = "";

    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
    }
}


function nextScytaleStep() {

    let text = document.getElementById("plaintext").value;
    if (!text || currentCol >= totalCols) return;

    let index = currentCol * totalRows + currentRow;

    if (index < text.length) {
        scytaleGrid[currentRow][currentCol] = text[index];
    }

    renderScytaleGrid(currentRow, currentCol);

    currentRow++;

    if (currentRow >= totalRows) {
        currentRow = 0;
        currentCol++;
    }
}


function autoPlayScytale() {

    if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
        return;
    }

    animationInterval = setInterval(() => {

        if (currentCol >= totalCols) {
            clearInterval(animationInterval);
            animationInterval = null;
        } else {
            nextScytaleStep();
        }

    }, 500);
}


function renderScytaleGrid(highlightRow, highlightCol) {

    let output = "";

    for (let r = 0; r < totalRows; r++) {

        for (let c = 0; c < totalCols; c++) {

            let char = scytaleGrid[r][c];

            if (r === highlightRow && c === highlightCol) {
                output += "<span style='color:#7fd8c7; font-weight:bold;'>"
                        + char + "</span> ";
            } else {
                output += char + " ";
            }
        }

        output += "\n";
    }

    document.getElementById("tableDisplay").innerHTML = output;
}
