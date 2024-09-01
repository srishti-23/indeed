import Apply from "../models/applyModel.js";

const getAllApplies = async (req, res) => {
  try {
    const apply = await Apply.find({ userId: req.user._id })
      .populate({ path: "userId", select: ["name"] })
      .populate({ path: "jobs", select: ["title"] });
    return res.status(200).send(apply);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Apply", error: error.message });
  }
};

const getApplies = async (req, res) => {
  const { id } = req.params;
  try {
    const apply = await Apply.findById(id);
    return res.status(200).send(apply);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Apply", error: error.message });
  }
};

const createApply = async (req, res) => {
  try {
    const allApplies = await Apply.find({ userId: req.user._id });
    if (allApplies.length > 0) {
      if (allApplies[0].jobs.includes(req.params.id)) {
        return res
          .status(400)
          .send({ message: "You have already applied for this job" });
      }
      allApplies[0].jobs.push(req.params.id);
      await allApplies[0].save();
    } else {
      await Apply.create({
        userId: req.user._id,
        jobs: [req.params.id],
      });
    }
    return res.status(201).send({ message: "Apply created successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Apply", error: error.message });
  }
};

const updateApply = async (req, res) => {
  const { id } = req.params;
  try {
    const apply = await Apply.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).send({ message: "Apply updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Apply", error: error.message });
  }
};

const deleteApply = async (req, res) => {
  const { id } = req.params;
  try {
    const apply = await Apply.findByIdAndDelete(id);
    return res.status(200).send({ message: "Apply deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in getting Apply", error: error.message });
  }
};

export { getAllApplies, getApplies, createApply, updateApply, deleteApply };
