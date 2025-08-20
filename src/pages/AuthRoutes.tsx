import { lazy } from "react";
import { Redirect, Route } from "react-router";

const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./Signup"));

const routes = [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

export default function AuthRoutes() {
  return (
    <>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>

      {routes.map(({ path, component: Component }) => (
        <Route key={path} exact path={path}>
          <Component />
        </Route>
      ))}
    </>
  );
}
