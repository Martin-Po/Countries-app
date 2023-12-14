import { Box } from '@mui/material'
import { CountryFilter, RegionFilter } from './Filters'

function FilterSection({ filterCountries, continentList, filterContinents}) {

    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                flex: 1, // Make this area take up all available space,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: '1.5rem',
                paddingBottom: '1.5rem',
                flexDirection: {
                    xs: 'column', // apply column direction for xs (extra-small) screens
                    sm: 'row',    // apply row direction for md (medium) screens and larger
                },
            }}
        >
                <CountryFilter filterCountries={filterCountries}/>       
                <RegionFilter continentList = {continentList} filterContinents = {filterContinents} />
        </Box>
    )
}

export default FilterSection
