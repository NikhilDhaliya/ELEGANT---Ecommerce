import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const createAdmin = async (req, res) => {
  const admin = req.body;
  const hashedPassword = await bcrypt.hash(admin.password, 10);
  admin.password = hashedPassword;
  try {
    const newAdmin = await Admin.create(admin);
    newAdmin.isLoggedIn = true;
    await newAdmin.save();
    const token = generateToken(newAdmin._id);
    res.status(201).json(newAdmin, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const admin = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not Found" });
    }
    const isPasswordValid = await bcrypt.compare(
      admin.password,
      existingAdmin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    existingAdmin.isLoggedIn = true;
    await existingAdmin.save();
    const token = generateToken(existingAdmin._id);
    res.status(200).json(existingAdmin, token);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req,res)=>{
    const admin = req.body;
    try{
        const existingAdmin = await Admin.findOne({email:admin.email});
        if(!existingAdmin)
        {
            return res.status(404).json({message:"Admin not Found"});
        }
        existingAdmin.isLoggedIn = false;
        await existingAdmin.save();
        res.status(200).json({message:"Logout Successfull"});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

export default { createAdmin, loginAdmin, logout };
