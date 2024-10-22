import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { AnyOf } from '../decorators/anyOf.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { services, users_services } from '@prisma/client';

enum Category {
  Housekeeping = 'Housekeeping',
  Health = 'Health',
  Beauty = 'Beauty',
  Technology = 'Technology',
  Other = 'Other',
}

export class CreateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    type: 'string',
    example: 'Cleaning',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category of the service',
    type: 'string',
    enum: [...Object.values(Category)],
    example: Category.Housekeeping,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category)
  category: Category;

  @ApiProperty({
    description: 'Cost of the service',
    type: 'number',
    example: '30',
  })
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @ApiProperty({
    description: 'Description of the service',
    type: 'string',
    example: 'Housekeeping service',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

@AnyOf(['name', 'category', 'cost', 'description'])
export class UpdateServiceDto {
  @ApiProperty({
    description: 'Name of the service',
    type: 'string',
    example: 'Cleaning',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category of the service',
    type: 'string',
    enum: [...Object.values(Category)],
    example: Category.Housekeeping,
  })
  @IsString()
  @IsEnum(Category)
  category: Category;

  @ApiProperty({
    description: 'Cost of the service',
    type: 'number',
    example: '30',
  })
  @IsNumber()
  cost: number;

  @ApiProperty({
    description: 'Description of the service',
    type: 'string',
    example: 'Housekeeping service',
  })
  @IsString()
  description: string;
}

class ServicesDto implements services {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  cost: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}

export class GetUserServiceDto extends ServicesDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid' },
        userId: { type: 'string', format: 'uuid' },
        serviceId: { type: 'string', format: 'uuid' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
        deletedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  users_services: {
    id: string;
    userId: string;
    serviceId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }[];
}

export class GetServiceResponseDto extends ServicesDto {}

export class CreateServiceResponseDto extends ServicesDto {}

export class UpdateServiceResponseDto extends ServicesDto {}

export class DeleteServiceResponseDto extends ServicesDto {}
