//while confirm
{
    do {
        var answer = confirm("ok or not?")
    } while (answer === false)
}

//array fill
{
    const arr = [];
    while (true) {
        let input = prompt("Type something")
        if (input === null) {
            break;
        }
        arr.push(input)
    }
    console.log(arr)
}

//array nonpush

{
    const arr = [];
    let i = 0;
    while (true) {
        let input = prompt("Type something")
        if (input === null) {
            break;
        }
        arr[i] = input;
        i++
    }
    console.log(arr)
}

//infinite
{
    let iterations = 0;
    while (true) {
        iterations++
        if (Math.random() > 0.9) {
            break
        }
    }
    alert(iterations)
}

//empty loop
{
    while (true) { 
        let input = prompt("Type something")
        if (input === null) {
        } else {
            break;
        }
    }
    console.log("finished")
}

//progression sum
{
    let N = +prompt("type number here")
    if (!isNaN(N)) {
        let sum = 0

    for (let i = 1; i <= N; i += 3) {
        sum += i;
        }
        console.log(N, sum)
    }
}

//chess one line
{
    let row = 5;
    let str = ""
    for (let i = 0; i < row; i++) {
        str += "# "
    }
    console.log(str)
}

//numbers
{
    let str = "";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            str += j;
        }
        str += "\n"
    }
    console.log(str)
}

//chess
{
    const rows = 5;
    const columns = 8;
    let str = ""
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let symbol = (i + j) % 2 === 0 ? "#" : " "
            str += symbol;
        }
        str += "\n"
    }
    console.log(str)
}

//cubes
{
    let N = +prompt("Type some numbers")
    if (!isNaN(N)) {
        let arr = []
        for (let i = 0; i < N; i++) {
            arr.push(Math.pow(i, 3))
        }
        console.log(arr)
    }
}

//multiply table
{
    const rows = 9
    const columns = 9
    let multiplyTable = []
    for (let i = 0; i < rows; i++) {
        multiplyTable[i] = []
        for (let j = 0; j < columns; j++) {
            multiplyTable[i][j] = i * j
        }
    }
    console.log(multiplyTable[2][3])
}

//work in progress