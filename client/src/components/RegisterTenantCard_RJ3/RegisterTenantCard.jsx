// React Components
import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";
import axios from "axios";

import { TenantStripeReducer, DefaultTenant } from "./tenantStripe-reducer";

// Stripe Components
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Reducer-Constants
import { UPDATE_NEWTENANT_INFO } from "./tenantStripe-constants";

// Multi language
// import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// Styles
import Loader from "react-loader-spinner";
import styles from "../RegisterTenancy/register-user.module.scss";
import "./CardSection.css";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "14px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_BASE_URL_STRIPE,
  REACT_APP_API_RIMBO_TENANT_STRIPE,
} = process.env;

const RegisterTenantCard = () => {
  let { randomID } = useParams();
  const tenancyID = randomID;

  const [tenant, setTenant] = useReducer(TenantStripeReducer, DefaultTenant);

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [tenancyData, setTenancyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null); //eslint-disable-line

  useEffect(() => {
    const getData = () => {
      fetch(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!" + res.status);
          }
          return res.json();
        })
        .then(
          (tenancyData) => {
            setTenancyData(tenancyData);
            setLoading(false);
          },
          (err) => {
            setErr(err);
            setLoading(false);
          }
        );
    };
    getData();
  }, [tenancyID]);

  // Handle on change
  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    const tenantsEmail = document.getElementById("email").innerHTML;
    const tenantsName = document.getElementById("name").innerHTML;
    const tenantsPhone = document.getElementById("phone").innerHTML;
    const timestamps = new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    const cardElement = elements.getElement("card");

    setProcessingTo(true);

    try {
      // ! Post a el backend de stripe en formularios
      const { data: client_secret } = await axios.post(
        `${REACT_APP_BASE_URL_STRIPE}/card-wallet`,
        {
          tenantsName,
          tenantsEmail,
        }
      );

      const { error } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: tenantsName,
            email: tenantsEmail,
            phone: tenantsPhone,
          },
        },
      });

      if (error) {
        setCheckoutError("* Rellena todos los campos del formulario.");
        setProcessingTo(false);
        return;
      } else {
        setIsSuccessfullySubmitted(true);

        // ! post a nuestra BDD
        await axios.post(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT_STRIPE}/${randomID}`,
          {
            isAccepted: tenant.isAccepted,
            randomID: randomID,
          }
        );

        // ! Post to Email service
        if (i18n.language === "en") {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rj3`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyEmailPerson: tenancyData.agent.agencyEmailPerson,
            agencyContactPerson: tenancyData.agent.agencyContactPerson,
            agencyName: tenancyData.agent.agencyName,
            rentalAddress: tenancyData.property.rentalAddress,
            randomID,
            tenancyID,
          });
        } else {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj3`, {
            tenantsName,
            tenantsEmail,
            tenantsPhone,
            timestamps,
            agencyEmailPerson: tenancyData.agent.agencyEmailPerson,
            agencyContactPerson: tenancyData.agent.agencyContactPerson,
            agencyName: tenancyData.agent.agencyName,
            rentalAddress: tenancyData.property.rentalAddress,
            randomID,
            tenancyID,
          });
        }
      }
    } catch (err) {
      setCheckoutError(err.message);
    }
  };

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

        <title>New Tenant - Rimbo - The new way to rent</title>
      </Helmet>
      {!isSuccessfullySubmitted ? (
        <div className={styles.RegisterContainer}>
          {loading ? (
            <div className={styles.Register}>
              <Loader
                type="Puff"
                color="#01d2cc"
                height={100}
                width={100}
                timeout={3000} //3 secs
              />
            </div>
          ) : (
            <>
              <div className={styles.Register}>
                <h1>
                  Great! You are just one step away from renting without a
                  deposit!
                </h1>
                <div className={styles.ExtraInfoContainer}>
                  <h2>
                    You just need to review our Terms and Conditions and provide
                    the charge authorization
                  </h2>
                  <div>
                    {tenancyData.product === "Administración" ? (
                      <p>
                        * The card will NOT be blocked. The card will NOT be
                        charged now. Only in case of legal claims presented by
                        the landlord the card will be charged, import limited to{" "}
                        <span>1 month of rent.</span>
                      </p>
                    ) : (
                      <p>
                        * The card will NOT be blocked. The card will NOT be
                        charged now. Only in case of legal claims presented by
                        the landlord the card will be charged, import limited to{" "}
                        <span>2 months of rent.</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.CardContainer}>
                <form onSubmit={handleFormSubmit}>
                  <div className={styles.CardInput}>
                    <label>
                      <h3>Debit card details</h3>
                      <div>
                        <p id="name">{tenancyData.tenant.tenantsName}</p>
                        <p id="email">{tenancyData.tenant.tenantsEmail}</p>
                        <p id="phone">{tenancyData.tenant.tenantsPhone}</p>
                      </div>

                      <CardElement
                        options={CARD_ELEMENT_OPTIONS}
                        onChange={handleCardDetailsChange}
                      />
                    </label>
                    <div className={styles.ErrorInput}>
                      <p className="error-message">{checkoutError}</p>
                    </div>
                  </div>

                  <div className={styles.TermsContainerStripe}>
                    <input
                      type="checkbox"
                      required
                      name="isAccepted"
                      id="terms"
                      value={tenant.isAccepted}
                      onChange={(e) => handleNewTenant(e)}
                    />
                    <p>
                      By hiring Rimbo's Services, you accept the{" "}
                      <a
                        href="https://rimbo.rent/politica-privacidad/"
                        target="_blank"
                        rel="noreferrer"
                        className="link-tag"
                      >
                        {" "}
                        Rimbo general conditions
                      </a>
                    </p>
                  </div>

                  {isProcessing ? (
                    <Loader
                      type="Puff"
                      color="#01d2cc"
                      height={50}
                      width={50}
                      timeout={3000} //3 secs
                    />
                  ) : (
                    <button disabled={isProcessing || !stripe}>
                      Authorize
                    </button>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={styles.CompleteContainer}>
          <div className={styles.CompleteText}>
            <h1>Your payment has been successfully completed</h1>
            <h3>You will shortly receive an email with more details.</h3>
            <p>
              Thanks for your time <b>{tenancyData.tenant.tenantsName}</b>, We
              will contact you shortly to give you more details of the process.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterTenantCard;
