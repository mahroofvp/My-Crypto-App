import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../../config/api'
import { CryptoContext } from '../../contextApi/CryptoContext'
import { 
  Container,
  LinearProgress, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  ThemeProvider, 
  Typography, 
  createTheme, 
  
   } from '@material-ui/core'
import  Pagination  from '@material-ui/lab/Pagination'
import "./coinstable.css"
import { useNavigate } from 'react-router-dom'
import { numberWithcommas } from '../banner/carousel/Carousel'
const CoinstTable = () => {
const [coins, setCoins] = useState([])
const [loading, setLoading] = useState(false)
const [search, setSearch] = useState("")
const [page, setPage] = useState(1)
const navigate = useNavigate()
const {currency, symbol} = useContext(CryptoContext)

const fetchCoins = async ()=> {
  setLoading(true)
 try {
  const {data} = await axios.get(CoinList(currency))
  if(data){
    setCoins(data)
  }
  setLoading(false)
 } catch (error) {
 }
} 

useEffect(()=>{
  fetchCoins()
},[currency])

const darkTheme = createTheme({
  palette:{
    type:"dark", 
  },
}
)

const handleSearch = () => {
  return coins.filter((coin) =>(
      coin.name.toLowerCase().includes(search.toLowerCase())||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    ))
}


const count = (handleSearch()?.length / 10).toFixed(0)

console.log("count", count);

  return (
    <ThemeProvider theme={darkTheme}>

    <Container style={{ textAlign: "center", color:"white"}}>
      <Typography variant='h4'
      style={{ margin:18}}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
      className= "coins-table-input"
      label="Search For a Crypto Currency.."
      
      variant='outlined'
      onChange={(e)=>setSearch(e.target.value)}
      />

      <TableContainer>
        {
          
          loading ? (
            <LinearProgress style={{ backgroundColor: "gold", marginTop:15}}/>
            ): (
              <Table>
              <TableHead style={{backgroundColor:"#EEBC1D"}}>
                <TableRow>
                  {["Coin", "Price", "24 Change", "Market Cap"].map((head) => (
                    <TableCell 
                    style={{  
                      color:"black",
                      fontWeight:"700",
                      
                    }}
                    key={head}
                    align={head === "Coin"? "": "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
                 
              </TableHead>

              <TableBody>

                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row)=>{
                  const profit = row.price_change_percentage_24h > 0;
                  return(
                    <TableRow
                    className='coinstable-table-row'
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                      >

                      <TableCell 
                      component='th' 
                      scope='row'
                      style={{
                        display:"flex",
                        gap:15,
                      }}
                      >
                        <img 
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{marginBottom:10}}
                        /> 

                        <div
                         style={{ display:"flex", flexDirection:"column"}} 
                        >
                          <span 
                          style={{
                            textTransform:"uppercase",
                            fontSize:22,
                          }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: "darkgrey"}}>{row.name}</span>
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        {symbol}{" "}
                        {numberWithcommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight:500,
                      }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%

                      </TableCell>

                      <TableCell
                      align="right"
                      >
                      {symbol}{" "}
                        {numberWithcommas(row.market_cap.toString().slice(0, -6))}M
                      </TableCell>

                    </TableRow>
                  )
                })}
              </TableBody>  
              </Table>
              )}
         </TableContainer>

         <Pagination 
         style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
         }}
         
         count={10}
         onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
         }
        }
         />
         
       </Container>
     </ThemeProvider>
  )
}

export default CoinstTable