import {
  UPDATE_TENANCY_INFO,
  UPDATE_TENANT_INFO,
  UPDATE_PROPERTY_INFO,
} from "./constants";

const email = "paniaguasanchezadrian@gmail.com";

export const DefaultTenancy = {
  // Tenancy General

  // Agent information
  agencyName: "NiN",
  agencyEmailPerson: email,

  tenantDetails: {
    tenantsName: "",
    tenantsEmail: "",
    tenantsPhone: "",
    randomID: "",
  },

  propertyDetails: {
    state: "",
    rentAmount: "",
    rentStartDate: "",
    rentEndDate: "",
    propertyState: "",
    tenancyID: "",
    isAgentAccepted: true,
  },
};

export const TenancyReducer = (tenancy, { type, payload }) => {
  switch (type) {
    case UPDATE_TENANCY_INFO:
      return {
        ...tenancy,
        ...payload,
      };

    case UPDATE_TENANT_INFO:
      return {
        ...tenancy,
        tenantDetails: {
          ...tenancy.tenantDetails,
          ...payload,
        },
      };

    case UPDATE_PROPERTY_INFO:
      return {
        ...tenancy,
        propertyDetails: {
          ...tenancy.propertyDetails,
          ...payload,
        },
      };

    default:
      return tenancy;
  }
};
