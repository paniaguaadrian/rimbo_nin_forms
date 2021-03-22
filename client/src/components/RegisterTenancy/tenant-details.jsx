// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../Input";
import Button from "../Button";

// From Validation
import { isTenant } from "./validation";

// Constants
import { UPDATE_TENANT_INFO } from "./constants";

// Imported Styles
import styles from "../RegisterTenancy/register-user.module.scss";

// Multi language
import { withNamespaces } from "react-i18next";

const TenantDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  // Handle on change
  const handleTenant = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANT_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isTenant(tenancy.tenantDetails);
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
            name="tenantName"
            value={tenancy.tenantDetails.tenantName}
            label={t("RJ1.stepOne.tenantName")}
            placeholder={t("RJ1.stepOne.tenantNamePL")}
            onChange={(e) => handleTenant(e)}
            error={errors.tenantName}
          />
          <Input
            type="email"
            name="tenantEmail"
            value={tenancy.tenantDetails.tenantEmail}
            label={t("RJ1.stepOne.tenantEmail")}
            placeholder={t("RJ1.stepOne.tenantEmailPL")}
            onChange={(e) => handleTenant(e)}
            error={errors.tenantEmail}
          />
        </div>
        <div className={styles.FormRight}>
          <Input
            type="text"
            name="tenantPhone"
            value={tenancy.tenantDetails.tenantPhone}
            label={t("RJ1.stepOne.tenantPhone")}
            placeholder={t("RJ1.stepOne.tenantPhonePL")}
            onChange={(e) => handleTenant(e)}
            error={errors.tenantPhone}
          />
        </div>
      </div>

      <div className={styles.ButtonContainer}>
        <Button onClick={() => setStep(step - 1)} type="button">
          {t("prevStepButton")}
        </Button>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

TenantDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(TenantDetails);
