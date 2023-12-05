//Confirms
{
    let answer = [
        confirm("Do you want some cola?"),
        confirm("And what about cheesecake?")
    ]
    console.log(answer)
}
//Prompts
{
    let useranswer = []
    useranswer[0] = prompt("What is your name?");
    useranswer[1] = prompt("How old are you?");
    useranswer[2] = prompt("Do you like cats?");
    console.log(useranswer)
}

//Item access
{
    let item = [50, 100, "gray", "bravo", 220]
    let userindex = +prompt("Type the index number please")
    if (userindex >= 0 && userindex < item.length) {
        alert("Index  " + userindex + ": " + item[userindex])
    } else {
        alert("Incorrect index")
    }
}

//Item change
{
    let change = [];
    let userindex = +prompt("Type the index number please");
    let userinput = prompt("Type the value");
    change[userindex] = userinput; //юзер вводит число от 0 и на его месте в пустом массиве появляется текст/число, которое он ввел.
    console.log(change);
}
{
    let change = [10, "bravo", 20, "alpha", "omega"]
    let userindex = +prompt("Type the index number please");
    let userinput = prompt("Type the value");
    change[userindex] = userinput; //юзер вводит индекс элемента в массиве и заменяет его на тот, что пишет в промпте (или добавляет новый)
    console.log(change)
}

//Multiply table 
{
    const multiplytable = [];
    for (let i = 0; i <= 5; i++) {
        const row = [];
        for (let j = 0; j <= 5; j++) {
            row.push(i * j);
        }
        multiplytable.push(row);
    }
    console.log(multiplytable[2][3])
}

//Index of Word
{
    let userinput = prompt("Type some text here");
    let userword = prompt("Type one word from previous text");
    let text = userinput.split(' ');
    let impword = text.indexOf(userword);
    if (impword !== -1) {
        alert(`Word "${userword}" is ${impword + 1}`)
    } else {
        alert("Not found")
    }
}
//Reverse
{
    let arr = [];
    // arr[0] = prompt("Type one word here");
    // arr[1] = prompt("Type one word here");
    // arr[2] = prompt("Type one word here");
    // arr[3] = prompt("Type one word here");
    // arr[4] = prompt("Type one word here"); //это первый способ добавления новых значений в массив
    // console.log(arr)
    arr.push(prompt ("Type one word here"));
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    console.log(arr)
    let secondarray = [];
    secondarray.push(arr.pop());
    secondarray.push(arr.pop());
    secondarray.push(arr.pop());
    secondarray.push(arr.pop());
    secondarray.push(arr.pop());
    console.log(secondarray)
}
//Reverse 2
{
    let arr = [];
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    arr.push(prompt("Type one word here"));
    let secondarray = [];
    secondarray.unshift(arr.shift());
    secondarray.unshift(arr.shift());
    secondarray.unshift(arr.shift());
    secondarray.unshift(arr.shift());
    secondarray.unshift(arr.shift());
    console.log(secondarray);
}

//Copy
{
    const copy = [...multiplytable];
    console.log(copy)
}

//Deep copy 
{
    const deepcopy = [];
    for (let i = 0; i < multiplytable.length; i++) {
        deepcopy.push(multiplytable[i].slice());
    }
    console.log(deepcopy);
}

//Array equals
{
    let arr = [1, 2, 3]
    let arr2 = arr;
    arr2 === arr;
}

//destruct
{
    let arr = prompt("Type some text")
    let [firstletter, , , , fifthletter, , , , ninthletter] = arr;
    console.log(firstletter);
    console.log(fifthletter);
    console.log(ninthletter);
}

//Destruct default
{
    let arr = prompt("Введіть рядок:");
    let [, secondLetter = '!', , fourthLetter = '!', fifthLetter = '!'] = arr;
    console.log(secondLetter);
    console.log(fourthLetter);
    console.log(fifthLetter);
}
//For alert
{
    let names = ["John", "Paul", "George", "Ringo"];
    for (let name of names) {
        alert(`Hello, ${name}`)
    }
}

//For Select Options
{
    let currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<select>"
    for (let currency of currencies) {
        str += `<option value="${currency}">${currency}</option>` 
    }
    str += "</select>"
    document.write(str);
}

//For Table Horizontal
{
    let names = ["John", "Paul", "George", "Ringo"]
    let str = "<table><tr>"
    for (let name of names) { 
        str+= `<td>"${name}</td>`
    }
    str += "</tr ></table >";
    document.write(str)
}

//For Table Vertical
{
    let names = ["John", "Paul", "George", "Ringo"]
    let str = "<table><tr>"
    for (let name of names) {
        str += `<tr><td>"${name}</td></tr>`
    }
    str += "</table>";
    document.write(str)
}
//For Table Letters
{
let currencies = ["USD", "EUR", "GBP", "UAH"];
let str = "<table>";
for (let currency of currencies) {
    str += "<tr>";
    for (let letter of currency) {
        str += `<td>${letter}</td>`;
    }
    str += "</tr>";
}
str += "</table>";
document.write(str);
}
//For Multiply Table
{
    const multiplytable = [];
for (let i = 0; i <= 5; i++) {
    const row = [];
    for (let j = 0; j <= 5; j++) {
        row.push(i * j);
    }
    multiplytable.push(row);
}
document.write("<table border='1'>")
for (const row of multiplytable) {
    document.write("<tr>");

    for (const cell of row) {
        document.write(`<td>${cell}</td>`);
    }

    document.write("</tr>");
}
document.write("</table>");
}

//Map Capitalize
{
    let userinput = prompt("Type your text here")
    let words = userinput.split(" ").map(x => x.capitalize());
    let result = words.join(" ")
    console.log(result)
}

//Filter Lexics
{
    const badlexics = ["fuck", "ass", "bitch"];
    const userinput = prompt("Type some text here")
    const words = userinput.split(" ")
    const result = !words.filter((word) => badlexics.includes(word.toLowerCase())).length;
    console.log(result)
}

//BEEP LEXICS

{
    const badlexics = ["fuck", "ass", "bitch"];
    const userinput = prompt("Type some text here")
    const words = userinput.split(" ")
    const replace = (word) =>
        badlexics.includes(word.toLowerCase()) ? "BEEP" : word;
    const replacedwords = words.map(replace)
    const result = replacedwords.join(" ")
    console.log(result)
}