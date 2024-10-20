import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { JwtPayload } from 'src/common/strategies/accessToken.strategy';
import { CreateAuthInput } from 'src/inputs/auth.input';
import { CreateUserInput } from 'src/inputs/user.input';
import { AuthService } from './auth.service';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: CreateUserInput) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(
    @Body() signInDto: CreateAuthInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log({ signInDto });

    const tokens = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    return tokens;
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signOut(@Req() req: Request & { user: JwtPayload }) {
    const userID = req.user['sub'];
    return this.authService.signOut(userID);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @Req() req: Request & { user: { sub: string; refreshToken: string } },
  ) {
    const { sub: userID, refreshToken } = req.user;
    return this.authService.refreshTokens(userID, refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  me(@Req() req: Request & { user: unknown }) {
    return req.user;
  }
}
