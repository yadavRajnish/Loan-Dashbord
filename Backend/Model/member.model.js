import mongoose from "mongoose";
const Schema = mongoose.Schema;

const memberSchema = new Schema({
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
      dateOfBirth : {
        type : Date,
        default : null
      },
      numberOfMember: {
        type : String,
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

export default mongoose.model("member", memberSchema);