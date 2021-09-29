import { Helper } from './helper';
import { SystemMessage } from './user.model';

export class Verification {
  private static systemMessage = new SystemMessage();

  static verifyCredentials(newUser: any, option: string) {
    switch (option.toUpperCase()) {
      case 'REGISTER':
        //console.log(Helper.validBodyPut(newUser));
        // console.log(Helper.validBody(newUser));
        // if (!(user.name && user.age && user.email && user.password))
        //   throw this.systemMessage.error(502);
        break;
      case 'LOGIN':
        if (!(newUser.email && newUser.password))
          throw this.systemMessage.error(502);
    }
  }

  static verifyEmail(newUser: any, users?: any, id?: string) {
    if (!newUser.email) return;

    if (!(newUser.email.trim() && newUser.email.includes('@')))
      throw this.systemMessage.error(508);

    for (const user of users.values()) {
      if (user.verifyEmail(newUser.email.trim()) && !user.verifyID(id))
        throw this.systemMessage.error(503);
    }
  }

  static verifyID(id: string, users: any) {
    if (!users.has(id)) throw this.systemMessage.error(506);
  }
}
