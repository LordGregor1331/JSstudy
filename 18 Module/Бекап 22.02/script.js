const authReducer = (state = {}, action) => {
    const { type, token } = action
    if (type === "AUTH_LOGIN") {
        const payload = jwtDecode(token)
        if (payload) {
            return {
                token,
                payload
            }
        }
    } else if (type === 'AUTH_LOGOUT') {
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
        'CARD_ADD': () => {
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
        'CARD_DEL': () => {
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

// function gql(url, query, variables={}) {
//     return fetch(url, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         },
//         body: JSON.stringify({query, variables}) 
//     })
//     .then(res => res.json())

// }
function getGQL(url) {
    function gql(query, variables = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ query, variables })
        })
            .then(res => res.json())
            .then(r => {
                if (r.data) {
                    const result = Object.values(r.data)[0]
                    console.log(result)
                    return result
                }
                throw new Error(r.data.errors[0].message)
            })
    }
    return gql
}
const gql = getGQL("http://shop-roles.node.ed.asmer.org.ua/graphql")

function createStore(reducer) {
    let state = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs = []                     //массив подписчиков

    const getState = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
        () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

    const dispatch = action => {
        if (typeof action === 'function') { //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state) { //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs) cb(state) //и запускаем подписчиков
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
function combineReducers(reducers) {
    function totalReducer(state = {}, action) {
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)) {
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]) {
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length) {
            return { ...state, ...newTotalState }
        }
        return state
    }

    return totalReducer
}

const reducers = {
    promise: promiseReducer,
    auth: localStoredReducer(authReducer, 'auth')
    //auth: authReducer,     //часть предыдущего ДЗ
    //cart: cartReducer,     //часть предыдущего ДЗ
}

const totalReducer = combineReducers(reducers)

