//fetch basic
{
    const container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)
    function JSONinTable(container, jsonData) {
        const table = document.createElement('table')
        const thead = document.createElement('thead')
        const tbody = document.createElement('tbody')
        const headerRow = document.createElement('tr')
        Object.keys(jsonData).forEach(key => {
            const th = document.createElement('th')
            th.textContent = key
            headerRow.appendChild(th)
        })
        thead.appendChild(headerRow)
        const dataRow = document.createElement('tr')
        Object.values(jsonData).forEach(value => {
            const td = document.createElement('td')
            td.textContent = value
            dataRow.appendChild(td)
        })
        tbody.appendChild(dataRow)
        table.appendChild(thead)
        table.appendChild(tbody)
        container.appendChild(table)
    }
    function fetchDisplay() {
        fetch('https://swapi.dev/api/people/1/')
            .then(res => res.json())
            .then(luke => {
                JSONinTable(container, luke)
            })
    }
    fetchDisplay()
}

//fetch improved
{
    const container = document.createElement('div')
    container.id = 'container'
    document.body.appendChild(container)
    function JSONinTable(container, jsonData) {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headerRow = document.createElement('tr');
        Object.keys(jsonData).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        const dataRow = document.createElement('tr')
        Object.entries(jsonData).forEach(([key, value]) => {
            const td = document.createElement('td')
            if (Array.isArray(value)) {
                value.forEach(item => {
                    if (typeof item === 'string' && item.includes('https://swapi.dev/api/')) {
                        const button = fetchButton(item)
                        td.appendChild(button)
                    } else {
                        td.appendChild(document.createTextNode(item + ', '))
                    }
                })
            } else if (typeof value === 'string' && value.includes('https://swapi.dev/api/')) {
                const button = fetchButton(value)
                td.appendChild(button)
            } else {
                td.textContent = value
            }
            dataRow.appendChild(td)
        })
        tbody.appendChild(dataRow)
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
    }
    function fetchButton(url) {
        const button = document.createElement('button');
        button.textContent = 'Load Data';
        button.onclick = () => {
            fetch(url)
                .then(res => res.json())
                .then(luke => {
                    container.innerHTML = '';
                    JSONinTable(container, luke);
                })
        };
        return button;
    }
    fetch('https://swapi.dev/api/people/1/')
        .then(res => res.json())
        .then(data => {
            JSONinTable(container, data)
        })
}

//promice race
{
    function fetchDataFromAPI() {
        return fetch('https://swapi.dev/api/people/1/')
            .then(res => res.json())
            .then(data => ({ result: 'fetch', data: data }))
    }
    function createDelay(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ result: 'delay' })
            }, time)
        });
    }
    const DELAY_TIME = 1000;
    Promise.race([fetchDataFromAPI(), createDelay(DELAY_TIME)])
        .then(winner => {
            if (winner.result === 'fetch') {
                console.log('Fetch won:', winner.data)
            } else {
                console.log('Delay won')
            }
        })
}

//promisify confirm
{
    function confirmPromise(text) {
        return new Promise((resolve, reject) => {
            const result = confirm(text)
            if (result) {
                resolve();
            } else {
                reject();
            }
        })
    }
    confirmPromise('Проміси це складно?')
        .then(() => console.log('не так вже й складно'))
        .catch(() => console.log('respect за посидючість і уважність'))
}

//work in progress