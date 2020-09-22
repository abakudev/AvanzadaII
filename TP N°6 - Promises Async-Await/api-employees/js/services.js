const apiUrl = 'https://utn-avanzada2-tp6.herokuapp.com/api'

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

function add(url, json) {
    const request = new XMLHttpRequest()
    request.responseType = 'json'

    return new Promise((resolve, reject) => {
        request.open('POST', url)

        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = () => {
            if (request.status == 200 ) {
                resolve(request.response)
            } else {
                reject(request.statusText)
            }
        }
        request.onerror = () => reject(request.statusText)
        request.send(JSON.stringify(json));
    })
}

function remove(url) {
    const request = new XMLHttpRequest()
    request.responseType = 'json'
    return new Promise((resolve, reject) => {
        request.open('DELETE', url)
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

export function getEmployees() {
    return get(`${apiUrl}/Employee`)
}

export function getCompanies() {
    return get(`${apiUrl}/Company`)
}

export function addEmployee(json){
    return add(`${apiUrl}/Employee`, json);
}

export function deleteEmployee(id){
    return remove(`${apiUrl}/Employee/`+id);
}