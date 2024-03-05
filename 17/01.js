//traffic light enhanced
const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))
function createLight() {
    const element = document.createElement('div')
    element.style.width = '100px'
    element.style.height = '100px'
    element.style.border = '1px solid black'
    element.style.borderRadius = '50%'
    element.style.margin = '10px auto'
    document.body.appendChild(element)
    return element
}
async function trafficLight(element, greenDuration, yellowDuration, redDuration) {
    while (true) {
        element.style.background = 'green'
        console.log('Green light')
        await delay(greenDuration)
        element.style.background = 'yellow'
        console.log('Yellow light')
        await delay(yellowDuration)
        element.style.background = 'red'
        console.log('Red light')
        await delay(redDuration)
    }
}

const light = createLight();
trafficLight(light, 5000, 2000, 5000);

function eventPromise(element, eventName) {
    return new Promise(resolve => element.addEventListener(eventName, resolve, { once: true }))
}
async function pedestrianTrafficLight(element, button, greenDuration, yellowDuration, redDuration, buttonDelay) {
    let buttonPressed = false
    button.addEventListener('click', () => {
        if (!buttonPressed) {
            console.log('Button pressed');
            buttonPressed = true;
            setTimeout(() => buttonPressed = false, buttonDelay);
        }
    })
    while (true) {
        const greenPromise = delay(greenDuration)
        const buttonPromise = eventPromise(button, 'click')
        await Promise.race([greenPromise, buttonPromise.then(() => delay(0))])
        element.style.background = 'yellow'
        await delay(yellowDuration)
        element.style.background = 'red'
        await delay(redDuration)
    }
}
const button = document.createElement('button')
button.textContent = 'Press the button'
document.body.appendChild(button)
pedestrianTrafficLight(light, button, 5000, 2000, 5000, 10000)


//speedTest
{
    async function speedtest(getPromise, count, parallel = 1) {
        const startTime = performance.now();
        for (let i = 0; i < count; i++) {
            const promises = []
            for (let j = 0; j < parallel; j++) {
                promises.push(getPromise())
            }
            await Promise.all(promises)
        }
        const endTime = performance.now()
        const duration = endTime - startTime
        const querySpeed = (count * parallel) / duration
        const queryDuration = duration / (count * parallel)
        const parallelSpeed = (count * parallel) / (duration / parallel)
        const parallelDuration = duration / count

        return {
            duration,
            querySpeed,
            queryDuration,
            parallelSpeed,
            parallelDuration
        }
    }
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    speedtest(() => delay(1000), 10, 10).then(result => console.log(result));
    speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)
        .then(result => console.log(result))
}

//gql
async function gql(url, query, variables = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    })
    const data = await response.json()
    return data.data
}
(async () => {
    const catQuery = `query cats($q: String){
        CategoryFind(query: $q){
            _id name
        }
    }`
    const cats = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", catQuery, { q: "[{}]" })
    console.log(cats); // Should log the list of categories

    const loginQuery = `query login($login:String, $password:String){
        login(login:$login, password:$password)
    }`;
    const token = await gql("http://shop-roles.node.ed.asmer.org.ua/graphql", loginQuery, { login: "test457", password: "123123" });
    console.log(token)
})()

//jwtDecode
function jwtDecode(token) {
    try {
        if (token && token.split(".").length === 3) {
            const tokenArr = token.split(".")
            const decodedToken = atob(tokenArr[1])
            const payload = JSON.parse(decodedToken)
            return payload
        }
        return undefined
    } catch (error) {
        return undefined
    }
}