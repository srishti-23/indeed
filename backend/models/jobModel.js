import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      type: { type: String, enum: ["Part Time", "Full Time", "Contract"] },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      location: { type: String, required: false },
      skills: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Skill",
        },
      ],
      experience: { type: Number, required: false, default: 8 },
      salary: { type: Number, required: false },
      jobDescription: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
const Jobs = mongoose.model("Jobs", jobSchema);
export default Jobs;
