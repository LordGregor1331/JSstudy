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
{
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
}

//createPersonClosureDectract

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
    const a = createPersonClosureDestruct(createPerson("Вася", "Пупкін"));
    const b = createPersonClosureDestruct({ name: 'Миколай', age: 75 });

    console.log(a.getName());
    a.setAge(15);
    console.log(a.getAge());
}

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