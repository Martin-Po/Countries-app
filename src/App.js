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

    useEffect(() => {
        if (countries && countries.length > 0) {
            initializeListedCountries()
        }
    }, [countries])

    

    const [listedCountries, setlistedCountries] = useState([])
    const [continents, setContinents] = useState([])
    const [shownCountries, setshownCountries] = useState([])
    const [filteredContinent, setfilteredContinent] = useState([])
    const [activeFilter, setactiveFilter] = useState('')
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        filterContinents(continents)
    }, [continents])

    const initializeListedCountries = () => {
        setlistedCountries([])
        setContinents([])
        const continentsObj = []
        countries.forEach((country) => {
            continentsObj.push(country.continents)
            const newcountry = {
                id: country.latlng.join(''),
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
        setTimeout(() => {
            setloaded(true)        
            
        }, 2000);
        setContinents([...new Set(continentsObj.flat())])
       

    }

    const filterCountries = (newFilter) => {
        setactiveFilter(newFilter)       
    }

    const filterContinents = (selectedContinents) => {
        setfilteredContinent(selectedContinents)
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
                    display: 'flex',
                    flexDirection: 'column',

                    '@media (max-width:1300px)': {
                        width: '992px',
                    },
                    '@media (max-width:1024px)': {
                        width: '100%',
                    },
                }}
            >
                <FilterSection
                    filterCountries={filterCountries} continentList={continents} filterContinents = {filterContinents} 
                />
                <CountriesCards loaded = {loaded}
                    countries={listedCountries
                        .filter(country =>
                            country.continents.some(continent => filteredContinent.includes(continent))
                          )
                        .filter((country) =>
                            country.name.some((text) =>
                                text.lang === languaje &&
                                text.text.toLowerCase().includes(activeFilter.toLowerCase())
                            )
                        )}
                />
                <Box></Box>
            </Grid>
            <Footer />
        </div>
    )
}

export default App
