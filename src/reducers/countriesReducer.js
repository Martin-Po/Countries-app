import { createSlice } from '@reduxjs/toolkit'
import countryService from '../services/countries'


const countrySlice = createSlice({
    name: 'country',
    initialState: [],

    reducers: {
        setCountries(state, action) {
            return action.payload
        },
    },
})

const { setCountries } = countrySlice.actions


export const initializeCountries = () => {
    return async (dispatch) => {
        const countries = await countryService.getAll()
        dispatch(setCountries(countries))
    }
}

export default countrySlice.reducer
