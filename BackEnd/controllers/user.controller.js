import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, {
      password: 0, // Tidak menyertakan password dalam hasil
      isAdmin: 0, // Tidak menyertakan isAdmin dalam hasil
    });
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    res.status(200).json({ message: "Success", user: user });
  } catch (err) {
    res
      .status(401)
      .json({ message: "you are not logged in!", error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    user.name = name;
    user.email = email;

    user.save();
    res.status(200).json({ message: "Successful" });
  } catch (err) {
    res
      .status(401)
      .json({ message: "you are not logged in!", error: err.message });
  }
};
