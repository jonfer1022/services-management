import { Module } from '@nestjs/common';
import { UserServicesController } from './userServices.controller';
import { UserServicesService } from 'src/services/userServices.service';

@Module({
  imports: [],
  controllers: [UserServicesController],
  providers: [UserServicesService],
})
export class UserServicesModule {}
