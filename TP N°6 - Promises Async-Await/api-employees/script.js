/**
 *   1. Listar todos los Employees con su respectiva Company. Se debe obtener los
 *      resultados de los dos endpoints siguientes y realizar un proceso de
 *      combinación en JavaScript para poder asignar a cada Employee la Company
 *      que le corresponda. (Usando GET /api/Employee y GET /api/Company).
 * 
 *   2. Agregar un nuevo Employee a la aplicación, para ello debemos investigar cómo
 *       realizar un POST contra la API y proveer el siguiente objeto JSON. (Usando
 *       POST /api/Employee).
 *      
 *   3. Eliminar un Employee de la aplicación. (Usando DELETE /api/Employee/
 *      employeeId).
 */

 
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

function add(url) {
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



function getEmployees() {
    return get(`${apiUrl}/Employee`)
}

function getCompanies() {
    return get(`${apiUrl}/Company`)
}

function addEmployee(){
    return add(`${apiUrl}/Employee`);
}

function createEmployee() {
    employeeId = document.getElementById("employeeId").value;
    companyId = document.getElementById("companyId").value;
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    email = document.getElementById("email").value;

    let json = {
        "employeeId": parseInt(employeeId),
        "companyId": parseInt(companyId),
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }

    addEmployee(json)
        .then(value => {
       console.log(value)
    });
}


function renderTable(employees, companies) {
    const table = document.getElementById("table").getElementsByTagName('tbody')[0]
    while (table.firstChild) table.removeChild(table.firstChild)
    employees.forEach(r => {
        const row = table.insertRow(-1)

        var employeeId = row.insertCell(-1)
        employeeId.innerHTML = r.employeeId

        var lastName = row.insertCell(-1)
        lastName.innerHTML = r.lastName

        var firstName = row.insertCell(-1)
        firstName.innerHTML = r.firstName

        var email = row.insertCell(-1)
        email.innerHTML = r.email

        companies.forEach( c => {
            if(r.companyId === c.companyId){
                var companyName = row.insertCell(-1)
                companyName.innerHTML = c.name
            }
        });

    })
}



window.onload = async () => {

    const employees = await getEmployees();
    const companies = await getCompanies();

    renderTable(employees, companies);
}
