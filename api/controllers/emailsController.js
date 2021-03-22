import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";

// * Rimbo rent emails
// Production / Development
// const rimboEmail = "info@rimbo.rent";
const testEmail = "paniaguasanchezadrian@gmail.com";

// ? =======>  SPANISH VERSION START ==============================>
// ! RJ1 Form => RJ3, RJ4, RJD Emails.
const sendRJ1FormEmails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    rentAmount,
    product,
    rentDuration,
    randomID,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterRJ3 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj3Email",
    },
    viewPath: "views/",
  };

  transporterRJ3.use("compile", hbs(optionsRJ3));

  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM/Agency email
    subject: "Registro de inquilino correcto",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "badi-logo.png",
        path: "./views/images/badi-logo.png",
        cid: "badilogo",
      },
    ],
    template: "rj3Email",
    context: {
      agencyContactPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
    },
  };

  transporterRJ3.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  // * START =======> RJ4 Email  @Tenant
  const transporterRJ4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4Email",
    },
    viewPath: "views/",
  };

  transporterRJ4.use("compile", hbs(optionsRJ4));

  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // tenant's email
    subject: "¡Te damos la bienvenida!",
    // text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj4Email",
    context: {
      tenantsName,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
      randomID,
    },
  };

  transporterRJ4.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ4 Email  @Tenant

  // * START =======> RJD Email  @Rimbo
  const transporterRJD = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJD = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjdEmail",
    },
    viewPath: "views/",
  };

  transporterRJD.use("compile", hbs(optionsRJD));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `Nuevo inquilino registrado por ${agencyName}`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjdEmail",
    context: {
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterRJD.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJD Email  @Rimbo

  res.status(200).json();
};

// ! RJ2 Form => RJ9 Email (tenant)
const sendRJ2FormEmails = async (req, res) => {
  const { tenantsName, tenantsEmail } = req.body;

  // * START =======> RJ9 Email  @Tenant
  const transporterRJ9 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ9 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj9Email",
    },
    viewPath: "views/",
  };

  transporterRJ9.use("compile", hbs(optionsRJ9));

  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant email
    subject: `¡Genial! ¡Hemos recibido la información!`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj9Email",
    context: {
      tenantsName,
    },
  };

  transporterRJ9.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ9 Email  @Tenant

  res.status(200).json();
};

// ! RJ2 Form => RJXX3 Email with tenant's files attached (Rimbo)
const sendRJ3FilesEmail = async (req, res) => {
  const {
    agencyName,
    agencyContactPerson,
    agencyPhonePerson,
    agencyEmailPerson,
    tenantsName,
    tenantsPhone,
    tenantsEmail,
    tenancyID,
    documentImageFront,
    documentImageBack,
    lastPayslip,
    previousPayslip,
    documentNumber,
    monthlyNetIncome,
    jobType,
    tenantsAddress,
    tenantsZipCode,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  // * START =======> RJXX3 Email  @Rimbo
  const transporterRJXX3Files = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx3FilesEmail",
    },
    viewPath: "views/",
  };

  transporterRJXX3Files.use("compile", hbs(optionsRJXX3));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `${tenantsName} listo/a para evaluación`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx3FilesEmail",
    context: {
      agencyName,
      agencyContactPerson,
      agencyPhonePerson,
      agencyEmailPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      tenancyID,
      documentImageFront,
      documentImageBack,
      lastPayslip,
      previousPayslip,
      documentNumber,
      monthlyNetIncome,
      jobType,
      tenantsAddress,
      tenantsZipCode,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterRJXX3Files.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJXX3 Email  @Tenant

  res.status(200).json();
};

// ! RJXX3 Email => RJ11 Email
const sendRJ11Emails = async (req, res) => {
  const {
    tenantsName,
    agencyContactPerson,
    agencyEmailPerson,
    tenancyID,
    randomID,
  } = req.body;

  const transporterRJ11 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ11 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj11Email",
    },
    viewPath: "views/",
  };

  transporterRJ11.use("compile", hbs(optionsRJ11));

  // RJ11 Email  @PM/Agency
  const pmEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // pm's email
    subject: `Inquilino ${tenantsName} aceptado`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj11Email",
    context: {
      agencyContactPerson,
      tenantsName,
      tenantsName,
      tenancyID,
    },
  };
  transporterRJ11.sendMail(pmEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  res.status(200).json();
};

