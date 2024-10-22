import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/infraestructure/prisma/prisma.service';
import { Tokens } from 'src/common/types/tokens.type';
import { LoginDto, SignUpDto } from 'src/common/dtos/auth.dto';
import { AuthRepository } from 'src/application/interfaces/authRepository.interface';

@Injectable()
export class SessionService {
  constructor(
    @Inject('AuthRepository')
    private authRepository: AuthRepository,
    private prisma: PrismaService,
  ) {}

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  private async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: { hashRt: hash },
    });
  }

  async signin({ email, password }: LoginDto): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const pwMatches = await bcrypt.compare(password, user.password);

    if (!pwMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.authRepository.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async signup({ email, name, role, password }: SignUpDto): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (user) throw new ForbiddenException('This email is already taken');

    const hash = await this.hashData(password);
    const newUser = await this.prisma.users.create({
      data: {
        name,
        role,
        email,
        password: hash,
      },
    });

    const tokens = await this.authRepository.getTokens(
      newUser.id,
      newUser.email,
    );
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async logout(email: string) {
    await this.prisma.users.update({
      where: { email },
      data: { hashRt: null },
    });
    return 'User logged out successfully';
  }

  async refreshTokens(email: string, refreshToken: string): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    if (!user || !user.hashRt) throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.hashRt);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.authRepository.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }
}
