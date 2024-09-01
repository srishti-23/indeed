import Jobs from "../models/jobModel.js";

const searchJobs = async (req, res) => {
  const { title, location } = req.query;

  try {
    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" }; // Case-insensitive search
    }

    const jobs = await Jobs.find(filter)
      .populate({ path: "company", select: "name" })
      .populate({ path: "skills", select: "name" })
      .populate("category")
      .populate({ path: "userId", select: "name" });

    return res.status(200).send(jobs);
  } catch (error) {
    return res.status(500).send({
      message: "Error in searching for jobs",
      error: error.message,
    });
  }
};

export { searchJobs };
