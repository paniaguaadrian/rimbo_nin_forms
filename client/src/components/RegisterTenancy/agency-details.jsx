// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../Input";
import Button from "../Button";

// From Validation
import { isAgency } from "./validation";

// Constants
import { UPDATE_TENANCY_INFO } from "./constants";

// Imported Styles
import styles from "../RegisterTenancy/register-user.module.scss";

// Multi language
import { withNamespaces } from "react-i18next";

const AgencyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  // Handle on change.
  const handleAgency = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANCY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Handle on next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isAgency(tenancy);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleContinue}>
      <div className={styles.FormIntern}>
        <div className={styles.FormLeft}>
          <Input
            type="text"
            name="agencyName"
            value={tenancy.agencyName}
            label={t("RJ1.stepZero.agencyName")}
            onChange={(e) => handleAgency(e)}
            error={errors.agencyName}
            disabled
          />
          <Input
            type="text"
            name="agencyContactPerson"
            value={tenancy.agencyContactPerson}
            label={t("RJ1.stepZero.contactPerson")}
            placeholder={t("RJ1.stepZero.contactPersonPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.agencyContactPerson}
          />
        </div>
        <div className={styles.FormRight}>
          <Input
            type="email"
            name="agencyEmailPerson"
            value={tenancy.agencyEmailPerson}
            label={t("RJ1.stepZero.emailPerson")}
            placeholder={t("RJ1.stepZero.emailPersonPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.agencyEmailPerson}
          />
          <Input
            type="tel"
            name="agencyPhonePerson"
            value={tenancy.agencyPhonePerson}
            label={t("RJ1.stepZero.phonePerson")}
            placeholder={t("RJ1.stepZero.phonePersonPL")}
            onChange={(e) => handleAgency(e)}
            error={errors.agencyPhonePerson}
          />
        </div>
      </div>

      <div className={styles.AloneButtonContainer}>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

AgencyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(AgencyDetails);
