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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      user: {
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getMeController = async (req,res)=>{
  try {

    const userId = req.user._id; // Assuming authMiddleware sets req.userId
    const user = await userModel.findById(userId);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getMeController:", error);
    res.status(500).json({ message: "Internal server error" });

  }
}