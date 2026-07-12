const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const DEMO_USERS = [
  {
    name: 'Demo Fleet Manager',
    email: 'manager@transitops.demo',
    role: 'FLEET_MANAGER',
  },
  {
    name: 'Demo Dispatcher',
    email: 'dispatcher@transitops.demo',
    role: 'DISPATCHER',
  },
  {
    name: 'Demo Safety Officer',
    email: 'safety@transitops.demo',
    role: 'SAFETY_OFFICER',
  },
  {
    name: 'Demo Financial Analyst',
    email: 'analyst@transitops.demo',
    role: 'FINANCIAL_ANALYST',
  },
  {
    name: 'Demo Driver',
    email: 'driver@transitops.demo',
    role: 'DRIVER',
  }
];

async function main() {
  console.log('Seeding demo accounts...');
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('password123', salt);

  for (const user of DEMO_USERS) {
    const upsertedUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        passwordHash: passwordHash,
        isActive: true,
      },
      create: {
        name: user.name,
        email: user.email,
        role: user.role,
        passwordHash: passwordHash,
        isActive: true,
      },
    });
    console.log(`Upserted user: ${upsertedUser.name} (${upsertedUser.role})`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
