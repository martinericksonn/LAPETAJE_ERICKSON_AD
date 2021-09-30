import { User, SystemMessage } from './user.model';
import { v4 as uid } from 'uuid';

export class Helper {
  private static systemMessage = new SystemMessage();
  //returns an array of attributes as defined in the class
  static describeClass(typeOfClass: any): Array<any> {
    let a = new typeOfClass();
    let array = Object.getOwnPropertyNames(a);

    return array;
  }
  static describeClassUser(): Array<any> {
    let a = new User('', 0, '', '');
    let array = Object.getOwnPropertyNames(a);

    return array;
  }
  static generateUID(): string {
    return uid().toString().replace(/-/g, '').substring(0, 27);
  }
  //removes an item matching the value from the array
  static removeItemOnce(arr: Array<any>, value: any): Array<any> {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  static populate(): Map<string, User> {
    var result: Map<string, User> = new Map<string, User>();
    try {
      var users = [
        new User('Leanne Graham', 18, 'sincere@april.biz', 'LG_123456'),
        new User('Ervin Howell', 21, 'shanna@melissa.tv', 'EH_123123'),
        new User('Nathan Plains', 25, 'nathan@yesenia.net', 'NP_812415'),
        new User('Patricia Lebsack', 18, 'patty@kory.org', 'PL_12345'),
      ];
      users.forEach((user) => {
        result.set(user.id, user);
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static validBody(body: any) {
    var systemMessage = new SystemMessage();

    var keys: Array<string> = Helper.describeClassUser();
    var types: Map<string, string> = new Map<string, string>();

    types.set('name', typeof '');
    types.set('age', typeof 0);
    types.set('email', typeof '');
    types.set('password', typeof '');
    for (const key of Object.keys(body)) {
      if (!keys.includes(`${key}`) && typeof body[key] != types.get(key)) {
        throw systemMessage.error(502);
      }
      if (typeof body[key] != types.get(key)) {
        throw this.systemMessage.custom({
          valid: false,
          data: `${key} is not a valid attribute`,
        });
      }
    }
  }

  // static validBodyPut(body: any): { valid: boolean; data: string } {
  //   try {
  //     // var bodyValidation: { valid: boolean; data: string } =
  //     //   this.validBody(body);
  //     // if (bodyValidation.valid) {
  //     //   var keys: Array<string> = Helper.describeClass(User);

  //       keys = Helper.removeItemOnce(keys, 'id');
  //       for (const key of Object.keys(body)) {
  //         if (keys.includes(`${key}`)) {
  //           keys = Helper.removeItemOnce(keys, key);
  //         }
  //       }
  //       if (keys.length > 0) {
  //         throw Error(`Payload is missing ${keys}`);
  //       }
  //       return { valid: true, data: null };
  //     } else throw Error(bodyValidation.data);
  //   } catch (error) {
  //     return { valid: false, data: error.message };
  //   }
  //}

  // static validBodyPut(body: any): boolean {
  //   var user = new User(body);
  //   var keys: Array<string> = Object.getOwnPropertyNames(user);

  //   keys = Helper.removeItemOnce(keys, 'id');
  //   //console.log(keys);
  //   for (const key of Object.keys(body)) {
  //     // console.log(key);
  //     if (keys.includes(`${key}`)) {
  //       keys = Helper.removeItemOnce(keys, key);
  //     }
  //   }
  //   return keys.length > 0;
  // }
}
