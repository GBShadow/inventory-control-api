import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

async function seed() {
  const prismaClient = new PrismaClient();

  const passwordHash = await hash(process.env.ADM_PASSWORD, 8);

  const user = {
    name: process.env.ADM_USERNAME as string,
    surname: process.env.ADM_USERNAME as string,
    username: process.env.ADM_USERNAME as string,
    password: passwordHash,
  };

  const roleAdm = {
    name: 'ADM',
    description: 'ADM',
  };

  const roleUser = {
    name: 'USER',
    description: 'USER',
  };

  const roleAdmId = await prismaClient.role.create({
    data: roleAdm,
    select: { id: true },
  });

  await prismaClient.role.create({
    data: roleUser,
  });

  await prismaClient.user.create({
    data: { ...user, roles: { connect: [roleAdmId] } },
  });
}

seed();
