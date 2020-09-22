/**
 * Realizar una página que obtenga el listado total de users (Usando GET /api/user).
 */

const apiUrl = 'https://utn-avanzanda2-tp5.herokuapp.com/api/user'

function get(url) {
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    return new Promise((resolve, reject) => {
        request.open('GET', url)
        request.onload = () => {
            if (request.status == 200 ) {
                resolve(request.response)
            } else {
                reject(request.statusText)
            }
        }
        request.onerror = () => reject(request.statusText)
        request.send()
    })
}


function getUsers() {
    return get(`${apiUrl}`)
}

function renderRows(response) {
    const table = document.getElementById("table").getElementsByTagName('tbody')[0]
    while (table.firstChild) table.removeChild(table.firstChild)
    response.forEach(r => {
        const row = table.insertRow(-1)

        var userId = row.insertCell(-1)
        userId.innerHTML = r.userId

        var firstName = row.insertCell(-1)
        firstName.innerHTML = r.firstName

        var lastName = row.insertCell(-1)
        lastName.innerHTML = r.lastName

        var email = row.insertCell(-1)
        email.innerHTML = r.email

        var gender = row.insertCell(-1)
        gender.innerHTML = r.gender

        var lastConnectedAddress = row.insertCell(-1)
        lastConnectedAddress.innerHTML = r.lastConnectedAddress
    })
}



window.onload = async () => {

    await getUsers()
        .then(response => renderRows(response))
        .catch(error => console.log(error))

}




