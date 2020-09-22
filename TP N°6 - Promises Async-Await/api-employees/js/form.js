import { State } from "./state.js";
import { addEmployee } from "./services.js";
import { renderTable } from "./renderers.js";

export async function createEmployee(formElement) {
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