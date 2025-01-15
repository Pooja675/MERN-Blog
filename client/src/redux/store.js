import {combineReducers, configureStore} from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/userSlice"
import themeReducer from './theme/themeSlice'
import {persistReducer} from "redux-persist"
import persistStore from "redux-persist/es/persistStore"

const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
})

const persistConfig ={
    key: 'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const appStore = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export default appStore;

export const persistor = persistStore(appStore);