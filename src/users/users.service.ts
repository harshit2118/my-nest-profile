import { BadRequestException, Injectable } from '@nestjs/common';
import { generateRandomId } from 'helpers/helper';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users = [
    {
      id: generateRandomId(12),
      email: 'hrshtjoshi238@gmail.com',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
    },
    {
      id: generateRandomId(12),
      email: 'user3232@gmail.com',
      password: bcrypt.hashSync('user2332', 10),
      role: 'user',
    },
    {
      id: generateRandomId(12),
      email: 'aman67@gmail.com',
      password: bcrypt.hashSync('aman675', 10),
      role: 'user',
    },
  ];
  findByEmail(email: string) {
    return this.users.find((user) => user?.email === email);
  }
  createUser(email: string, password: string) {
    console.log('email', email, 'password', password);
    const existingUser = this.findByEmail(email);
    if (!!existingUser) {
      throw new BadRequestException('User Already Exist');
    }
    const newUser = {
      id: generateRandomId(12),
      email,
      password: bcrypt.hashSync(password, 10),
      role: 'user',
    };
    this.users.push(newUser);
    return {
      ...newUser,
      password: '',
    };
  }
}
