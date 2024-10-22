import { Injectable } from '@nestjs/common';
import { users_services, services } from '@prisma/client';
import { PrismaService } from 'src/infraestructure/prisma/prisma.service';

@Injectable()
export class UserServicesService {
  constructor(private prisma: PrismaService) {}

  async getMyServices(
    userId: string,
  ): Promise<Array<services & { users_services: users_services[] }>> {
    const services = await this.prisma.services.findMany({
      where: {
        deletedAt: null,
        users_services: {
          some: {
            userId,
            deletedAt: null,
          },
        },
      },
      include: {
        users_services: {
          where: { userId },
        },
      },
    });
    return services;
  }

  async assignToMyAService(
    userId: string,
    serviceId: string,
  ): Promise<users_services> {
    const service = await this.prisma.users_services.create({
      data: {
        userId,
        serviceId,
      },
    });
    return service;
  }

  async unassignToMyAService(
    id: string,
    userId: string,
  ): Promise<users_services> {
    const service = await this.prisma.users_services.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
    return service;
  }

  async updateToMyAService(
    id: string,
    userId: string,
    data: Partial<users_services>,
  ): Promise<users_services> {
    const service = await this.prisma.users_services.update({
      where: {
        id,
        userId,
      },
      data: {
        serviceId: data.serviceId,
        deletedAt: data.deletedAt || null,
      },
    });
    return service;
  }

  async getServicesByUserId(
    userId: string,
  ): Promise<Array<services & { users_services: users_services[] }>> {
    const services = await this.prisma.services.findMany({
      where: {
        users_services: {
          some: {
            userId,
          },
        },
      },
      include: {
        users_services: {
          where: { userId },
        },
      },
    });
    return services;
  }

  async assignToAnUserAService(
    userId: string,
    serviceId: string,
  ): Promise<users_services> {
    const service = await this.prisma.users_services.create({
      data: {
        userId,
        serviceId,
      },
    });
    return service;
  }

  async unassignToAnUserAService(
    id: string,
    userId: string,
  ): Promise<users_services> {
    const service = await this.prisma.users_services.update({
      where: { id, userId },
      data: { deletedAt: new Date() },
    });
    return service;
  }

  async updateToAnUserAService(
    id: string,
    userId: string,
    data: Partial<users_services>,
  ): Promise<users_services> {
    const service = await this.prisma.users_services.update({
      where: {
        id,
        userId,
      },
      data: {
        serviceId: data.serviceId,
        deletedAt: data.deletedAt || null,
      },
    });
    return service;
  }
}