// ! RJ11 Email => RJXX4, RJ14 Emails
const sendPMEmails = async (req, res) => {
  const {
    tenancyID,
    randomID,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    monthlyNetIncome,
    jobType,
    documentNumber,
    agencyContactPerson,
    agencyEmailPerson,
    agencyName,
    agencyPhonePerson,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterRJXX4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ14 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx4Email",
    },
    viewPath: "views/",
  };

  let optionsRJ14 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj14Email",
    },
    viewPath: "views/",
  };

  transporterRJXX4.use("compile", hbs(optionsRJXX4));
  transporterRJ14.use("compile", hbs(optionsRJ14));

  // RJXX4 Email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: "Inquilino aceptado",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx4Email",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      monthlyNetIncome,
      jobType,
      documentNumber,
      agencyContactPerson,
      agencyEmailPerson,
      agencyName,
      agencyPhonePerson,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  // RJ14 Email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // tenant Email
    subject: "¿Todo listo para mudarte?",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj14Email",
    context: {
      agencyContactPerson,
      agencyName,
      rentalAddress,
      tenantsName,
      tenancyID,
      randomID,
    },
  };

  transporterRJXX4.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ14.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ3 Form =>  RJ15 Email
const sendRJ3FormEmail = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJ15 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ15 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj15Email",
    },
    viewPath: "views/",
  };

  transporterRJ15.use("compile", hbs(optionsRJ15));

  // RJ15 email @Rimbo
  const RimbosEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: "Tarjeta registrada correctamente",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj15Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      randomID,
      tenancyID,
      agencyName,
      rentalAddress,
    },
  };

  transporterRJ15.sendMail(RimbosEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ15 Email => RJXX5, RJ16 Emails
const sendRJ15Emails = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJXX5 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ16 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX5 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx5Email",
    },
    viewPath: "views/",
  };

  let optionsRJ16 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj16Email",
    },
    viewPath: "views/",
  };

  transporterRJXX5.use("compile", hbs(optionsRJXX5));
  transporterRJ16.use("compile", hbs(optionsRJ16));

  // RJXX5 email @Tenant
  const TenantsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant email
    subject: "¡Tarjeta registrada correctamente!",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx5Email",
    context: {
      tenantsName,
    },
  };

  // RJ16 email @PM
  const PMsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM email
    subject: "Registro de inquilino finalizado",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj16Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      agencyName,
      rentalAddress,
      randomID,
      tenancyID,
    },
  };

  transporterRJXX5.sendMail(TenantsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ16.sendMail(PMsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJS Form => RJ18 Email
const sendRJSFormEmail = async (req, res) => {
  const {
    agencyName,
    rentalAddress,
    tenantsName,
    pmAnex,
    tenancyID,
  } = req.body;

  const transporterRJS = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJS = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjsEmail",
    },
    viewPath: "views/",
  };

  transporterRJS.use("compile", hbs(optionsRJS));

  // RJ18 email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: "Inicio de alquiler preparar aval",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjsEmail",
    context: {
      agencyName,
      rentalAddress,
      tenantsName,
      pmAnex,
      tenancyID,
    },
  };

  transporterRJS.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ18 Email => RJ17, RJ20 Emails
const sendRJ18Email = async (req, res) => {
  const {
    tenancyID,
    randomID,
    tenantsName,
    tenantsEmail,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
  } = req.body;

  const transporterRJ17 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ20 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ17 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj17Email",
    },
    viewPath: "views/",
  };

  let optionsRJ20 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj20Email",
    },
    viewPath: "views/",
  };

  transporterRJ17.use("compile", hbs(optionsRJ17));
  transporterRJ20.use("compile", hbs(optionsRJ20));

  // RJ17 email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant email
    subject: "¡Te damos la bienvenida a la familia Rimbo! Registro finalizado",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj17Email",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
    },
  };

  // RJ20 email @PM
  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM email
    subject: " ¡Enhorabuena! La propiedad ya está cubierta por Rimbo",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj20Email",
    context: {
      tenancyID,
      randomID,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
    },
  };

  transporterRJ17.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ20.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======>  SPANISH VERSION END ==============================>
