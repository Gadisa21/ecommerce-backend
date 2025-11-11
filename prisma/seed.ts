
const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log(' Starting database seeding... for admin user');

  const adminEmail = 'admin@example.com';

  // Check if an admin user already exists to avoid creating duplicates
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists. Skipping creation.');
  } else {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash('AdminPassword1!', 10);
    
    // Create the new admin user
    await prisma.user.create({
      data: {
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN, 
      },
    });
    console.log('Admin user created successfully.');
  }

  console.log(' Seeding finished.');
}

// Execute the main function and handle potential errors
main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    
    await prisma.$disconnect();
  });