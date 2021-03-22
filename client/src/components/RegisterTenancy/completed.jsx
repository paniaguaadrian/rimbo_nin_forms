// React Components
import React from "react";
import PropTypes from "prop-types";

// Imported Styles
import styles from "../RegisterTenancy/register-user.module.scss";

// Multi language
import { withNamespaces } from "react-i18next";

const Completed = ({ tenancy, t }) => {
  return (
    <div className={styles.CompleteContainer}>
      <div className={styles.CompleteText}>
        <h1>
          {t("RJ1.completed.title")} {""}
          <b>
            {""}
            {`${tenancy.agencyContactPerson}`}
            {""}
          </b>
          {""} {t("RJ1.completed.titleTwo")} <b> {`${tenancy.agencyName}`}</b>
        </h1>
        <h3>
          {t("RJ1.completed.subtitle")}{" "}
          <b>{`${tenancy.tenantDetails.tenantName}`}</b>{" "}
          {t("RJ1.completed.subtitleTwo")}
        </h3>
        <p>
          {t("RJ1.completed.subtext")} <b>{`${tenancy.agencyEmailPerson}`}</b>{" "}
          {t("RJ1.completed.subtextTwo")}
        </p>
        <h3>{t("RJ1.completed.regards")}</h3>
      </div>
    </div>
  );
};

Completed.propTypes = {
  tenancy: PropTypes.object,
};

export default withNamespaces()(Completed);
