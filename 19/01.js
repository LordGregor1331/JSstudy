//Store class
{
    class Store {
        #reducer
        #state
        #cbs = []
        constructor(reducer, initialState) {
            this.#reducer = reducer
            this.#state = initialState
        }
        getState() {
            return this.#state
        }
        dispatch(action) {
            const nextState = this.#reducer(this.#state, action)
            if (nextState !== this.#state) {
                this.#state = nextState
                this.#cbs.forEach(cb => cb(this.#state))
            }
        }
        subscribe(cb) {
            this.#cbs.push(cb)
            return () => {
                const index = this.#cbs.indexOf(cb)
                if (index > -1) {
                    this.#cbs.splice(index, 1)
                }
            }
        }
        get state() {
            return this.getState()
        }
    }
    const actions = {
        BUY_ITEM: (state, {item, price}) => {
            if (state.store[item] > 0 && state.balance >= price) {
                return {
                    ...state,
                    store: { ...state.store, [item]: state.store[item] - 1 },
                    inventory: { ...state.inventory, [item]: state.inventory[item] + 1 },
                    balance: state.balance - price,
                }
            }
            return state
        }
    }
    function reducer(state, action) {
        const handler = actions[action.type];
        return handler ? handler(state, action.payload) : state;
    }
    const initialState = {
        store: {
            crisps: 100,
            beer: 100,
            juice: 100,
        },
        inventory: {
            crisps: 0,
            beer: 0,
            juice: 0,
        },
        balance: 500,
    }
    const store = new Store (reducer, initialState)
    store.dispatch({type: 'BUY_ITEM', payload: {item: 'crisps', price: 10}})
    console.log(store.state)
}

//Password
class Password {
    #input
    #toggleButton
    #value = ''
    #isOpen
    #onChange = null
    #onOpenChange = null
    constructor(parent, open) {
        this.#input = document.createElement('input')
        this.#input.type = open ? 'text' : 'password'
        parent.appendChild(this.#input)
        this.#toggleButton = document.createElement('button')
        this.#toggleButton.textContent = 'Toggle password'
        parent.appendChild(this.#toggleButton)
        this.#isOpen = open
        this.#toggleButton.addEventListener('click', () => this.#togglePassVisible())
        this.#input.addEventListener('input', () => this.#handleInputChange())
    }
    #togglePassVisible() {
        this.#isOpen = !this.#isOpen
        this.#input.type = this.#isOpen ? 'text' : 'password'
        this.#onOpenChange?.(this.#isOpen)
    }
    #handleInputChange() {
        this.#value = this.#input.value
        this.#onChange?.(this.#value)
    }
    setValue(newValue) {
        this.#value = newValue
        this.#input.value = this.#value
    }
    getValue() {
        return this.#value
    }
    setOpen(newOpenState) {
        this.#isOpen = newOpenState
        this.#input.type = this.#isOpen ? 'text' : 'password'
        this.#onOpenChange?.(this.#isOpen)
    }
    getOpen() {
        return this.#isOpen
    }
    set onChange(callback) {
        if (typeof callback === 'function') {
            this.#onChange = callback
        }
    }
    get onChange() {
        return this.#onChange
    }
    set onOpenChange(callback) {
        if (typeof callback === 'function') {
            this.#onOpenChange = callback
        }
    }
    get onOpenChange() {
        return this.#onOpenChange
    }
}

//RGB class
class RGB {
    #r = 0
    #g = 0
    #b = 0
    get r() {
        return this.#r
    }
    set r(value) {
        if (typeof value !== 'number' || value < 0 || value > 255) {
            throw new RangeError("Value must be between 0 and 255.")
        }
        this.#r = value
    }
    get g() {
        return this.#g
    }
    set g(value) {
        if (typeof value !== 'number' || value < 0 || value > 255) {
            throw new RangeError("Value must be between 0 and 255.")
        }
        this.#g = value
    }
    get b() {
        return this.#b
    }
    set b(value) {
        if (typeof value !== 'number' || value < 0 || value > 255) {
            throw new RangeError("Value must be between 0 and 255.")
        }
        this.#b = value;
    }
    get rgb() {
        return `rgb(${this.#r},${this.#g},${this.#b})`
    }
    set rgb(value) {
        const parts = value
            .replace("rgb(", "")
            .replace(")", "")
            .split(",")
            .map(num => parseInt(num.trim()))
        if (parts.length === 3 && parts.every(num => !isNaN(num) && num >= 0 && num <= 255)) {
            [this.#r, this.#g, this.#b] = parts;
        } else {
            throw new Error("Invalid RGB value")
        }
    }
    get hex() {
        return `#${((1 << 24) + (this.#r << 16) + (this.#g << 8) + this.#b).toString(16).slice(1).toUpperCase()}`
    }
    set hex(value) {
        if (value.length !== 7 || value[0] !== '#') {
            throw new SyntaxError("Invalid hex format.")
        }
        this.#r = parseInt(value.slice(1, 3), 16)
        this.#g = parseInt(value.slice(3, 5), 16)
        this.#b = parseInt(value.slice(5, 7), 16)
    }
}
//EXAMPLE TO USE
const color = new RGB()
color.rgb = "rgb(255, 99, 71)"
console.log(color.rgb)
console.log(color.hex)
color.hex = '#5562B2'
console.log(color.rgb)
