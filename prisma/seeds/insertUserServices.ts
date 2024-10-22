import { PrismaClient, users_services } from '@prisma/client';
import { handlerPath } from '../../src/common/utils/handlerPath';

const prisma = new PrismaClient();

const insertUserServices = async () => {
  const usersServices: Array<Partial<users_services>> = [];
  const users = await prisma.users.findMany();
  const services = await prisma.services.findMany();

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < services.length; j++) {
      usersServices.push({
        userId: users[i].id,
        serviceId: services[j].id,
      });
    }
  }

  return Promise.all(
    usersServices.map(
      async (userService) =>
        await prisma.users_services.create({
          data: {
            userId: userService.userId,
            serviceId: userService.serviceId,
          },
        }),
    ),
  );
};

async function execute() {
  try {
    return await insertUserServices();
  } catch (error) {
    console.log(`${handlerPath(__filename)}  ~ error: `, error);
    await prisma.$disconnect();
  }
}

export const main = {
  path: () => handlerPath(__filename),
  function: () => execute(),
};
