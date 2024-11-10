import { Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { StrategiesEnum } from "../constants/strategies.constants";
import { GoogleUser } from "../interfaces/auth.interface";
import googleOauthConfig from "../config/google-oauth.config";
import { ConfigType } from "@nestjs/config";
import { AuthService } from "../auth.service";




@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, StrategiesEnum.Google) {
  constructor(@Inject(googleOauthConfig.KEY)
  private googleConfiguration: ConfigType<typeof googleOauthConfig>,
  private authService : AuthService
  ) {
    super({
      clientID: googleConfiguration.clientID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,

      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    console.log({ profile })
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      fullName: profile.name.givenName,
      password: ""
    })
    done(null,user)
    // const user = await this.
    // try {
    // const {  name, emails, photos } = profile;
    // const user:GoogleUser = {
    //     email: emails[0].value,
    //     firstName: name.givenName,
    //     lastName: name.familyName,
    //     picture: photos[0].value,
    //     accessToken,
    //     refreshToken
    // };
    //     done(null,user)
    // } catch (error) {
    //     Logger.error(error);
    //     const internalError = new InternalServerErrorException();
    //     done(internalError);
    //     throw internalError;
    // }

  }
}