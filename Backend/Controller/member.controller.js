import memberModel from "../Model/member.model";

export const getMembers = async (req, res) => {
    try {
      const memberData = await memberModel.find({ status: 1 });
      res.status(200).json({
        data: memberData,
        message: "Successfully data is fetched",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
export const addMember = async (req, res) => {
    try {
      const {
        personTitle,
        firstName,
        middleName,
        lastName,
        mobile,
        personalEmail,
        dateOfBirth,
        numberOfMember
      } = req.body;
  
      const memberData = new memberModel({
        name: {
          personTitle: personTitle,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          numberOfMember : numberOfMember
        },
        mobile: mobile,
        personalEmail: personalEmail,
        dateOfBirth: dateOfBirth,
      });
  
      await memberData.save();
      res.status(201).json({
        data: memberData,
        message: "Added successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  
  
export const editMember = async (req, res) => {
  try {
    const {
      personTitle,
      firstName,
      middleName,
      lastName,
      mobile,
      personalEmail,
      dateOfBirth,
      numberOfMember
    } = req.body;

    const memberId = req.params._id;

    const updateData = {
      name: {
        personTitle: personTitle,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        numberOfMember : numberOfMember
      },
      mobile: mobile,
      personalEmail: personalEmail,
      dateOfBirth: dateOfBirth,
    };

    const updatedMember = await memberModel.findByIdAndUpdate(
      memberId,
      updateData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({
        message: "member not found.",
      });
    }

    res.status(200).json({
      data: updatedMember,
      message: "member updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
