
    class Password {
        constructor(inputElement) {
            this.inputElement = inputElement;
            this.visible = false;
        }
        toggleVisibility() {
            this.visible = !this.visible;
            this.inputElement.type = this.visible ? 'text' : 'password';
            handlePasswordVisibility()
        }
    }
    function handlePasswordVisibility() {
        const password2 = document.getElementById('password2');
        const labelPassword2 = document.getElementById('labelPassword2')
        if (password.visible) {
            password2.style.display = 'none'
            labelPassword2.style.display = 'none'
        } else {
            password2.style.display = 'inline'
            labelPassword2.style.display = 'inline'
        }
    }
    const password = new Password(document.getElementById('password1'))

    document.getElementById('password1').addEventListener('input', checkPasswordsMatch)
    document.getElementById('password2').addEventListener('input', checkPasswordsMatch)

    function checkPasswordsMatch() {
        const password1Value = document.getElementById('password1').value
        const password2Value = document.getElementById('password2').value
        const inputs = document.querySelectorAll('.password')

        if (password1Value !== password2Value) {
            inputs.forEach(input => {
                input.classList.add('not-matching')
            });
        } else {
            inputs.forEach(input => {
                input.classList.remove('not-matching')
            });
        }
    }

    function togglePasswordVisibility() {
        password.toggleVisibility()
    }

