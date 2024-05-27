import Address from "../models/Address.js";
import User from "../models/User.js";

export const createAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    const newAddress = new Address({
      userId: req.user.id,
      detailAddress: req.body.detailAddress,
    });
    const savedAddress = await newAddress.save();
    if (user.mainAddressId === "") {
      user.mainAddressId = savedAddress._id;
      await user.save();
    } else {
      user.addressIdList.push(savedAddress._id);
      await user.save();
    }

    res.status(201).json({ success: true, address: savedAddress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user.id });
    if (!addresses) {
      return res.status(404).json({ success: false });
    }
    const user = await User.findById(req.user.id, { mainAddressId: 1 });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (user.mainAddressId === "") {
      return res.status(200).json({ success: true, addresses: addresses });
    }
    const filteredAddresses = addresses.filter(
      (address) => address._id.toString() !== user.mainAddressId
    );
    const mainAddress = await Address.findById(user.mainAddressId);
    const sortedAddresses = [mainAddress, ...filteredAddresses];
    res.status(200).json({ success: true, addresses: sortedAddresses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getMainAddressByUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    if (user.mainAddressId === "") {
      return res.status(200).json({ success: true, address: null });
    }
    const address = await Address.findById(user.mainAddressId);
    res.status(200).json({ success: true, address: address });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found" });
    }
    if (address.userId !== req.user.id) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    address.detailAddress = req.body.detailAddress;
    const savedAddress = await address.save();
    res.status(200).json({ success: true, address: savedAddress });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    const user = await User.findById(req.user.id);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found" });
    }
    if (address.userId !== req.user.id) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    await Address.deleteOne({ _id: req.params.addressId });
    if (user.mainAddressId === req.params.addressId) {
      user.mainAddressId = "";
      user.mainAddressId = user.addressIdList[0];
      user.addressIdList.splice(0, 1);
      await user.save();
    } else {
      const index = user.addressIdList.indexOf(req.params.addressId);
      if (index > -1) {
        user.addressIdList.splice(index, 1);
        await user.save();
      }
    }
    res.status(200).json({ success: true, message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const setMainAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    user.mainAddressId = req.params.addressId;
    await user.save();
    res.status(200).json({ success: true, message: "Address set" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found" });
    }
    if (address.userId !== req.user.id) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    res.status(200).json({ success: true, address: address });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const AdminGetAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);
    if (!address) {
      return res
        .status(404)
        .json({ success: false, error: "Address not found" });
    }
    if (!req.user.isAdmin) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    res.status(200).json({ success: true, address: address });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
