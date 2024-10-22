import { Injectable } from '@nestjs/common';
import { services } from '@prisma/client';
import { CreateServiceDto } from 'src/common/dtos/services.dto';
import { PrismaService } from 'src/infraestructure/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getAllServices(): Promise<services[]> {
    const services = await this.prisma.services.findMany({
      where: { deletedAt: null },
    });
    return services;
  }

  async createService({
    name,
    category,
    cost,
    description,
  }: CreateServiceDto): Promise<services> {
    const service = await this.prisma.services.create({
      data: {
        name,
        category: String(category),
        cost: Number(cost),
        description,
      },
    });
    return service;
  }

  async updateService(id: string, data: Partial<services>): Promise<services> {
    const service = await this.prisma.services.update({
      where: { id },
      data: { ...data },
    });
    return service;
  }

  async deleteService(id: string): Promise<services> {
    const service = await this.prisma.services.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return service;
  }
}
