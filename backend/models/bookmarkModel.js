import mongoose, {Schema} from "mongoose";

const BookmarkSchema=new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobs: [{ type: Schema.Types.ObjectId, ref: "Jobs", required: true }],
    // jobDescription:[{ type: Schema.Types.ObjectId, ref: "Jobs", required: true }]
})
const Bookmark=mongoose.model("Bookmark",BookmarkSchema)
export default Bookmark;