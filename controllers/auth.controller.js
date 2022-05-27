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

        return (
            res.status(200).json({
                message: user.name + " you have successfully signed in"
            })
        )
    } catch (error) {
        res.send(error)
    }
}


const signOut = (req, res) => {
    try {
        
    } catch (error) {
        res.send(error)
    }
}

export default {
    signIn,
    signOut
}