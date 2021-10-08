import React, { useState, useEffect } from "react";
import { commerce } from "./components/lib/commerce";
import Products from "./components/Products/products";
import Cart from "./components/Cart/cart";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./components/checkoutForm/Checkout/checkout";
import GoogleLogin from './components/Auth/GoogleLogin';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  
  

  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };


  const handleCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const EmptyCart = async()=>{
    const {cart} = await commerce.cart.empty();
    setCart(cart)
  }

  const UpdateCart = async (productId, quantity) => {
      const {cart} = await commerce.cart.update(productId, {quantity})
      setCart(cart)
  }
  const RemoveCart = async (productId) => {
    const {cart} = await commerce.cart.remove(productId)
    setCart(cart)
}


  const refreshCart = async()=>{
     const newCart = await commerce.cart.refresh();
     setCart(newCart);
   }

  

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar totalItem={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddCart={handleCart} />
          </Route>
          <Route exact path="/cart">
            <Cart 
            cart={cart} 
            emptyCart={EmptyCart}
            updateCart={UpdateCart}
            remove={RemoveCart}
             />
          </Route>
          <Route exact path="/checkout">
            <Checkout cart={cart} refresh={refreshCart}/>
          </Route>
          <Route exact path='/login'>
            <GoogleLogin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

 
export default App;
