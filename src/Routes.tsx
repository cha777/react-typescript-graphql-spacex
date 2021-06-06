import { Switch, Redirect, Route } from "react-router-dom";
import { PastLaunches, LaunchDetails } from "./pages";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/launches"></Redirect>
      <Route exact path="/launches">
        <PastLaunches />
      </Route>
      <Route path="/launches/:id">
        <LaunchDetails />
      </Route>
    </Switch>
  );
};

export default Routes;
