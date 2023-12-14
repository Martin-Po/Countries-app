import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Container from '@mui/material/Container'

import { useDispatch, useSelector } from 'react-redux'

import {changeLanguaje} from '../reducers/languajeReducer'
import {changeTheme} from '../reducers/themeReducer'
import { Typography } from '@mui/material'


function ResponsiveAppBar() {
    const languaje = useSelector(state => state.languaje)
    
    
    
    const dispatch = useDispatch()
    
    

    const handleLanguageChange = () => {
        // Dispatch the action
        dispatch(changeLanguaje('ENG'));
      }

      const handleThemeChange = () => {
        // Dispatch the action
        dispatch(changeTheme());
      }

    return (
        <AppBar position="static" style={{ backgroundColor: 'primary.main', boxShadow: 'none'}}>
            <Container 
                maxWidth={false}
                sx={{
                    width: '1300px',
                    '@media (max-width:1300px)': {
                        width: '880px',
                    },
                    '@media (max-width:900px)': {
                        width: '100%',
                    },
                }}
            >
                <Toolbar disableGutters>
                    <Typography sx={{fontWeight:'600'}}>{languaje === 'ESP' ? 'En qué lugar del mundo?' : 'Where in the world?'}</Typography>
                    
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                        }}
                    >                        
                        <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleLanguageChange} 
                        >
                            {languaje}
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleThemeChange} 
                        >
                            <DarkModeIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
