//Temperature
{
    const temperature = (celcius) => {
        const fahrenheit = (celcius * 9 / 5) + 32;
        return fahrenheit
    }
    // const tempc = 25 for checking
    // const tempf = temperature(tempc)
    // console.log(tempf)
}

//RGB
{
    const RGB = (r, g, b) => {
        const red = r.toString(16).padStart(2, '0');
        const green = g.toString(16).padStart(2, '0');
        const blue = b.toString(16).padStart(2, '0');
        const result = `${red}${green}${blue}`
        return result
    }
}

//Flats
{const findapartment = (entrances, floors, apartments, apartmentnumber) => {
    const totalapartments = entrances * floors * apartments;
    if (apartmentnumber < 1 || apartmentnumber > totalapartments) {
        return { floors: 0, entrances: 0 }
    }
    const entrance = Math.ceil(apartmentnumber / (floors * apartments))
        apartmentnumber = (apartmentnumber - 1) % (floors * apartments) + 1;
    const floor = Math.ceil(apartmentnumber / apartments);
    return { entrance, floor }
}
const entrances = 3;
const floors = 9;
const apartments = 4;
const apartmentnumber = 37;
const ind = findapartment(entrances, floors, apartments, apartmentnumber)
console.log(ind)
}

//Credentials
{
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    function credential() {
        let name = prompt("Type name");
        let surname = prompt("Type surname");
        let fathername = prompt("type fathername");
        name = capitalize(name);
        surname = capitalize(surname);
        fathername = capitalize(fathername);
        let fullname = `${name}${surname}${fathername}`
        return {
            name,
            surname,
            fathername,
            fullname
        }
    }
}

//New line
{
    function newline(string) {
        const stringnewline = string.split("\\n").join("\n");
        return stringnewline;
    }
    const input = prompt("type some text with '\\n'")
    const stringnewline = newline(input)
    console.log(stringnewline)
}

//prompt or
{
    const promptor = (prompttext, value) => prompt(prompttext) || value;
    const userinput = promptor("Type text", "Default")
    console.log(userinput)
}

//Login and password
{
    const logandpass = (login, pass) => {
        const enterlogin = prompt("Введіть логін:");
        const enterpassword = prompt("Введіть пароль:");
        const isCorrect = enterlogin === login && enterpassword === pass;
        return isCorrect
    }
    const login = "admin";
    const pass = "qwerty";
    const successfull = logandpass(login, pass);
    if (successfull) {
        alert("Successfully")
    } else {
        alert("Try again")
    }
}

//For Multiply table
function multiplytablehtml(tabledata) {
    let tableHTML = "<table border = '1'>";
    for (const row of tabledata) {
        tableHTML += "/<tr";
        for (const cell of row) {
            tableHTML += `<td>${cell}</td>`
        }
        tableHTML += "</tr";
    }
    tableHTML += "</table";
    return tableHTML;
}
const multiplytable = [];
for (let i = 0; i <= 5; i++) {
    const row = [];
    for (let j = 0; j <= 5; j++) {
        row.push(i * j);
    }
    multiplytable.push(row);
}
const tableHTML = multiplytablehtml(multiplytable);
document.write(tableHTML)

//filter lexics
{   
        function filterlexics(inputstr, badwords) {
        const words = inputstr.split(" ");
            const filteredwords = words.filter(word => !badwords.includes(word.toLowerCase()));
            const filteredstr = filteredwords.join(" ");
            return filteredstr;
    }
    const badlexics = ["fuck", "ass", "bitch"];
    const inputstr = prompt("Введіть текст:");
    const filteredtext = filterlexics(inputstr, badlexics);
    console.log(filteredtext);
}

//Array of objects sort
var persons = [
    { name: "Іван", age: 17 },
    { name: "Марія", age: 35 },
    { name: "Олексій", age: 73 },
    { name: "Яків", age: 12 },
]
function sort(arr, field, ascending = true) {
    if (ascending) {
        arr.sort((a, b) => {
            if (a[field] > b[field]) return -1;
            if (a[field] < b[field]) return 1;
            return 0
        })
    }
}
sort(persons, "age");
console.log("sotring by age", persons)

//form
{
    function formFromObject(obj) {
        const form = document.createElement("form")
        for (const key in obj) {
            const label = document.createElement("label")
            label.textContent = key + ": "
            const input = document.createElement("input")
            if (typeof obj[key] === "number") {
                input.type = "number"
            } else if (typeof obj[key] === "boolean") {
                input.type = "checkbox"
                input.checked = obj[key]
            } else {
                input.type = "text"
            }
            input.value = obj[key]
            label.appendChild(input)
            form.appendChild(label)
        }
        document.body.appendChild(form)
    }
    //example
    const me = {
        "name": "Jack",
        "age": 25,
        "surname": "London",
        "government" : "Great Britain"
    }
    formFromObject(me)
}

//Table
{
    function SortTable(data, sortBy, sortOrder) {
        data.sort((a, b) => {
            const firstValue = a[sortBy];
            const secondValue = b[sortBy];
            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        })
        const table = document.createElement("table");
        const tableHead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const columns = Array.from(new Set(sortedData.flatMap(item => Object.keys(item))));
    }
}

//calc func
function calculateElectricityCost() {
    let firstParameter = +prompt("Введите количество использованных киловатт");
    if (!isNaN(firstParameter)) {
        let result = firstParameter * 2.44;
        alert("To pay " + result.toFixed(2) + " UAH");
    } else {
        alert("Incorrect value");
    }
}
calculateElectricityCost()