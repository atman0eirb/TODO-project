import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../services/constants/auth.constants';
import { FilePersistence } from 'src/infrastructure/persistence/FilePersistence';

@Module({
  providers: [AuthService, UsersService,{
    provide: 'users',
    useValue: new FilePersistence('./src/infrastructure/persistence/users.json'),
  }
],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800s' },
    }),]
})
export class AuthModule {}
