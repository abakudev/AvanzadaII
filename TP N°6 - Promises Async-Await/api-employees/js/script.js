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

function getEmployees() {
    return get(`${apiUrl}/Employee`)
}

function getCompanies() {
    return get(`${apiUrl}/Company`)
}

function addEmployee(json){
    return add(`${apiUrl}/Employee`, json);
}

function deleteEmployee(id){
    return remove(`${apiUrl}/Employee/`+id);
}


const State = (function () {
    let instance; 

    async function createState(params) {
        const employees = await getEmployees() || [];
        const companies = await getCompanies() || [];

        return {
            employees,
            companies,
            deletedEmployee: null
        }
    }

    return {
        async get(name) {
            if (!instance) {
                instance = await createState();
            }
            return name ? instance[name] : instance;
        },
        async update () {
            const employees = await getEmployees() || [];
            instance = instance || {};
            instance.employees = employees;
        },
        set (name, value) {
            instance[name] = value;
        }
    }
    
})()


async function createEmployee(formElement) {
    var formData = new FormData(formElement);
    var employeeId = (await State.get('employees')).length + 1;
    var firstName = formData.get("firstName");
    var lastName = formData.get("lastName");
    var email = formData.get("email");
    var companyName = formData.get('company');

    const company = (await State.get('companies')).find(company => company.name === companyName) || {};

    let json = {
        "employeeId": parseInt(employeeId),
        "companyId": parseInt(company.companyId),
        "firstName": firstName,
        "lastName": lastName,
        "email": email
    }

    try {
        $('#addEmployeeModal').modal('hide');
        await addEmployee(json);
        await State.update();
        const state = await State.get();
        renderTable(state.employees, state.companies);
    } catch (e) {
        console.error(e);
    }
}

function renderTable(employees, companies) {
    const table = document.getElementById("table").getElementsByTagName('tbody')[0]
    while (table.firstChild) table.removeChild(table.firstChild)
    employees.forEach(employee => {
        const row = table.insertRow(-1)

        const employeeId = row.insertCell(-1)
        employeeId.innerHTML = employee.employeeId

        const firstName = row.insertCell(-1)
        firstName.innerHTML = employee.firstName

        const lastName = row.insertCell(-1)
        lastName.innerHTML = employee.lastName

        const email = row.insertCell(-1)
        email.innerHTML = employee.email

        const company = companies.find(c => employee.companyId === c.companyId);

        const companyName = row.insertCell(-1)
        companyName.innerHTML = company.name

        const deleteModal = "#deleteEmployeeModal";

        const deleteLink = document.createElement("a");
        deleteLink.innerHTML = `
            <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
        `;
        deleteLink.className = "delete";
        deleteLink.href = deleteModal
        deleteLink.dataset.toggle = "modal";

        deleteLink.addEventListener('click', (e) => {
            async function submit (e) {
                e.preventDefault();
                document.querySelector(`${deleteModal} form`).removeEventListener('submit', submit);
                $(deleteModal).modal('hide');
                await deleteEmployee(employee.employeeId);
                await State.update();
                const state = await State.get();
                renderTable(state.employees, state.companies);
            }


            document.querySelector(`${deleteModal} form`).addEventListener('submit', submit);
            $(deleteModal).on('hide.bs.modal', e => {
                document.querySelector(`${deleteModal} form`).removeEventListener('submit', submit);
            })
        });

        const deletedContainer = document.createElement("td");
        deletedContainer.appendChild(deleteLink)


        const deleteButton = row.insertCell(-1);
        deleteButton.appendChild(deletedContainer);
    })
}

function renderOptionCompanies(companies){
    const select = document.getElementById("company")
    while (select.firstChild) select.removeChild(select.firstChild)
    companies.forEach(c => {
        const option = document.createElement('option');
        option.innerHTML = c.name;
        select.appendChild( option );
    })
}

function generateListeners() {
    $('.addEmployeeForm').submit(async (e) => {
        e.preventDefault();
        await createEmployee(e.target);
    });
}

window.onload = async () => {

    const employees = await State.get('employees') || [];
    const companies = await State.get('companies') || [];

    renderTable(employees, companies);
    renderOptionCompanies(companies);
    generateListeners();
}
