import { CartProvider } from '../config/cartContext';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Checkouts from '../components/checkout/checkout';

const Checkout = () => {
  return (
    <>
      <CartProvider>
        <Header />
      </CartProvider>
       <Checkouts/>
      <Footer />
    </>
  );
};
export default Checkout;
