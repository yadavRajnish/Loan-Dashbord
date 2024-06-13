import mongoose from "mongoose";
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        personTitle: String,
        firstName: String,
        middleName: String,
        lastName: String,
      },
      mobile : {
        type : Number,
        default : null
      },
      personalEmail : { 
        type : String,
        default : null
      },
      numberOfMember : {
        type : Number,
        default : null
      },
      status: {
        type: Number,
        default: 1,
      },
      createAt: {
        type: Date,
        default: Date.now(),
      }
})

export default mongoose.model("leader", leaderSchema);