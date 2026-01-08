import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  //signup
  async signup(email: string, password: string) {
    const user = this.userService.createUser(email, password);
    console.log('created ueser', user);
    console.log('JWT_SECRET:', process.env.JWT_SECRET, process.env);
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return {
      message: 'User Created successfully',
      accessToken,
      user: {
        id: user?.id,
        email: user?.email,
      },
    };
  }
}
