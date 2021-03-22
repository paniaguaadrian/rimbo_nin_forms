export const isAgency = (values) => {
  let errors = {};
  if (!values.agencyName) {
    errors.agencyName = "Agency name is required";
  }
  if (!values.agencyEmailPerson) {
    errors.agencyEmailPerson = "Agency email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.agencyEmailPerson = "Email address is invalid";
  }
  if (!values.agencyContactPerson) {
    errors.agencyContactPerson = "Contact person name is required";
  }
  if (!values.agencyPhonePerson) {
    errors.agencyPhonePerson = "Phone number is required";
  }
  if (values.agencyPhonePerson && values.agencyPhonePerson.length < 9) {
    errors.agencyPhonePerson = "Enter valid phone number";
  }
  return errors;
};

export const isTenant = (values) => {
  let errors = {};
  if (!values.tenantName) {
    errors.tenantName = "Tenant name is required";
  }
  if (!values.tenantPhone) {
    errors.tenantPhone = "Phone number is required";
  }
  if (values.tenantPhone && values.tenantPhone.length < 9) {
    errors.tenantPhone = "Enter valid phone number";
  }
  if (!values.tenantEmail) {
    errors.tenantEmail = "Tenant email address is required";
  } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.tenantEmail = "Email address is invalid";
  }
  return errors;
};

export const isProperty = (values) => {
  let errors = {};
  if (values.product === "-1") {
    errors.product = "You must choose one service.";
  }
  if (!values.rentDuration) {
    errors.rentDuration = "Enter a rental duration (in years).";
  }
  if (!values.rentalCity) {
    errors.rentalCity = "City Name is required.";
  }
  if (!values.rentalPostalCode) {
    errors.rentalPostalCode = "Postal Code is required.";
  }
  if (values.rentalPostalCode && values.rentalPostalCode.length < 5) {
    errors.rentalPostalCode = "Enter valid Postal Code.";
  }
  if (!values.rentAmount) {
    errors.rentAmount = "Monthly Rent is required.";
  }
  if (!values.rentalAddress) {
    errors.rentalAddress = "Rental Address is required.";
  }
  if (!values.isAgentAccepted) {
    errors.isAgentAccepted = "You must accept our Terms and Conditions";
  }
  return errors;
};
