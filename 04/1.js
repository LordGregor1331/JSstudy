//number: odd
let num = prompt("type number here");
if (!isNaN(num)){
    if (num % 2 === 0) {
        alert("The number is even");
    }
    else {
        alert("The number is odd")
    }
} else {
    alert("Type correct number")
}

//String lexics
let words = prompt("type some text here");

//Boolean
let firstquestion = confirm("Do you want to go to the restaurant")
if (firstquestion) {
    alert("Thanks");
}
else {
    alert("Why?");
} // консоль запоминает ответ как true/false;
let secondquestion = confirm("Would you recommend me to watch \"Napoleon\"?")
if (secondquestion) {
    alert("Okay, i'll buy some tickets")
}
else {
    alert("You did not like it?")
}
let thirdquestion = confirm("Maybe coffee?") ? alert("How much sugar?") : "Maybe tea?"; //но консоль не сохраняет значение в переменных, и при выводе thirdquestion будет undefined;

//Comparison sizes
let ukrsizejackets = prompt("Type jacket's ukrainian size (from 36 to 54)");
if (!isNaN(ukrsizejackets)){
    if (ukrsizejackets < 36) {
        alert("Incorrect size")
    }
    if (ukrsizejackets <= 40 && ukrsizejackets >= 36) {
        alert("Your US size - S")
    } else if (ukrsizejackets >= 41 && ukrsizejackets <= 42) {
        alert("Your US size - M")
    } else if (ukrsizejackets >= 43 && ukrsizejackets <= 46) {
        alert("Your US size - L")
    } else if (ukrsizejackets >= 47 && ukrsizejackets <= 50) {
        alert("Your US size - XL")
    } else if (ukrsizejackets >= 51 && ukrsizejackets <= 54) {
        alert("Your US size - XXL")
        }
} else {
    alert("Type the number please")
}
let ukrsizebra = prompt("Type bra's and panties ukrainian size (from 42 to 56")
if (!isNaN(ukrsizebra)) {
    if (ukrsizebra >= 42 && ukrsizebra <= 43) {
        alert ("Your international size - XXS")
    }
    else if (ukrsizebra >= 44 && ukrsizebra <= 45) {
        alert ("Your international size - XS")
    }
    // etc
}else {
    alert("Type correct number")
}

//Ternary
confirm("Are you woman? (ckick OK if yes)") ? alert("You are woman") : alert("You are man")

//Prompt: or
let age = prompt("Type your age")
if (age === null || age === "") {
    alert("Type your age, please")
} else {
    let years = parseInt(age)
    if (isNaN(years)) {
        alert("Use numbers, please")

    } else {
        alert("Your age: " + years) 
    }
}
// Confirm or this days
let shopping = confirm("Shopping?")
shopping || alert("You are bad man")
//OR
let shopping = confirm("Shopping?")
if (!shopping) {
    alert("You are bad man")
}

//Default: or
let name = prompt("Type your name, sir/madam")
name = name || "Ivan";
let surname = prompt("Type your surname, sir/madam")
surname = surname || "Ivanov";
let middlename = prompt("Type your middle name, sir/madam")
middlename = middlename || "Ivanovich"
alert(name + surname + middlename) 

//Default if
let name = prompt("Type your name, sir/madam")
if (name === "" || name === null) {
    name = "Ivan"
}
let surname = prompt("Type your surname, sir/madam")
if (surname === "" || surname === null) {
    surname = "Ivanov"
}
let middlename = prompt("Type your middle name, sir/madam")
if (middlename === "" || middlename === null) {
    middlename = "Ivanovich"
}
alert(name + surname + middlename)

//login and password
let login = prompt("Type your login");
if (login === "admin") {
    let password = prompt("Type your password")
    if (password === "qwerty") {
        alert("Successfully!")
    }
    else {
        alert("Incorrect password")
    }
} else {
    alert("Incorrect login")
}

//Currency exchange
let currency = prompt("type your currency (usd, eur, gbp)");
currency = currency.toUpperCase();
let course = confirm("Buy (ok) or sell (cancel)")
let rate;
if (currency === "USD") {
    rate = course ? 38.7 : 37.8;
} else if (currency === "EUR"){
    rate = course ? 41.6 : 40.3;
} else if (currency === "GBP") {
    rate = course ? 48.7 : 46.9;
} else {
    alert("Incorrect currency")
}
let amount = prompt("Type amount of " + currency + " to exchange:")
amount = parseFloat(amount);
if (isNaN(amount)) {
    alert("Incorrect value")
} else {
    let result = course ? amount * rate : amount / rate;
    alert (result.toFixed(2) + ("UAH"))
}

//Scissors paper rock
let value = prompt("Scissors paper rock?")
value = value.toLowerCase();
let answer = Math.random(); 
if (answer <= 0.333) {
    answer = "scissors";
    alert("Scissors")
} else if (answer >= 0.334 && answer <= 0.666) {
    answer = "rock";
    alert("Rock")
} else if (answer >= 0.667 && answer <= 1) {
    answer = "paper";
    alert("Paper")
}
if (value === "scissors") {
    if (answer === "scissors") {
        alert("No winner")
    } else if (answer === "rock") {
        alert("You lose")
    } else if (answer === "paper") {
        alert("You win!")
    }
} else if (value === "rock") {
    if (answer === "scissors") {
        alert("You win")
    } else if (answer === "rock") {
        alert("No winner")
    } else if (answer === "paper") {
        alert("You lose")
    }
} else if (value === "paper") {
    if (answer === "scissors") {
        alert("You lose")
    } else if (answer === "rock") {
        alert("You win")
    } else if (answer === "paper") {
        alert("No winner")
    }
} else {
    alert("Incorrect value")
}