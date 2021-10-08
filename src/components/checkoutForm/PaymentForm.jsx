import React from 'react'
import {Typography, Button, Divider} from '@material-ui/core';
import Review from './Review'

 const PaymentForm = ({ checkoutToken , backstep,  refresh, nextstep})=> {
  
    return (
       
       <> 
        <div>
           <Review checkoutToken={checkoutToken}/>
           <Divider/>
           <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment Method</Typography>
           <div style={{display:"flex" , justifyContent:"space-between"}}>
           <Button variant="outlined" onClick={backstep}>Back</Button>
           <Button variant="contained" type="submit" onClick={() => {refresh(); nextstep();}}>pay {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
           </div>
        </div>
        </>
    )
}

export default PaymentForm;