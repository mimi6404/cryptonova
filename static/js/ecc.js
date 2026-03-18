let keyPair;

async function generateKeys() {

    keyPair = await window.crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-256"
        },
        true,
        ["sign", "verify"]
    );

    // Export keys
    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    document.getElementById("publicKey").value =
        arrayBufferToBase64(publicKey);

    document.getElementById("privateKey").value =
        arrayBufferToBase64(privateKey);
}


async function signMessage() {

    const message = document.getElementById("message").value;
    if (!message || !keyPair) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const signature = await crypto.subtle.sign(
        {
            name: "ECDSA",
            hash: "SHA-256"
        },
        keyPair.privateKey,
        data
    );

    document.getElementById("signature").value =
        arrayBufferToBase64(signature);
}


async function verifySignature() {

    const message = document.getElementById("message").value;
    const signatureBase64 = document.getElementById("signature").value;

    if (!message || !signatureBase64) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const signature = base64ToArrayBuffer(signatureBase64);

    const valid = await crypto.subtle.verify(
        {
            name: "ECDSA",
            hash: "SHA-256"
        },
        keyPair.publicKey,
        signature,
        data
    );

    document.getElementById("verification").value =
        valid ? "Valid Signature ✔" : "Invalid Signature ✖";
}


function arrayBufferToBase64(buffer) {

    let binary = "";
    let bytes = new Uint8Array(buffer);
    bytes.forEach(b => binary += String.fromCharCode(b));

    return window.btoa(binary);
}


function base64ToArrayBuffer(base64) {

    let binary = window.atob(base64);
    let bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    return bytes.buffer;
}


function toggleExplanation() {

    let exp = document.getElementById("explanation");

    exp.style.display =
        (exp.style.display === "none" || exp.style.display === "")
        ? "block"
        : "none";
}