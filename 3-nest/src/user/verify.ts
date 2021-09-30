import { CRUDReturn } from './crud_return.interface';
import { Helper } from './helper';
import { User, SystemMessage } from './user.model';

export class Verification {
  private static systemMessage = new SystemMessage();

  static verifyCredentials(newUser: any, option: string) {
    switch (option.toUpperCase()) {
      case 'REGISTER':
        Helper.validBody(newUser);
        // var keys: Array<string> = Helper.describeClassUser();
        // var types: Map<string, string> = new Map<string, string>();

        // types.set('name', typeof '');
        // types.set('age', typeof 0);
        // types.set('email', typeof '');
        // types.set('password', typeof '');

        // for (const key of Object.keys(newUser)) {
        //   if (
        //     !keys.includes(`${key}`) &&
        //     typeof newUser[key] != types.get(key)
        //   ) {
        //     throw this.systemMessage.error(502);
        //   }
        //   if (typeof newUser[key] != types.get(key)) {

        //   }
        // }

        // console.log(Helper.validBody(newUser));
        // if (!(user.name && user.age && user.email && user.password))
        //   throw this.systemMessage.error(502);
        break;
      case 'LOGIN':
        if (!(newUser.email && newUser.password))
          throw this.systemMessage.error(502);
        break;
      case 'PATCH':
    }
  }

  static verifyEmail(newUser: any, users?: any, id?: string) {
    if (!newUser.email) return;

    if (!(newUser.email.trim() && newUser.email.includes('@')))
      throw this.systemMessage.error(508);

    if (id) {
      for (const user of users.values())
        if (user.verifyEmail(newUser.email.trim()) && !user.verifyID(id))
          throw this.systemMessage.error(503);
      return;
    }

    for (const user of users.values())
      if (user.verifyEmail(newUser.email.trim()))
        throw this.systemMessage.error(503);
  }

  static verifyID(id: string, users: any) {
    if (!users.has(id)) throw this.systemMessage.error(506);
  }
}
