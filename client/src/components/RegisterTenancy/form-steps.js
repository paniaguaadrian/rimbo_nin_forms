// React Components
import React from "react";

// Custom Components
import AgencyDetails from "./agency-details";
import TenantDetails from "./tenant-details";
import PropertyDetails from "./property-details";
import Completed from "./completed";

const FormSteps = (step, setStep, tenancy, setTenancy) => [
  {
    title: "Real State Agency",
    content: (
      <AgencyDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Tenant Information",
    content: (
      <TenantDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },
  {
    title: "Apartment Details",
    content: (
      <PropertyDetails
        setStep={setStep}
        step={step}
        tenancy={tenancy}
        setTenancy={setTenancy}
      />
    ),
  },

  {
    title: "Listing Complete",
    content: <Completed tenancy={tenancy} />,
  },
];

export default FormSteps;
