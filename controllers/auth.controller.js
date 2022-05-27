import config from './../config/config.js'
import jsonwebtoken from 'jsonwebtoken'
import User from './../models/user.models.js'
import { expressjwt } from "express-jwt";

const signIn = async(req, res) => {
    try {
        let user = await User.findOne({
            email:req.body.email
        })
        if(!user){
            return(
                res.status(401).json({
                    error:"user not found"
                })
            )
        }
        if(user.password !== req.body.password){
            return (
                res.status(401).json({
                    error:"Email and password do not match"
                })
            )
        }
        const token  = jsonwebtoken.sign({_id:user._id}, config.jwtSecret)
        res.cookie('authtoken', token)
        return (
            res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }
            })
        )
    } catch (error) {
        res.send(error)
    }
}


const signOut = (req, res) => {
    try {
        res.clearCookie("authtoken")
        return (
            res.status(200).json({
                message:"Sign out"
            })
        )
    } catch (error) {
        res.send(error)
    }
}

const requireSignIn = expressjwt({
    secret:config.jwtSecret,
    algorithms: ["RS256"],
    userProperty: 'auth'
})

const hasAuthorization = (req, res) => {
    const authroization = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authroization) {
        return(
            res.status(403).json({
                error: 'user not authorize'
            })
        )
    }
}

export default {
    signIn,
    signOut, 
    requireSignIn,
    hasAuthorization
}