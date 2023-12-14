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
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useField } from '../hooks/useField'


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

const names = ['Europe', 'America', 'Africa', 'Oceania', 'Asia']

export default function RegionFilter() {
    const languaje = useSelector((state) => state.languaje)
    const [personName, setPersonName] = React.useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                    {languaje === 'ESP' ? 'Filtra por continente' : 'Filter by continent'}
                </InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

const CountryFilter = ({ filterCountries }) => {
    const languaje = useSelector((state) => state.languaje);
    const [filter, setFilter] = useState('');

    const handleChange = (event) => {        
        const newFilter = event.target.value;
        setFilter(newFilter);
        filterCountries(newFilter);
        console.log(filter);
    };

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
                label={languaje === 'ESP' ? 'Busca un pais' : 'Filter by country'}
                variant="outlined"
                onChange={handleChange}
            />
        </Box>
    );
};

export { CountryFilter, RegionFilter }
