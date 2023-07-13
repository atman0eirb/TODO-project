import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,private jwtService: JwtService) {}

    async signIn(email: string, password: string) {
      const user = await this.usersService.findOne(email);
      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
      const payload = { email: email  };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    signUp(email: string, password: string) : string {
      const result = this.usersService.findOne(email) ? "User already exists" : this.usersService.addUser(email,password);
      return result;
    }

    isValidEmail(email: string): boolean {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

}
