import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
    signUp(email: string, password: string): string;
    isValidEmail(email: string): boolean;
}
