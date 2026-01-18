import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../utils/generateToken.js";

export const protect = async (req, res, next) => {
  console.log("Auth middleware reached");

  let token;

  // 1. Read token from Authorization header or cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  // 2. If no token → reject
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    // 3. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user in MongoDB using decoded ID
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    // 5. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }

};

// Google OAuth2 Client

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential, accessToken } = req.body;
    let name, email, picture, googleId;

    if (credential) {
      // ID Token verification
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      googleId = payload.sub;
    } else if (accessToken) {
      // Access Token verification
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const payload = await response.json();
      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      googleId = payload.sub;
    } else {
      return res.status(400).json({ error: "Authentication failed. No token provided." });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        avatar: picture,
      });
    }

    const token = generateToken(user._id, res);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ error: "Google authentication failed" });
  }
};
