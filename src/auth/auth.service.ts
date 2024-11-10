import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from "bcryptjs";
import { LoginDto } from './dto/login.dto';
import { GoogleUser } from './interfaces/auth.interface';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }




  // //Google Auth//
async validateGoogleUser(googleUser : RegisterDto){
  const user = await this.userService.findOneByEmail(googleUser.email)
  if (user) return user;
  return await this.userService.create(googleUser);
}


  //Google Auth//

  generateJwt(payload) {
    return  this.jwtService.signAsync(payload);
  }

  async register({ fullName, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException("Email already exists");
      console.log("1");
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
    const token = await this.generateJwt(payload);
    return {
      token: token,
      email: user.email
    };
  }

  async googleLogin(user){
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }
    const userExist = await this.userService.findOneByEmail(user.email);

    if (!userExist) {
      return this.register(user)
    }
    return this.generateJwt({
      sub:userExist.id,
      email:userExist.email
    });
  }
}
