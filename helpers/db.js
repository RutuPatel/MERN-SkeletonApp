import mongoose from "mongoose"
import config from "../config/config.js"

let connectedToDB = async () => {
	try {
		mongoose.Promise = global.Promise
		mongoose.connect(config.connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		mongoose.connection.on("error", () => {
			console.log("Can't connect to Database")
		})
		console.log("Connected to Database")
	} catch (error) {
		console.log(error)
	}
}

export default connectedToDB
