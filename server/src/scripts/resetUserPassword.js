import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.error("Usage: npm run reset:password -- <email> <newPassword>");
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI in environment.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User not found for email: ${email}`);
      process.exit(1);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.isVerified = true;
    user.isSuspended = false;
    await user.save();

    console.log(`Success: password reset for ${email}`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to reset password:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

run();