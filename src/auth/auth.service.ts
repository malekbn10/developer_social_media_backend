import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from "bcryptjs";
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async register({ fullName, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException("Email already exists");
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    await this.userService.create({ fullName, email, password: hashedPassword });
    return {
      "message": "User created successfully"
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email)
    if (!user) {
      throw new UnauthorizedException("Invalid email");
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }
    const payload = { email: user.email }
    const token = await this.jwtService.signAsync(payload)
    return {
      token: token,
      email: user.email
    };
  }
}
