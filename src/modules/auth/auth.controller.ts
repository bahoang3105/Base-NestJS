import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() requestData: SignupDto) {
    return this.authService.signup(requestData);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() requestData: LoginDto) {
    return this.authService.login(requestData);
  }
}
