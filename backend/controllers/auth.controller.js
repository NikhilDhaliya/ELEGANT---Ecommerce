import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};


const cookieOptions = {
  httpOnly: true, // Prevents client-side JS from reading the cookie
  secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
  sameSite: 'strict', // Prevents CSRF attacks
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  path: '/' // Cookie is valid for all routes
};

export const signup = async (req, res) => {
  const user = req.body; 
  
  try {
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    
    const newUser = await User.create(user);
    newUser.isLoggedIn = true;
    await newUser.save();  
    
    const token = generateToken(newUser._id);

    res.cookie('token', token, cookieOptions);

    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isLoggedIn: newUser.isLoggedIn,
    };
    
    res.status(201).json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    existingUser.isLoggedIn = true;
    await existingUser.save();
    
    const token = generateToken(existingUser._id);
    
    // Set token in HTTP-only cookie
    res.cookie('token', token, cookieOptions);
    
    // Return user data without password
    const userResponse = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      isLoggedIn: existingUser.isLoggedIn
    };
    
    res.status(200).json({
      success: true,
      user: userResponse
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {

    res.clearCookie('token', {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'strict',
      path: '/'  
    });
    

    const userId = req.user?._id; 
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } 
    
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export default { signup, login, logout };
