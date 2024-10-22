import { PrismaClient, Role, users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { handlerPath } from '../../src/common/utils/handlerPath';

const prisma = new PrismaClient();

const insertUsers = async () => {
  const users: Array<Partial<users>> = [];
  const roles = Object.keys(Role);
  // The default password is '123456', and the password is hashed with bcrypt to secure it.
  const password = await bcrypt.hash('123456', 10);
  const amountOfUsers = 10;

  for (let i = 0; i < amountOfUsers; i++) {
    const randomNumber = Math.floor(Math.random() * 2);
    users.push({
      name: `User-${i}`,
      email: `user-${i}@gmail.com`,
      role: roles[randomNumber] as Role,
      password,
    });
  }

  return Promise.all(
    users.map(
      async (user) =>
        await prisma.users.create({
          data: {
            name: user.name,
            email: user.email,
            role: user.role,
            password: user.password,
          },
        }),
    ),
  );
};

async function execute() {
  try {
    return await insertUsers();
  } catch (error) {
    console.log(`${handlerPath(__filename)}  ~ error: `, error);
    await prisma.$disconnect();
  }
}

export const main = {
  path: () => handlerPath(__filename),
  function: () => execute(),
};
