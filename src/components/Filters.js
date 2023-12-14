import {
    Box,
    Checkbox,
    FormControl,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default function RegionFilter({ continentList, filterContinents }) {
    const languaje = useSelector((state) => state.languaje)
    const [countryName, setCountryName] = React.useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
      
        filterContinents(value)
        setCountryName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                    {languaje === 'ESP'
                        ? 'Filtra por continente'
                        : 'Filter by continent'}
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={countryName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {continentList.length > 0
                        ? continentList.sort().map((name) => (
                              <MenuItem key={name} value={name}>
                                  <Checkbox
                                  checked={countryName.indexOf(name) > -1}
                                  />
                                  <ListItemText primary={name} />
                              </MenuItem>
                          ))
                        : 'a'}
                </Select>
            </FormControl>
        </div>
    )
}

const CountryFilter = ({ filterCountries }) => {
    const languaje = useSelector((state) => state.languaje)
    const [filter, setFilter] = useState('')

    const handleChange = (event) => {
        const newFilter = event.target.value
        setFilter(newFilter)
        filterCountries(newFilter)
    }

    return (
        <Box>
            <TextField
                value={filter}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                id="outlined"
                label={
                    languaje === 'ESP' ? 'Busca un pais' : 'Filter by country'
                }
                variant="outlined"
                onChange={handleChange}
            />
        </Box>
    )
}

export { CountryFilter, RegionFilter }
