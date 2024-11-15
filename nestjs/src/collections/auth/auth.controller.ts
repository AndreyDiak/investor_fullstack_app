import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
// import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import { JwtPayload } from 'src/common/types/jwt';
import { catchError } from 'src/common/utils/catchError';
import { Public } from 'src/common/utils/public.decorator';
import { CreateAuthInput } from 'src/inputs/auth.input';
import { CreateUserInput } from 'src/inputs/user.input';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: CreateUserInput): Promise<string> {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: CreateAuthInput) {
    const [error, tokens] = await catchError(
      this.authService.signIn(signInDto.username, signInDto.password),
    );
    return error ?? tokens;
  }

  @Get('signout')
  signOut(@Req() req: Request & { user: JwtPayload }) {
    const userID = req.user['sub'];
    return this.authService.signOut(userID);
  }

  // @UseGuards(RefreshTokenGuard)
  // @Get('refresh')
  // refreshTokens(@Req() req: Request & { user: JwtRefreshPayload }) {
  //   const { sub: userID, refreshToken } = req.user;
  //   return this.authService.refreshTokens(userID, refreshToken);
  // }

  @UseGuards(AuthGuard)
  @Get('/me')
  me(@Req() req: Request & { user: JwtPayload }) {
    return req.user;
  }
}
