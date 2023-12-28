import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import CoinInfo from '../components/coinInfo/CoinInfo';
import { LinearProgress, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser'
import { CryptoContext } from '../contextApi/CryptoContext';
import { numberWithcommas } from '../components/banner/carousel/Carousel';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
  container: {
   display:"flex",
   [theme.breakpoints.down('md')]: {
    flexDirection: "column",
    alignItems:'center',
   }
  },

  sidebar: {
    width:'30%',
    [theme.breakpoints.down("md")]: {
      width:"100%",
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid grey"
  },

  heading: {
    fontWeight:"bold",
    marginBottom:20,
    
  },

  description: {
    width:"100%",
    padding:25,
    paddingBottom:15,
    paddingTop:0,
    textAlign:"justify",
   }
}));
const CoinPage = () => {

  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency,symbol} = useContext(CryptoContext)

 
   const classes = useStyles();

  const fetchCoin = async () => {
    const {data} = await axios.get(SingleCoin(id),{mode:'cors'})
    setCoin(data)
  };
console.log("ai");
  useEffect(()=>{
    console.log("hi");
    fetchCoin()
  },[])

  if(!coin) return <LinearProgress style={{backgroundColor: "gold"}}/>

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
       <img 
       src={coin?.image.large} 
       alt={coin?.name}
       height="200"
       style={{ marginBottom: 20 }} 
       />
       <Typography  variant='h3' className={classes.heading}>
        {coin?.name}
       </Typography>
       <Typography varient="subtitle1" className={classes.description}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}
       </Typography>
       <div className={classes.marketData}>
        <span style={{display:"flex"}}>
          <Typography variant='h5' className={classes.heading}>
          Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography 
          variant='h5'
          
          >
            {coin?.market_cap_rank}
          </Typography>
         
        </span>
        <span style={{display:"flex"}}>
          <Typography variant='h5' className={classes.heading}>
            
            Current Price:
          </Typography>
          &nbsp; &nbsp;
          <Typography 
          variant='h5'
          
          >
          {symbol}{" "}
          {numberWithcommas(
            coin?.market_data.current_price[currency.toLowerCase()]
          )}
          </Typography>
         
        </span>
        <span style={{display:"flex"}}>
          <Typography variant='h5' className={classes.heading}>
            Rank:
          </Typography>
          &nbsp; &nbsp;
          <Typography 
          variant='h5'
          
          >
            {coin?.market_cap_rank}
          </Typography>
        </span>
        
       </div>
        </div>
        <CoinInfo coin={coin}/>
    </div>
  )
}

export default CoinPage