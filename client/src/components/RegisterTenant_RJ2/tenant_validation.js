export const newTenant = (values) => {
  let errors = {};

  if (!values.monthlyNetIncome) {
    errors.monthlyNetIncome = "You must specify a monthly net";
  }
  if (values.jobType === "-1") {
    errors.jobType = "You must choose one job type";
  }
  if (values.documentType === "-1") {
    errors.documentType = "You must choose one document type";
  }
  if (!values.documentNumber) {
    errors.documentNumber = "You must specify a document number";
  }
  if (values.documentNumber && values.documentNumber.length < 8) {
    errors.documentNumber =
      "Your document number must be at least 8 characters";
  }
  if (!values.tenantsAddress) {
    errors.tenantsAddress = "You must specify your address";
  }
  if (!values.tenantsZipCode) {
    errors.tenantsZipCode = "You must specify a valid zip code";
  }

  if (!values.isAcceptedGC) {
    errors.isAcceptedGC = "You must accept our Privacy Policy";
  }
  return errors;
};
