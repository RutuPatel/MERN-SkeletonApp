import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: "name is required",
	},
})

export default mongoose.model("User", userSchema)