////////////////////////////////////////////////////////////////
// ? =======>  ENGLISH VERSION START ==============================>
// ! RJ1 Form => RJ3, RJ4, RJD Emails
const sendRJ1FormEmailsEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    agencyPhonePerson,
    rentalAddress,
    rentalPostalCode,
    rentalCity,
    rentAmount,
    product,
    rentDuration,
    randomID,
  } = req.body;

  // * START =======> RJ3 Email  @PM/Agency
  const transporterRJ3 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj3EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ3.use("compile", hbs(optionsRJ3));

  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM/Agency email
    subject: "Tenant registered correctly",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj3EmailEn",
    context: {
      agencyContactPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
    },
  };

  transporterRJ3.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ3 Email  @PM/Agency

  // * START =======> RJ4 Email  @Tenant
  const transporterRJ4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj4EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ4.use("compile", hbs(optionsRJ4));

  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // tenant's email
    subject: "Warm welcome!",
    // text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj4EmailEn",
    context: {
      tenantsName,
      agencyName,
      rentalAddress,
      rentalPostalCode,
      rentalCity,
      agencyName,
      rentalAddress,
      randomID,
    },
  };

  transporterRJ4.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ4 Email  @Tenant

  // * START =======> RJD Email  @Rimbo
  const transporterRJD = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJD = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjdEmailEn",
    },
    viewPath: "views/",
  };

  transporterRJD.use("compile", hbs(optionsRJD));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `New tenant added by ${agencyName}`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjdEmailEn",
    context: {
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      agencyPhonePerson,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterRJD.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJD Email  @Rimbo

  res.status(200).json();
};

// ! RJ2 Form => RJ9 Email (tenant)
const sendRJ2FormEmailsEn = async (req, res) => {
  const { tenantsName, tenantsEmail } = req.body;

  // * START =======> RJ9 Email  @Tenant
  const transporterRJ9 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ9 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj9EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ9.use("compile", hbs(optionsRJ9));

  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant email
    subject: `¡Genial! ¡Hemos recibido la información!`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj9EmailEn",
    context: {
      tenantsName,
    },
  };

  transporterRJ9.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJ9 Email  @Tenant

  res.status(200).json();
};

// ! RJ2 Form => RJXX3 Email with tenant's files attached (Rimbo)
const sendRJ3FilesEmailEn = async (req, res) => {
  const {
    agencyName,
    agencyContactPerson,
    agencyPhonePerson,
    agencyEmailPerson,
    tenantsName,
    tenantsPhone,
    tenantsEmail,
    tenancyID,
    documentImageFront,
    documentImageBack,
    lastPayslip,
    previousPayslip,
    documentNumber,
    monthlyNetIncome,
    jobType,
    tenantsAddress,
    tenantsZipCode,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  // * START =======> RJXX3 Email  @Rimbo
  const transporterRJXX3Files = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx3FilesEmailEn",
    },
    viewPath: "views/",
  };

  transporterRJXX3Files.use("compile", hbs(optionsRJXX3));

  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: `${tenantsName} listo/a para evaluación`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx3FilesEmailEn",
    context: {
      agencyName,
      agencyContactPerson,
      agencyPhonePerson,
      agencyEmailPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      tenancyID,
      documentImageFront,
      documentImageBack,
      lastPayslip,
      previousPayslip,
      documentNumber,
      monthlyNetIncome,
      jobType,
      tenantsAddress,
      tenantsZipCode,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  transporterRJXX3Files.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  // * END =======> RJXX3 Email  @Tenant

  res.status(200).json();
};

// ! RJXX3 Email => RJ11 Email
const sendRJ11EmailsEn = async (req, res) => {
  const {
    tenantsName,
    agencyContactPerson,
    agencyEmailPerson,
    tenancyID,
    randomID,
  } = req.body;

  const transporterRJ11 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ11 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj11EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ11.use("compile", hbs(optionsRJ11));

  // RJ11 Email  @PM/Agency
  const pmEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // pm's email
    subject: `Inquilino ${tenantsName} aceptado`,
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj11EmailEn",
    context: {
      agencyContactPerson,
      tenantsName,
      tenantsName,
      tenancyID,
    },
  };
  transporterRJ11.sendMail(pmEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  res.status(200).json();
};

