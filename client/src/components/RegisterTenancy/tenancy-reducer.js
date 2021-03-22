import {
  UPDATE_TENANCY_INFO,
  UPDATE_TENANT_INFO,
  UPDATE_PROPERTY_INFO,
} from "./constants";

export const DefaultTenancy = {
  agencyName: "Badi",
  agencyEmailPerson: "",
  agencyContactPerson: "",
  agencyPhonePerson: "",
  tenancyID: "",

  tenantDetails: {
    tenantName: "",
    tenantPhone: "",
    tenantEmail: "",
  },
  propertyDetails: {
    rentalCity: "",
    rentalPostalCode: "",
    rentalAddress: "",
    rentAmount: "",
    rentDuration: "",
    product: "",
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

    // case UPDATE_LANDLORD_INFO:
    //   return {
    //     ...tenancy,
    //     landlordDetails: {
    //       ...tenancy.landlordDetails,
    //       ...payload,
    //     },
    //   };

    default:
      return tenancy;
  }
};
