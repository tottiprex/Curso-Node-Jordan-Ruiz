const crypto = require("crypto");
const User = require("./models/user");

const generarTokenRestablecimiento = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 36000000;
  await user.save();
  return resetToken;
};

module.exports = { generarTokenRestablecimiento };