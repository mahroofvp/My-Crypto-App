import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme} from '@material-ui/core'
import React, { useContext } from 'react'
import "./header.css"
import {useNavigate} from 'react-router-dom'
import { CryptoContext } from '../../contextApi/CryptoContext'
const Header = () => {

  const {currency, setCurrency} = useContext(CryptoContext)
 
  console.log(currency);


  const navigate = useNavigate()
  const darkTheme = createTheme({
    palette:{
      type:"dark", 
    },
  }
  )
  return (
    <ThemeProvider theme={darkTheme}>

    <AppBar  color='transparent' position="static" >
        <Container>
            <Toolbar>
                <Typography 
                style={{
                  fontSize:25             
                }}
                onClick={()=> navigate('/')}  
                className="header-title-class"

                >MyCrypto</Typography>
  
                <Select variant='outlined'
                style={{
                  width:100,
                  height:40,
                  marginLeft:15,
                }}
                value={currency}
                onChange={(e)=>setCurrency( e.target.value)}
                >
          
          <MenuItem value={"USD"}>  USD</MenuItem>
          <MenuItem value={"INR"}> INR</MenuItem>
          
        </Select>
            </Toolbar>
        </Container>
         
    </AppBar>
          </ThemeProvider>
  )
}

export default Header