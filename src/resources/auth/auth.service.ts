import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SelectRole } from 'src/drizzle/utils/roles.drizzle.js';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider.js';
import * as schema from '../../drizzle/schema.js';
import { queryOne } from '../../utils/query.js';
import { UserEntity } from '../users/entities/user.entity.js';
import { LoginDto } from './dto/login.dto.js';
import { TokenEntity } from './entities/auth.entity.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const results = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.name, loginDto.name))
      .leftJoin(schema.roles, eq(schema.users.roleId, schema.roles.id));

    const result = queryOne<{ user: UserEntity; role: SelectRole }>(results);

    if (!result) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    if (!bcrypt.compareSync(loginDto.password, result.user.password)) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    const payload: TokenEntity = {
      sub: result.user.id,
      name: result.user.name,
      role: result.role.name,
    };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
