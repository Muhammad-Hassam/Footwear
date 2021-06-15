import  Header from "../components/header/header";
import  Footer  from "../components/footer/footer";
import Carts from "../components/carts/carts";
import { CartProvider  } from "../config/cartContext";


const Cart_items=()=>{
    return(
        <>
     <Header />
     <CartProvider>
      <Carts/>
     </CartProvider>
     <Footer />
     </>
    );
 }
 export default Cart_items;