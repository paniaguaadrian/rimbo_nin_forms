// React Components
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Styles
import styles from "../RegisterTenancy/register-user.module.scss";

// Validation
import { isProperty } from "./validation";

// Constants
import { UPDATE_PROPERTY_INFO } from "./constants";

// Custom Components
import Input from "../Input";
import InputCheck from "../InputCheck";
import Button from "../Button";
import Loader from "react-loader-spinner";

// nanoid
import { nanoid } from "nanoid";

// Multi language
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCIES,

  REACT_APP_BASE_URL_EMAIL,
} = process.env;

const PropertyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setProcessingTo] = useState(false);

  // Handle on change
  const handleAgency = ({ target }) => {
    setTenancy({
      type: UPDATE_PROPERTY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = isProperty(tenancy.propertyDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setProcessingTo(true);

    const randomID = nanoid();

    await axios.post(`${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCIES}`, {
      tenantsName: tenancy.tenantDetails.tenantsName,
      tenantsEmail: tenancy.tenantDetails.tenantsEmail,
      tenantsPhone: tenancy.tenantDetails.tenantsPhone,
      randomID: randomID,
      agencyName: tenancy.agencyName,
      agencyEmailPerson: tenancy.agencyEmailPerson,
      isAgentAccepted: tenancy.propertyDetails.isAgentAccepted,
      state: tenancy.propertyDetails.propertyState,
      propertyState: tenancy.propertyDetails.propertyState,
      rentAmount: tenancy.propertyDetails.rentAmount,
      rentStartDate: tenancy.propertyDetails.rentStartDate,
      rentEndDate: tenancy.propertyDetails.rentEndDate,
      tenancyID: randomID,
    });

    // ! Post to Email service
    if (i18n.language === "en") {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/en/rj1`, {
        tenantsName: tenancy.tenantDetails.tenantsName,
        tenantsEmail: tenancy.tenantDetails.tenantsEmail,
        tenantsPhone: tenancy.tenantDetails.tenantsPhone,
        agencyName: tenancy.agencyName,
        agencyEmailPerson: tenancy.agencyEmailPerson,
        isAgentAccepted: tenancy.propertyDetails.isAgentAccepted,
        state: tenancy.propertyDetails.propertyState,
        propertyState: tenancy.propertyDetails.propertyState,
        rentAmount: tenancy.propertyDetails.rentAmount,
        rentStartDate: tenancy.propertyDetails.rentStartDate,
        rentEndDate: tenancy.propertyDetails.rentEndDate,
        tenancyID: randomID,
        randomID,
      });
    } else {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/rj1`, {
        tenantsName: tenancy.tenantDetails.tenantsName,
        tenantsEmail: tenancy.tenantDetails.tenantsEmail,
        tenantsPhone: tenancy.tenantDetails.tenantsPhone,
        agencyName: tenancy.agencyName,
        agencyEmailPerson: tenancy.agencyEmailPerson,
        isAgentAccepted: tenancy.propertyDetails.isAgentAccepted,
        state: tenancy.propertyDetails.propertyState,
        propertyState: tenancy.propertyDetails.propertyState,
        rentAmount: tenancy.propertyDetails.rentAmount,
        rentStartDate: tenancy.propertyDetails.rentStartDate,
        rentEndDate: tenancy.propertyDetails.rentEndDate,
        tenancyID: randomID,
        randomID,
      });
    }

    setStep(step + 1);
    console.log(tenancy);
  };

  const properties = [
    "Property 1",
    "Property 2",
    "Property 3",
    "Property 4",
    "Property 5",
    "Property 6",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.FormIntern}>
        <div className={styles.FormLeft}>
          <div className={styles.selectContainer}>
            <label className={styles.selectLabel} htmlFor="propertyState">
              {t("RJ1.stepTwo.service")}
            </label>
            <select
              required
              name="propertyState"
              className={styles.selectInput}
              value={tenancy.propertyState}
              onChange={(e) => handleAgency(e)}
              error={errors.propertyState}
            >
              <option value="">{t("RJ1.stepTwo.servicePL")}</option>
              {/* <option name="product" value={t("RJ1.stepTwo.servicesOne")}>
                {t("RJ1.stepTwo.servicesOne")}
              </option>
              <option name="product" value={t("RJ1.stepTwo.servicesTwo")}>
                {t("RJ1.stepTwo.servicesTwo")}
              </option>
              <option name="product" value={t("RJ1.stepTwo.servicesThree")}>
                {t("RJ1.stepTwo.servicesThree")}
              </option> */}
              {properties.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* <Input
            type="text"
            name="rentDuration"
            value={tenancy.propertyDetails.rentDuration}
            label={t("RJ1.stepTwo.rentDuration")}
            placeholder={t("RJ1.stepTwo.rentDurationPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.rentDuration}
          /> */}
          <Input
            type="text"
            name="rentAmount"
            value={tenancy.rentAmount}
            label={t("RJ1.stepTwo.rentAmount")}
            placeholder={t("RJ1.stepTwo.rentAmountPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.rentAmount}
          />
        </div>
        <div className={styles.FormRight}>
          <Input
            type="date"
            name="rentStartDate"
            value={tenancy.rentStartDate}
            label="Rental start date"
            placeholder="Write your income"
            onChange={(e) => handleAgency(e)}
            required
          />
          <Input
            type="date"
            name="rentEndDate"
            value={tenancy.rentEndDate}
            label="Rental end date"
            placeholder="Write your income"
            onChange={(e) => handleAgency(e)}
            required
          />
          {/* <Input
            type="text"
            name="rentalAddress"
            value={tenancy.propertyDetails.rentalAddress}
            label={t("RJ1.stepTwo.rentalAddress")}
            placeholder={t("RJ1.stepTwo.rentalAddressPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.rentalAddress}
          /> */}
          {/* <Input
            type="text"
            name="rentalCity"
            value={tenancy.propertyDetails.rentalCity}
            label={t("RJ1.stepTwo.rentalCity")}
            placeholder={t("RJ1.stepTwo.rentalCityPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.rentalCity}
          /> */}
          {/* <Input
            type="text"
            name="rentalPostalCode"
            value={tenancy.propertyDetails.rentalPostalCode}
            label={t("RJ1.stepTwo.rentalPostalCode")}
            placeholder={t("RJ1.stepTwo.rentalPostalCodePL")}
            onChange={(e) => handleAgency(e)}
            error={errors.rentalPostalCode}
          /> */}
        </div>
      </div>
      <div className={styles.TermsContainer}>
        <InputCheck
          type="checkbox"
          required
          name="isAgentAccepted"
          id="terms"
          value={tenancy.propertyDetails.isAgentAccepted}
          placeholder="Accept our terms and conditions"
          onChange={(e) => handleAgency(e)}
          error={errors.isAgentAccepted}
        />
        <p>
          {t("RJ1.stepTwo.pp1")}{" "}
          <a
            href="https://rimbo.rent/en/privacy-policy/"
            target="_blank"
            rel="noreferrer"
            className="link-tag"
          >
            {" "}
            {t("RJ1.stepTwo.pp2")}
          </a>{" "}
          {t("RJ1.stepTwo.pp3")}{" "}
          <a
            href="https://rimbo.rent/en/cookies-policy/"
            target="_blank"
            rel="noreferrer"
            className="link-tag"
          >
            {" "}
            {t("RJ1.stepTwo.pp4")}
          </a>
          .
        </p>
      </div>

      <div className={styles.ButtonContainer}>
        <Button onClick={() => setStep(step - 1)} type="button">
          {t("prevStepButton")}
        </Button>
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
            {t("submitButton")}
          </Button>
        )}
      </div>
    </form>
  );
};

PropertyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(PropertyDetails);
