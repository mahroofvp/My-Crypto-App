import { makeStyles } from '@material-ui/core'
import React from 'react'


const useStyles =  makeStyles(()=> ({
            selectButton:{
                border: "1px solid gold",
                borderRadius: 5,
                padding: 10,
                paddingLeft: 20,
                paddingRight: 20,
                cursor:"pointer",
                "&:hover": {
                    backgroundcolor: "gold",
                    color:"black",

                },
                width: "22%",
                margin: 5,
            }
        }))
        

const SelectButton = ({children, selected, onClick}) => {
    const classes = useStyles()
  return (
    <span
    onClick={onClick}
    style={{
         backgroundColor:selected?"gold":"",
         color: selected ? "black" : "",
         fontWeight: selected ? 700 : 500,
}}
    className={classes.selectButton}
      >{children}</span>
  )
}

export default SelectButton