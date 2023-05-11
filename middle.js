async function submitRequest01(callback) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    url = `http://localhost:3000/authenticateUser?email=
${email}&password=${password}`; 
    const response = await fetch(url);
    const text = await response.text();
    callback(text);
}

function applyAuthentication(event) {
    event.preventDefault();
    const textArea = document.getElementById("readonly-text");
    submitRequest01((text) => {
        textArea.value = text;
        if (text === "The user is authenticated!") {
            window.location.href = "welcome.html";
        }
    });
    return false;
}