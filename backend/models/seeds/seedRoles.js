import { Role } from "../role.js";

const roles = [
    { name: "admin" },
    { name: "user" },
];

export const seedRoles = async () => {
    try {
        for (const role of roles) {
            const exists = await Role.findOne({ name: role.name });
            if (!exists) {
                await Role.create(role);
                console.log(`Created role: ${role.name}`);
            } else {
                console.log(`Role ${role.name} already exists`);
            }
        }

        console.log("Seeding roles completed!");
    } catch (err) {
        console.error("Error seeding roles:", err);
    }
}

