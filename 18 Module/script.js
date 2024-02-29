const authReducer = (state = {}, action) => {  
    const{type, token} = action
    if (type === "AUTH_LOGIN") {
        const payload = jwtDecode(token)
        if (payload) {
            localStorage.setItem('authToken', token)
            return {
                token,
                payload
            }
        }
    } else if (type === 'AUTH_LOGOUT') {
        localStorage.removeItem('authToken')
        return {}
    }
    return state
}
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

const cartReducer = (state = {}, action) => {
    const handlers = {
      'CART_ADD': () => {
        const { _id, ...goodDetails } = action.good
        const count = state[_id] ? state[_id].count + action.count : action.count
        return { ...state, [_id]: { count, good: { _id, ...goodDetails } } }
      },
      'CART_SUB': () => {
        const { _id } = action.good
        if (!state[_id]) return state
        const count = state[_id].count - action.count
        if (count > 0) {
          return { ...state, [_id]: { ...state[_id], count } }
        } else {
          const { [_id]: removed, ...newState } = state
          return newState
        }
      },
      'CART_DEL': () => {
        const { _id } = action.good
        const { [_id]: removed, ...newState } = state
        return newState
      },
      'CART_SET': () => {
        const { _id, ...goodDetails } = action.good
        if (action.count > 0) {
          return { ...state, [_id]: { count: action.count, good: { _id, ...goodDetails } } }
        } else {
          const { [_id]: removed, ...newState } = state
          return newState;
        }
      },
      'CART_CLEAR': () => ({})
    }
    return handlers[action.type] ? handlers[action.type]() : state
}
const initialState = {
    token: localStorage.getItem('authToken'),
    payload: null
}
function getGQL (url) {
    function gql(query, variables = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                ...("token" in store.getState().auth ? {Authorization: `Bearer ${store.getState().auth.token}`} : {})
            },
            body: JSON.stringify({query, variables})
        })
        .then(res => res.json())
        .then(r => {
            if (r.data) {
                const result = Object.values(r.data)[0]
                console.log(result)
                return result
            }
            throw new Error (r.data.errors[0].message)
        })
    } 
    return gql
}
const gql = getGQL("http://shop-roles.node.ed.asmer.org.ua/graphql")

function createStore(reducer){
    let state       = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs         = []                     //массив подписчиков
    
    const getState  = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
                             () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка
                             
    const dispatch  = action => { 
        if (typeof action === 'function'){ //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state){ //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs)  cb(state) //и запускаем подписчиков
        }
    }
    
    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

function localStoredReducer(originalReducer, localStorageKey) {
    function wrapper(state, action) {
        if (state === undefined) {
            try {
                const savedState = localStorage.getItem(localStorageKey)
                if (savedState !== null) {
                    return JSON.parse(savedState)
                }
            } catch (error) {
                console.error("Error parsing state from localStorage:", error)
            }
        }
        const newState = originalReducer(state, action)
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(newState))
        } catch (storageError) {
            console.error("Error saving state to localStorage:", storageError)
        }
        console.log(newState)
        return newState
    }
    
    return wrapper;
}
function combineReducers(reducers){
    function totalReducer(state={}, action){
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)){
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]){
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length){
            return {...state, ...newTotalState}
        }
        return state
    }

    return totalReducer
}

const reducers = {
    promise: promiseReducer,
    auth: localStoredReducer(authReducer, 'auth'),
    cart: localStoredReducer(cartReducer, 'cart')
}

const totalReducer = combineReducers(reducers) 

function promiseReducer(state={}, action){
    const {namePromise, type, status, payload, error} = action
    if (type === 'PROMISE'){
        return {
            ... state,
            [namePromise]: {
                type,
                status,
                payload,
                error
            }
        }

    }
    return state
}

const actionPending = namePromise => ({namePromise, type: 'PROMISE', status: 'PENDING'})
const actionFulfilled = (namePromise ,payload) => ({namePromise, type: 'PROMISE', status: 'FULFILLED', payload})
const actionRejected = (namePromise ,error) => ({namePromise, type: 'PROMISE', status: 'REJECTED',  error})

