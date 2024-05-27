import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // Email sudah terdaftar, kirim respons dengan success: false
      return res
        .status(400)
        .json({ success: false, error: "Email is already registered." });
    }

    // Email belum terdaftar, lanjutkan dengan pembuatan pengguna baru
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    const user = savedUser.toObject();
    delete user.password;
    delete user.isAdmin;
    // Kirim respons sukses dengan data pengguna baru
    res.status(201).json({ success: true, user: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// logging in

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, "aklsdjf2j3jkl23jkasj2353#");
    user = user.toObject();
    delete user.password;
    delete user.isAdmin;

    res.status(200).json({ token, user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
