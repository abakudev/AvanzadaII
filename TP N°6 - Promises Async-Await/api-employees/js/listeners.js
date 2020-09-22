import { createEmployee } from "./form.js";

export function generateListeners() {
    $('.addEmployeeForm').submit(async (e) => {
        e.preventDefault();
        await createEmployee(e.target);
    });
}