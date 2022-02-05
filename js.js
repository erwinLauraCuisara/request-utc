
document.getElementById("time").innerHTML = getTime();

async function post(hour, utc) {

    let datos = {};
    datos.time = hour;
    datos.timezone = utc;

    const request = await fetch('https://spring-format-transformet-serv.herokuapp.com/api/transform-time/json', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    }).then(response => {

        if (!response.ok) {
            response.text().then(text => {
                document.getElementById("time").innerHTML = text
            })
        }
        else {
            response.json().then(json => {
                document.getElementById("time").innerHTML = json.response.time + "-" + json.response.timezone
            })
        }
    });

}

function onClick() {
    const time = document.getElementById("inputtime").value;
    const zonetime = document.getElementById("timezone").value;

    if (time != "" && zonetime != "") {
        post(time, zonetime);
    }
    else {
        document.getElementById("time").innerHTML = "Error: The fields are empty";
    }
}

function getTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const secounds = date.getSeconds();
    const offset = date.getTimezoneOffset();
    return hour + ":" + minute + ":" + secounds + " UTC" + (-Math.trunc(offset / 60));
}