//HTML TREE


    function HTMLTree(node) {
        if (!node.tagName) {
            return ''
        }
        let html = `<${node.tagName}`
        if (node.attributes) {
            for (let attribute in node.attributes) {
                html += ` ${attribute}='${node.attributes[attribute]}'`
            }
        }
        html += '>'
        if (node.children) {
            for (let child of node.children) {
                html += (typeof child === 'string') ? child : HTMLTree(child)
            }
        }
        html += `</${node.tagName}`
        return html
    }
    let table = {
        tagName: 'table',
        attributes: {
            border: "1",
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["1x1"]
                    },
                ]
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["2x1"],
                    },
                    {
                        tagName: "td",
                        children: ["2x2"]
                    },
                ]
            }
        ]
    }
    document.write(HTMLTree(table))

//DOM TREE

function domTree(parent, node) {
    if (!node.tagName) {
        return ''
    }
    let element = document.createElement(node.tagName)
    if (node.attributes) {
        for (let attribute in node.attributes) {
            element.setAttribute(attribute, node.attributes[attribute])
        }
    }
    if (node.children) {
        for (let child of node.children) {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child))
            } else {
                domTree(element, child)
            }
        }
    }
    parent.appendChild(element);
}
let table = {
    tagName: 'table',
    attributes: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"]
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"]
                },
            ]
        }
    ]
}
domTree(document.body, table);

//deep copy
function deepCopy(obj) {
    if (typeof obj === 'object' && obj !== null) {
        const copy = Array.isArray(obj) ? [] : {}
        for (const key in obj) {
            copy[key] = deepCopy(obj[key])
        }
        return copy
    }
    return obj
}
let table = {
    tagName: 'table',
    attributes: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"]
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"]
                },
            ]
        }
    ]
}
const arr = [1, 'string', null, undefined, { a: 15, b: 25, c: [1, 2, 3, 4], d: undefined, e: true }, true, false]
const arr2 = deepCopy(arr)
const table2 = deepCopy(table) //при попытке вызвать deepCopy(table) выдает [Object object]

//JSON stringify
{
    function stringify(obj) {
        if (obj === null) {
            return 'null'
        }
        switch (typeof obj) {
            case 'number':
            case 'boolean':
                return obj.toString()

            case 'string':
                return `"${obj.replace(/"/g, '\\"')}"`;

            case 'object':
                if (Array.isArray(obj)) {
                    const arrayContent = obj.map(item => stringify(item)).join(',')
                    return `[${arrayContent}]`
                } else {
                    const objectContent = Object.keys(obj)
                        .map(key => `"${key}":${stringify(obj[key])}`)
                        .join(',');
                    return `{${objectContent}}`
                }

            default:
                return 'null';
        }
    }
    const arr = [1, "string", null, undefined, { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true }, true, false]
    let table = {
        tagName: 'table',
        attributes: {
            border: "1",
        },
        children: [
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["1x1"]
                    },
                ]
            },
            {
                tagName: 'tr',
                children: [
                    {
                        tagName: "td",
                        children: ["2x1"],
                    },
                    {
                        tagName: "td",
                        children: ["2x2"]
                    },
                ]
            }
        ]
    }
    const jsonStringArr = stringify(arr)
    const jsonStringTable = stringify(table)
    console.log(JSON.parse(jsonStringArr))
    console.log(JSON.parse(jsonStringTable))
}

//Get element by ID
{
    function getElementById(idToFind) {
        try {
            // Функція walker, яка рекурсивно обходить DOM-дерево
            function walker(node) {
                // Перевірка наявності id у поточного вузла
                if (node.id === idToFind) {
                    throw node; // Викидаємо виняток з знайденим елементом
                }

                // Рекурсивний обхід дочірніх елементів
                for (let child of node.children) {
                    walker(child);
                }
            }
        }
    }
}