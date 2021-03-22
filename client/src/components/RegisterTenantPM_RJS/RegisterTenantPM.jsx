// React Components
import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";
import axios from "axios";
import { TenantReducer, DefaultTenant } from "./tenant-reducer";

// Styles
import styles from "../RegisterTenancy/register-user.module.scss";

// Reducer-Constants
import { UPDATE_NEWTENANT_INFO } from "./tenant-constants";

// Custom Components
import Input from "../Input";
import InputFile from "../InputFile";
import Button from "../Button";
import Loader from "react-loader-spinner";

// Multi language
// import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_API_RIMBO_UPD_TENANCY_BADI,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const RegisterTenantPM = () => {
  const { tenancyID } = useParams();

  const [tenant, setTenant] = useReducer(TenantReducer, DefaultTenant);
  const [isProcessing, setProcessingTo] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false); //eslint-disable-line
  const [err, setErr] = useState(null); //eslint-disable-line
  const [date, setDate] = useState("");
  const [files, setFiles] = useState({
    pmAnex: null,
  });
  const [sent, isSent] = useState(false);
  const [responseDataAfter, setResponseDataAfter] = useState([]);

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
  }, [tenancyID]);

  const changeFilesHandler = (event) => {
    const name = event.target.name;
    setFiles((files) => {
      const newFiles = { ...files };
      newFiles[name] = event.target.files[0];
      return newFiles;
    });
  };

  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSent(false);
    setProcessingTo(true);

    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }
    formData.append("date", date);
    formData.append("tenancyID", tenancyID);

    // ! POST to RIMBO_API => DB
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`,
      formData
    );

    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_UPD_TENANCY_BADI}/${tenancyID}`,
      {
        landlordName: tenant.landlordName,
        landlordEmail: tenant.landlordEmail,
        landlordPhone: tenant.landlordPhone,
        tenancyID,
      }
    );

    isSent(true);
    setIsSuccessfullySubmitted(true);
  };

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
          (responseDataAfter) => {
            setResponseDataAfter(responseDataAfter);
            setLoading(true);
          },
          (err) => {
            setErr(err);
            setLoading(true);
          }
        );
    };
    getData();
  }, [sent, tenancyID]);

  useEffect(() => {
    const sendAttachments = async () => {
      if (sent) {
        if (i18n.language === "en") {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rjs`, {
            agencyName: responseDataAfter.agent.agencyName,
            rentalAddress: responseDataAfter.property.rentalAddress,
            tenantsName: responseDataAfter.tenant.tenantsName,
            pmAnex: responseDataAfter.pmAnex,
            tenancyID: tenancyID,
          });
        } else {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rjs`, {
            agencyName: responseDataAfter.agent.agencyName,
            rentalAddress: responseDataAfter.property.rentalAddress,
            tenantsName: responseDataAfter.tenant.tenantsName,
            pmAnex: responseDataAfter.pmAnex,
            tenancyID: tenancyID,
          });
        }
      }
    };
    sendAttachments();
  }, [responseDataAfter]); //eslint-disable-line

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

        <title>Landlord Details - Rimbo - The new way to rent</title>
      </Helmet>
      {!isSuccessfullySubmitted ? (
        <div className={styles.RegisterContainer}>
          <div className={styles.Register}>
            <h1>
              Horray! The rental is now covered by Rimbo! Your tenants can move
              in now!
            </h1>
            <div className={styles.ExtraInfoContainer}>
              {/* <h2>
                All we need from you is the following information. Quick and
                easy!
              </h2> */}
              <p>Confirm the rental start date and upload the Rimbo Annex.</p>
            </div>
          </div>
          <div className={styles.FormContent}>
            <form
              onSubmit={handleSubmit}
              className="styles.RegisterForm"
              encType="multipart/form-data"
            >
              <div className={styles.FormIntern}>
                <div className={styles.FormLeft}>
                  <Input
                    type="text"
                    name="landlordName"
                    value={tenant.landlordName}
                    label="Landlord full name"
                    placeholder="Enter name and surname"
                    onChange={(e) => handleNewTenant(e)}
                    required
                    // error={errors.landlordName}
                  />
                  <Input
                    type="email"
                    name="landlordEmail"
                    value={tenant.landlordEmail}
                    label="Landlord email"
                    placeholder="Enter a valid email address"
                    onChange={(e) => handleNewTenant(e)}
                    required
                    // error={errors.landlordEmail}
                  />
                  <Input
                    type="tel"
                    name="landlordPhone"
                    value={tenant.landlordPhone}
                    label="Landlord phone number"
                    placeholder="Enter phone number"
                    onChange={(e) => handleNewTenant(e)}
                    required
                    // error={errors.landlordPhone}
                  />
                </div>
                <div className={styles.FormRight}>
                  <Input
                    type="date"
                    name="date"
                    value={date}
                    label="Rental start date"
                    placeholder="Write your income"
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                  <InputFile
                    type="file"
                    name="File"
                    label="Rental Agreement - Rimbo Annex"
                    onChange={changeFilesHandler}
                    required
                  />
                </div>
              </div>

              <div className={styles.ButtonContainer}>
                {isProcessing ? (
                  <Loader
                    type="Puff"
                    color="#01d2cc"
                    height={50}
                    width={50}
                    timeout={3000} //3 secs
                  />
                ) : (
                  <Button disabled={isProcessing} type="submit">
                    Send
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles.CompleteContainer}>
          <div className={styles.CompleteText}>
            <h1>The form has been completed successfully</h1>
            <h3>All data has been successfully completed</h3>
            <p>
              Thanks for your time <b>{responseData.tenant.tenantsName}</b>, We
              will contact you shortly to give you more details of the process.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterTenantPM;
