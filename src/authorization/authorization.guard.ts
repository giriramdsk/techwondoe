// // import { Request, Response } from 'express';
// // import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// // import { expressJwtSecret } from 'jwks-rsa';
// // import {promisify} from 'util';
// // import jwt from 'express-jwt';
// // import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// // import { Request, Response } from 'express';
// // import * as jwt from 'express-jwt';
// // import { jwt as jwtSecret } from 'jwks-rsa';
// // import { promisify } from 'util';
// import { Request, Response } from 'express';
// import * as jwt from 'express-jwt';
// import { SecretCallback } from 'express-jwt';
// import jwksRsa, { CertSigningKey, RsaSigningKey } from 'jwks-rsa';
// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { promisify } from 'util';

// @Injectable()
// export class AuthorizationGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req: Request = context.switchToHttp().getRequest<Request>();
//     const res: Response = context.switchToHttp().getResponse<Response>();

//     const checkJwt = promisify(
//       jwt({
//         secret: jwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: 'YOUR_JWKS_URI', // Replace with your JWKS URI
//         }),
//         audience: 'YOUR_AUDIENCE', // Replace with your audience
//         issuer: 'YOUR_ISSUER', // Replace with your issuer
//         algorithms: ['RS256'],
//       })
//     );

//     try {
//       await checkJwt(req, res);
//     } catch (error) {
//       throw new UnauthorizedException(error);
//     }

//     return true;
//   }
// }
