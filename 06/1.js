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

//
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
