import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AdminDashboard from "./Admin/AdminDashboard";
import DeliveryDashboard from "./Delivery/DeliveryDashboard";
import PaymentSuccess from "./PaymentSuccess";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import CartDetails from "./components/CartDetails";
import CollabCart from "./Collab/CollabCart";
import AdminSignIn from "./Admin/AdminSignin";
import AdminSignUp from "./Admin/AdminSignup";
import DeliverySignin from "./Delivery/DeliverySignin";
import DeliverySignup from "./Delivery/DeliverySignup";
import ProductDetails from "./ProductDetails.jsx";
import Signup from "./Signup";
import { DeliveryMiddleware, AdminMiddleware, RecruiterMiddleware } from "./middleware";

const promise = loadStripe(
  "pk_test_51R1R5HJlvCjqT1EtEInaYXkY3L2n7M2zXbE8FiO2EUZwMOqT7k3fJM0LOag5r7OIaX1XI7dQ4zsYd7lT4LRqenoA00q51mtuvJ"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">

<Switch>
  <Route path="/orders">
    <Header />
    <Orders />
  </Route>

  <Route path="/product/:id" component={ProductDetails} />

  <AdminMiddleware path="/admin/dashboard" component={AdminDashboard} />
  <Route path="/admin/login" component={AdminSignIn} />
  <Route path="/admin/signup" component={AdminSignUp} />

  <DeliveryMiddleware path="/delivery/dashboard" component={DeliveryDashboard} />
  <Route path="/delivery/cartDetails/:userId" component={CartDetails} />
  <Route path="/delivery/signup" component={DeliverySignup} />
  <Route path="/delivery/login" component={DeliverySignin} />

  <Route
    path="/payment-success"
    render={(props) =>
      props.location.state && props.location.state.paymentSuccess ? (
        <PaymentSuccess />
      ) : (
        <Redirect to="/" />
      )
    }
  />

  <Route path="/checkout">
    <Header />
    <Checkout />
  </Route>
  <Route path="/payment">
    <Header />
    <Elements stripe={promise}>
      <Payment />
    </Elements>
  </Route>
  <Route path="/collab">
    <Header />
    <CollabCart />
  </Route>
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route path="/">
    <Header />
    <Home />
  </Route>
</Switch>      </div>
    </Router>
  );
}

export default App;
