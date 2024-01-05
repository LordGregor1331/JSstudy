//Literals
{
    const cat = {
        legs : "paws",
        food : "milk",
        height : "23 cm",
        skin : "wool",
    }
}

//Literals expand
{
    let firstparameter = prompt("Type the first key");
    let firstvalue = prompt("Type the first value");
    let secondparameter = prompt("Type second key");
    let secondvalue = prompt("Type second value");
    const result = {
        [firstparameter] : firstvalue,
        [secondparameter] : secondvalue
    }
    console.log(result)
}

//Literals copy
{
    let firstparameter = prompt("Type third key");
    let firstvalue = prompt("Type third value");
    const person = {
        name: "Jack",
        surname: "London"
    }
    const p2 = {
        ...person,
        [firstparameter] : firstvalue
    }
    console.log(p2)
}

//HTML TREE + PARENT + CHANGE OK
{
    let table = {
        tagName: "body", 
        children: [
            {
                tagName: "div",
                parent : null,
                children: [
                    {
                        tagName: "span",
                        parent : 0,
                        children: ["Enter a data please:"]
                    },
                    {
                        tagName: "br",
                        parent : 0
                    },
                    {
                        tagName: "input",
                        parent : 0,
                        attrs: [
                            {
                                name: "type",
                        value: "text"
                            },
                            {
                                name: "id",
                        value: "name"
                            }
                        ]
                    },
                    {
                        tagName: "input",
                        parent : 0,
                        attrs: [
                            {
                                name: "type",
                        value: "text"
                            },
                            {
                                name: "id",
                                value: "surname"
                            }
                        ]
                    }
                ]
            },
            {
                tagName: "div",
                parent : null,
                children :[
                    {
                        tagName: "button",
                        parent : 1,
                        attrs: [
                            {
                                name: "id",
                                value: "ok"
                            }
                        ],
                        children: ["OK"]
                    },
                    {
                        tagName: "button",
                        parent : 1,
                        attrs: [
                            {
                                name: "id",
                                value : "cancel"
                            }
                        ],
                        children : ["Cancel"]
                    }
                ]
            }
        ]
    }
    {
        const { children: [firstdiv] } = table;
        const { children: [span] } = firstdiv;
        const spantext = span.children[0];
        console.log(spantext);
    }
    {
        const { children: [, seconddiv] } = table;
        const { children: [button1, button2] } = seconddiv;
        const secondbuttontext = button2.children[0];
        console.log(secondbuttontext);
    }
}

//Destruct array
{
    let arr = [1, 2, 3, 4, 5, "a", "b", "c"]
    const [even1, even2] = arr.filter(x => x % 2 === 0);
    const [odd1, odd2, odd3] = arr.filter(x => x % 2 !== 0)
    const letters = arr.filter(x => typeof x === "string"); //выводился пустой массив, пришлось гуглить
    console.log(even1, even2)
    console.log(odd1, odd2, odd3)
    console.log(letters)
}

//Destruct string
{
    let arr = [1, "abc"]
    const [number, str] = arr;
    const [letter1, letter2, letter3] = str;
    console.log(letter1, letter2, letter3)
}

//Destruct 2
{
    let obj = {
        name: 'Ivan',
        surname: 'Petrov',
        children: [{ name: 'Maria' }, { name: 'Nikolay' }]
    }
    const { children: [{ name: name1 }, { name: name2 }] } = obj;
}

//Destruct 3
{
    let arr = [1, 2, 3, 4, 5, 6, 7, 10]
    const [a, b, ...rest] = arr;
    const length = arr.length;
}

//Copy delete
{
    const cat = {
        legs: "paws",
        food: "milk",
        height: "23 cm",
        skin: "wool",
    }
    let deletedkey = "food";
    const { [deletedkey]: keytodelete, ...newCat } = cat;

    console.log(newCat);
}

