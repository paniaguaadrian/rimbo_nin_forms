import { UPDATE_NEWTENANT_INFO } from "./tenant-constants";

export const DefaultTenant = {
  monthlyNetIncome: "",
  jobType: "",
  documentType: "",
  documentNumber: "",
  tenantsAddress: "",
  tenantsZipCode: "",
  isAcceptedGC: true,
};

export const TenantReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_NEWTENANT_INFO:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
