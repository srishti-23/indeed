import Jobs from "../models/jobModel.js";

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find({})
      .populate({ path: "company", select: "name" })
      .populate({ path: "skills", select: "name" })
      .populate("category")
      .populate({path:"userId", select: "name"});
    return res.status(200).send(jobs);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting all jobs", error: error.message });
  }
};
const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findById(id);
    return res.status(200).send(job);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting job", error: error.message });
  }
};
const createJob = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).send({ message: "User not authenticated" });
      }
      req.body.userId = req.user._id;
      const job = await Jobs.create(req.body);
      return res.status(201).send({ message: "Job created successfully", job });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error in creating Job", error: error.message });
    }
  };
  
const updateJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send({ message: "job updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in updating category", error: error.message });
  }
};
const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Jobs.findByIdAndDelete(id);
    return res.status(200).send({ messsage: "Job deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in deleting job", error: error.message });
  }
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