//Currency real rate
{
    const inputCurrency = prompt("Type first currency name").toUpperCase();
    const targetCurrency = prompt("Type the currency you want to convert to").toUpperCase();
    const amount = +prompt("Type the cash value")
    fetch(`https://open.er-api.com/v6/latest/${inputCurrency}`)
        .then(res => res.json())
        .then(data => {
            const exchangeRate = data.rates[targetCurrency];
            if (exchangeRate) {
                const result = amount * exchangeRate;
                console.log(`Convertation proccess ${amount} ${inputCurrency} in ${targetCurrency} = ${result}`)
            } else {
                console.log("Incorrect value")
            }
        })
} 
//Currency drop down
{
    const inputCurrency = prompt("Type first currency name").toUpperCase();
    const targetCurrency = prompt("Type the currency you want to convert to").toUpperCase();
    fetch(`https://open.er-api.com/v6/latest/${inputCurrency}`)
        .then(res => res.json())
        .then(data => {
            const currencies = Object.keys(data.rates); 
            if (currencies.length === 0) {
                console.log('Валюти не знайдено в списку.');
            } else {
                let selectHTML = '<select>';
                for (const currency of currencies) {
                    selectHTML += `<option value="${currency}">${currency}</option>`;
                }
                selectHTML += '</select>';
                document.write(selectHTML);
            }
        })
}

//Currency table
{
    const inputCurrency = prompt("Type first currency name").toUpperCase();
    const targetCurrency = prompt("Type the currency you want to convert to").toUpperCase();
    const amount = +prompt("Type the cash value")
    fetch(`https://open.er-api.com/v6/latest/${inputCurrency}`)
        .then(res => res.json())
        .then(data => {
            const exchangeRate = data.rates[targetCurrency];
            if (exchangeRate) {
                const result = amount * exchangeRate;
                const table = `
                <table border = "1" cellpadding = "6"
                <tbody>
                <tr>
                <td>${amount} ${inputCurrency}
                <td>${result} ${targetCurrency}
                </tr>
                </tbody>
                </table>`
                document.body.innerHTML = table;
            }
            })
}

//form
{
    const car = {
        "Name": "chevrolet chevelle malibu",
        "Cylinders": 8,
        "Displacement": 307,
        "Horsepower": 130,
        "Weight_in_lbs": 3504,
        "Origin": "USA",
        "in_production": false
    };
    const form = document.createElement("form")
    for (const key in car) {
        const label = document.createElement("label")
        label.textContent = key + ": "
        const input = document.createElement("input")
        if (typeof car[key] === "number") {
            input.type = "number"
        } else if (typeof car[key] === "boolean") {
            input.type = "checkbox"
            input.checked = car[key]
        } else {
            input.type = "text"
        }
        input.value = car[key]
        label.appendChild(input)
        form.appendChild(label)
    }
    document.body.appendChild(form)
}

//table
{
    const persons = [
        {
            name: 'Марія',
            fatherName: 'Іванівна',
            surname: 'Іванова',
            sex: 'female'
        },
        {
            name: 'Миколай',
            fatherName: 'Іванович',
            surname: 'Іванов',
            age: 15
        },
        {
            name: 'Петро',
            fatherName: 'Іванович',
            surname: 'Іванов',
            married: true
        },
    ];
    let columns = []
    for (const person of persons) {
        for (const key in person) {
            if (!columns.includes(key)) {
                columns.push(key)
            }
        }
    }
    const table = document.createElement("table")
    const tableHead = document.createElement("thead")
    const headerRow = document.createElement("tr")
    for (const column of columns) {
        const th = document.createElement("th")
        th.textContent = column
        headerRow.appendChild(th)
    }
    tableHead.appendChild(headerRow)
    table.appendChild(tableHead)
    const tableBody = document.createElement("tbody")
    for (const person of persons) {
        const row = document.createElement("tr")
        for (const column of columns) {
            const td = document.createElement("td")
            td.textContent = person[column] !== undefined ? person[column] : ""
            row.appendChild(td)
        }
        tableBody.appendChild(row)
    }
    table.appendChild(tableBody)
    // console.log(table.outerHTML)
    document.body.appendChild(table)
}