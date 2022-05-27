import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: "name is required",
	},
	email: {
		type: String,
		trim: true,
		required: "email is required",
	},
	password: {
		type: String,
		trim: true,
		required: "password is required",
	}
})

userSchema.method = {

}

export default mongoose.model("User", userSchema)
