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

import { State } from "./state.js";
import { renderTable, renderOptionCompanies } from "./renderers.js";
import { generateListeners } from "./listeners.js";

window.onload = async () => {

    const employees = await State.get('employees') || [];
    const companies = await State.get('companies') || [];

    renderTable(employees, companies);
    renderOptionCompanies(companies);
    generateListeners();
}
