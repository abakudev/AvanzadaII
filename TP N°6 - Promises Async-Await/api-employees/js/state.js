import { getEmployees, getCompanies } from "./services.js";

export const State = (function () {
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