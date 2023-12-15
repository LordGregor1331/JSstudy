// Задание на возраст
let age = prompt("Введите ваш возраст")
let year = 2023
let yearsold = parseFloat(age)
let resultyear = year - yearsold
alert("Вы родились в:" + resultyear + " году.")

//задание на градусы
let celsi = prompt("Какая температура в Цельсиях на улице?")
let celsidegree = parseFloat(celsi)
let fahrengeith = (celsidegree * 9 / 5) + 32
alert("Температура в градусах по шкале Фаренгейта:" + fahrengeith + "градусов")

let fahrenheit = prompt("Какая температура в Фаренгейтах?");
let fahrenheitdegree = parseFloat(fahrenheit);
let celsius = (fahrenheitdegree - 32) / 1.8;
alert("Температура в градусах по шкале Цельсия: " + celsius + " градусов");

//Задание на калькулятор
let dividend = prompt("Введите деленое");
let divisor = prompt("Введите делитель");
let dividendnumber = parseFloat(dividend);
let divisornumber = parseFloat(divisor);
let resultcalc = dividendnumber / divisornumber;
alert("Результат деления: " + Math.floor(resultcalc));

//задание на валюту
const rate = 41
let currency = prompt("Сколько у вас гривен к обмену?")
let hrivny = parseFloat(currency)
let resultcurrency = hrivny / rate
alert("Вы получите" + resultcurrency.toFixed(2) + "евро")

//задание на цвет
let rednumber = prompt("Введите значение красного цвета (от 0 до 255)")
let greennumber = prompt("Введите значение зеленого цвета (от 0 до 255)")
let bluenumber = prompt("Введите значение синего цвета (от 0 до 255)")
let red = parseFloat(rednumber)
let green = parseFloat(greennumber)
let blue = parseFloat(bluenumber)
let result = '#' + //это для преобразователя 
    red.toString(16).padStart(2, '0') + //padStart нашел в интернете (чтобы добавить два значения для числа (строчки), а не одно)
    green.toString(16).padStart(2, '0') +
    blue.toString(16).padStart(2, '0');
alert("Отриманий колір у форматі #RRGGBB: " + result)

//задание на подъезд
let entrances = +prompt("Введите количество подьездов в доме")
let floors = +prompt("Введите количество этажей в доме")
let apartments = +prompt ("Введите количество квартир на этаже")
let apartmentnumber = +prompt("Введите номер квартиры")
let apartsperentrance = floors * apartments;
entrances = Math.ceil(apartmentnumber / apartsperentrance);
apartmentnumber = (apartmentnumber % apartsperentrance) || apartsperentrance;
let floor = Math.ceil(apartmentnumber / apartments);
alert("Квартира #" + apartmentnumber + " находится в  " + entrances + " подъезде на этаже " + floor++ + ".");