const actionPromise = (namePromise, promise) => async dispatch => {
    dispatch({type: 'PROMISE', status: 'PENDING', namePromise});
    try {
        const payload = await promise; // Здесь payload должен быть токеном или содержать токен
        dispatch({type: 'PROMISE', status: 'FULFILLED', payload, namePromise});
        return payload; // Убедитесь, что здесь возвращается токен
    } catch (error) {
        dispatch({type: 'PROMISE', status: 'REJECTED', namePromise, error});
        throw error;
    }
};

const store = createStore(totalReducer) //не забудьте combineReducers если он у вас уже есть
store.subscribe(() => {
    const state = store.getState()
    console.log('State updated:', state);
    updateAuthButtons(state.auth.token)
})

function updateAuthButtons(token) {
    const showAuth = token ? 'none' : 'block'
    const showLogout = token ? 'block' : 'none'
    document.getElementById('authButtons').style.display = showAuth
    document.getElementById('logoutBtn').style.display = showLogout
}
const CategoryFindOne = () => {    
    const [,route] = location.hash.split('/')
    if (route !== 'category') return

    const {status, payload, error} = store.getState().promise.categoryById || {}
    if (status === 'PENDING'){
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED'){
        const {name, goods} = payload
        main.innerHTML = `<h1>${name}</h1>`
        goods.forEach(({_id, name, price, images}) => {
            const goodHTML = `<div>
            <a href = "#/good/${_id}">${name}</a>
            <div><img style= "max-width:50vw" src="http://shop-roles.node.ed.asmer.org.ua/${images && images[0] && images[0].url}"></div>
            <p>Цена: ${price}</p>
            </div>`
            main.innerHTML += goodHTML
        })
    }
}
store.subscribe(CategoryFindOne)
store.subscribe(() => {
    const state = store.getState()
    const {status, payload, error} = state.promise.orderFind || {}
    if (status === 'FULFILLED' && payload) {
    console.log(payload)
    }
})
store.subscribe(() => {
    const { cart } = store.getState()
    const detailsContainer = document.getElementById('orderDetails')
    if (Object.keys(cart).length === 0) {
        detailsContainer.innerHTML = '';
    } else {
        detailsContainer.innerHTML = '';
        Object.values(cart).forEach(({ count, good }) => {
            const detailElement = document.createElement('div')
            detailElement.innerText = `${good.name}, price: ${good.price}, count: ${count}`
            detailsContainer.appendChild(detailElement)
        })
    }
})
store.subscribe(() => {
    login.innerHTML = ("token" in store.getState().auth ? store.getState().auth.payload.sub.login : "Guest")
})
store.subscribe(() => {
    const [,route] = location.hash.split('/');
    if (route !== 'good') return;

    const {status, payload, error} = store.getState().promise.goodById || {}
    if (status === 'FULFILLED'){
        const {name, price, _id, description, images} = payload
        main.innerHTML = `
            <h3>${name}</h3>
            <p>${description}</p>
            <p>${price}</p>
            <button id="orderButtonInside-${_id}" class="mainButtons">Order</button>
        `
        images.forEach(({url}) => {
            main.innerHTML += `<div><img style="max-width:20vw" src="http://shop-roles.node.ed.asmer.org.ua/${url}"></div>`
        })
        const orderButtonInside = document.getElementById(`orderButtonInside-${_id}`)
        orderButtonInside.addEventListener('click', function() {
            store.dispatch(actionCartAdd(_id, 1))
            const messageContainer = document.getElementById('messageContainer')
            messageContainer.innerText = "Good added to the cart. Check the cart, please"
            messageContainer.style.display = 'block'
            setTimeout(() => { messageContainer.style.display = 'none'; }, 5000)
        })
    }
})
store.subscribe(() => {
    const {status, payload, error} = store.getState().promise.rootCats || {}
    if (status === 'FULFILLED' && payload){
        aside.innerHTML = ''
        for (const { _id, name} of payload){
            aside.innerHTML += `<a href="#/category/${_id}">${name}</a>`
        }
    }
})

