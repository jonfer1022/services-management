import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateServiceDto,
  CreateServiceResponseDto,
  DeleteServiceResponseDto,
  GetServiceResponseDto,
  UpdateServiceDto,
  UpdateServiceResponseDto,
} from 'src/common/dtos/services.dto';
import { ServicesService } from 'src/services/services.service';

@ApiTags('Services')
@ApiBearerAuth('access-token')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
  schema: {
    example: {
      statusCode: 500,
      message: 'Internal server error',
      timestamp: '2024-10-22T00:00:00.000Z',
      path: '/services/{some-path}',
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
      path: '/services/{some-path}',
    },
  },
})
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({
    status: 200,
    description: 'It returns the list of services.',
    type: [GetServiceResponseDto],
  })
  @HttpCode(HttpStatus.OK)
  async getAllServices() {
    const services = await this.servicesService.getAllServices();
    return services;
  }

  @Post()
  @ApiOperation({ summary: 'Create a service' })
  @ApiBody({ description: 'Data to create a service', type: CreateServiceDto })
  @ApiResponse({
    status: 201,
    description: 'It returns the service created.',
    type: CreateServiceResponseDto,
  })
  @HttpCode(HttpStatus.CREATED)
  async createService(@Body() dto: CreateServiceDto) {
    const service = await this.servicesService.createService(dto);
    return service;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a service' })
  @ApiBody({
    description:
      'Data to update a service. To update a service is required at least one field',
    type: UpdateServiceDto,
  })
  @ApiResponse({
    status: 200,
    description: 'It returns the service updated.',
    type: UpdateServiceResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateService(
    @Body() dto: UpdateServiceDto,
    @Param('id') serviceId: string,
  ) {
    const service = await this.servicesService.updateService(serviceId, dto);
    return service;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a service' })
  @ApiResponse({
    status: 200,
    description:
      'It returns the service "deleted" (it updates the field deletedAt).',
    type: DeleteServiceResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteService(@Param('id') id: string) {
    const service = await this.servicesService.deleteService(id);
    return service;
  }
}
