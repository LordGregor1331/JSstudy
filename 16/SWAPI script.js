// SWAPI Links

    async function fetchWithNestedUrls(url) {
        const fetchData = async (url) => {
            const response = await fetch(url)
            if (!response.ok) throw new Error(`Could not fetch ${url}`)
            return await response.json()
        }
        const processObject = async (obj) => {
            if (typeof obj === 'string' && obj.startsWith('https://swapi.dev/api/')) {
                return fetchData(obj)
            } else if (Array.isArray(obj)) {
                return Promise.all(obj.map(item => processObject(item)))
            } else if (typeof obj === 'object' && obj !== null) {
                const processedEntries = await Promise.all(
                    Object.entries(obj).map(async ([key, value]) => {
                        return [key, await processObject(value)]
                    })
                )
                return Object.fromEntries(processedEntries)
            } else {
                return obj
            }
        }
        const initialData = await fetchData(url)
        return processObject(initialData)
    }
    fetchWithNestedUrls("https://swapi.dev/api/people/20/")
    .then(data => console.log(JSON.stringify(data, null, 4)))
    .catch(error => console.log(error))

    //PAGE DISPLAY
function displayData(data, container) {
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        const ul = document.createElement('ul')
        Object.entries(data).forEach(([key, value]) => {
            const li = document.createElement('li')
            if (typeof value === 'object') {
                li.textContent = `${key}: `
                li.appendChild(displayData(value, container))
            } else {
                li.textContent = `${key}: ${value}`
            }
            ul.appendChild(li);
        });
        return ul;
    } else if (Array.isArray(data)) {
        const ul = document.createElement('ul')
        data.forEach(item => {
            const li = document.createElement('li')
            li.appendChild(displayData(item, container))
            ul.appendChild(li)
        });
        return ul
    } else {
        const span = document.createElement('span');
        span.textContent = data
        return span
    }
}
const container = document.getElementById('data-container');
fetchWithNestedUrls("https://swapi.dev/api/people/20/")
    .then(data => {
        const dataElement = displayData(data, container)
        container.appendChild(dataElement)
    })
    .catch(error => {
        console.error(error)
        container.textContent = 'Failed to fetch data';
    });