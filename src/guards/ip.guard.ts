import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IpGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const allowedIps = this.configService
        .get<string>('ALLOWED_IPS', '::1,127.0.0.1')
        .split(',')
        .map(ip => ip.trim());

    const request = context.switchToHttp().getRequest();
    const clientIp = request.ip;

    return allowedIps.includes(clientIp);
  }
}