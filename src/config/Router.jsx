import React from 'react';
import Home from '../pages/Home';
import About from '../pages/About';
import Men from '../pages/Men_Collection';
import Women from '../pages/Women_Collection';
import Contact from '../pages/Contact';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Add_items from '../pages/Add_Items';
import Cart_items from '../pages/Add_carts';
import Adminlogin from '../pages/Adminlogin';
import AdminMessages from '../pages/AdminMessages';
import AdminDashboard from '../pages/Adminitems';
import Checkout from '../pages/Checkoutform';
import UserOrder from '../pages/UserOrders';
import AdminOrders from '../pages/Adminorders';
import OrdersComplete from '../pages/Admincomp';

import { Switch, Route } from 'react-router-dom';

const Routers = () => {
  return (
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/about' component={About} />
      <Route path='/men' component={Men} />
      <Route path='/women' component={Women} />
      <Route path='/contact' component={Contact} />
      <Route path='/signup' component={Signup} />
      <Route path='/login' component={Login} />
      <Route path='/additems' component={Add_items} />
      <Route path='/cartitem' component={Cart_items} exact />
      <Route path='/Adminlogin' component={Adminlogin} />
      <Route path='/AdminMessages' component={AdminMessages} />
      <Route path='/AdminDashboard' component={AdminDashboard} />
      <Route path='/Checkout' component={Checkout} />
      <Route path='/Order' component={UserOrder} />
      <Route path='/AdminOrder' component={AdminOrders} />
      <Route path='/OrdersComplete' component={OrdersComplete} />
      <Route path='*' component={Home} />
    </Switch>
  );
};
export default Routers;