store.subscribe(() => { //order increase + 1 and order decrease -1 and delete
    const { cart } = store.getState();
    const detailsContainer = document.getElementById('orderDetails')
    detailsContainer.innerHTML = '';
    Object.entries(cart).forEach(([id, { count, good }]) => {
        const detailElement = document.createElement('div')
        detailElement.innerText = `${good.name}, Price: ${good.price}, Count: ${count}, Total: ${count * good.price}`
        const increaseButton = document.createElement('button')
        increaseButton.innerText = '+'
        increaseButton.addEventListener('click', () => {
            store.dispatch(actionCartSet(id, count + 1))
        })
        const decreaseButton = document.createElement('button')
        decreaseButton.innerText = '-'
        decreaseButton.addEventListener('click', () => {
            if (count > 1) {
                store.dispatch(actionCartSub(id, 1))
            } else {
                store.dispatch(actionCartDel(id))
            }
        })
        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '🗑️' //эмодзи корзины)
        deleteButton.addEventListener('click', () => store.dispatch(actionCartDel(id)))
        detailElement.appendChild(increaseButton)
        detailElement.appendChild(decreaseButton)
        detailElement.appendChild(deleteButton)
        detailsContainer.appendChild(detailElement)
    })
})
const gqlRootCats = () =>
gql(
    `
    query roots{
        CategoryFind(query: "[{\\"parent\\": null}]") {
            _id
            name
        }
    }
`)
const gqlOrderFind = (_id) =>
gql(
    `
    query orderFind($ql: String) {
        OrderFind(query: $ql) {
            _id
            total
            createdAt
            orderGoods{
                _id
                price
                count
                goodName
                total
            }
            owner {
                _id
                login
                nick
            }
        }
    }
    `,
    {
        "ql": JSON.stringify([{_id}])
    }

)
const gqlCategoryById = (_id) => 
gql(
    `
    query roots1($q1: String) {
    CategoryFindOne(query: $q1) {
      _id
      name
      goods {
        _id
        name
        price
        images {
          _id
          text
          url
          originalFileName
        }
      }
      image {
        _id
        text
        url
        originalFileName
      }
    }
  }
`,
{q1: JSON.stringify([{_id}])}
)
const gqlFullRegister = (login, password) =>
gql(
    //"http://shop-roles.node.ed.asmer.org.ua/graphql",
    `
    mutation fullRegister($login: String!, $password: String!) {
        UserUpsert(user: {login: $login, password: $password}) {
            _id
            login
        }
    }
    `,
    {
        login, 
        password
    }
)
const gqlFullLogin = (login, password) =>
gql(
    //"http://shop-roles.node.ed.asmer.org.ua/graphql",
    `
    query fullLogin($login: String, $password: String) {
        login (login: $login, password: $password)
    }
    `,
    {
        "login": login, 
        "password": password 
    }
)
const gqlGoodById = (_id) => 
gql(
    //"http://shop-roles.node.ed.asmer.org.ua/graphql",
    `
    query roots1($q1: String) {
    GoodFindOne(query: $q1) {
        _id
        name
        price
        description
        createdAt
        categories {
            _id
            createdAt
            name
        }
        images {
            _id
            createdAt
            text
            url
            originalFileName
        }
    }
  }
`,
{q1: JSON.stringify([{_id}])}
)
const gqlOrderUpsert = (orderGoods) =>
gql(
    `
    mutation OrderUpsert($order: OrderInput) {
        OrderUpsert(order: $order) {
            _id
            total
            orderGoods {
                good{ 
                    _id
                }
                count
            }
        }
    }
    `,
    { order: { orderGoods} }
)

const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats())

store.dispatch(actionRootCats())

const actionCategoryById = (_id) =>
    actionPromise('categoryById', gqlCategoryById(_id))

const actionGoodById = (_id) =>
    actionPromise('goodById', gqlGoodById(_id))

const actionFullRegister = (login, password) => async dispatch => {
    try {
        const registerResult = await dispatch(actionPromise('register', gqlFullRegister(login, password)))
        console.log("Registration successful:", registerResult)
        const loginResult = await dispatch(actionFullLogin(login, password))
        console.log("Login successful:", loginResult)
    
        return loginResult
    } catch (error) {
        console.log(error)
    }
}

