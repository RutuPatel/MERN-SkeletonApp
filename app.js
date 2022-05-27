import express from "express"
import bodyParser from "body-parser"
import userRoutes from "./routes/user.routes.js"
import authRoutes from './routes/auth.routes.js'
import config from "./config/config.js"
import connectedToDB from "./helpers/db.js"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = config.port

connectedToDB()

app.get("/home", (req, res) => {
	res.send("Home Page")
})

app.use("/", authRoutes)
app.use("/", userRoutes)

app.listen(port, () => {
	console.log("Node App is running on port " + port)
})
