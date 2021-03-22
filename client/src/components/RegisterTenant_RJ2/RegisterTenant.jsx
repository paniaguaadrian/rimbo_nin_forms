// React Components
import React, { useState, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TenantReducer, DefaultTenant } from "./tenant-reducer";

// Styles
import styles from "../RegisterTenancy/register-user.module.scss";
import style from "./form.module.scss";

// Validation
import { newTenant } from "./tenant_validation";

// Reducer Constants
import { UPDATE_NEWTENANT_INFO } from "./tenant-constants";

// Custom Components
import Input from "../Input";
import InputCheck from "../InputCheck";
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
  REACT_APP_API_RIMBO_TENANT,
  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const RegisterTenant = () => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;

  const [tenant, setTenant] = useReducer(TenantReducer, DefaultTenant);
  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);
  const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [files, setFiles] = useState({
    DF: null,
    DB: null,
    LP: null,
    PP: null,
  });
  const [sent, isSent] = useState(false);
  const [responseDataAfter, setResponseDataAfter] = useState([]);

  useEffect(
    () => {
      const getData = () => {
        // ! anadir :tenancyID
        fetch(
          `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
        )
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
    [tenancyID],
    [responseData, loading, err]
  );

  const handleNewTenant = ({ target }) => {
    setTenant({
      type: UPDATE_NEWTENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    setFiles((files) => {
      const newFiles = { ...files };
      newFiles[name] = event.target.files[0];
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isSent(false);

    const formData = new FormData();
    for (const key in files) {
      formData.append(key, files[key]);
    }
    formData.append("randomID", randomID);

    const errors = newTenant(tenant);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setProcessingTo(true);

    // ! Post to Rimbo API (files/images)
    // ! anadir :randomID/upload
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/upload`,
      formData,
      { randomID }
    );

    // ! Post to Rimbo API Data
    // ! anadir :randomID
    await axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}`,
      {
        // tenant
        monthlyNetIncome: tenant.monthlyNetIncome,
        jobType: tenant.jobType,
        documentType: tenant.documentType,
        documentNumber: tenant.documentNumber,
        tenantsAddress: tenant.tenantsAddress,
        tenantsZipCode: tenant.tenantsZipCode,
        isAcceptedGC: tenant.isAcceptedGC,
        randomID: tenancyID,
      }
    );

    // ! POST to email service
    if (i18n.language === "en") {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rj2/tt`, {
        // Agent/Agency
        agencyName: responseData.agent.agencyName,
        agencyContactPerson: responseData.agent.agencyContactPerson,
        agencyPhonePerson: responseData.agent.agencyPhonePerson,
        agencyEmailPerson: responseData.agent.agencyEmailPerson,
        tenancyID,
        // Tenant
        tenantsName: responseData.tenant.tenantsName,
        tenantsPhone: responseData.tenant.tenantsPhone,
        tenantsEmail: responseData.tenant.tenantsEmail,
        monthlyNetIncome: tenant.monthlyNetIncome,
        jobType: tenant.jobType,
        documentNumber: tenant.documentNumber,
        tenantsAddress: tenant.tenantsAddress,
        tenantsZipCode: tenant.tenantsZipCode,
        // Proprety
        rentAmount: responseData.rentAmount,
        product: responseData.product,
        rentDuration: responseData.rentDuration,
        rentalAddress: responseData.property.rentalAddress,
        rentalCity: responseData.property.rentalCity,
        rentalPostalCode: responseData.property.rentalPostalCode,
      });
    } else {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj2/tt`, {
        // Agent/Agency
        agencyName: responseData.agent.agencyName,
        agencyContactPerson: responseData.agent.agencyContactPerson,
        agencyPhonePerson: responseData.agent.agencyPhonePerson,
        agencyEmailPerson: responseData.agent.agencyEmailPerson,
        tenancyID,
        // Tenant
        tenantsName: responseData.tenant.tenantsName,
        tenantsPhone: responseData.tenant.tenantsPhone,
        tenantsEmail: responseData.tenant.tenantsEmail,
        monthlyNetIncome: tenant.monthlyNetIncome,
        jobType: tenant.jobType,
        documentNumber: tenant.documentNumber,
        tenantsAddress: tenant.tenantsAddress,
        tenantsZipCode: tenant.tenantsZipCode,
        // Proprety
        rentAmount: responseData.rentAmount,
        product: responseData.product,
        rentDuration: responseData.rentDuration,
        rentalAddress: responseData.property.rentalAddress,
        rentalCity: responseData.property.rentalCity,
        rentalPostalCode: responseData.property.rentalPostalCode,
      });
    }

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
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rj2/rimbo`, {
            tenancyID,
            tenantsName: responseDataAfter.tenant.tenantsName,
            tenantsPhone: responseDataAfter.tenant.tenantsPhone,
            tenantsEmail: responseDataAfter.tenant.tenantsEmail,
            agencyName: responseDataAfter.agent.agencyName,
            agencyContactPerson: responseDataAfter.agent.agencyContactPerson,
            agencyPhonePerson: responseDataAfter.agent.agencyPhonePerson,
            agencyEmailPerson: responseDataAfter.agent.agencyEmailPerson,
            documentImageFront: responseDataAfter.tenant.documentImageFront,
            documentImageBack: responseDataAfter.tenant.documentImageBack,
            lastPayslip: responseDataAfter.tenant.lastPayslip,
            previousPayslip: responseDataAfter.tenant.previousPayslip,
            // Agent/Agency
            monthlyNetIncome: tenant.monthlyNetIncome,
            jobType: tenant.jobType,
            documentNumber: tenant.documentNumber,
            tenantsAddress: tenant.tenantsAddress,
            tenantsZipCode: tenant.tenantsZipCode,
            // Proprety
            rentAmount: responseDataAfter.rentAmount,
            product: responseDataAfter.product,
            rentDuration: responseDataAfter.rentDuration,
            rentalAddress: responseDataAfter.property.rentalAddress,
            rentalCity: responseDataAfter.property.rentalCity,
            rentalPostalCode: responseDataAfter.property.rentalPostalCode,
          });
        } else {
          await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj2/rimbo`, {
            tenancyID,
            tenantsName: responseDataAfter.tenant.tenantsName,
            tenantsPhone: responseDataAfter.tenant.tenantsPhone,
            tenantsEmail: responseDataAfter.tenant.tenantsEmail,
            agencyName: responseDataAfter.agent.agencyName,
            agencyContactPerson: responseDataAfter.agent.agencyContactPerson,
            agencyPhonePerson: responseDataAfter.agent.agencyPhonePerson,
            agencyEmailPerson: responseDataAfter.agent.agencyEmailPerson,
            documentImageFront: responseDataAfter.tenant.documentImageFront,
            documentImageBack: responseDataAfter.tenant.documentImageBack,
            lastPayslip: responseDataAfter.tenant.lastPayslip,
            previousPayslip: responseDataAfter.tenant.previousPayslip,
            // Agent/Agency
            monthlyNetIncome: tenant.monthlyNetIncome,
            jobType: tenant.jobType,
            documentNumber: tenant.documentNumber,
            tenantsAddress: tenant.tenantsAddress,
            tenantsZipCode: tenant.tenantsZipCode,
            // Proprety
            rentAmount: responseDataAfter.rentAmount,
            product: responseDataAfter.product,
            rentDuration: responseDataAfter.rentDuration,
            rentalAddress: responseDataAfter.property.rentalAddress,
            rentalCity: responseDataAfter.property.rentalCity,
            rentalPostalCode: responseDataAfter.property.rentalPostalCode,
          });
        }
      }
    };
    sendAttachments();
  }, [responseDataAfter]); //eslint-disable-line

  const documentType = ["DNI", "NIE", "Passport", "Other"];
  const jobType = [
    "Salaried",
    "Autonomous",
    "Unemployed",
    "We are a company",
    "I'm retired",
    "I am a student",
    "Other",
  ];

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
          <div className={styles.Register}>
            <h1>
              Tell us a little more about yourself to save
              <br /> the deposit of your next apartment
            </h1>
            <div className={styles.ExtraInfoContainer}>
              <h2>
                All we need from you is the following information. Quick and
                easy!
              </h2>
              <p>
                We will need a scanned copy of your DNI / NIE (front and back)
                or passport and a document that confirms your current address.
                If you are an EU citizen, please provide your NIE number in the
                “Document number” field and send us a scanned copy of the
                identity document of your country of origin.
              </p>
            </div>
          </div>
          <div className={style.FormContent}>
            <form
              onSubmit={handleSubmit}
              className={styles.RegisterForm}
              encType="multipart/form-data"
            >
              <div className={style.FormIntern}>
                <div className={style.GroupInput}>
                  <div className={style.FormLeft}>
                    <Input
                      type="number"
                      name="monthlyNetIncome"
                      value={tenant.monthlyNetIncome}
                      label="Monthly net income"
                      placeholder="Write your income"
                      onChange={(e) => handleNewTenant(e)}
                      error={errors.monthlyNetIncome}
                    />
                  </div>
                  <div className={style.FormLeft}>
                    <div className={styles.selectContainer}>
                      <label className={styles.selectLabel} htmlFor="jobType">
                        Job Type
                      </label>
                      <select
                        required
                        name="jobType"
                        className={styles.selectInput}
                        value={tenant.jobType}
                        onChange={(e) => handleNewTenant(e)}
                        error={errors.jobType}
                      >
                        <option value="">Select your job type</option>
                        {jobType.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className={style.GroupInput}>
                  <div className={style.FormLeft}>
                    <Input
                      type="text"
                      name="tenantsAddress"
                      value={tenant.tenantsAddress}
                      label="Current Address"
                      placeholder="Write the address where you reside"
                      onChange={(e) => handleNewTenant(e)}
                      error={errors.tenantsAddress}
                    />
                  </div>

                  <div className={style.FormLeft}>
                    <Input
                      type="number"
                      name="tenantsZipCode"
                      value={tenant.tenantsZipCode}
                      label="Current zip code"
                      placeholder="XXXXX"
                      onChange={(e) => handleNewTenant(e)}
                      error={errors.tenantsZipCode}
                    />
                  </div>
                </div>
                <div className={style.GroupInput}>
                  <div className={style.FormLeft}>
                    <div className={styles.selectContainer}>
                      <label
                        className={styles.selectLabel}
                        htmlFor="documentType"
                      >
                        Document Type
                      </label>
                      <select
                        required
                        name="documentType"
                        className={styles.selectInput}
                        value={tenant.documentType}
                        onChange={(e) => handleNewTenant(e)}
                        error={errors.documentType}
                      >
                        <option value="">Select Document Type</option>
                        {documentType.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className={style.FormLeft}>
                    <Input
                      type="text"
                      name="documentNumber"
                      value={tenant.documentNumber}
                      label="Document Number"
                      placeholder="Write the number of your document"
                      onChange={(e) => handleNewTenant(e)}
                      error={errors.documentNumber}
                    />
                  </div>
                </div>
                <div className={style.GroupInput}>
                  <div className={style.FormLeft}>
                    <InputFile
                      type="file"
                      name="DF"
                      label="DNI/NIE (Front)"
                      placeholder="XXXXX"
                      onChange={changeHandler}
                      required
                    />
                  </div>
                  <div className={style.FormLeft}>
                    <InputFile
                      type="file"
                      name="DB"
                      label="DNI/NIE (Back)"
                      placeholder="XXXXX"
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </div>
                <div className={style.GroupInput}>
                  <div className={style.FormLeft}>
                    <InputFile
                      type="file"
                      name="LP"
                      label="Last salary payslip"
                      onChange={changeHandler}
                      required
                    />
                  </div>
                  <div className={style.FormLeft}>
                    <InputFile
                      type="file"
                      name="PP"
                      label="Previous salary payslip"
                      onChange={changeHandler}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.TermsContainer}>
                <InputCheck
                  type="checkbox"
                  required
                  name="isAcceptedGC"
                  id="terms"
                  value={tenant.isAcceptedGC}
                  placeholder="Accept our terms and conditions"
                  onChange={(e) => handleNewTenant(e)}
                  error={errors.isAcceptedGC}
                />
                <p>
                  By submitting this form, you understand and agree that we use
                  your information in accordance with our{" "}
                  <a
                    href="https://rimbo.rent/en/privacy-policy/"
                    target="_blank"
                    rel="noreferrer"
                    className="link-tag"
                  >
                    {" "}
                    privacy policy{" "}
                  </a>{" "}
                  and our{" "}
                  <a
                    href="https://rimbo.rent/en/cookies-policy/"
                    target="_blank"
                    rel="noreferrer"
                    className="link-tag"
                  >
                    {" "}
                    cookies policy{" "}
                  </a>
                  to offer you Rimbo services.
                </p>
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
                    Submit
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
            <h3>Best regards</h3>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterTenant;
