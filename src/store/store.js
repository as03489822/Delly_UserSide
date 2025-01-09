import { createStore , combineReducers} from 'redux';
// add state to localstorage
const addStateToLocalStorage = (state)=>{
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('appState', serializedState);
        } catch (error) {
            console.error('Error saving state:', error);
    }
}

// Load state from localStorage
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Error loading state:', error);
        return undefined;
    }
};

//favorite Reducer
let initialFavoriteState  = {count : 0};
let favoriteReducer = (state= initialFavoriteState, action)=>{
    switch(action.type) {
        case 'ADD FAVOURITE':
            return{...state , count : state.count + 1};
        case 'REMOVE FAVOURITE':
            return{...state, count : state.count - 1};
        case 'FAVOURITE COUNT':
            return{... state, count: action.payload};
        case 'RESET FAVOURITE COUNT':
            return{... state, count: 0};
        default:
            return state
    }
}

// cart Reducer
let initialCartState = {count:0};
let cartReducer = (state= initialCartState, action)=>{
    switch(action.type) {
        case 'ADD CART':
            return{...state , count : state.count + 1};
        case 'REMOVE CART':
            return{...state, count : state.count - 1};
        case 'CART COUNT':
            return{... state, count: action.payload};
        case 'RESET CART COUNT':
            return{... state, count: 0};
        default:
            return state
    }
}



const persistedState = loadStateFromLocalStorage();

const rootReducer = combineReducers({
    favorite: favoriteReducer,
    cart: cartReducer
})

export const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    addStateToLocalStorage(store.getState());
});