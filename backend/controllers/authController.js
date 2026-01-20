import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// register user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond
    res.status(201).json({
      message: "Register successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id, res),
    });

  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
      token: generateToken(user._id, res),
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// logout
// Optional (only useful if you use cookies)
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};
//get all profiles

export const getAllProfile = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

/// Profile update
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const body = req.body || {};

    user.name = body.name ?? user.name;
    user.email = body.email ?? user.email;

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      }
    });

  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export { register, login, logout, getProfile, updateProfile };
