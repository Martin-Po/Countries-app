import { configureStore } from '@reduxjs/toolkit'

import languajeReducer from './reducers/languajeReducer'
import themeReducer from './reducers/themeReducer'
import countriesReducer from './reducers/countriesReducer'

const store = configureStore({
    reducer: {
        languaje: languajeReducer,
        activeTheme: themeReducer,
        countries: countriesReducer
    },
})

export default store
