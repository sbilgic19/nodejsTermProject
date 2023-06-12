async function submitRequest01(callback) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    url = `http://localhost:3000/authenticateUser?email=
${email}&password=${password}`;
    const response = await fetch(url);
    const text = await response.text();
    callback(text);
}

async function submitRequest02(callback) {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var age = document.getElementById("age").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const url = "http://localhost:3000/registerUser";
    const data = {
        name: name,
        surname: surname,
        age: age,
        email: email,
        password: password
    };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const text = await response.text();
    callback(text);
}

function applyAuthentication(event) {
    event.preventDefault();
    const textArea = document.getElementById("readonly-text01");
    submitRequest01((text) => {
        if (text === "Authenticated!") {
            window.location.href = "welcome.html";
        }
        else {
            textArea.value = text;
        }
    });
}

function applyRegistration(event) {
    event.preventDefault();
    const textArea = document.getElementById("readonly-text02");
    submitRequest02((text) => {
        textArea.value = text;
    });
}


updateDashboardMostVotedTVSeries = async function (callback) {
    const url = "http://localhost:3000/mostVotedTVSeries";

    const response = await fetch(url);
    const data = await response.json();
    callback(data);
};

updateDashboardMostVotedMovies = async function (callback) {
    const url = "http://localhost:3000/mostVotedMovies";

    const response = await fetch(url);
    const data = await response.json();
    callback(data);
};

updateDashboardAge = async function (callback) {
    const url = "http://localhost:3000/userAgeDistribution";

    const response = await fetch(url);
    const data = await response.json();
    callback(data);
};