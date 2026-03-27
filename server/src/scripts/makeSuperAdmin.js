import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

const promoteToSuperAdmin = async () => {
  const email = process.argv[2];

  if (!email) {
    console.error("Usage: npm run make:super-admin -- <email>");
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

    user.role = "SUPER_ADMIN";
    user.isSuspended = false;
    await user.save();

    console.log(`Success: ${email} is now SUPER_ADMIN.`);
    process.exit(0);
  } catch (error) {
    console.error("Failed to promote user:", error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

promoteToSuperAdmin();
