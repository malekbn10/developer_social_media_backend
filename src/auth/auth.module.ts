import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import googleOauthConfig from './config/google-oauth.config';

@Module({
  imports:[JwtModule.registerAsync({
    imports:[ConfigModule],
    useFactory:async (configService : ConfigService)=>({
      secret:configService.get('JWT_SECRET')
    }),
    inject:[ConfigService]
  }),UsersModule,ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [AuthController],
  providers: [AuthService,GoogleStrategy],
})
export class AuthModule {}
