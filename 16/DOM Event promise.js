function domEventPromise(element, eventName) {
    return new Promise(resolve => {
        const eventHandler = event => {
            resolve(event)
            element.removeEventListener(eventName, eventHandler)
        };
        element.addEventListener(eventName, eventHandler)
    })
}
const button = document.createElement('button')
document.body.appendChild(button)
domEventPromise(button, 'click').then(event => console.log('event click happens', event));