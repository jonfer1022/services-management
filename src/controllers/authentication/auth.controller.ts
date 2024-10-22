import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Tokens } from '../../common/types/tokens.type';
import { SessionService } from 'src/services/session.service';
import {
  LoginDto,
  RefreshTokenDto,
  SignUpDto,
  TokensResponseDto,
} from '../../common/dtos/auth.dto';
import { RequestAuth } from 'src/common/types/request.type';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
  schema: {
    example: {
      statusCode: 500,
      message: 'Internal server error',
      timestamp: '2024-10-22T00:00:00.000Z',
      path: '/auth/{some-path}',
    },
  },
})
@Controller('auth')
export class AuthController {
  constructor(private sessionService: SessionService) {}

  @Post('/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ description: 'Login credentials', type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'It returns access and refresh tokens.',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Invalid credentials.',
    schema: {
      example: {
        statusCode: 403,
        message: 'Access Denied',
        timestamp: '2024-10-22T00:00:00.000Z',
        path: '/auth/signin',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: LoginDto): Promise<TokensResponseDto> {
    return await this.sessionService.signin(dto);
  }

  @Post('/signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ description: 'Sign up credentials', type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'It returns access and refresh tokens.',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Invalid credentials.',
    schema: {
      example: {
        statusCode: 403,
        message: 'This email is already taken.',
        timestamp: '2024-10-22T00:00:00.000Z',
        path: '/auth/signup',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignUpDto): Promise<TokensResponseDto> {
    return this.sessionService.signup(dto);
  }

  @Post('/logout')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Sign out' })
  @ApiResponse({
    status: 200,
    description: 'It returns an message success.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    schema: {
      example: {
        statusCode: 401,
        message: 'Access Denied',
        timestamp: '2024-10-22T00:00:00.000Z',
        path: '/auth/logout',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: RequestAuth) {
    return this.sessionService.logout(req.user.email);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiBody({ description: 'Refresh token and email', type: RefreshTokenDto })
  @ApiResponse({
    status: 201,
    description: 'It returns access and refresh tokens.',
    type: TokensResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Invalid credentials.',
    schema: {
      example: {
        statusCode: 403,
        message: 'Access Denied',
        timestamp: '2024-10-22T00:00:00.000Z',
        path: '/auth/signin',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Body() dto: RefreshTokenDto,
  ): Promise<TokensResponseDto> {
    return this.sessionService.refreshTokens(dto.email, dto.refreshToken);
  }
}
