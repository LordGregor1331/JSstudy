//createPerson
{
    function createPerson(name, surname) {
        const person = {
            name: name,
            surname: surname,
            fatherName: '', // Змінено fathername на fatherName
            getFullName: function () {
                return this.name + ' ' + (this.fatherName ? this.fatherName + ' ' : '') + this.surname;
            }
        };
        return person;
    }

    const a = createPerson("Вася", "Пупкін");
    const b = createPerson("Ганна", "Іванова");
    const c = createPerson("Єлизавета", "Петрова");

    console.log(a.getFullName()); // Виведе 'Вася Пупкін'
    a.fatherName = 'Іванович';
    console.log(a.getFullName()); // Виведе 'Вася Іванович Пупкін'

    console.log(b.getFullName()); // Виведе 'Ганна Іванова'
}

//createPersonClosure

function createPersonClosure(name, surname) {
    let _name = name;
    let _surname = surname;
    let _fatherName = '';
    let _age = 0
    function getName() {
        return _name;
    }
    function getSurname() {
        return _surname
    }
    function getFatherName() {
        return _fatherName
    }
    function getAge() {
        return _age
    }
    function getFullName() {
        return _name + ' ' + _fatherName + ' ' + _surname;
    }
    function nameCheck(newName) {
        return newName.charAt(0) === newName.charAt(0).toUpperCase()
    }
    function ageCheck(newAge) {
        return typeof newAge === 'number' && newAge >= 0 && newAge <= 100;
    }
    function setName(newName) {
        if (nameCheck(newName)) {
            _name = newName
        }
        return _name
    }
    function setSurname(newSurname) {
        if (nameCheck(newSurname)) {
            _surname = newSurname
        }
        return _surname
    }
    function setFatherName(newFatherName) {
        if (nameCheck(newFatherName)) {
            _fatherName = newFatherName
        }
        return _fatherName
    }
    function setAge(newAge) {
        if (ageCheck(newAge)) {
            _age = newAge
        }
        return _age
    }
    function setFullName(newFullName) {
        const parts = newFullName.split(' ');
        if (parts.length === 3) {
            const [newName, newFatherName, newSurname] = parts;
            if (nameCheck(newName) && nameCheck(newFatherName) && nameCheck(newSurname)) {
                _name = newName;
                _fatherName = newFatherName;
                _surname = newSurname;
            }
        }
        return _name + ' ' + _fatherName + ' ' + _surname;
    }
    return {
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName,
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName,
    }
}
const a = createPersonClosure("Вася", "Пупкін");
const b = createPersonClosure("Ганна", "Іванова");
console.log(a.getName()); // 'Вася'
a.setAge(15);
console.log(a.getAge()); // 15
a.setAge(150); // Не змінює вік, тому виводить 15
console.log(a.getAge()); // 15

b.setFullName("Петрова Ганна Миколаївна");
console.log(b.getFatherName()); // 'Миколаївна'


//createPersonClosureDectract


function createPerson(name, surname) {
    const person = {
        name: name,
        surname: surname,
        fatherName: '', // Змінено fathername на fatherName
        getFullName: function () {
            return this.name + ' ' + (this.fatherName ? this.fatherName + ' ' : '') + this.surname;
        }
    };
    return person;
}
function createPersonClosureDectract({
    name = '',
    surname = '',
    fatherName = '',
    age = 0,
} = {}) {
    let _name = name
    let _surname = surname
    let _fatherName = fatherName
    let _age = age
    function getName() {
        return _name;
    }
    function getSurname() {
        return _surname
    }
    function getFatherName() {
        return _fatherName
    }
    function getAge() {
        return _age
    }
    function getFullName() {
        return _name + ' ' + _fatherName + ' ' + _surname;
    }
    function nameCheck(newName) {
        return newName.charAt(0) === newName.charAt(0).toUpperCase()
    }
    function ageCheck(newAge) {
        return typeof newAge === 'number' && newAge >= 0 && newAge <= 100;
    }
    function setName(newName) {
        if (nameCheck(newName)) {
            _name = newName
        }
        return _name
    }
    function setSurname(newSurname) {
        if (nameCheck(newSurname)) {
            _surname = newSurname
        }
        return _surname
    }
    function setFatherName(newFatherName) {
        if (nameCheck(newFatherName)) {
            _fatherName = newFatherName
        }
        return _fatherName
    }
    function setAge(newAge) {
        if (ageCheck(newAge)) {
            _age = newAge
        }
        return _age
    }
    function setFullName(newFullName) {
        const parts = newFullName.split(' ');
        if (parts.length === 3) {
            const [newName, newFatherName, newSurname] = parts;
            if (nameCheck(newName) && nameCheck(newFatherName) && nameCheck(newSurname)) {
                _name = newName;
                _fatherName = newFatherName;
                _surname = newSurname;
            }
        }
        return _name + ' ' + _fatherName + ' ' + _surname;
    }
    return {
        getName,
        getSurname,
        getFatherName,
        getAge,
        getFullName,
        setName,
        setSurname,
        setFatherName,
        setAge,
        setFullName,
    }
}
let ab = createPersonClosureDectract(createPerson("Вася", "Пупкін"));
let bc = createPersonClosureDectract({ name: 'Миколай', age: 75 });

