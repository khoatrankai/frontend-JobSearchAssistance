import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reducers from './reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['changeLaguage', 'changeRole'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, ...customizedMiddleware],
});

export const persistor = persistStore(store);
