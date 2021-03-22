// React Components
import React, { useReducer, useState } from "react";

// Reducer
import { TenancyReducer, DefaultTenancy } from "./tenancy-reducer";

// Styles imported
import styles from "./register-user.module.scss";

// Custom Components
import FormSteps from "./form-steps";
import { withNamespaces } from "react-i18next";

const RegisterTenancy = ({ t }) => {
  let [step, setStep] = useState(0);

  const [tenancy, setTenancy] = useReducer(TenancyReducer, DefaultTenancy);
  let steps = FormSteps(step, setStep, tenancy, setTenancy);

  return (
    <>
      <div className={styles.RegisterContainer}>
        {step === 0 || step === 1 || step === 2 ? (
          <div className={styles.Register}>
            {/* <h1>List your tenant for screening</h1> */}
            <h1>{t("RJ1.header.title")}</h1>
            <div className={styles.ExtraInfoContainer}>
              <p>{t("RJ1.header.subtitleOne")}</p>
              <p>{t("RJ1.header.subtitleTwo")}</p>
              <p>{t("RJ1.header.subtitleThree")}</p>
            </div>
            <h4>
              Step {step + 1} / {steps.length - 1} -{" "}
              <span>{steps[`${step}`].title}</span>
            </h4>
          </div>
        ) : null}

        <div className={styles.FormContent}>{steps[`${step}`].content}</div>
      </div>
    </>
  );
};

export default withNamespaces()(RegisterTenancy);
