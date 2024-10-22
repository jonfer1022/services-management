import { IsString, IsDate, ValidateIf } from 'class-validator';
import { AnyOf } from '../decorators/anyOf.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { users_services } from '@prisma/client';

@AnyOf(['serviceId', 'deletedAt'])
export class UpdateUserService {
  @ApiProperty({
    description: 'Service id of the user-service which will be updated',
    type: 'string',
    format: 'uuid',
  })
  @IsString()
  serviceId: string;

  @ApiProperty({
    description: 'Date of the user-service which will be updated',
    type: 'string',
  })
  @ValidateIf((obj) => obj.deletedAt !== null && obj.deletedAt !== '')
  @IsDate()
  deletedAt: Date | null;
}

class UserServicesDto implements users_services {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  userId: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  serviceId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;
}

export class CreateUserServiceResponseDto extends UserServicesDto {}

export class UpdateUserServiceResponseDto extends UserServicesDto {}

export class DeleteUserServiceResponseDto extends UserServicesDto {}
