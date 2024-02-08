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
                parent: null,
                children: [
                    {
                        tagName: "span",
                        parent: 0,
                        children: ["Enter a data please:"]
                    },
                    {
                        tagName: "br",
                        parent: 0
                    },
                    {
                        tagName: "input",
                        parent: 0,
                        attrs: [{ name: "type", value: "text" }, { name: "id", value: "name" }]
                    },
                    {
                        tagName: "input",
                        parent: 0,
                        attrs: [{ name: "type", value: "text" }, { name: "id", value: "surname" }]
                    }
                ]
            },
            {
                tagName: "div",
                parent: null,
                children: [
                    {
                        tagName: "button",
                        parent: 1,
                        attrs: [{ name: "id", value: "ok" }],
                        children: ["OK"]
                    },
                    {
                        tagName: "button",
                        parent: 1,
                        attrs: [{ name: "id", value: "cancel" }],
                        children: ["Cancel"]
                    }
                ]
            }
        ]
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
    const obj = { ...arr }
    const { 0: a, 1: b, ...rest } = obj
    const length = arr.length;
    console.log(a)
    console.log(b)
    console.log(rest)
    console.log(length)
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
    }
    let formHTML = '<form>'
    for (const key in car) {
        let inputType = 'text'
        let extraAttributes = ''
        let inputValue = car[key]
        if (typeof car[key] === "number") {
            inputType = "number";
        } else if (typeof car[key] === "boolean") {
            inputType = "checkbox";
            extraAttributes = car[key] ? ' checked' : ''
            inputValue = ''
        }
        formHTML += `<label>${key}: <input type="${inputType}" value="${inputValue}"${extraAttributes}></label><br>`
    }
    formHTML += '</form>'
    document.body.innerHTML += formHTML
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
    ]
    let columns = []
    persons.forEach(person => {
        Object.keys(person).forEach(key => {
            if (!columns.includes(key)) {
                columns.push(key)
            }
        })
    })
    let tableHTML = '<table><thead><tr>'
    columns.forEach(column => {
        tableHTML += `<th>${column}</th>`
    })
    tableHTML += '</tr></thead><tbody>'
    persons.forEach(person => {
        tableHTML += '<tr>'
        columns.forEach(column => {
            tableHTML += `<td>${person[column] !== undefined ? person[column] : ''}</td>`
        })
        tableHTML += '</tr>'
    })
    tableHTML += '</tbody></table>'
    document.body.innerHTML += tableHTML;
}
