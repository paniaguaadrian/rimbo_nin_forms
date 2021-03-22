// React Components
import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";

import axios from "axios";
import { useParams } from "react-router-dom";
import { TenantReducer, DefaultTenant } from "./approved_tenant_card-reducer";

// Styles
import styles from "../approvedTenantRimbo/approved-user.module.scss";

// Multi language
// import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const ApprovedTenantCardRimbo = () => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;

  const [tenant] = useReducer(TenantReducer, DefaultTenant);
  const [state, setState] = useState(null); // eslint-disable-line

  useEffect(() => {
    // Function to fetch All data from THIS tenancy in particular
    const fetchUserData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );

    // Add body to post decision. So we can send data.
    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/card/approved`,
        body
      );

    const processDecision = async () => {
      const { data: tenancyData } = await fetchUserData();
      const postBody = {
        isCardAccepted: tenant.isCardAccepted,
        randomID: tenancyData.tenant.randomID,
      };
      const { data: decisionResult } = await postDecision(postBody);

      const { tenantsName, tenantsEmail, randomID } = tenancyData.tenant;
      const {
        agencyContactPerson,
        agencyEmailPerson,
        agencyName,
      } = tenancyData.agent;

      const tenancyID = tenancyData.tenancyID;

      if (tenancyData.tenant.isCardAccepted === false) {
        if (i18n.language === "en") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rj15`, {
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            agencyName,
            tenancyID,
            randomID,
          });
        } else {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj15`, {
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            agencyName,
            tenancyID,
            randomID,
          });
        }
      }
      setState(decisionResult);
    };
    processDecision();
  }, [randomID, tenant.isCardAccepted, tenancyID]);

  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="La plataforma de alquiler sin depósitos. Descubre una nueva forma de alquilar. Rimbo ahorra al inquilino meses de depósito a la vez que brinda más protección al propietario."
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

        <title>Approved - Rimbo - The new way to rent</title>
      </Helmet>
      <div className={styles.SuccessPageContainer}>
        <div className={styles.SuccessPageText}>
          <h1>The tenant has been accepted after the debit card request.</h1>
          <h2>You have successfully accepted the tenant</h2>
          <p>The PM and the Tenant will receive a confirmation email.</p>
        </div>
      </div>
    </>
  );
};

export default ApprovedTenantCardRimbo;
