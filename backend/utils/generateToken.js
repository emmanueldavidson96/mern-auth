import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"10h"
    })

    res.cookie("jwt", token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge:30 * 24 * 60 * 1000
    })
}

export default generateToken;