function promiseReducer(state = {}, action) {
    const { namePromise, type, status, payload, error } = action
    if (type === 'PROMISE') {
        return {
            ...state,
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

const actionPending = namePromise => ({ namePromise, type: 'PROMISE', status: 'PENDING' })
const actionFulfilled = (namePromise, payload) => ({ namePromise, type: 'PROMISE', status: 'FULFILLED', payload })
const actionRejected = (namePromise, error) => ({ namePromise, type: 'PROMISE', status: 'REJECTED', error })

const actionPromise = (namePromise, promise) => async dispatch => {
    dispatch(actionPending(namePromise));

    try {
        const payload = await promise;
        console.log("Payload received:", payload)
        dispatch(actionFulfilled(namePromise, payload))
    } catch (error) {
        console.error("Promise action error:", error)
        dispatch(actionRejected(namePromise, error))
    }
};

const store = createStore(totalReducer) //не забудьте combineReducers если он у вас уже есть
store.subscribe(() => console.log(store.getState()))

const CategoryFindOne = () => {
    const [, route] = location.hash.split('/')
    if (route !== 'category') return

    const { status, payload, error } = store.getState().promise.categoryById || {}
    if (status === 'PENDING') {
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        const { name, goods } = payload
        main.innerHTML = `<h1>${name}</h1>`
        for (const { _id, name, price, images } of goods) {
            main.innerHTML += `<div>
            <a href = "#/good/${_id}">${name}</a>
            <div><img style= "max-width:50vw" src="http://shop-roles.node.ed.asmer.org.ua/${images && images[0] && images[0].url}"></div>
            <p>Цена: ${price}</p>
            </div>`
        }
        // const {name, mass, eye_color, films} = payload
        // main.innerHTML = `<h1>${name}</h1>
        //                  <section>ЖЫРНОСТЬ: ${mass}кг</section>
        //                  <section style="color: ${eye_color}">Цвет глаз</section>
        //                  `
        // for (const filmUrl of films){
        //     const filmId = filmUrl.split('/films/')[1].slice(0,-1)
        //     main.innerHTML += `<a href="#/films/${filmId}">Фильм №${filmId}</a>`
        // }
    }
}

store.subscribe(CategoryFindOne)

store.subscribe(() => {
    const [, route] = location.hash.split('/')
    if (route !== 'good') return

    const { status, payload, error } = store.getState().promise.goodById || {}
    if (status === 'PENDING') {
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        const { name, price, _id, description, images } = payload
        main.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <p>${price}</p>
        `
        for (const { url } of images || []) {
            main.innerHTML += `<div><img style= "max-width:20vw" src="http://shop-roles.node.ed.asmer.org.ua/${url}"></div>`
        }
        // const {title, opening_crawl, characters} = payload
        // main.innerHTML = `<h1>${title}</h1>
        //                  <p>${opening_crawl}</p>
        //                  `
        // for (const peopleUrl of characters){
        //     const peopleId = peopleUrl.split('/people/')[1].slice(0,-1)
        //     main.innerHTML += `<a href="#/people/${peopleId}">Герой №${peopleId}</a>`
        // }
    }
})
store.subscribe(() => {
    const { status, payload, error } = store.getState().promise.rootCats || {}
    if (status === 'FULFILLED' && payload) {
        aside.innerHTML = ''
        for (const { _id, name } of payload) {
            aside.innerHTML += `<a href="#/category/${_id}">${name}</a>`
        }
    }
})

const gqlRootCats = () =>
    gql(
        //"http://shop-roles.node.ed.asmer.org.ua/graphql",
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
        //http://shop-roles.node.ed.asmer.org.ua/graphql
        `
    query orderFind($ql: String) {
        OrderFind(query: $ql) {
            _id
            total
            createdAt
            orderGoods{
                _id
                createdAt
                price
                count
                goodName
                total
            }
            owner {
                _id
                createdAt
                login
                nick
            }
        }
    }
    `,
        {
            "ql": JSON.stringify([{ _id }])
        }

    )
const gqlCategoryById = (_id) =>
    gql(
        //"http://shop-roles.node.ed.asmer.org.ua/graphql",
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
        { q1: JSON.stringify([{ _id }]) }
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
        { q1: JSON.stringify([{ _id }]) }
    )

const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats())

store.dispatch(actionRootCats())

const actionCategoryById = (_id) =>
    actionPromise('categoryById', gqlCategoryById(_id))

const actionGoodById = (_id) =>
    actionPromise('goodById', gqlGoodById(_id))

const actionFullRegister = (login, password) => actionPromise('fullRegister', gqlFullRegister(login, password))

const actionFullLogin = (login, password) => async dispatch => {
    const token = await dispatch(actionPromise('login', gqlFullLogin(login, password)))
    if (typeof token === 'string') {
        dispatch(actionAuthLogin(token))
    }
}


const actionOrderFind = (_id) => actionPromise('orderFind', gqlOrderFind(_id))

const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', count, good })

const actionCartSub = (good, count = 1) => ({ type: 'CART_SUB', count, good })

const actionCartDel = (good) => ({ type: 'CART_DEL', good })

const actionCartSet = (good, count = 1) => ({ type: 'CART_SET', count, good })

const actionCartClear = () => ({ type: 'CART_CLEAR' })

const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token })
const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })

window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')

    const routes = {
        people() {
            console.log('People', _id)
            store.dispatch(actionGetPeople(_id))
        },
        category() {
            console.log("категория:", _id)
            store.dispatch(actionCategoryById(_id))
        },
        good() {
            console.log('good', _id)
            store.dispatch(actionGoodById(_id))
        },
        login() {
            console.log('А ТУТ ЩА ДОЛЖНА БЫТЬ ФОРМА ЛОГИНА')
            //нарисовать форму логина, которая по нажатию кнопки Login делает store.dispatch(actionFullLogin(login, password))
        },
        //register(){
        ////нарисовать форму регистрации, которая по нажатию кнопки Login делает store.dispatch(actionFullRegister(login, password))
        //},
    }

    if (route in routes) {
        routes[route]()
    }
}


window.onhashchange()
