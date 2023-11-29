//str greetings
let str = prompt("What is your name?")
alert("Hello, " + str)

//str gopnik
let string = prompt("Type some text here with ,")
let resultinput = string.split(',').join(', блін')
alert(resultinput + ' блін')

//str capitalize
let str = "cANBerRa"
let result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
console.log(result)

//str word count
let str = "Some typed text"
let array = str.split(" ")
let wordcount = array.length
console.log("Words in string: " + wordcount)

//str credentials
let name = prompt("Your name").trim()
let surname = prompt("Your surname").trim()
let fathername = prompt("Your fathername").trim()
activename = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
activesurname = surnamestr.charAt(0).toUpperCase() + surname.slice(1).toLowerCase()
activefathername = fathername.charAt(0).toUpperCase() + fathername.slice(1).toLowerCase()
fullname = activename + " " + activesurname + " " + activefathername
console.log(fullname)

//str beer
let str = "Було жарко. Василь пив пиво вприкуску з креветками";
let words = str.split(' ');
for (let i = 0; i < words.length; i++) {
    if (words[i] === 'пиво') {
        words[i] = 'чай';
    }
}
let newStr = words.join(' ');
console.log(newStr);

//str no tag
let str = "якийсь текст, в якому є один тег <br /> і всяке інше"
let start = str.indexOf("<");
let end = str.indexOf(">");
let result = str.slice(0, start) + str.slice(end + 1); //+1 добавляю потому что без него в результате оставался > (нагуглил в интернете)
console.log(result);

//str big tag
let str = "якийсь текст у якому є один тег <br /> і всяке інше"
let start = str.indexOf("<");
let end = str.indexOf(">");
let tag = str.slice(start, end + 1);
let uppertag = tag.toUpperCase();
let result = str.slice(0, start) + uppertag + str.slice(end + 1)
console.log(result)

//str new line
let str = prompt("type some text with \\n for new line");
let multilinestr = str.split("\\n").join("\n");
console.log(multilinestr)

//youtube 
function youtube() {
    const userinput = prompt("Link the youtube video");
    const link = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const ytid = userinput.match(link);
    console.log(ytid)
    document.write(`<iframe src="https://www.youtube.com/embed/${ytid[1]}"
    width="560" height="315"
    frameborder="0"
    allowfullscreen>
    </iframe>`)
}
youtube()
