import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/users/user.service';
import {
  AuthCredentialsDto,
  AuthRegisterDto,
  ConfirmRequestDto,
  LoginDto,
} from './dto/auth-request.dto';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthConfig } from './auth.config';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly authConfig: AuthConfig,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }

  get secretKey() {
    return this.authConfig.secretKey;
  }

  registerUser(authRegisterRequest: AuthRegisterDto) {
    const { name, email, password } = authRegisterRequest;

    return new Promise(async (resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({ Name: 'name', Value: name }),
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: '+987654321',
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  authenticateUser(user: AuthCredentialsDto) {
    try {
      const { name, password } = user;

      const authenticateDetails = new AuthenticationDetails({
        Username: name,
        Password: password,
      });
      const userData = {
        Username: name,
        Pool: this.userPool,
      };

      const newUser = new CognitoUser(userData);
      return new Promise((resolve, reject) => {
        return newUser.authenticateUser(authenticateDetails, {
          onSuccess: (result) => {
            resolve(result);
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  confirmUser(confirm: ConfirmRequestDto) {
    const { email, code } = confirm;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async login(loginDto: LoginDto) {
    const { id, password } = loginDto;

    const user = await this.userService.getOne({
      id,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new UnauthorizedException('invalid password');
    }

    return {
      token: this.jwtService.sign({
        id,
      }),
      user,
    };
  }
}
