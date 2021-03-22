// React Components
import { Route } from "react-router-dom";

// Custom Components
import Home from "./screens/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import RegisterTenancy from "./components/RegisterTenancy";
import RegisterTenant from "./components/RegisterTenant_RJ2/RegisterTenant";
import StripeHandler from "./components/RegisterTenantCard_RJ3/StripeHandlerComponent";
import ApprovedTenantRimbo from "./screens/approvedTenantRimbo/ApprovedTenantRimbo";
import RejectedTenantRimbo from "./screens/approvedTenantRimbo/RejectedTenantRimbo";
import ApprovedTenantPM from "./screens/approvedTenantPM/ApprovedTenantPM";
import ApprovedTenantCardRimbo from "./screens/approvedTenantCardRimbo/ApprovedTenantCardRimbo";
import RegisterTenantPM from "./components/RegisterTenantPM_RJS/RegisterTenantPM";
import ApprovedTenancyRimbo from "./screens/approvedTenancyRimbo/ApprovedTenancyRimbo";

import { withNamespaces } from "react-i18next";

// Normalize & Generic styles
import "./styles/generic.scss";

const App = () => {
  return (
    <>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/register/agent" component={RegisterTenancy} />
      <Route
        exact
        path="/register/tenant/:tenancyID"
        component={RegisterTenant}
      />
      <Route
        exact
        path="/register/rj2/:tenancyID/approved"
        component={ApprovedTenantRimbo}
      />
      <Route
        exact
        path="/register/rj2/:tenancyID/rejected"
        component={RejectedTenantRimbo}
      />
      <Route
        exact
        path="/register/rj2/:tenancyID/pm/approved"
        component={ApprovedTenantPM}
      />
      <Route
        exact
        path="/register/rj3/:tenancyID/card/approved"
        component={ApprovedTenantCardRimbo}
      />
      <Route exact path="/register/card/:randomID" component={StripeHandler} />
      <Route
        exact
        path="/register/annex/:tenancyID"
        component={RegisterTenantPM}
      />
      <Route
        exact
        path="/register/rjs/:tenancyID/service-start"
        component={ApprovedTenancyRimbo}
      />
      <Footer />
    </>
  );
};

export default withNamespaces()(App);