const actionFullLogin = (login, password) => async dispatch => {
    const token = await dispatch(actionPromise('login', gqlFullLogin(login, password)))
    console.log(`Received token: ${token}`)
    if (typeof token === 'string' && token.length > 0) {
        dispatch(actionAuthLogin(token))
    }
}

const actionFullOrder = () => async (dispatch, getState) => {
    const { cart } = getState()
    const orderGoods = Object.keys(cart).map(key => ({
        good: { _id: key },
        count: cart[key].count,
    }))
    try {
        const result = await actionPromise('orderUpsert', gqlOrderUpsert(orderGoods))
        if (result && result._id) {
            console.log('Order placed successfully:', result)
        }
    } catch (error) {
        console.error('Order placement failed:', error)
    } finally {
        dispatch(actionCartClear())
    }
}

const actionOrderFind = (_id) => actionPromise('orderFind', gqlOrderFind(_id))

const actionOrderFindAll = () => async (dispatch) => {
    try {
        const orders = await dispatch(actionPromise('orderFindAll', gqlOrderFind()))
        dispatch({
            type: 'ORDERS_FIND_ALL_SUCCESS',
            payload: orders 
        });
    } catch (error) {
        console.error("Failed to fetch orders:", error)
        dispatch({
            type: 'ORDERS_FIND_ALL_FAIL',
            error: error
        })
    }
};
const actionCartAdd = (_id, count = 1) => async (dispatch) => {
    try {
        const goodDetails = await dispatch(actionPromise('goodDetails', gqlGoodById(_id)))
        dispatch({
            type: 'CART_ADD',
            count,
            good: {
                _id,
                name: goodDetails.name,
                price: goodDetails.price
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const actionCartSub = (_id) => (dispatch, getState) => {
    const { cart } = getState()
    const currentItem = cart[_id]
    if (currentItem && currentItem.count > 1) {
        dispatch({ type: 'CART_SUB', count: 1, good: { _id } })
    } else {
        dispatch({ type: 'CART_DEL', good: { _id } })
    }
}

const actionCartDel = (_id) => ({ type: 'CART_DEL', good: {_id} })

const actionCartSet = (_id, count = 1) => (dispatch, getState) => {
    const { cart } = getState()
    const good = cart[_id]?.good
    if (good) {
        dispatch({
            type: 'CART_SET',
            count,
            good: {
                _id: good._id, 
                name: good.name, 
                price: good.price 
            }
        })
    }
}

const actionCartClear = () => ({ type: 'CART_CLEAR' })

const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token })
const actionAuthLogout = () => ({type: 'AUTH_LOGOUT'})

window.onhashchange = () => {
    const [,route, _id] = location.hash.split('/')

    const routes = {
        history() {
            store.dispatch(actionOrderFindAll)
        },
        category() {
            console.log("категория:", _id)
            store.dispatch(actionCategoryById(_id))
        },
        good(){
            console.log('good', _id)
            store.dispatch(actionGoodById(_id))
        },
        login(){
            showModal('Sign In')
        },
        register(){
            showModal('Register')
        },
    }

    if (route in routes){
        routes[route]()
    }
}

document.getElementById('registerBtn').onclick = function() {
    showModal('Register')
    window.location.hash = 'login'
}
document.getElementById('signInBtn').onclick = function() {
    showModal('Sign In')
    window.location.hash = 'login'
}
document.getElementById('logoutBtn').onclick = function() {
    store.dispatch(actionAuthLogout())
    updateAuthButtons()
}
function showModal(mode) {
    document.getElementById('authModal').style.display = 'block'
    document.getElementById('modalTitle').innerText = mode
    document.getElementById('confirmAuthBtn').onclick = function() {
        const login = document.getElementById('loginInput').value
        const password = document.getElementById('passwordInput').value
        if (document.getElementById('modalTitle').innerText === 'Register') {
            store.dispatch(actionFullRegister(login, password));
        } else {
            store.dispatch(actionFullLogin(login, password));
        }
        document.getElementById('authModal').style.display = 'none'
    }
}
document.querySelector('.close').onclick = function() {
    document.getElementById('authModal').style.display = 'none'
}
window.onclick = function(event) {
    const modal = document.getElementById('authModal')
    if (event.target === modal) {
        modal.style.display = 'none'
    }
}

document.getElementById('cartIcon').addEventListener('click', function() {
    const confirmButtons = document.querySelectorAll('.confirmButtons');
    confirmButtons.forEach(button => {
        button.style.display = button.style.display === 'none' ? 'block' : 'none';
    });
});
document.getElementById('checkOrder').addEventListener('click', function () {
    const modal = document.getElementById('orderDetailsModal')
    const detailsContainer = document.getElementById('orderDetails')
    const { cart } = store.getState()
    detailsContainer.innerHTML = '';
    Object.keys(cart).forEach(key => {
        const item = cart[key]
        const detailElement = document.createElement('div');
        detailElement.id = 'orderDetailsElement'
        detailElement.innerText = `${item.good.name}, Price: ${item.good.price}, Count: ${item.count}, total: ${item.good.price * item.count}  `
        const increaseButton = document.createElement('button')
        increaseButton.textContent = '+'
        increaseButton.onclick = () => {
            store.dispatch(actionCartSet(key, item.count + 1))
        }
        const decreaseButton = document.createElement('button')
        decreaseButton.textContent = '-'
        decreaseButton.onclick = () => {
            store.dispatch(actionCartSub(key, item.count - 1))
        }
        const deleteButton = document.createElement('button')
        deleteButton.textContent = '🗑️' //эмодзи корзины)
        deleteButton.addEventListener('click', () => store.dispatch(actionCartDel(key)))
        detailsContainer.appendChild(detailElement)
        detailsContainer.appendChild(increaseButton)
        detailsContainer.appendChild(decreaseButton)
        detailsContainer.appendChild(deleteButton)
    })
    modal.style.display = 'block'
})

document.querySelector('#orderDetailsModal .close').addEventListener('click', function() {
    document.getElementById('orderDetailsModal').style.display = 'none'
})

window.onclick = function(event) {
    const modal = document.getElementById('orderDetailsModal')
    if (event.target === modal) {
        modal.style.display = 'none'
    }
}

document.getElementById('confirmOrder').addEventListener('click', async function() {
    try {
        await store.dispatch(actionFullOrder())
        console.log("Order has confirmed")
    } catch (error) {
        console.error("Order confirmation failed:", error)
    }
})

document.getElementById('clearButton').addEventListener('click', function () {
    try { 
        store.dispatch(actionCartClear())
        console.log("Cart has been cleared")
    } catch (error) {
        console.error(error)
    }
})
document.getElementById('orderHistory').addEventListener('click', async function() {
    await store.dispatch(actionOrderFindAll())
    const modal = document.getElementById('ordersHistoryModal')
    const detailsContainer = document.getElementById('ordersHistoryDetails')
    const { promise: { orderFindAll: { payload: orders } = {} } } = store.getState()
    detailsContainer.innerHTML = '';
    const sortedOrders = (orders || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    sortedOrders.forEach(order => {
        const orderDate = new Date(parseInt(order.createdAt, 10)).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        })
        const orderElement = document.createElement('div')
        orderElement.innerHTML = `<h4>Order date: ${orderDate}</h4>`
        order.orderGoods.forEach(({ count, goodName, price, total }) => {
            orderElement.innerHTML += `<p>${goodName}, price: ${price}, count: ${count}, total: ${total}</p>`;
        })
        detailsContainer.appendChild(orderElement)
    })
    modal.style.display = 'block'
})

document.querySelector('#ordersHistoryModal .close').onclick = () => {
    document.getElementById('ordersHistoryModal').style.display = 'none'
}
window.onclick = (event) => {
    if (event.target == document.getElementById('ordersHistoryModal')) {
        document.getElementById('ordersHistoryModal').style.display = 'none'
    }
}

window.onhashchange()
