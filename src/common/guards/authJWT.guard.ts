import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No se encontro el token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: 'tu-secreto' });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('No se pudo verificar el token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      console.log('No se encontró el encabezado de autorización.');
      return undefined;
    }

    return authHeader;
  }
}