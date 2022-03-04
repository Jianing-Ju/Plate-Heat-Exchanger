import axios from "axios";
const addr = "http://localhost:5000/api/";
export async function getCalcRes(input, type) {
    const response = await fetch(addr + "calculate/" + type, {
        ...http("POST"),
        body: JSON.stringify(input)
    });
    // const jsonFile = await response.json();
    // console.log(jsonFile)
    return response.json();
}

export async function getAvail() {
    const response = await fetch(addr + "get-avail", http("GET"));
    return response.json();
}

export async function register(email, password) {

    const response = await fetch(addr + "user/register", {
        ...http("POST"),
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    return response.json();
}

export async function login(email, password) {
    const response = await fetch(addr + "user/login", {
        ...http("POST"),
        body: JSON.stringify({
            email: email,
            password: password
        })

    });
    return response.json();
}

export async function designExists(designId) {
    const response = await fetch(addr + "designs/exists/" + designId, http("GET"));
    return response.json();
}

export async function updateDesign(inputId, inputs) {
    const response = await fetch(addr + "designs", {
        ...http("PUT"),
        body: JSON.stringify({
            inputId: inputId,
            inputs: inputs,
            time: now()
        })
    })
    return response.json();
}

export async function saveDesign(userId, designId, inputs, type, name) {
    const response = await fetch(addr + "designs", {
        ...http("POST"),
        body: JSON.stringify({
            userId: userId,
            designId: designId,
            inputs: inputs,
            type: type,
            name: name,
            time: now()
        })
    });
    return response.json();
}

export async function getDesigns(userId) {
    const response = await fetch(addr + "designs/" + userId, http("GET"));
    return response.json();
}

export async function getInput(designId) {
    const response = await fetch(addr + "designs/input/" + designId, http("GET"));
    return response.json();
}

export async function deleteDesign(designId) {
    const response = await fetch(addr + "designs/" + designId, http("DELETE"));
    return response.json();
}

export async function addFolder(name, userId, rank) {
    const response = await fetch(addr + "folders", {
        ...http("POST"),
        body: JSON.stringify({
            name: name,
            userId: userId,
            rank: rank
        })
    });
    return response.json();
}

export async function getFolders(userId) {
    const response = await fetch(addr + "folders/" + userId, http("GET"));
    return response.json();
}

export async function setFolder(designId, folderId) {
    const response = await fetch(addr + "folders", {
        ...http("PUT"),
        body: JSON.stringify({
            designId: designId,
            folderId: folderId
        })
    })
}

export async function exportCharts(designId) {
    const response = await fetch(addr + "charts/" + designId, http("GET"));
    if (!response.ok) {
        return false;
    }
    return response.blob();
}

export async function uploadChart(file, userId) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(addr + "charts/" + userId, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export async function downloadFile(name) {
    const response = await fetch(`%PUBLIC_URL%/${name}`);
    return response.blob();
}

function now() {
    const d = new Date();
    return d.toLocaleTimeString() + " " + d.toLocaleDateString();
}
function http(method) {
    return ({
        method: method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    })
}