import React from "react";
import { Redirect, Route } from "react-router-dom";
import { jwtDecode, JwtPayload } from 'jwt-decode';


// Usage: <Middleware component={YourComponent} {...rest} />
export function Middleware({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

// Usage: <AdminMiddleware component={YourComponent} {...rest} />
export function AdminMiddleware({ component: Component, ...rest }) {
  const token = localStorage.getItem('adminToken');
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );
}
// Usage: <RecruiterMiddleware component={YourComponent} {...rest} />
export function DeliveryMiddleware({ component: Component, ...rest } ) {
  const token = localStorage.getItem('deliveryToken');
  console.log(token,'THIS IS DELIVERY TOKEEENNNNNNNNN')
  return (
    <Route
      {...rest}
      render={props => 
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/delivery/login" />
        )
      }
    />
  );
}