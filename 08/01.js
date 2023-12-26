//block
{
    let a = 10
    {
        let b = 20
        {
            let c = 30
            //a === 10, b === 20, c === 30, d === undefined

            b++
            a *= 10
        }
        {
            let c = 50
            //a === 100, b === 21, c === 50, d === undefined
            b += 500
        }
        {
            const a = 100500
            const d = "value"
            //a === 100500, b === 521, c === undefined, d === 'value
            {
                let a = -50
                b = 1000
                //a === -50, b === 1000, c === undefined, d === 'value'
            }
            //a === 100500, v === 1000, c === undefined, d === 'value
        }
        //a === 100, b === 1000, c d === undefined
    }
    //a === 100, b c d === undefined
}

//comparison if
{
    var age = + prompt("Скільки вам років?", "");
    if (age <= 0) {
        alert("Incorrect value")
    }
    else {
        if (age < 18) {
            alert("школяр");
        }
        else {
            if (age >= 18 && age <= 30) {
                alert("молодь");
            }
            else {
                if (age > 30 && age <= 45) {
                    alert("зрілість");
                }
                else {
                    if (age > 45 && age <= 60) {
                        alert("захід сонця");
                    } else {
                        if (age > 60) {
                            alert("як пенсія?");
                        } else {
                            alert("чи кіборг, чи KERNESS");
                        }
                    }
                }  
            }
        }
    }
}
 
//switch sizes
{
    let cloth = prompt("Type your clothes: jacket, panties, socks")
    if (cloth === "jacket") {
        let sizes = prompt("Type your UA size")
        switch (sizes) {
            case "40":
                alert("Your US size = 6 | S")
                break;
            case "42":
                alert("Your US size = 8 | M")
                break;
            case " 44":
                alert("Your  US size = 10 | M")
                break;
            case "46":
                alert("Your US size = 12 | L")
                break;
            case "48":
                alert("Your US size = 14 | L")
                break;
            case "50":
                alert("Your US size = 16 | XL")
                break;
            case "52":
                alert("Your US size = 18 | XL")
                break;
            case "54":
                alert("Your US size = 20 | XXL")
                break;
        }
    } else if (cloth === "panties") {
        let sizes = prompt("Type your UA size")
        switch (sizes) {
            case "40":
                alert("Your US size = 6")
                break;
            case "42":
                alert("Your US size = 8")
                break;
            case " 44":
                alert("Your  US size = 10")
                break;
            case "46":
                alert("Your US size = 12")
                break;
            case "48":
                alert("Your US size = 14")
                break;
            case "50":
                alert("Your US size = 16")
                break;
            case "52":
                alert("Your US size = 18")
                break;
            case "54":
                alert("Your US size = 20")
                break;
            case "56":
                alert("Your US size = 22")
        }
    } else if (cloth === "socks") {
        let sizes = prompt("Type your UA size")
        switch (sizes) {
            case "21":
                alert("Your US size = 8")
                break;
            case "23":
                alert("Your US size = 9")
                break;
            case "25":
                alert("Your US size = 10")
                break;
            case "27":
                alert("Your US size = 11")
                break;
        }
    } else {
        alert("Incorrect value")
    }
}

//Switch sizes function
{
    function size(cloth, sizes) {
        switch (sizes) {
            case "40":
                return "Your US size = 6 | S"
            case "42":
                return "Your US size = 8 | M"
            case "44":
                return "Your US size = 10 | M"
            case "46":
                return "Your US size = 12 | L"
            case "48":
                return "Your US size = 14 | L"
            case "50":
                return "Your US size = 16 | XL"
            case "52":
                return "Your US size = 18 | L"
            case "54":
                return "Your US size = 20 | XL"
            case "21":
                return "Your US size = 8"
            case "23":
                return "Your US size = 9"
            case "25":
                return "Your US size = 10"
            case "27":
                return"Your US size = 11"
            default:
                return "Invalid size"
        }
    }
    let cloth = prompt("Type your clothes: jacket, panties, socks")
    if (cloth === "jacket" || cloth === "panties" || cloth === "socks") {
        let sizes = prompt("Type your UA size")
        let result = size(cloth, sizes)
        alert("Your US size = " + result)
    }
    else {
        alert("Incorrect value")
    }
}

//switch if
{
    let color = prompt("Введіть колір", "");
    if (color === "red" || color === "black") {
        document.write("<div style='background-color: black; color: white;'>чорний</div>")
        document.write("<div style='background-color: red;'>червоний</div>");
    } else if (color === "blue" || color === "green") {
        document.write("<div style='background-color: blue;'>синій</div>");
        document.write("<div style='background-color: green;'>зелений</div>");
    } else {
        document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
    }
}

//No switch
{
    const noSwitch = (key, cases, defaultKey = 'default') => {
        if (key in cases) {
            cases[key]();
        } else {
            cases[defaultKey]();
         }
    }
    const drink = prompt("Що ви любите пити")
    noSwitch(drink, {
        воду: () => console.log('Найздоровіший вибір!'),
        чай() {
            console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
        },
        "пиво": () => console.log('Добре влітку, та в міру'),
        віскі: function () {
            console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
        },
        default() {
            console.log('шото я не зрозумів')
        }
    })
}

//closure calc
fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        let div = document.createElement('div')
        div.id = "currencyBox"
        document.body.appendChild(div);
        for ( const currency in data.rates) {
            if (currency in data.rates) {
                const rate = data.rates[currency]
                let button = document.createElement('button');
                button.innerText = currency
                button.onclick = () => {
                    const amount = +prompt(`Type your value in ${currency}`)
                    if (amount !== isNaN) {
                        const converted = amount / rate;
                        alert(`Value in USD: ${converted.toFixed(2)}`)
                    } else {
                        alert("Incorrect value")
                    }
                }
                div.appendChild(button);
            }
        }
    })