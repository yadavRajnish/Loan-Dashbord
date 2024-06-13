import leaderModel from "../Model/leader.model";

export const getLeaders = async (req, res) => {
  try {
    const leadaerData = await leaderModel.find({ status: 1 });
    res.status(200).json({
      data: leadaerData,
      message: "Successfully data is fetched",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addLeader = async (req, res) => {
  try {
    const {
      personTitle,
      firstName,
      middleName,
      lastName,
      mobile,
      personalEmail,
      numberOfMember,
    } = req.body;

    const leaderData = new leaderModel({
      name: {
        personTitle: personTitle,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
      },
      mobile: mobile,
      personalEmail: personalEmail,
      numberOfMember: numberOfMember,
    });

    await leaderData.save();
    res.status(201).json({
      data: leaderData,
      message: "Added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editLeader = async (req, res) => {
  try {
    const {
      personTitle,
      firstName,
      middleName,
      lastName,
      mobile,
      personalEmail,
      numberOfMember,
    } = req.body;

    const leaderId = req.params._id;

    const updateData = {
      name: {
        personTitle: personTitle,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
      },
      mobile: mobile,
      personalEmail: personalEmail,
      numberOfMember: numberOfMember,
    };

    const updatedLeader = await leaderModel.findByIdAndUpdate(
      leaderId,
      updateData,
      { new: true }
    );

    if (!updatedLeader) {
      return res.status(404).json({
        message: "Leader not found.",
      });
    }

    res.status(200).json({
      data: updatedLeader,
      message: "Leader updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
