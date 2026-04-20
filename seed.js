const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/yatara_ceylon';

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: { 
      type: String, 
      enum: ["admin", "staff", "fleet_manager", "hotel_partner", "customer"], 
      default: "customer" 
    },
    status: { 
      type: String, 
      enum: ["active", "disabled"], 
      default: "active" 
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

const users = [
    {
        fullName: "Admin",
        phone: "0770000001",
        email: "admin@yatara.com",
        password: "123456",
        role: "admin",
        status: "active",
    },
    {
        fullName: "Staff",
        phone: "0770000002",
        email: "staff@yatara.com",
        password: "123456",
        role: "staff",
        status: "active",
    },
    {
        fullName: "Fleet Partner",
        phone: "0770000003",
        email: "fleet@yatara.com",
        password: "123456",
        role: "fleet_manager",
        status: "active",
    },
    {
        fullName: "Hotel Partner",
        phone: "0770000004",
        email: "hotel@yatara.com",
        password: "123456",
        role: "hotel_partner",
        status: "active",
    },
];

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        for (const u of users) {
            const existing = await User.findOne({ email: u.email });
            if (!existing) {
                const hashedPassword = await bcrypt.hash(u.password, 10);
                await User.create({ ...u, password: hashedPassword });
                console.log(`Created user: ${u.email}`);
            } else {
                console.log(`User already exists: ${u.email}`);
            }
        }
        console.log("Seeding complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error seeding:", err);
        process.exit(1);
    }
}

seed();
