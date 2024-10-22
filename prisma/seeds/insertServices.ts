import { PrismaClient, services } from '@prisma/client';
import { handlerPath } from '../../src/common/utils/handlerPath';

const prisma = new PrismaClient();

const insertServices = async () => {
  const services: Array<Partial<services>> = [
    {
      name: 'Cleaning',
      category: 'Housekeeping',
      cost: 30,
      description: 'Housekeeping service',
    },
    {
      name: 'Cooking',
      category: 'Housekeeping',
      cost: 50,
      description: 'Cooking service',
    },
    {
      name: 'Medical checkup',
      category: 'Health',
      cost: 80,
      description: 'Health service',
    },
    {
      name: 'Dental checkup',
      category: 'Health',
      cost: 60,
      description: 'Health service',
    },
    {
      name: 'Haircut',
      category: 'Beauty',
      cost: 40,
      description: 'Beauty service',
    },
    {
      name: 'Makeup',
      category: 'Beauty',
      cost: 30,
      description: 'Beauty service',
    },
    {
      name: 'Plumbing',
      category: 'Technology',
      cost: 100,
      description: 'Technology service',
    },
    {
      name: 'Electronics',
      category: 'Technology',
      cost: 80,
      description: 'Technology service',
    },
    {
      name: 'Carpentry',
      category: 'Technology',
      cost: 60,
      description: 'Technology service',
    },
  ];

  return Promise.all(
    services.map(
      async (service) =>
        await prisma.services.create({
          data: {
            name: service.name,
            category: service.category,
            cost: service.cost,
            description: service.description,
          },
        }),
    ),
  );
};

async function execute() {
  try {
    return await insertServices();
  } catch (error) {
    console.log(`${handlerPath(__filename)}  ~ error: `, error);
    await prisma.$disconnect();
  }
}

export const main = {
  path: () => handlerPath(__filename),
  function: () => execute(),
};
