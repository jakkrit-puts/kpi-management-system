import { User } from "../user.js";
import bcrypt from "bcrypt"

const users = [
    { username: "admin01", email: "admin@gmail.com", password: "Aa112233", role_id: "64a123456789abcdef000001" },
    { username: "user01", email: "jksmith1706@gmail.com", password: "Aa111222", role_id: "64a123456789abcdef000002" },
];

export const seedUsers = async () => {
    try {
        for (const user of users) {

            const hashPassword = await bcrypt.hash(user.password, 10);

            const exists = await User.findOne({
                username: user.username,
            });

            if (!exists) {
                await User.create({ ...user, password_hash: hashPassword });
                console.log(`Created user: ${user.username}`);
            } else {
                console.log(`User ${user.username} already exists`);
            }
        }

        console.log("Seeding users completed!");
    } catch (err) {
        console.error("Error seeding users:", err);
    }
}

