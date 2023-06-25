import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

interface DecodedToken {
  username: string;
  sub: number;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Check if the request has a valid JWT token
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const token = request.headers.authorization.replace('Bearer ', '');
    try {
      // Verify and decode the token
      const decoded = jwt.verify(
        token,
        'grokonez-super-secret-key',
      ) as unknown as DecodedToken;

      const expirationTimestamp = decoded.exp;

      // Get the current timestamp
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds

      // Compare the expiration timestamp with the current timestamp
      const isTokenExpired = expirationTimestamp < currentTimestamp;

      if (isTokenExpired) {
        // Token is expired
        throw new UnauthorizedException('Token has expired');
      }

      // Attach the decoded token to the request object for future use
      request.user = decoded;

      return super.canActivate(context);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
