import customerModel from "../Model/customer.model";

export const getAllCustomers = async (req, res) => {
  try {
    const customersData = await customerModel.find({ status: 1 });
    res.status(200).json({
      data: customersData,
      message: "Successfully data is fetched",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customer_ID = req.params.customer_id;

    const customerData = await customerModel.findOne({
      status: 1,
      _id: customer_ID,
    });

    res.status(200).json({
      data: customerData,
      message: "Successfully data is fetched",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const {
      mobile,
      date,
      personTitle,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      anniversaryDate,
      personalEmail,
      maritalStatus,
      residenceStatus,
      rentAmount,
      howLongLiveYourCurrentAddress,
      currentEmployer,
      officeEmail,
      currentCompanyExperience,
      netMonthlyIncome,
      bonus,
      additionalMonthlyIncome,
      bankName,
      loanAmtDisbursed,
      tenure,
      rateOfInterest,
      emiAmount,
      dsaName,
      emiStartDate,
      emiEndDate,
      additionalInformation,
      permanentAddressStreet,
      permanentAddressStreet2,
      permanentAddressCity,
      permanentAddressState,
      permanentAddressZipCode,
      permanentAddressCounty,
      currentAddressStreet,
      currentAddressStreet2,
      currentAddressCity,
      currentAddressState,
      currentAddressZipCode,
      currentAddressCounty,
    } = req.body;
    // console.log(req.body);
    const customerData = new customerModel({
      name: {
        personTitle: personTitle,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
      },
      date: date,
      mobile: mobile,
      dateOfBirth: dateOfBirth,
      anniversaryDate: anniversaryDate,
      personalEmail: personalEmail,
      maritalStatus: maritalStatus,
      currentAddressStreet2: currentAddressStreet2,
      permanentAddressStreet2: permanentAddressStreet2,
      permanentAddressStreet: permanentAddressStreet,
      permanentAddressCity: permanentAddressCity,
      permanentAddressState: permanentAddressState,
      permanentAddressZipCode: permanentAddressZipCode,
      permanentAddressCounty: permanentAddressCounty,
      currentAddressStreet: currentAddressStreet,
      currentAddressCity: currentAddressCity,
      currentAddressState: currentAddressState,
      currentAddressZipCode: currentAddressZipCode,
      currentAddressCounty: currentAddressCounty,
      residenceStatus: residenceStatus,
      rentAmount: rentAmount,
      howLongLiveYourCurrentAddress: howLongLiveYourCurrentAddress,
      currentEmployer: currentEmployer,
      officeEmail: officeEmail,
      currentCompanyExperience: currentCompanyExperience,
      netMonthlyIncome: netMonthlyIncome,
      bonus: bonus,
      additionalMonthlyIncome: additionalMonthlyIncome,
      bankName: bankName,
      loanAmtDisbursed: loanAmtDisbursed,
      tenure: tenure,
      rateOfInterest: rateOfInterest,
      emiAmount: emiAmount,
      dsaName: dsaName,
      emiStartDate: emiStartDate,
      emiEndDate: emiEndDate,
      additionalInformation: additionalInformation,
    });
    await customerData.save();

    res.status(201).json({
      data: customerData,
      message: "Added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editCustomer = async (req, res) => {
  try {
    const {
      mobile,
      date,
      personTitle,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      anniversaryDate,
      personalEmail,
      maritalStatus,
      residenceStatus,
      rentAmount,
      howLongLiveYourCurrentAddress,
      currentEmployer,
      officeEmail,
      currentCompanyExperience,
      netMonthlyIncome,
      bonus,
      additionalMonthlyIncome,
      bankName,
      loanAmtDisbursed,
      tenure,
      rateOfInterest,
      emiAmount,
      dsaName,
      emiStartDate,
      emiEndDate,
      additionalInformation,
      permanentAddressStreet,
      permanentAddressStreet2,
      permanentAddressCity,
      permanentAddressState,
      permanentAddressZipCode,
      permanentAddressCounty,
      currentAddressStreet,
      currentAddressStreet2,
      currentAddressCity,
      currentAddressState,
      currentAddressZipCode,
      currentAddressCounty,
    } = req.body;

    const customerId = req.params._id;
    const updatedData = {
      name: {
        personTitle: personTitle,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
      },
      date: date,
      mobile: mobile,
      dateOfBirth: dateOfBirth,
      anniversaryDate: anniversaryDate,
      personalEmail: personalEmail,
      maritalStatus: maritalStatus,
      currentAddressStreet2: currentAddressStreet2,
      permanentAddressStreet2: permanentAddressStreet2,
      permanentAddressStreet: permanentAddressStreet,
      permanentAddressCity: permanentAddressCity,
      permanentAddressState: permanentAddressState,
      permanentAddressZipCode: permanentAddressZipCode,
      permanentAddressCounty: permanentAddressCounty,
      currentAddressStreet: currentAddressStreet,
      currentAddressCity: currentAddressCity,
      currentAddressState: currentAddressState,
      currentAddressZipCode: currentAddressZipCode,
      currentAddressCounty: currentAddressCounty,
      residenceStatus: residenceStatus,
      rentAmount: rentAmount,
      howLongLiveYourCurrentAddress: howLongLiveYourCurrentAddress,
      currentEmployer: currentEmployer,
      officeEmail: officeEmail,
      currentCompanyExperience: currentCompanyExperience,
      netMonthlyIncome: netMonthlyIncome,
      bonus: bonus,
      additionalMonthlyIncome: additionalMonthlyIncome,
      bankName: bankName,
      loanAmtDisbursed: loanAmtDisbursed,
      tenure: tenure,
      rateOfInterest: rateOfInterest,
      emiAmount: emiAmount,
      dsaName: dsaName,
      emiStartDate: emiStartDate,
      emiEndDate: emiEndDate,
      additionalInformation: additionalInformation,
    };

    const updatedCustomer = await customerModel.findByIdAndUpdate(
      customerId,
      updatedData,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Leader not found.",
      });
    }

    res.status(200).json({
      data: updatedCustomer,
      message: "Leader updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
