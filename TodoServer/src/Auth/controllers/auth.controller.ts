import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authservice:AuthService){}
    
    @Post('/signup')
    signup(@Body() body :any){
        if(this.authservice.isValidEmail(body.email)){
            return { result : this.authservice.signUp(body.email,body.password) };
        }
        return { result : " Mail format is not valid" };
    }
    @Post('/signin')
    signin(@Body() body :any){
        return this.authservice.signIn(body.email,body.password);
    }

}
