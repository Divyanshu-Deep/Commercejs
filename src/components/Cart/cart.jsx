import React from 'react'
import {Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from './styles';
import CartItem from './CartItems/cartItem'
import {Link} from 'react-router-dom'

const Cart = ({cart, emptyCart, updateCart, remove}) => {  
 
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography className={classes.title} variant="subtitle1">Cart is empty!<Link to="/">Start adding Some!</Link></Typography>
  );

  const FilledCart = () => (
    
     <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} lg={3} key={item.id}>
            <CartItem item={item} updateItem={updateCart} removeItem={remove}/>
          </Grid>
        ))}
      </Grid>

      <div className={classes.cardDetails}>
           <Typography variant="h4">subtotal: {cart.subtotal.formatted_with_symbol} </Typography>
               <div>
                   <Button className={classes.emptyButton} size="large"  onClick={emptyCart} variant="contained" color="primary">Empty Cart</Button>
                   <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large"  variant="contained" color="secondary">Checkout</Button>
               </div>
      </div>
      </>
    
  );

    if(!cart.line_items) return 'Loading..'
  return ( 
      <Container>
          <div className={classes.toolbar}/>
          <Typography variant="h4" className={classes.title}>
              Cart Items
          </Typography>
          {!cart.line_items.length ? <EmptyCart /> : <FilledCart/>}
      </Container>
  )
};

export default Cart;