//Person
{
    function Person(name, surname) {
        this.name = name
        this.surname = surname
        this.fatherName = ''
        this.getFullName = function () {
            return this.name + ' ' + (this.fatherName ? this.fatherName + ' ' : '') + ' ' + this.surname
        }
    }
    const a = new Person("Вася", "Пупкін");
    const b = new Person("Ганна", "Іванова");
    const c = new Person("Єлизавета", "Петрова");

    console.log(a.getFullName()); // Выведет 'Вася Пупкін'
    a.fatherName = 'Іванович';
    console.log(a.getFullName()); // Выведет 'Вася Іванович Пупкін'

    console.log(b.getFullName()); // Выведет 'Ганна Іванова'
}

//person Prototype

{
    function createPerson(name, surname) {
        const person = Object.create(createPerson.prototype)
        person.name = name
        person.surname = surname
        person.fatherName = ''
        return person
    }
    createPerson.prototype.getFullName = function () {
        return this.name + ' ' + (this.fatherName ? this.fatherName + ' ' : '') + ' ' + this.surname
    }
    const a = new Person("Вася", "Пупкін");
    const b = new Person("Ганна", "Іванова");
    const c = new Person("Єлизавета", "Петрова");

    console.log(a.getFullName()); // Выведет 'Вася Пупкін'
    a.fatherName = 'Іванович';
    console.log(a.getFullName()); // Выведет 'Вася Іванович Пупкін'

    console.log(b.getFullName()); // Выведет 'Ганна Іванова'
}

//Password


    function Password(parent, open) {
        const input = document.createElement('input')
        input.type = open ? 'text' : 'password'
        parent.appendChild(input)
        const toggleButton = document.createElement('button')
        toggleButton.textContent = 'Toggle password'
        parent.appendChild(toggleButton)
        let value = ''
        let isOpen = open
        function togglePassVisible() {
            isOpen = !isOpen
            input.type = isOpen ? 'text' : 'password'
            if (typeof onOpenChange === 'function') {
                onOpenChange(isOpen)
            }
        }
        toggleButton.addEventListener('click', togglePassVisible)
        function handleInputChange() {
            value = input.value
            if (typeof onChange === 'function') {
                onChange(value)
            }
        }
        input.addEventListener('input', handleInputChange)
        this.setValue = (newValue) => {
            value = newValue
            input.value = value
        }
        this.getValue = () => {
            return value
        }
        this.setOpen = (newOpenState) => {
            isOpen = newOpenState
            input.type = isOpen ? 'text' : 'password'
            if (typeof onOpenChange === 'function') {
                onOpenChange(isOpen)
            }
        }
        this.getOpen = () => {
            return isOpen;
        };
        let onChange = null;
        let onOpenChange = null;
        Object.defineProperty(this, 'onChange', {
            get: () => onChange,
            set: (callback) => {
                if (typeof callback === 'function') {
                    onChange = callback
                }
            },
        })
        Object.defineProperty(this, 'onOpenChange', {
            get: () => onOpenChange,
            set: (callback) => {
                if (typeof callback === 'function') {
                    onOpenChange = callback;
                }
            },
        })
    }
    let p = new Password(document.body, true);

    p.onChange = (data) => console.log('Password changed:', data);
    p.onOpenChange = (open) => console.log('Password visibility:', open);

    p.setValue('qwerty');
    console.log(p.getValue());

    p.setOpen(false);
    console.log(p.getOpen());


//login

    const loginContainer = document.createElement('div')
    document.body.appendChild(loginContainer)
    const username = new Password(loginContainer, true)
    username.setValue('')
    username.onChange = () => checkLoginButton()
    const password = new Password(loginContainer, true)
    password.setValue('')
    password.onChange = () => checkLoginButton()
    const loginButton = document.createElement('button')
    loginButton.textContent = 'login'
    loginButton.disabled = true
    loginContainer.appendChild(loginButton)
    function checkLoginButton() {
        const usernameValue = username.getValue();
        const passwordValue = password.getValue();
        loginButton.disabled = !(usernameValue.trim() && passwordValue.trim());
    }
    loginButton.addEventListener('click', () => {
        const usernameValue = username.getValue()
        const passwordValue = password.getValue()
        console.log('Username:', usernameValue);
        console.log('Password:', passwordValue);
    })

//Login Form constuctor

function LoginForm(parent) {
    const loginContainer = document.createElement('div')
    parent.appendChild(loginContainer)
    const username = new Password(loginContainer, true)
    username.setValue('')
    username.onChange = () => checkLoginButton();
    const password = new Password(loginContainer, true)
    password.setValue('')
    password.onChange = () => checkLoginButton();
    const loginButton = document.createElement('button')
    loginButton.textContent = 'Toggle Login'
    loginButton.disabled = true
    loginContainer.appendChild(loginButton);
    function checkLoginButton() {
        const usernameValue = username.getValue()
        const passwordValue = password.getValue()
        loginButton.disabled = !(usernameValue.trim() && passwordValue.trim())
    }
    loginButton.addEventListener('click', () => {
        const usernameValue = username.getValue()
        const passwordValue = password.getValue()
        console.log('Username:', usernameValue)
        console.log('Password:', passwordValue)
    })
    this.setUsername = (value) => {
        username.setValue(value)
        checkLoginButton()
    }
    this.getUsername = () => {
        return username.getValue()
    }
    this.setPassword = (value) => {
        password.setValue(value)
        checkLoginButton()
    }
    this.getPassword = () => {
        return password.getValue()
    }
    this.setButtonText = (text) => {
        loginButton.textContent = text
    }
    this.getButtonText = () => {
        return loginButton.textContent
    }
    this.onUsernameChange = (callback) => {
        username.onChange = callback;
    }
    this.onPasswordChange = (callback) => {
        password.onChange = callback;
    }
    this.onLoginClick = (callback) => {
        loginButton.addEventListener('click', callback);
    }
}