#!/usr/bin/env node

/**
 * Script để tạo admin user mới
 *
 * Sử dụng:
 * npx ts-node scripts/create-admin.ts --email admin@test.com --password password123 --name "Admin Name"
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function createAdmin() {
  const args = process.argv.slice(2);

  let email = "";
  let password = "";
  let name = "Admin";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--email") email = args[i + 1];
    if (args[i] === "--password") password = args[i + 1];
    if (args[i] === "--name") name = args[i + 1];
  }

  if (!email || !password) {
    console.error("❌ Email và password không được để trống");
    console.log(
      'Sử dụng: npx ts-node scripts/create-admin.ts --email admin@test.com --password password123 --name "Admin Name"',
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ Password phải có ít nhất 8 ký tự");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(`❌ User với email ${email} đã tồn tại`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin user đã được tạo thành công");
    console.log(`📧 Email: ${user.email}`);
    console.log(`🔐 Password: ${password}`);
    console.log(`👤 Name: ${user.name}`);
    console.log(`⚙️  Role: ${user.role}`);
  } catch (error) {
    console.error("❌ Lỗi:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
