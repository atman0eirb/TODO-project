import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signup(body: any): {
        result: string;
    };
    signin(body: any): Promise<{
        access_token: string;
    }>;
}
