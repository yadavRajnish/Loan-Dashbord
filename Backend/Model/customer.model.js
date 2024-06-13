import mongoose from "mongoose";
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    personTitle: String,
    firstName: String,
    middleName: String,
    lastName: String,
  },
  date : {
    type: Date,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  anniversaryDate: {
    type: Date,
    default: null,

  },
  mobile : {
    type : Number,
    default: null,
  },
  personalEmail: {
    type: String,
    default: null,
  },
  maritalStatus: {
    type: String,
    default: null,
  },
  permanentAddressStreet: {
    type: String,
    default: null,
  },
  permanentAddressStreet2: {
    type: String,
    default: null,
  },
  permanentAddressCity: {
    type: String,
    default: null,
  },
  permanentAddressState: {
    type: String,
    default: null,
  },
  permanentAddressZipCode: {
    type: String,
    default: null,
  },
  permanentAddressCounty: {
    type: String,
    default: null,
  },
  currentAddressStreet: {
    type: String,
    default: null,
  },
  currentAddressStreet2: {
    type: String,
    default: null,
  },
  currentAddressCity: {
    type: String,
    default: null,
  },
  currentAddressState: {
    type: String,
    default: null,
  },
  currentAddressZipCode: {
    type: String,
    default: null,
  },
  currentAddressCounty: {
    type: String,
    default: null,
  },

  residenceStatus: {
    type: String,
    default: null,
  },
  rentAmount: {
    type: Number,
    default: null,
  },
  howLongLiveYourCurrentAddress: {
    type: String,
    default: null,
  },
  currentEmployer: {
    type: String,
    default: null,
  },
  officeEmail: {
    type: String,
    default: null,
  },
  currentCompanyExperience: {
    type: String,
    default: null,
  },
  netMonthlyIncome: {
    type: Number,
    default: null,
  },
  bonus: {
    type: String,
    default: null,
  },
  additionalMonthlyIncome: {
    type: Number,
    default: null,
  },
  bankName: {
    type: String,
    default: null,
  },
  loanAmtDisbursed: {
    type: String,
    default: null,
  },
  tenure: {
    type: String,
    default: null,
  },
  rateOfInterest: {
    type: String,
    default: null,
  },
  emiAmount: {
    type: String,
    default: null,
  },
  dsaName: {
    type: String,
    default: null,
  },
  emiStartDate: {
    type: String,
    default: null,
  },
  emiEndDate: {
    type: String,
    default: null,
  },
  additionalInformation: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Customer", customerSchema);
