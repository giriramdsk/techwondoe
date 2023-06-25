import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async validateUser(payload: LoginDto): Promise<any> {
    const staticCredentials = [
      { username: 'techwondoe', password: 'techwondoe' },
      { username: 'techwondoe1', password: 'techwondoe1' },
    ];
    if (payload.exp) {
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
      const isTokenExpired = payload.exp < currentTimestamp;
      if (isTokenExpired) {
        throw new UnauthorizedException('Token has expired');
      }
    }
    const user = staticCredentials.find((cred) =>
      cred.username === payload.username && payload.exp
        ? true
        : cred.password === payload.password,
    );
    if (user) {
      return { id: 1, username: user.username };
    }
    return null;
  }
}
