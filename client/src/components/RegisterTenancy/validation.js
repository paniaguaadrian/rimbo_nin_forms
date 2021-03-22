export const isTenant = (values) => {
  let errors = {};
  if (!values.tenantsName) {
    errors.tenantsName = "Tenant name is required";
  }
  if (!values.tenantsPhone) {
    errors.tenantsPhone = "Phone number is required";
  }
  if (values.tenantsPhone && values.tenantsPhone.length < 9) {
    errors.tenantsPhone = "Enter valid phone number";
  }
  if (!values.tenantsEmail) {
    errors.tenantsEmail = "Tenant email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.tenantsEmail = "Email address is invalid";
  }
  return errors;
};

export const isProperty = (values) => {
  let errors = {};
  if (values.propertyState === "-1") {
    errors.propertyState = "You must choose one property.";
  }
  if (!values.rentAmount) {
    errors.rentAmount = "Monthly Rent is required.";
  }
  if (!values.isAgentAccepted) {
    errors.isAgentAccepted = "You must accept our Terms and Conditions";
  }

  return errors;
};
