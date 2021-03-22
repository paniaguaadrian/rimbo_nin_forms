import { UPDATE_NEWTENANT_PM_APPROVED } from "./approved_tenant_pm-constants";

export const DefaultTenant = {
  isPMAccepted: true,
};

export const TenantReducer = (newTenant, { type, payload }) => {
  switch (type) {
    case UPDATE_NEWTENANT_PM_APPROVED:
      return {
        ...newTenant,
        ...payload,
      };

    default:
      return newTenant;
  }
};
