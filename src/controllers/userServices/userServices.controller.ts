import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Put,
  Delete,
  Req,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { users_services } from '@prisma/client';
import { GetUserServiceDto } from 'src/common/dtos/services.dto';
import {
  CreateUserServiceResponseDto,
  DeleteUserServiceResponseDto,
  UpdateUserService,
  UpdateUserServiceResponseDto,
} from 'src/common/dtos/userServices.dto';
import { RequestAuth } from 'src/common/types/request.type';
import { UserServicesService } from 'src/services/userServices.service';

@ApiTags('UserServices')
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
  schema: {
    example: {
      statusCode: 500,
      message: 'Internal server error',
      timestamp: '2024-10-22T00:00:00.000Z',
      path: '/users/{some-path}',
    },
  },
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized.',
  schema: {
    example: {
      statusCode: 401,
      message: 'Access Denied',
      timestamp: '2024-10-22T00:00:00.000Z',
      path: '/users/{some-path}',
    },
  },
})
@Controller('users')
export class UserServicesController {
  constructor(private userServicesService: UserServicesService) {}

  @Get('me/services')
  @ApiOperation({
    summary: 'Get all the services assigned to the user who is logged in',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all the services assigned to the user who is logged in',
    type: [GetUserServiceDto],
  })
  @HttpCode(HttpStatus.OK)
  async getMyServices(
    @Req() req: RequestAuth,
  ): Promise<Array<GetUserServiceDto>> {
    const services = await this.userServicesService.getMyServices(req.user.id);
    return services;
  }

  @Post('me/services/:serviceId')
  @ApiOperation({ summary: 'Assign to a service to the user who is logged in' })
  @ApiResponse({
    status: 201,
    description: 'It returns the user-service assigned created.',
    type: CreateUserServiceResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async createToMyAnUserService(
    @Req() req: RequestAuth,
    @Param('serviceId') serviceId: string,
  ): Promise<users_services> {
    const service = await this.userServicesService.assignToMyAService(
      req.user.id,
      serviceId,
    );
    return service;
  }

  @Put('/me/userServices/:userServiceId')
  @ApiOperation({
    summary: 'Update an user-service to the user who is logged in',
  })
  @ApiBody({
    description: 'Data to update an user-service',
    type: UpdateUserService,
  })
  @ApiResponse({
    status: 200,
    description: 'It returns the user-service updated.',
    type: UpdateUserServiceResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateToMyAService(
    @Param('userServiceId') userServiceId: string,
    @Req() req: RequestAuth,
    @Body() dto: UpdateUserService,
  ): Promise<users_services> {
    const service = await this.userServicesService.updateToMyAService(
      userServiceId,
      req.user.id,
      dto,
    );
    return service;
  }

  @Delete('/me/userServices/:userServiceId')
  @ApiOperation({
    summary: 'Delete an user-service to the user who is logged in.',
  })
  @ApiResponse({
    status: 200,
    description:
      'It returns the user-service "deleted" (it updates the field deletedAt).',
    type: DeleteUserServiceResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async unassignToMyAService(
    @Param('userServiceId') userServiceId: string,
    @Req() req: RequestAuth,
  ): Promise<users_services> {
    const service = await this.userServicesService.unassignToMyAService(
      userServiceId,
      req.user.id,
    );
    return service;
  }

  @Get(':userId/services')
  @ApiOperation({
    summary: 'Get all the services assigned to a specific user',
    description:
      'Get all the services assigned to a specific user. It could be just accessed by an admin.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all the services assigned to a specific user.',
    type: [GetUserServiceDto],
  })
  @HttpCode(HttpStatus.OK)
  async getServicesByUser(
    @Param('userId') userId: string,
  ): Promise<Array<GetUserServiceDto>> {
    const service = await this.userServicesService.getServicesByUserId(userId);
    return service;
  }

  @Post(':userId/services/:serviceId')
  @ApiOperation({
    summary: 'Assign to a service to a specific user',
    description:
      'Assign to a service to a specific user. It could be just accessed by an admin.',
  })
  @ApiResponse({
    status: 201,
    description: 'It returns the user-service assigned created.',
    type: CreateUserServiceResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async assginToAnUserAService(
    @Param('userId') userId: string,
    @Param('serviceId') serviceId: string,
  ): Promise<users_services> {
    const service = await this.userServicesService.assignToAnUserAService(
      userId,
      serviceId,
    );
    return service;
  }

  @Delete(':userId/userServices/:userServiceId')
  @ApiOperation({
    summary: 'Delete an user-service of a specific user',
    description:
      'Delete an user-service of a specific user. It could be just accessed by an admin.',
  })
  @ApiResponse({
    status: 200,
    description:
      'It returns the user-service "deleted" (it updates the field deletedAt).',
    type: DeleteUserServiceResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async unassignToAnUserAService(
    @Param('userServiceId') userServiceId: string,
    @Param('userId') userId: string,
  ): Promise<users_services> {
    const service = await this.userServicesService.unassignToAnUserAService(
      userServiceId,
      userId,
    );
    return service;
  }

  @Put(':userId/userServices/:userServiceId')
  @ApiOperation({
    summary: 'Update an user-service of an specific user',
    description:
      'Update an user-service of an specific user. It could be just accessed by an admin.',
  })
  @ApiBody({
    description: 'Data to update an user-service',
    type: UpdateUserService,
  })
  @ApiResponse({
    status: 200,
    description: 'It returns the user-service updated.',
    type: UpdateUserServiceResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateToAnUserAService(
    @Param('userServiceId') userServiceId: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateUserService,
  ): Promise<users_services> {
    const service = await this.userServicesService.updateToAnUserAService(
      userServiceId,
      userId,
      dto,
    );
    return service;
  }
}
