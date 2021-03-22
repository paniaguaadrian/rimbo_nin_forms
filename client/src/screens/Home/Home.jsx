// React Components
import React from "react";
import { Helmet } from "react-helmet";

// Styles
// import styles from "./approved-user.module.scss";
import styles from "../approvedTenantRimbo/approved-user.module.scss";

// Multi Language
import { withNamespaces } from "react-i18next";

const Home = ({ t }) => {
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

        <title>Badi & Rimbo - The new way to rent</title>
      </Helmet>
      <div className={styles.SuccessPageContainer}>
        <div className={styles.SuccessPageText}>
          <h1>{t("Home.title")}</h1>
          <h2>{t("Home.subtitle")}</h2>

          <p>{t("Home.subtext")}</p>
        </div>
      </div>
    </>
  );
};

export default withNamespaces()(Home);
