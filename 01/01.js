let firstparameter1 = 1 //1 кВт;
let secondparameter = 2.44 //ціна 1 кВт;
let firstresult = firstparameter1 * 100 //використані кВт за місяць;
let result1 = firstresult * secondparameter; //ціна за електроенергію за місяць;


let firstparameter = prompt("Введите количество использованных киловатт"); //юзер вводит количество использованных киловатт;
let usedkilowats = parseFloat(firstparameter);//преобразуем полученный результат в число (нашел в интернете);
let result = usedkilowats * 2.44;// умножаем введенные юзером данные на 2.44 (цена за один квт);
alert("К оплате: " + result.toFixed(2) + " грн.");// он получает алерт что ему надо оплатить за 100 квт 244 гривны (нашел способ в интернете);