// ! RJ11 Email => RJXX4, RJ14 Emails
const sendPMEmailsEn = async (req, res) => {
  const {
    tenancyID,
    randomID,
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    monthlyNetIncome,
    jobType,
    documentNumber,
    agencyContactPerson,
    agencyEmailPerson,
    agencyName,
    agencyPhonePerson,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
  } = req.body;

  const transporterRJXX4 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ14 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX4 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx4EmailEn",
    },
    viewPath: "views/",
  };

  let optionsRJ14 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj14EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJXX4.use("compile", hbs(optionsRJXX4));
  transporterRJ14.use("compile", hbs(optionsRJ14));

  // RJXX4 Email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: "Inquilino aceptado",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx4EmailEn",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      monthlyNetIncome,
      jobType,
      documentNumber,
      agencyContactPerson,
      agencyEmailPerson,
      agencyName,
      agencyPhonePerson,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
    },
  };

  // RJ14 Email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // tenant Email
    subject: "¿Todo listo para mudarte?",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj14EmailEn",
    context: {
      agencyContactPerson,
      agencyName,
      rentalAddress,
      tenantsName,
      tenancyID,
      randomID,
    },
  };

  transporterRJXX4.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ14.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ3 Form =>  RJ15 Email
const sendRJ3FormEmailEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJ15 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ15 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj15EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ15.use("compile", hbs(optionsRJ15));

  // RJ15 email @Rimbo
  const RimbosEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: "Tarjeta registrada correctamente",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj15EmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      randomID,
      tenancyID,
      agencyName,
      rentalAddress,
    },
  };

  transporterRJ15.sendMail(RimbosEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ15 Email => RJXX5, RJ16 Emails
const sendRJ15EmailsEn = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJXX5 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ16 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJXX5 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjxx5EmailEn",
    },
    viewPath: "views/",
  };

  let optionsRJ16 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj16EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJXX5.use("compile", hbs(optionsRJXX5));
  transporterRJ16.use("compile", hbs(optionsRJ16));

  // RJXX5 email @Tenant
  const TenantsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant email
    subject: "¡Tarjeta registrada correctamente!",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx5EmailEn",
    context: {
      tenantsName,
    },
  };

  // RJ16 email @PM
  const PMsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM email
    subject: "Registro de inquilino finalizado",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj16EmailEn",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      agencyName,
      rentalAddress,
      randomID,
      tenancyID,
    },
  };

  transporterRJXX5.sendMail(TenantsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ16.sendMail(PMsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJS Form => RJ18 Email
const sendRJSFormEmailEn = async (req, res) => {
  const {
    agencyName,
    rentalAddress,
    tenantsName,
    pmAnex,
    tenancyID,
  } = req.body;

  const transporterRJS = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJS = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rjsEmailEn",
    },
    viewPath: "views/",
  };

  transporterRJS.use("compile", hbs(optionsRJS));

  // RJ18 email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Rimbo email
    subject: "Inicio de alquiler preparar aval",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjsEmailEn",
    context: {
      agencyName,
      rentalAddress,
      tenantsName,
      pmAnex,
      tenancyID,
    },
  };

  transporterRJS.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ18 Email => RJ17, RJ20 Emails
const sendRJ18EmailEn = async (req, res) => {
  const {
    tenancyID,
    randomID,
    tenantsName,
    tenantsEmail,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
  } = req.body;

  const transporterRJ17 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  const transporterRJ20 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );

  let optionsRJ17 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj17EmailEn",
    },
    viewPath: "views/",
  };

  let optionsRJ20 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "views/",
      defaultLayout: "rj20EmailEn",
    },
    viewPath: "views/",
  };

  transporterRJ17.use("compile", hbs(optionsRJ17));
  transporterRJ20.use("compile", hbs(optionsRJ20));

  // RJ17 email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // Tenant email
    subject: "¡Te damos la bienvenida a la familia Rimbo! Registro finalizado",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj17EmailEn",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
    },
  };

  // RJ20 email @PM
  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: testEmail, // PM email
    subject: " ¡Enhorabuena! La propiedad ya está cubierta por Rimbo",
    text: "",
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./views/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj20EmailEn",
    context: {
      tenancyID,
      randomID,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
    },
  };

  transporterRJ17.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ20.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};
// ? =======> ENGLISH VERSION END ==============================>

export {
  sendRJ1FormEmails,
  sendRJ2FormEmails,
  sendRJ11Emails,
  sendPMEmails,
  sendRJ3FormEmail,
  sendRJ15Emails,
  sendRJSFormEmail,
  sendRJ3FilesEmail,
  sendRJ18Email,
  sendRJ1FormEmailsEn,
  sendRJ2FormEmailsEn,
  sendRJ3FilesEmailEn,
  sendRJ11EmailsEn,
  sendPMEmailsEn,
  sendRJ3FormEmailEn,
  sendRJ15EmailsEn,
  sendRJSFormEmailEn,
  sendRJ18EmailEn,
};
