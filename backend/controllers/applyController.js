import Apply from "../models/applyModel.js";

const getAllApplies = async (req, res) => {
  try {
    const applies = await Apply.find({ userId: req.user._id })
      .populate({ path: "userId", select: "name" })
      .populate({
        path: "jobs",
        select: ["title", "company", "location", "jobDescription"],
        populate: { path: "company", select: "name location" }, // Populate company details
      });
    return res.status(200).send(applies);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error retrieving applications", error: error.message });
  }
};

const getApplies = async (req, res) => {
  const { id } = req.params;
  try {
    const apply = await Apply.findById(id)
      .populate({ path: "userId", select: "name" }) // Populate only the name from userId
      .populate({ path: "jobs", select: ["title", "jobDescription"] }); // Populate both title and jobDescription from jobs
    return res.status(200).send(apply);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error retrieving application", error: error.message });
  }
};


const createApply = async (req, res) => {
  try {
    const existingApplies = await Apply.findOne({ userId: req.user._id });

    // Check if the user has already applied to this job
    if (existingApplies && existingApplies.jobs.includes(req.params.id)) {
      return res
        .status(400)
        .send({ message: "You have already applied for this job" });
    }

    // If user has applications but not for this job, add the job
    if (existingApplies) {
      existingApplies.jobs.push(req.params.id);
      await existingApplies.save();
    } else {
      // Create a new application record for the user
      await Apply.create({
        userId: req.user._id,
        jobs: [req.params.id],
      });
    }

    return res.status(201).send({ message: "Application submitted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error creating application", error: error.message });
  }
};

const updateApply = async (req, res) => {
  const { id } = req.params;
  try {
    const apply = await Apply.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send({ message: "Application updated successfully", apply });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error updating application", error: error.message });
  }
};

const deleteApply = async (req, res) => {
  const { id } = req.params;
  try {
    await Apply.findByIdAndDelete(id);
    return res.status(200).send({ message: "Application deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error deleting application", error: error.message });
  }
};

export { getAllApplies, getApplies, createApply, updateApply, deleteApply };



