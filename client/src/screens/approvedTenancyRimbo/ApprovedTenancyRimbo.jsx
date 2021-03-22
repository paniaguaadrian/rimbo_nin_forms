// React components
import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";

import axios from "axios";
import { useParams } from "react-router-dom";
import { TenantReducer, DefaultTenant } from "./approved_tenancy_rimbo-reducer";

// Styles
import styles from "../approvedTenantRimbo/approved-user.module.scss";

// Multi language
// import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_API_RIMBO_TENANT,
} = process.env;

const ApprovedTenancyRimbo = () => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;
  const [tenant] = useReducer(TenantReducer, DefaultTenant);
  const [state, setState] = useState(null); // eslint-disable-line
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    // Simplify fetchUserData.
    const fetchUserData = () =>
      axios.get(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
      );

    // Add body to post decision. So we can send data.
    const postDecision = (body) =>
      axios.post(
        `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}/rimbo/start-service`,
        body
      );

    const processDecision = async () => {
      const { data: tenancyData } = await fetchUserData();
      // let's console.log userData here, so we know it is in the right format.
      // console.log(tenancyData);

      const postBody = {
        // use some logic based on tenancyData here to make the postBody
        rentStart: tenant.rentStart,
        tenancyID: tenancyData.tenancyID,
      };

      // If the above use of {data} is correct it should be correct here too.
      const { data: decisionResult } = await postDecision(postBody);
      // console.log(postBody);

      const { tenantsName, tenantsEmail, randomID } = tenancyData.tenant;
      const { agencyContactPerson, agencyEmailPerson } = tenancyData.agent;
      const { rentalAddress } = tenancyData.property;
      const tenancyID = tenancyData.tenancyID;

      // console.log(tenancyData);

      // Don't send an email if the tenancy is already accepted
      if (tenancyData.rentStart === false) {
        if (i18n.language === "en") {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rj18`, {
            tenancyID,
            randomID,
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            rentalAddress,
          });
        } else {
          axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj18`, {
            tenancyID,
            randomID,
            tenantsName,
            tenantsEmail,
            agencyContactPerson,
            agencyEmailPerson,
            rentalAddress,
          });
        }
      }

      setState(decisionResult);
    };

    processDecision();
  }, [randomID, tenant.rentStart, tenancyID]);

  useEffect(
    () => {
      const getData = () => {
        fetch(`${REACT_APP_API_RIMBO_TENANT}/${randomID}`)
          .then((res) => {
            if (res.status >= 400) {
              throw new Error("Server responds with error!" + res.status);
            }
            return res.json();
          })
          .then(
            (responseData) => {
              setResponseData(responseData);
              setLoading(true);
            },
            (err) => {
              setErr(err);
              setLoading(true);
            }
          );
      };
      getData();
    },
    [randomID],
    [responseData, loading, err]
  );

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
          <h1>The tenancy has been accepted</h1>
          <h2>You have successfully accepted the tenancy</h2>
          <p>
            The tenant <b>{responseData.tenantsName}</b> is accepted
          </p>
          <p>
            The tenant an the PM will receive an email informed that the service
            has begun.
          </p>
        </div>
      </div>
    </>
  );
};

export default ApprovedTenancyRimbo;
