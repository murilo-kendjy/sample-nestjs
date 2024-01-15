import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider.js';
import * as schema from '../../drizzle/schema.js';
import { queryOne } from '../../utils/query.js';
import { UserEntity } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const users = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.name, loginDto.name));

    const user = queryOne<UserEntity>(users);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const payload = {
      sub: user.id,
      name: user.name,
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
