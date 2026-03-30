import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IpGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.ip === '192.168.1.255';
  }
}
