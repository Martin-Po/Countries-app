import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

function CountriesCards({countries }) {
    const languaje = useSelector((state) => state.languaje)
    console.log(countries)


    console.log(countries);
    if (countries && countries.length > 0) {

    return (
        <Grid container display={'flex'} justifyContent={'center'}>
            {countries.map((country) => {
                return (
                    <Grid
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        spacing="4"
                        sx={{ padding: '1rem' }}
                    >
                        <Card sx={{ margin: 'auto', maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={country.flag}
                                    alt={
                                        country.length > 0 &&
                                        country.name.filter(
                                            (text) => text.lang === languaje
                                        )[0].text
                                    }
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        fontSize={'1.25rem'}
                                        fontWeight={600}
                                    >
                                        {
                                            country.name.filter(
                                                (text) => text.lang === languaje
                                            )[0].text
                                        }
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {languaje === 'ESP'
                                            ? 'Habitantes'
                                            : 'Population'}{' '}
                                        : {country.population}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {languaje === 'ESP'
                                            ? 'Continente'
                                            : 'Continent'}{' '}
                                        :{country.continents ? country.continents.join(', ') : ''}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Capital: {country.capital ? country.capital.join(', ') : ''}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )}
    else
    {return 'asdf'}
}

export default CountriesCards
