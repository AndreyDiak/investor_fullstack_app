import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserInput } from 'src/inputs/user.input';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserInput: CreateUserInput) {
    const emailCandidate = await this.userService.findOneByEmail(
      createUserInput.email,
    );
    if (emailCandidate) {
      throw new BadRequestException('Email already taken');
    }

    const userNameCandidate = await this.userService.findOneByUsername(
      createUserInput.username,
    );
    if (userNameCandidate) {
      throw new BadRequestException('Username already taken');
    }
    const hashedPassword = await argon2.hash(createUserInput.password);
    const newUser = {
      ...createUserInput,
      password: hashedPassword,
    };
    const user = await this.userService.create(newUser);
    return user._id.toString();
  }

  async signIn(username: string, pass: string) {
    const usernameCandidate =
      await this.userService.findOneByUsername(username);
    if (!usernameCandidate) {
      throw new BadRequestException('Username or Password is incorrect');
    }

    const hashedPassword = await argon2.verify(
      usernameCandidate.password,
      pass,
    );
    if (!hashedPassword) {
      throw new BadRequestException('Username or Password is incorrect');
    }

    const tokens = await this.getTokens(
      usernameCandidate._id.toString(),
      username,
    );
    // await this.userService.updateOne(usernameCandidate._id.toString(), {
    //   refreshToken: tokens.refreshToken,
    // });

    return tokens;
  }

  async signOut(userID: string) {
    return this.userService.updateOne(userID, { refreshToken: null });
  }

  async refreshTokens(userID: string, refreshToken: string) {
    const user = await this.userService.findOneByID(userID);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(userID, user.username);
    await this.updateRefreshToken(userID, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userID: string, refresh_token: string) {
    const hashedrefresh_token = await argon2.hash(refresh_token);
    await this.userService.updateOne(userID, {
      refreshToken: hashedrefresh_token,
    });
  }

  async getTokens(userID: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userID,
          username,
        },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userID,
          username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
