import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(body: {
        traderId: string;
        brokerId: string;
    }): Promise<{
        access_token: string;
    }>;
}
