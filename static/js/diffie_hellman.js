function modPow(base, exponent, modulus) {

    if (modulus === 1) return 0;

    let result = 1;
    base = base % modulus;

    while (exponent > 0) {

        if (exponent % 2 === 1)
            result = (result * base) % modulus;

        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}


function calculateDH() {

    let p = parseInt(document.getElementById("prime").value);
    let g = parseInt(document.getElementById("generator").value);
    let a = parseInt(document.getElementById("alicePrivate").value);
    let b = parseInt(document.getElementById("bobPrivate").value);

    // Public Keys
    let A = modPow(g, a, p);
    let B = modPow(g, b, p);

    // Shared Secrets
    let secretAlice = modPow(B, a, p);
    let secretBob = modPow(A, b, p);

    document.getElementById("alicePublic").value = A;
    document.getElementById("bobPublic").value = B;

    document.getElementById("aliceSecret").value = secretAlice;
    document.getElementById("bobSecret").value = secretBob;
}


function toggleExplanation() {

    let exp = document.getElementById("explanation");

    if (exp.style.display === "none" || exp.style.display === "") {
        exp.style.display = "block";
    } else {
        exp.style.display = "none";
    }
}