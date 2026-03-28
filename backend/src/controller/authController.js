import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({
      $or: [{ email }, { userName }],
    });

    // If user exists, return an error response
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }  

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