console.log(a.getName());
ab.setAge(15);
console.log(ab.getAge());


//isSorted + isSorted test
{
    function isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (typeof arr[i] !== 'number' || arr[i] <= arr[i - 1]) {
                return false
            }
        }
        return true
    }
    console.log(isSorted(1, 2, 3, 4))
    console.log(isSorted(2, 5, 3, 7))

    function fillArray(n) {
        const arr = [];
        for (let i = 1; i <= n; i++) {
            arr.push(i)
        }
        return arr
    }
    const numbers = fillArray(10)
    console.log(numbers)
    console.log(isSorted(numbers))
    numbers[5] = 3;
    console.log(numbers)
    console.log(isSorted(numbers))
}

//personForm

{
    function personForm(parent, person) {
        const inputs = {
            name: document.createElement('input'),
            surname: document.createElement('input'),
            fatherName: document.createElement('input'),
            age: document.createElement('input'),
            fullName: document.createElement('input')
        }
        inputs.name.value = person.getName()
        inputs.surname.value = person.getSurname()
        inputs.fatherName.value = person.getFatherName()
        inputs.age.value = person.getAge()
        inputs.fullName.value = person.getFullName()
        inputs.age.type = 'number'
        inputs.age.min = 0
        inputs.age.max = 100
        Object.values(inputs).forEach(input => parent.appendChild(input))
        inputs.name.oninput = () => {
            inputs.name.value = person.setName(inputs.name.value)
        }
        inputs.surname.oninput = () => {
            inputs.surname.value = person.setSurname(inputs.surname.value);
        }
        inputs.fatherName.oninput = () => {
            inputs.fatherName.value = person.setFatherName(inputs.fatherName.value);
        }
        inputs.age.oninput = () => {
            inputs.age.value = person.setAge(Number(inputs.age.value));
        }
        inputs.fullName.oninput = () => {
            const fullNameValue = person.setFullName(inputs.fullName.value)
            const [name, fatherName, surname] = fullNameValue.split(' ')
            inputs.name.value = name
            inputs.fatherName.value = fatherName
            inputs.surname.value = surname
        }
    }
    const div = document.createElement('div')
    div.id = 'personFormContainer'
    document.body.appendChild(div)
    const parentElement = document.getElementById('personFormContainer')
    const personObject = createPersonClosureDectract({ name: "Ганна", surname: "Іванова" })
    personObject.setAge(15)
    personObject.setFullName("Петрова Ганна Миколаївна")
    personForm(parentElement, personObject)
}

//getSetForm

function getSetForm(parent, getSet) {
    const inputs = {}
    const updateInputs = () => {
        for (const key in inputs) {
            const getMethodName = 'get' + key
            if (getSet[getMethodName]) {
                inputs[key].value = getSet[getMethodName]()
            }
        }
    }
    for (const getSetName in getSet) {
        const isGet = getSetName.startsWith('get')
        const isSet = getSetName.startsWith('set')
        if (!isGet && !isSet) continue
        const fieldName = getSetName.substring(3)
        if (!inputs[fieldName]) {
            const input = document.createElement('input')
            input.placeholder = fieldName
            if (fieldName.toLowerCase().includes('age') || fieldName.toLowerCase().includes('volume')) {
                input.type = 'number'
            } else {
                input.type = 'text'
            }
            inputs[fieldName] = input
            parent.appendChild(input)
        }
        if (isSet) {
            inputs[fieldName].oninput = () => {
                const setMethodName = 'set' + fieldName
                const value = input.type === 'number' ? parseFloat(inputs[fieldName].value) : inputs[fieldName].value
                const result = getSet[setMethodName](value)
                if (result !== undefined) inputs[fieldName].value = result
                updateInputs()
            }
        } else if (!getSet['set' + fieldName]) {
            inputs[fieldName].disabled = true
        }
    }
    updateInputs()
}