import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    console.log(process.env);
    super({
      clientID: process.env.FACEBOOK_OAUTH_APP_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_APP_SECRET,
      callbackURL: process.env.FACEBOOK_OAUTH_CALLBACK_URL,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    console.log(profile);
    const { id, name, emails } = profile;
    const user = {
      id: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      photoURL: '',
    };
    return user;
  }
}
