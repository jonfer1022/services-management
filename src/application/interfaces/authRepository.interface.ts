import { IUserVerified } from 'src/common/interfaces/UserVerified.interface';
import { Tokens } from 'src/common/types/tokens.type';

export interface AuthRepository {
  getTokens(userId: string, email: string): Promise<Tokens>;
  verifyToken(token: string): Promise<IUserVerified>;
}
