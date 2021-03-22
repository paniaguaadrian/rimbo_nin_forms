import { UPDATE_NEWTENANT_INFO } from "./tenant-constants";

export const DefaultTenant = {
  landlordEmail: "",
  landlordName: "",
  landlordPhone: "",
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
