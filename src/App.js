import { Box, CssBaseline } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import AppBar from './components/AppBar'
import Footer from './components/Footer'
import CountriesCards from './components/CountriesCards'
import FilterSection from './components/FilterSection'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeCountries } from './reducers/countriesReducer'

const App = () => {
    const dispatch = useDispatch()
    const languaje = useSelector((state) => state.languaje)

    useEffect(() => {
        // Dispatch action to initialize countries
        dispatch(initializeCountries())
    }, [dispatch])

    // Fetch countries from the Redux store
    const countries = useSelector((state) => state.countries)

    console.log(countries)
    useEffect(() => {
        if (countries && countries.length > 0) {
            initializeListedCountries()
        }
    }, [countries])

    const [listedCountries, setlistedCountries] = useState([])
    const [shownCountries, setshownCountries] = useState([])
    const [filteredContinent, setfilteredContinent] = useState([])
    const [filteredCountries, setfilteredCountries] = useState([])
    const [activeFilter, setactiveFilter] = useState('')

    const initializeListedCountries = () => {
        setlistedCountries([])
        countries.forEach((country) => {
            const newcountry = {
                name: [
                    { lang: 'ENG', text: country.name.common },
                    { lang: 'ESP', text: country.translations['spa'].common },
                ],
                population: country.population,
                continents: country.continents,
                capital: country.capital,
                flag: country.flags.png,
            }
            setlistedCountries((prevListedCountries) =>
                prevListedCountries.concat(newcountry)
            )
            setshownCountries(listedCountries)
        })
    }

    const filterCountries = (newFilter) => {
        setactiveFilter(newFilter)
        if (countries && countries.length > 0) {
            if (newFilter === '') {

                setshownCountries(listedCountries)
            } else {
                if (shownCountries.length === 0)  setshownCountries(listedCountries)

                console.log(
                    shownCountries.filter((country) =>
    country.name
        .filter((text) => text.lang === languaje)
        .some((text) => text.text.toLowerCase().includes(newFilter.toLowerCase()))
)
                )

                setshownCountries(
                    shownCountries.filter((country) =>
    country.name
        .filter((text) => text.lang === languaje)
        .some((text) => text.text.toLowerCase().includes(newFilter.toLowerCase()))
)
                )
            }
        }
    }


    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <CssBaseline />
            <AppBar />
            <Grid
                container
                spacing={{ xs: 0, md: 4 }}
                sx={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '1280px',
                    marginTop: '56px',
                    display:'flex',
                    flexDirection:'column',

                    '@media (max-width:1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <FilterSection
                    listedCountries={listedCountries}
                    filterCountries={filterCountries}
                />
                <CountriesCards countries={listedCountries.filter((country) =>
    country.name
        .filter((text) => text.lang === languaje)
        .some((text) => text.text.toLowerCase().includes(activeFilter.toLowerCase()))
)} />
                <Box></Box>
            </Grid>
            <Footer />
        </div>
    )
}

export default App
