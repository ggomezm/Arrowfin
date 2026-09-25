import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: { traderId: string; brokerId: string }) {
    const payload = { traderId: body.traderId, brokerId: body.brokerId };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
 