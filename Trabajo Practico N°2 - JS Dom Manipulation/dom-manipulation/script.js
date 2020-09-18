
let cont = 0;

// Ejercicio 1
document.getElementById("myId").textContent = "Hello World";

//Ejercicio 2
document.getElementsByClassName("test")[0].textContent = "Hello World test";

// Ejercicio 3 
const table = document.getElementsByClassName('myTable')[0];

function insertRow(){

    cont += 1;

    var row = table.insertRow(-1)
    var cell1 = row.insertCell(-1)
    var cell2 = row.insertCell(-1)
    cell1.innerHTML = " new Value" + cont ;
    cell2.innerHTML = " new Value" + cont ;
}

function deleteRow(){
    if (table.rows.length > 1)
    table.deleteRow(-1)
}

// Ejercicio 4
const words = document.getElementsByClassName("myClass");

function highlight(){
   Array.from(words).forEach( element =>{
        element.style.color = "blue"
        element.style.fontSize = "20px"
    });
}