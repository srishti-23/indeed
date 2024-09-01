import Bookmark from "../models/bookmarkModel.js";

const getAllBookmark = async (req, res) => {
    try {
      const bookmark = await Bookmark.find({ userId: req.user._id })
      .populate({ path: "userId", select: ["name"] })
      .populate({ path: "jobs", select: ["title"] ,select:["jobDescription"]});
      return res.status(200).send(bookmark);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error in getting all bookmarked jobs", error: error.message });
    }
  };
  const getBookmark = async (req, res) => {
    const { id } = req.params;
    try {
      const bookmark = await Bookmark.findById(id).populate({ path: "userId", select: ["name"] })
      .populate({ path: "jobs", select: ["title"] ,select:["jobDescription"]});;
      return res.status(200).send(bookmark);
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error in getting Bookmark", error: error.message });
    }
  }
  const createBookmark = async (req, res) => {
    try {
      const allBookmarks = await Bookmark.find({ userId: req.user._id });
      if (allBookmarks.length > 0) {
        if (allBookmarks[0].jobs.includes(req.params.id)) {
          return res
            .status(400)
            .send({ message: "You have already bookmarked for this job" });
        }
        allBookmarks[0].jobs.push(req.params.id);
        await allBookmarks[0].save();
      } else {
        await Bookmark.create({
          userId: req.user._id,
          jobs: [req.params.id],
        });
      }
      return res.status(201).send({ message: "Bookmark created successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error in getting Bookmark", error: error.message });
    }
  };
  const deleteBookmark = async (req, res) => {
    const { id } = req.params;
    try {
      const bookmark = await Bookmark.findByIdAndDelete(id);
      return res.status(200).send({ message: "Bookmark deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Error in getting Bookmark", error: error.message });
    }
  };
  

  export {getAllBookmark,getBookmark,createBookmark,deleteBookmark}