import express from "express"
import userControllers from "../controllers/user.controllers.js"

const router = express.Router()

router.get("/api/userroute", userControllers.userRoute)

router.route("/api/user").get(userControllers.listUsers).post(userControllers.createUser)

router.route("/api/user/:userId").get(userControllers.getUser).put(userControllers.updateUser).delete(userControllers.deleteUser)

router.param("userId", userControllers.findUserById)

export default router
