import User from "../models/user.models.js"
import extend from "lodash/extend.js"

const userRoute = async (req, res, next) => {
	res.send("User route working")
}

const listUsers = async (req, res) => {
	try {
		let user = await User.find()
		res.json(user)
	} catch (error) {
		console.log(error)
	}
}

const createUser = async (req, res, next) => {
	const user = new User(req.body)
	try {
		await user.save()
		return res.status(200).json({
			message: "User Created Successfully",
		})
	} catch (error) {
		return res.status(404).json({
			message: error.message,
		})
	}
}

const findUserById = async (req, res, next, id) => {
	try {
		let user = await User.findById(id)
		if (!user) {
			return res.status(400).json({
				error: "user not found",
			})
		}
		req.profile = user
		next()
	} catch (error) {
		console.log(error)
	}
}

const getUser = async (req, res) => {
	try {
		res.json(req.profile)
	} catch (error) {
		console.log(error)
	}
}

const updateUser = async (req, res, next) => {
	try {
		let user = req.profile
		user = extend(user, req.body)
		await user.save()
		res.json({
			message: "User " + user._id + " has Updated Successfully",
			data: user,
		})
	} catch (error) {
		console.log(error)
	}
}

const deleteUser = async (req, res, next) => {
	try {
		let user = req.profile
		console.log(user)
		await user.remove()
		res.json({
			message: "User named " + user.name + " Deleted Successfully",
		})
	} catch (error) {
		console.log(error)
	}
}

export default {
	userRoute,
	listUsers,
	createUser,
	findUserById,
	getUser,
	updateUser,
	deleteUser,
}
