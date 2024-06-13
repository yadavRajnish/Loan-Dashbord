import React, { useEffect, useState } from "react";
import countryList from "react-select-country-list";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedBank, setSelectedBank] = useState("Bank name");
  const options = countryList().getData();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);

  const [maritalStatus, setMaritalStatus] = useState({
    single: false,
    married: false,
    other: false,
  });

  const [formData, setFormData] = useState({
    date: "",
    personTitle: "mr",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    anniversaryDate: "",
    mobile: "",
    personalEmail: "",
    maritalStatus: "",
    residenceStatus: "",
    rentAmount: "",
    howLongLiveYourCurrentAddress: "",
    currentEmployer: "",
    officeEmail: "",
    currentCompanyExperience: "",
    netMonthlyIncome: "",
    bonus: "",
    additionalMonthlyIncome: "",
    bankName: "",
    loanAmtDisbursed: "",
    tenure: "",
    rateOfInterest: "",
    emiAmount: "",
    dsaName: "",
    emiStartDate: "",
    emiEndDate: "",
    additionalInformation: "",
    permanentAddressStreet: "",
    permanentAddressCity: "",
    permanentAddressState: "",
    permanentAddressZipCode: "",
    permanentAddressCounty: "India",
    currentAddressStreet: "",
    currentAddressCity: "",
    currentAddressState: "",
    currentAddressZipCode: "",
    currentAddressCounty: "",
    currentAddressStreet2: "",
    permanentAddressStreet2: "",
  });

  useEffect(() => {
    if (location.state && location.state.editData) {
      const {
        name,
        mobile,
        personalEmail,
        numberOfMember,
        date,
        dateOfBirth,
        anniversaryDate,
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
        permanentAddressCity,
        permanentAddressState,
        permanentAddressZipCode,
        permanentAddressCounty,
        currentAddressStreet,
        currentAddressCity,
        currentAddressState,
        currentAddressZipCode,
        currentAddressCounty,
        currentAddressStreet2,
        permanentAddressStreet2,
      } = location.state.editData;
      setFormData({
        ...formData,
        firstName: name.firstName || "",
        middleName: name.middleName || "",
        lastName: name.lastName || "",
        mobile: mobile || "",
        personalEmail: personalEmail || "",
        numberOfMember: numberOfMember || "",
        date: date || "",
        dateOfBirth: dateOfBirth || "",
        anniversaryDate: anniversaryDate || "",
        maritalStatus: maritalStatus || "",
        residenceStatus: residenceStatus || "",
        rentAmount: rentAmount || "",
        howLongLiveYourCurrentAddress: howLongLiveYourCurrentAddress || "",
        currentEmployer: currentEmployer || "",
        officeEmail: officeEmail || "",
        currentCompanyExperience: currentCompanyExperience || "",
        netMonthlyIncome: netMonthlyIncome || "",
        bonus: bonus || "",
        additionalMonthlyIncome: additionalMonthlyIncome || "",
        bankName: bankName || "",
        loanAmtDisbursed: loanAmtDisbursed || "",
        tenure: tenure || "",
        rateOfInterest: rateOfInterest || "",
        emiAmount: emiAmount || "",
        dsaName: dsaName || "",
        emiStartDate: emiStartDate || "",
        emiEndDate: emiEndDate || "",
        additionalInformation: additionalInformation || "",
        permanentAddressStreet: permanentAddressStreet || "",
        permanentAddressCity: permanentAddressCity || "",
        permanentAddressState: permanentAddressState || "",
        permanentAddressZipCode: permanentAddressZipCode || "",
        permanentAddressCounty: permanentAddressCounty || "India",
        currentAddressStreet: currentAddressStreet || "",
        currentAddressCity: currentAddressCity || "",
        currentAddressState: currentAddressState || "",
        currentAddressZipCode: currentAddressZipCode || "",
        currentAddressCounty: currentAddressCounty || "",
        currentAddressStreet2: currentAddressStreet2 || "",
        permanentAddressStreet2: permanentAddressStreet2 || "",
      });
      setIsEditing(true);
    }
  }, [location.state, setIsEditing]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "date" || name === "personTitle") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (name === "residencyDuration") {
      const updatedResidency = {
        ...formData,
        howLongLiveYourCurrentAddress: value,
      };
      setFormData(updatedResidency);
    } else if (name === "currentExperience") {
      const updatedExperience = {
        ...formData,
        currentCompanyExperience: value,
      };
      setFormData(updatedExperience);
    } else if (type === "checkbox") {
      setMaritalStatus({
        ...maritalStatus,
        [name]: checked,
      });
      setFormData({
        ...formData,
        maritalStatus: Object.keys(maritalStatus)
          .filter((key) => maritalStatus[key])
          .join(","),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const editedData = { ...formData, _id: location.state.editData._id };
        // If editing, perform update
        console.log(editedData);
        await axios.put(
          `http://localhost:8888/edit-customer/${location.state.editData._id}`,
          editedData
        );
        console.log("Data successfully updated!");
      } else {
        // If not editing, perform addition
        await axios.post("http://localhost:8888/add-customer", formData);
        // console.log("Data successfully added!");
      }
      navigate("/customer");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const clickSubmitButton = (event) => {
  //   event.preventDefault();
  //   handleSubmit();
  // };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const bankNames = [
    "Bank name",
    "ABHYUDAYA CO-OP BANK LTD",
    "ABU DHABI COMMERCIAL BANK",
    "AKOLA DISTRICT CENTRAL CO-OPERATIVE BANK",
    "AKOLA JANATA COMMERCIAL COOPERATIVE BANK",
    "ALLAHABAD BANK",
    "ALMORA URBAN CO-OPERATIVE BANK LTD.",
    "ANDHRA BANK",
    "ANDHRA PRAGATHI GRAMEENA BANK",
    "APNA SAHAKARI BANK LTD",
    "AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED.",
    "AXIS BANK",
    "BANK INTERNASIONAL INDONESIA",
    "BANK OF AMERICA",
    "BANK OF BAHRAIN AND KUWAIT",
    "BANK OF BARODA",
    "BANK OF CEYLON",
    "BANK OF INDIA",
    "BANK OF MAHARASHTRA",
    "BANK OF TOKYO-MITSUBISHI UFJ LTD.",
    "BARCLAYS BANK PLC",
    "BASSEIN CATHOLIC CO-OP BANK LTD",
    "BHARATIYA MAHILA BANK LIMITED",
    "BNP PARIBAS",
    "CALYON BANK",
    "CANARA BANK",
    "CAPITAL LOCAL AREA BANK LTD.",
    "CATHOLIC SYRIAN BANK LTD.",
    "CENTRAL BANK OF INDIA",
    "CHINATRUST COMMERCIAL BANK",
    "CITIBANK NA",
    "CITIZENCREDIT CO-OPERATIVE BANK LTD",
    "CITY UNION BANK LTD",
    "COMMONWEALTH BANK OF AUSTRALIA",
    "CORPORATION BANK",
    "CREDIT SUISSE AG",
    "DBS BANK LTD",
    "DENA BANK",
    "DEUTSCHE BANK",
    "DEUTSCHE SECURITIES INDIA PRIVATE LIMITED",
    "DEVELOPMENT CREDIT BANK LIMITED",
    "DHANLAXMI BANK LTD",
    "DICGC",
    "DOMBIVLI NAGARI SAHAKARI BANK LIMITED",
    "FIRSTRAND BANK LIMITED",
    "GOPINATH PATIL PARSIK JANATA SAHAKARI BANK LTD",
    "GURGAON GRAMIN BANK",
    "HDFC BANK LTD",
    "HSBC",
    "ICICI BANK LTD",
    "IDBI BANK LTD",
    "IDRBT",
    "INDIAN BANK",
    "INDIAN OVERSEAS BANK",
    "INDUSIND BANK LTD",
    "INDUSTRIAL AND COMMERCIAL BANK OF CHINA LIMITED",
    "ING VYSYA BANK LTD",
    "JALGAON JANATA SAHKARI BANK LTD",
    "JANAKALYAN SAHAKARI BANK LTD",
    "JANASEVA SAHAKARI BANK (BORIVLI) LTD",
    "JANASEVA SAHAKARI BANK LTD. PUNE",
    "JANATA SAHAKARI BANK LTD (PUNE)",
    "JPMORGAN CHASE BANK N.A",
    "KALLAPPANNA AWADE ICH JANATA S BANK",
    "KAPOL CO OP BANK",
    "KARNATAKA BANK LTD",
    "KARNATAKA VIKAS GRAMEENA BANK",
    "KARUR VYSYA BANK",
    "KOTAK MAHINDRA BANK",
    "KURMANCHAL NAGAR SAHKARI BANK LTD",
    "MAHANAGAR CO-OP BANK LTD",
    "MAHARASHTRA STATE CO OPERATIVE BANK",
    "MASHREQBANK PSC",
    "MIZUHO CORPORATE BANK LTD",
    "MUMBAI DISTRICT CENTRAL CO-OP. BANK LTD.",
    "NAGPUR NAGRIK SAHAKARI BANK LTD",
    "NATIONAL AUSTRALIA BANK",
    "NEW INDIA CO-OPERATIVE BANK LTD.",
    "NKGSB CO-OP BANK LTD",
    "NORTH MALABAR GRAMIN BANK",
    "NUTAN NAGARIK SAHAKARI BANK LTD",
    "OMAN INTERNATIONAL BANK SAOG",
    "ORIENTAL BANK OF COMMERCE",
    "PARSIK JANATA SAHAKARI BANK LTD",
    "PRATHAMA BANK",
    "PRIME CO OPERATIVE BANK LTD",
    "PUNJAB AND MAHARASHTRA CO-OP BANK LTD.",
    "PUNJAB AND SIND BANK",
    "PUNJAB NATIONAL BANK",
    "RABOBANK INTERNATIONAL (CCRB)",
    "RAJGURUNAGAR SAHAKARI BANK LTD.",
    "RAJKOT NAGARIK SAHAKARI BANK LTD",
    "RESERVE BANK OF INDIA",
    "SBERBANK",
    "SHINHAN BANK",
    "SHRI CHHATRAPATI RAJARSHI SHAHU URBAN CO-OP BANK LTD",
    "SOCIETE GENERALE",
    "SOLAPUR JANATA SAHKARI BANK LTD.SOLAPUR",
    "SOUTH INDIAN BANK",
    "STANDARD CHARTERED BANK",
    "STATE BANK OF BIKANER AND JAIPUR",
    "STATE BANK OF HYDERABAD",
    "STATE BANK OF INDIA",
    "STATE BANK OF MAURITIUS LTD",
    "STATE BANK OF MYSORE",
    "STATE BANK OF PATIALA",
    "STATE BANK OF TRAVANCORE",
    "SUMITOMO MITSUI BANKING CORPORATION",
    "SYNDICATE BANK",
    "TAMILNAD MERCANTILE BANK LTD",
    "THANE BHARAT SAHAKARI BANK LTD",
    "THE A.P. MAHESH CO-OP URBAN BANK LTD.",
    "THE AHMEDABAD MERCANTILE CO-OPERATIVE BANK LTD.",
    "THE ANDHRA PRADESH STATE COOP BANK LTD",
    "THE BANK OF NOVA SCOTIA",
    "THE BANK OF RAJASTHAN LTD",
    "THE BHARAT CO-OPERATIVE BANK (MUMBAI) LTD",
    "THE COSMOS CO-OPERATIVE BANK LTD.",
    "THE DELHI STATE COOPERATIVE BANK LTD.",
    "THE FEDERAL BANK LTD",
    "THE GADCHIROLI DISTRICT CENTRAL COOPERATIVE BANK LTD",
    "THE GREATER BOMBAY CO-OP. BANK LTD",
    "THE GUJARAT STATE CO-OPERATIVE BANK LTD",
    "THE JALGAON PEOPLES CO-OP BANK",
    "THE JAMMU AND KASHMIR BANK LTD",
    "THE KALUPUR COMMERCIAL CO. OP. BANK LTD.",
    "THE KALYAN JANATA SAHAKARI BANK LTD.",
    "THE KANGRA CENTRAL CO-OPERATIVE BANK LTD",
    "THE KANGRA COOPERATIVE BANK LTD",
    "THE KARAD URBAN CO-OP BANK LTD",
    "THE KARNATAKA STATE APEX COOP. BANK LTD.",
    "THE LAKSHMI VILAS BANK LTD",
    "THE MEHSANA URBAN COOPERATIVE BANK LTD",
    "THE MUNICIPAL CO OPERATIVE BANK LTD MUMBAI",
    "THE NAINITAL BANK LIMITED",
    "THE NASIK MERCHANTS CO-OP BANK LTD. NASHIK",
    "THE RAJASTHAN STATE COOPERATIVE BANK LTD.",
    "THE RATNAKAR BANK LTD",
    "THE ROYAL BANK OF SCOTLAND N.V",
    "THE SAHEBRAO DESHMUKH CO-OP. BANK LTD.",
    "THE SARASWAT CO-OPERATIVE BANK LTD",
    "THE SEVA VIKAS CO-OPERATIVE BANK LTD (SVB)",
    "THE SHAMRAO VITHAL CO-OPERATIVE BANK LTD",
    "THE SURAT DISTRICT CO OPERATIVE BANK LTD.",
    "THE SURAT PEOPLES CO-OP BANK LTD",
    "THE SUTEX CO.OP. BANK LTD.",
    "THE TAMILNADU STATE APEX COOPERATIVE BANK LIMITED",
    "THE THANE DISTRICT CENTRAL CO-OP BANK LTD",
    "THE THANE JANATA SAHAKARI BANK LTD",
    "THE VARACHHA CO-OP. BANK LTD.",
    "THE VISHWESHWAR SAHAKARI BANK LTD. PUNE",
    "THE WEST BENGAL STATE COOPERATIVE BANK LTD",
    "TJSB SAHAKARI BANK LTD.",
    "TUMKUR GRAIN MERCHANTS COOPERATIVE BANK LTD.",
    "UBS AG",
    "UCO BANK",
    "UNION BANK OF INDIA",
    "UNITED BANK OF INDIA",
    "UNITED OVERSEAS BANK",
    "VASAI VIKAS SAHAKARI BANK LTD.",
    "VIJAYA BANK",
    "WEST BENGAL STATE COOPERATIVE BANK",
    "WESTPAC BANKING CORPORATION",
    "WOORI BANK",
    "YES BANK LTD",
    "ZILA SAHKARI BANK LTD GHAZIABAD",
    "IDFC First Bank",
  ];

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  return (
    <div className=" bg-white rounded-lg mx-20  w-[80vw] mt-5 py-10 text-[#666666]">
      <form onSubmit={handleSubmit} className="">
        <div className=" ms-40 w-[48vw] items-center shadow px-8">
          <h1 className="text-[30px] text-center py-10 pb-20 text-[black]">
            Customer's Loan Details
          </h1>

          {/* Date of Birth */}
          <div className="mb-10">
            <FormControl>
              <label>Date</label>
              <TextField
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          {/* Contact information */}
          <div className="mb-4 ">
            <h2 className="text-black my-4 text-lg">Contact information</h2>
            <p className="py-2">Name</p>
            <div className="flex gap-4">
              <FormControl>
                <Select
                  value={formData.personTitle}
                  onChange={handleInputChange}
                  className="w-[80px]"
                  name="personTitle"
                >
                  <MenuItem value="mr">Mr</MenuItem>
                  <MenuItem value="ms">Ms</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  name="firstName"
                  variant="outlined"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="">First Name</label>
              </FormControl>
              <FormControl>
                <TextField
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  variant="outlined"
                />
                <label htmlFor="">Middle Name</label>
              </FormControl>
              <FormControl>
                <TextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  variant="outlined"
                />
                <label htmlFor="">Last Name</label>
              </FormControl>
            </div>
          </div>

          {/* Employment Dates */}
          <div className="my-12 flex justify-between">
            <FormControl>
              <label htmlFor="" className="py-2">
                Date of Birth
              </label>
              <TextField
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl>
              <label className="py-2" htmlFor="">
                Anniversary Date
              </label>
              <TextField
                name="anniversaryDate"
                value={formData.anniversaryDate}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          <div className="mb-4 flex justify-between">
            <FormControl>
              <label className="py-2" htmlFor="">
                Mobile
              </label>
              <TextField
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                //
                type="number"
                placeholder="91 0000000000"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl>
              <label className="py-2" htmlFor="">
                Personal E-mail
              </label>
              <TextField
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                //
                placeholder="ex.xyz@gmail.com"
                type="email"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          {/* Marital Status */}
          <div className="mb-4">
            <h2 className="mt-12 text-black text-lg">Marital Status</h2>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={maritalStatus.single}
                    onChange={handleInputChange}
                    name="single"
                  />
                }
                label="Single"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={maritalStatus.married}
                    onChange={handleInputChange}
                    name="married"
                  />
                }
                label="Married"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={maritalStatus.other}
                    onChange={handleInputChange}
                    name="other"
                  />
                }
                label="Other"
              />
            </FormControl>
          </div>

          {/* Current Address */}
          <div className="mb-4">
            <h2 className="mt-12 mb-5 text-black text-lg">Current Address</h2>
            <div className="mb-8">
              <FormControl className="w-full ">
                <label htmlFor="" className="py-2">
                  Street Address
                </label>
                <TextField
                  name="currentAddressStreet"
                  value={formData.currentAddressStreet}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="mb-8">
              <FormControl className="w-full ">
                <label className="py-2" htmlFor="">
                  Street Address Line 2
                </label>
                <TextField
                  name="currentAddressStreet2"
                  value={formData.currentAddressStreet2}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="flex justify-between">
              <FormControl>
                <label htmlFor="" className="py-2">
                  City
                </label>
                <TextField
                  name="currentAddressCity"
                  value={formData.currentAddressCity}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <label htmlFor="" className="py-2">
                  State
                </label>
                <TextField
                  name="currentAddressState"
                  value={formData.currentAddressState}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="flex justify-between mt-7">
              <FormControl>
                <label htmlFor="">Zip Code</label>
                <TextField
                  name="currentAddressZipCode"
                  value={formData.currentAddressZipCode}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                  type="number"
                />
              </FormControl>

              <FormControl>
                <label htmlFor="country">Country</label>
                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  variant="outlined"
                  id="country"
                  className="w-[322px]"
                >
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="">
              <FormControl>
                <label>Current Residence Status </label>
                <Select
                  name="residenceStatus"
                  value={formData.residenceStatus}
                  onChange={handleInputChange}
                  className="w-[322px]"
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="">
              <FormControl>
                <label>If Rented Rent Amount</label>
                <TextField
                  name="rentAmount"
                  value={formData.rentAmount}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                  placeholder="e.g.23"
                  type="number"
                />
              </FormControl>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-black text-lg">
              How long have you lived in your current address
            </p>
            <div className="">
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="residencyDuration"
                    value="0-1 year"
                    onChange={handleInputChange}
                  />
                }
                label="0-1 year"
              />
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="residencyDuration"
                    value="1-2 year"
                    onChange={handleInputChange}
                  />
                }
                label="1-2 year"
              />
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="residencyDuration"
                    value="2-3 year"
                    onChange={handleInputChange}
                  />
                }
                label="2-3 year"
              />
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="residencyDuration"
                    value="5+ year"
                    onChange={handleInputChange}
                  />
                }
                label="5+ year"
              />
            </div>
          </div>

          <hr className="my-12" />

          <div className="mb-4">
            <h2 className="my-4 text-black text-lg">
              Permanent Address if Current is Rented
            </h2>
            <div className="mb-8">
              <FormControl className="w-full ">
                <label htmlFor="" className="py-2">
                  Street Address
                </label>
                <TextField
                  name="permanentAddressStreet"
                  value={formData.permanentAddressStreet}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="mb-8">
              <FormControl className="w-full ">
                <label htmlFor="" className="py-2">
                  Street Address Line 2
                </label>
                <TextField
                  name="permanentAddressStreet2"
                  value={formData.permanentAddressStreet2}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="flex justify-between">
              <FormControl>
                <label htmlFor="">City</label>
                <TextField
                  name="permanentAddressCity"
                  value={formData.permanentAddressCity}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <label htmlFor="">State</label>
                <TextField
                  name="permanentAddressState"
                  value={formData.permanentAddressState}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="flex justify-between mt-4">
              <FormControl>
                <label htmlFor="">Zip Code</label>
                <TextField
                  name="permanentAddressZipCode"
                  value={formData.permanentAddressZipCode}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  variant="outlined"
                  type="number"
                />
              </FormControl>

              <FormControl>
                <label htmlFor="country">Country</label>
                <Select
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  variant="outlined"
                  id="country"
                  className="w-[322px]"
                >
                  {/* <MenuItem value="">Cuntry</MenuItem> */}
                  {options.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Employment information */}
          <div className="mt-12 w-full">
            <h2 className="my-4 text-black text-lg">Employment information</h2>

            <div className="mb-8">
              <FormControl className="w-full ">
                <label htmlFor="" className="py-2">
                  Current Employer
                </label>
                <TextField
                  name="currentEmployer"
                  value={formData.currentEmployer}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>
            </div>

            <div className="mb-8">
              <FormControl className="w-full ">
                <label htmlFor="" className="py-2">
                  Official E-mail
                </label>
                <TextField
                  name="officeEmail"
                  value={formData.officeEmail}
                  onChange={handleInputChange}
                  placeholder="ex:abc@gmail.com"
                  type="email"
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-lg text-black">Current Company experience</p>
            <div className="">
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="currentExperience"
                    value="0-1 year"
                    onChange={handleInputChange}
                  />
                }
                label="0-1 year"
              />
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="currentExperience"
                    value="1-2 year"
                    onChange={handleInputChange}
                  />
                }
                label="1-2 year"
              />
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="currentExperience"
                    value="2-3 year"
                    onChange={handleInputChange}
                  />
                }
                label="2-3 year"
              />
              <FormControlLabel
                className="w-[322px]"
                control={
                  <Checkbox
                    name="currentExperience"
                    value="5+ year"
                    onChange={handleInputChange}
                  />
                }
                label="5+ year"
              />
            </div>
          </div>

          <div className="mt-12 flex justify-between">
            <FormControl>
              <label htmlFor="" className="py-2">
                Net monthly income
              </label>
              <TextField
                name="netMonthlyIncome"
                value={formData.netMonthlyIncome}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                //
                type="number"
                placeholder="ex:1500"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="" className="py-2">
                Bonus / Incentives if any
              </label>
              <TextField
                name="bonus"
                value={formData.bonus}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                //
                placeholder="ex.1200"
                type="number"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          <div className="mt-6">
            <FormControl>
              <label htmlFor="" className="py-2">
                Additional Monthly Income If any
              </label>
              <TextField
                name="additionalMonthlyIncome"
                value={formData.additionalMonthlyIncome}
                onChange={handleInputChange}
                InputProps={{
                  style: { color: "#666666" },
                }}
                className="w-[322px]"
                //
                type="number"
                placeholder="ex: 0 for  no rent/mortgage"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </div>

          {/* Loan Details */}
          <div className="mt-12">
            <h2 className="text-black text-lg py-6">Loan Details</h2>

            <div className="flex justify-between">
              <div className="">
                <FormControl>
                  <label htmlFor="" className="py-2">
                    Bank / Finance Name
                  </label>
                  <Select
                    value={selectedBank}
                    onChange={handleBankChange}
                    className="w-[322px]"
                  >
                    {bankNames.map((bank, index) => (
                      <MenuItem key={index} value={bank}>
                        {bank}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="">
                <FormControl>
                  <label htmlFor="" className="py-2">
                    Loan Amount Disbursed
                  </label>
                  <TextField
                    name="loanAmtDisbursed"
                    value={formData.loanAmtDisbursed}
                    onChange={handleInputChange}
                    InputProps={{
                      style: { color: "#666666" },
                    }}
                    className="w-[322px]"
                    //
                    type="number"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <div className="">
                <FormControl>
                  <label htmlFor="" className="my-2">
                    Tenure
                  </label>
                  <Select
                    name="tenure"
                    value={formData.tenure}
                    onChange={handleInputChange}
                    className="w-[322px]"
                  >
                    <MenuItem value="">Please Select</MenuItem>
                    <MenuItem value="1 year">1 year</MenuItem>
                    <MenuItem value="2 year">2 year</MenuItem>
                    <MenuItem value="3 year">3 year</MenuItem>
                    <MenuItem value="5+ year">5+ year</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="">
                <FormControl>
                  <label htmlFor="" className="my-2">
                    Rate of Interest
                  </label>
                  <TextField
                    name="rateOfInterest"
                    value={formData.rateOfInterest}
                    onChange={handleInputChange}
                    InputProps={{
                      style: { color: "#666666" },
                    }}
                    className="w-[322px]"
                    //
                    type="number"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <div className="">
                <FormControl>
                  <label htmlFor="" className="my-2">
                    EMI Amount
                  </label>
                  <TextField
                    name="emiAmount"
                    value={formData.emiAmount}
                    onChange={handleInputChange}
                    InputProps={{
                      style: { color: "#666666" },
                    }}
                    className="w-[322px]"
                    //
                    placeholder="eg.23"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </div>
              <div className="">
                <FormControl>
                  <label htmlFor="" className="my-2">
                    DSA NAME
                  </label>
                  <Select
                    name="dsaName"
                    value={formData.dsaName}
                    onChange={handleInputChange}
                    className="w-[322px]"
                  >
                    <MenuItem value="">Please Select</MenuItem>
                    <MenuItem value="DSA Name 1">DSA Name 1</MenuItem>
                    <MenuItem value="DSA Name 2">DSA Name 2</MenuItem>
                    <MenuItem value="DSA Name 3">DSA Name 3</MenuItem>
                    {/* Add more DSA names as needed */}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <FormControl>
                <label htmlFor="" className="my-2">
                  EMI Start Date
                </label>
                <TextField
                  name="emiStartDate"
                  value={formData.emiStartDate}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl>
                <label htmlFor="" className="my-2">
                  EMI End Date
                </label>
                <TextField
                  name="emiEndDate"
                  value={formData.emiEndDate}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-[322px]"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </div>

            <div className="mt-12">
              <p className="text-[#11263C] text-lg mt-4 mb-1">
                What activity is done while processing of this loan?
              </p>

              <FormControl className="w-full">
                <TextField
                  name="additionalInformation"
                  value={formData.additionalInformation}
                  onChange={handleInputChange}
                  InputProps={{
                    style: { color: "#666666" },
                  }}
                  className="w-full"
                  variant="outlined"
                />
              </FormControl>

              <p className="text-[#666666] text-sm">
                If Balance transfer done mentioned which bank or credit card BT
                is done or Fresh amount is given
              </p>
            </div>
          </div>

          {/* Other form fields */}
          <div className="text-center my-12">
            <Button
              type="submit"
              // onClick={(event) => clickSubmitButton()}
              variant="contained"
              className="bg-[#5932EA]"
            >
              {isEditing ? "Update" : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
