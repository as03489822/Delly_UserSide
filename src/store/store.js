import { configureStore, createSlice } from '@reduxjs/toolkit';

// Add state to localStorage
const addStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (error) {
    console.error('Error saving state:', error);
  }
};

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


// Favorite slice
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: { count: 0 },
  reducers: {
    addFavourite: (state) => {
      state.count += 1;
    },
    removeFavourite: (state) => {
      state.count -= 1;
    },
    setFavouriteCount: (state, action) => {
      state.count = action.payload;
    },
    resetFavouriteCount: (state) => {
      state.count = 0;
    },
  },
});

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: { count: 0 },
  reducers: {
    addCart: (state) => {
      state.count += 1;
    },
    removeCart: (state) => {
      state.count -= 1;
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    resetCartCount: (state) => {
      state.count = 0;
    },
    removeOneItemCount: (state, action) => {
      state.count -= action.payload;
    },
    addOneItemCount: (state, action) => {
      state.count += action.payload;
    },
  },
});

// Load persisted state
const persistedState = loadStateFromLocalStorage();

// Configure store
const store = configureStore({
  reducer: {
    favorite: favoriteSlice.reducer,
    cart: cartSlice.reducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes to save state to localStorage
store.subscribe(() => {
  addStateToLocalStorage(store.getState());
});

export default store;

// Export actions
export const {
  addFavourite,
  removeFavourite,
  setFavouriteCount,
  resetFavouriteCount,
} = favoriteSlice.actions;
export const {
  addCart,
  removeCart,
  setCartCount,
  resetCartCount,
  removeOneItemCount,
  addOneItemCount,
} = cartSlice.actions;
