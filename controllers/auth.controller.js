import config from './../config/config.js'
import jsonwebtoken from 'jsonwebtoken'
import User from './../models/user.models.js'

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

export default {
    signIn,
    signOut
}