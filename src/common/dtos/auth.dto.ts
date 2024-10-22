import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user',
    type: 'string',
    example: 'user-2@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    type: 'string',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDto extends LoginDto {
  @ApiProperty({
    description: 'Name of the user',
    type: 'string',
    example: 'User-2',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: [...Object.values(Role)],
    type: 'string',
    example: Role.USER,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @ApiProperty({
    description: 'Email of the user',
    type: 'string',
    example: 'user-2@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class TokensResponseDto {
  @ApiProperty({
    description: 'Access token',
    type: 'string',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    type: 'string',
  })
  refreshToken: string;
}
