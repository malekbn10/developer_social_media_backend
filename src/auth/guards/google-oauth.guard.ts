import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { StrategiesEnum } from '../constants/strategies.constants';

@Injectable()
export class GoogleOauthGuard extends AuthGuard(StrategiesEnum.Google) {}
