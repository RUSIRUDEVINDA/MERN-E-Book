import jwt from "jsonwebtoken";

// Function to generate JWT token
export const generateToken = (userID,res) => {
    const payload = { id: userID };
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN || "7d",
    });

 // Set the token in an HTTP-only cookie
    res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",  //protect against CSRF attacks
    maxAge: (1000 * 60 * 60 * 24) * 7,
  });

    return token;
}