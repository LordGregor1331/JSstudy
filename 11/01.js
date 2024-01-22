//makeProfileTimer
{
    function makeProfileTimer() {
        const startTime = performance.now()
        return function () {
            const endTime = performance.now()
            return endTime - startTime
        }
    }
        const timer = makeProfileTimer()
    alert('Вимiрюємо час роботи цього alert');  //якийсь код, час виконання якого ми хочемо виміряти з високою точністю
    alert(timer()); //alert повинен вивести час у мілiсекундах від виконання makeProfileTimer до моменту виклику timer(), 
    // тобто виміряти час виконання alert
    const timer2 = makeProfileTimer()
    prompt('')
    alert(`Час роботи двух аlert та одного prompt ${timer()}`)
    alert(`Час роботи prompt та попереднього alert ${timer2()}`)
}

//makeSaver
{
    function makeSaver(func) {
        let result;
        let called = false;
        return function () {
            if (!called) {
                result = func();
                called = true;
            }
            return result
        }
    }
    let saver = makeSaver(Math.random) 
    let value1 = saver()              
    let value2 = saver()             
   
    alert(`Random: ${value1} === ${value2}`)

    let saver2 = makeSaver(() => {
        console.log('saved function called');
        return [null, undefined, false, '', 0, Math.random()][Math.floor(Math.random() * 6)]
    })
    let value3 = saver2()
    let value4 = saver2()

    value3 === value4 



    let namePrompt = prompt.bind(window, 'Як тебе звуть?')
    let nameSaver = makeSaver(namePrompt)
    alert(`Привіт! Prompt ще не було!`)
    alert(`Привіт ${nameSaver()}. Щойно запустився prompt, перший та останній раз`)
    alert(`Слухай, ${nameSaver()}, го пити пиво. Адже prompt був лише один раз`)
}

//myBind
{
    function myBind(func, context, defaultArguments) {
        return function (...args) {
            const finalArguments = []
            for (let i = 0; i < defaultArguments.length; i++) {
                finalArguments[i] = defaultArguments[i] !== undefined ? defaultArguments[i] : args.shift()
            }
            return func.apply(context, finalArguments.concat(args))
        }
    }
    let pow5 = myBind(Math.pow, Math, [undefined, 5]);
    let cube = myBind(Math.pow, Math, [undefined, 3]);
    console.log(pow5(2)); // 32
    console.log(pow5(4)); // 1024
    console.log(cube(3)); // 27

    let chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5, undefined, 8, undefined, 9]);
    console.log(chessMin(-1, -5, 3, 15)); // -5

    let zeroPrompt = myBind(prompt, window, [undefined, "0"]);
    let someNumber = zeroPrompt("Введіть число");
    console.log(someNumber);

    const bindedJoiner = myBind((...params) => params.join(''), null, [undefined, 'b', undefined, undefined, 'e', 'f']);
    console.log(bindedJoiner('a', 'c', 'd')); // 'abcdef'
    console.log(bindedJoiner('1', '2', '3')); // '1b23ef'
}

//check Result
{
    function checkResult(original, validator) {
        function wrapper(...params) {
            let result
            do {
                result = original(...params)
            } while (!validator(result))
            return result
        }
        return wrapper
    }
    const numberPrompt = checkResult(prompt, x => !isNaN(+x))
    let number = +numberPrompt("Введіть число", "0")
    const gamePrompt = checkResult(prompt, x => ['камень', 'ножиці', 'папір'].includes(x.toLowerCase()))
    const turn = gamePrompt("Введіть щось зі списку: 'камень', 'ножиці', 'папір'")
}