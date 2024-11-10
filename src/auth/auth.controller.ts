import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerDto : RegisterDto){
      return this.authService.register(registerDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto : LoginDto){
      return this.authService.login(loginDto);
  }
  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
   googleAuth(){};


  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
   async googleCallback(@Req() req , @Res() res) {
    const response = await this.authService.login(req.user.id)
    res.redirect("http://localhost:3000?token=${response.accessToken}")
   }











  // @Req() req, @Res() res: Response
  // @Get('google/callback')
  // @UseGuards(GoogleOauthGuard)
  // async googleAuthCallback(@Req() req, @Res() res: Response) {
  //   const token = await this.authService.googleLogin(req.user);

  //   res.cookie('access_token', token, {
  //     maxAge: 2592000000,
  //     sameSite: true,
  //     secure: false,
  //   });

  //   return res.status(HttpStatus.OK);
  // }
}

