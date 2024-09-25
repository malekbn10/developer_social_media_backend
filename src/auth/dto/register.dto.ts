import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';
import { Transform } from '@nestjs/class-transformer';

export class RegisterDto{
    @IsString()
    @MinLength(1)
    fullName:string;
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    @Transform(({ value })=> value.trim())
    password:string;
}