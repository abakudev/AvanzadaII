
const REGEX_NAME  = /^[a-zA-Z]{1,20}$/
const REGEX_AGE = /^\d{1,2}$/
const REGEX_EMAIL = /^.*(@outlook\.com|@icloud\.com|@gmail\.com)$/
const REGEX_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{9,20}$/


var fields = {
    "fname" : REGEX_NAME,
    "lname" : REGEX_NAME,
    "age" : REGEX_AGE,
    "email" : REGEX_EMAIL,
    "pwd" : REGEX_PWD
}

function validate() {
    for (let key in fields) {
        const element = document.getElementById(key)
        if (isValid(element, fields[key]))
            element.style.borderColor = "green"
        else
            element.style.borderColor = "red"
    }
}

function isValid(element, regex) {
    if (regex.exec(element.value) != null)
        return true
    return false;
}






