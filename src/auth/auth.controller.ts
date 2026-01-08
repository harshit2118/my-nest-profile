import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { CreateAdminDTO } from './dto/admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignUpDTO) {
    return this.authService.signup(signupDto.email, signupDto.password);
  }
  @Post('signin')
  signin(@Body() signinDto: SignInDTO) {
    return this.authService.signin(signinDto.email, signinDto.password);
  }
  @Post('create-admin')
  createAdmin(@Body() adminDTO: CreateAdminDTO) {
    return this.authService.createUserAdmin(adminDTO.email);
  }
}
