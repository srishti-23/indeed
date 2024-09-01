import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    noOfEmployees: { type: Number, required: false },
    description: { type: String, required: false },
    location: { type: String, required: false },
    logo: { type: String, required: false },
    website: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Company = mongoose.model("Company", companySchema);
export default Company;
