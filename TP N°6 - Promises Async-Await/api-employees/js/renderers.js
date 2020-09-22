import { deleteEmployee } from './services.js'
import { State } from './state.js';

export function renderTable(employees, companies) {
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
                await deleteEmployee(employee.employeeId);
                await State.update();
                $(deleteModal).modal('hide');
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

export function renderOptionCompanies(companies){
    const select = document.getElementById("company")
    while (select.firstChild) select.removeChild(select.firstChild)
    companies.forEach(c => {
        const option = document.createElement('option');
        option.innerHTML = c.name;
        select.appendChild( option );
    })
}