import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants/jwt.constant';

@Module({
  imports:[UsersModule,
    JwtModule.register({
      global:true,
      secret:jwtConstants.secret,
      signOptions :{expiresIn:"1d"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
