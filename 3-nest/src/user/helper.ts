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
          success: false,
          data: `${key} is not a valid attribute`,
        });
      }
    }
  }

  static validBodyPut(body: any): { success: boolean; data: string } {
    var systemMessage = new SystemMessage();
    var keys: Array<string> = Helper.describeClassUser();

    keys = Helper.removeItemOnce(keys, 'id');
    for (const key of Object.keys(body)) {
      if (keys.includes(`${key}`)) {
        keys = Helper.removeItemOnce(keys, key);
      }
    }
    if (keys.length > 0) {
      throw this.systemMessage.custom({
        success: false,
        data: `Payload is missing ${keys}`,
      });
    }
    return this.systemMessage.custom({ success: true, data: null });
  }
}

export class Verification {
  private static systemMessage = new SystemMessage();

  static verifyCredentials(newUser: any, option: string) {
    switch (option.toUpperCase()) {
      case 'LOGIN':
        if (!(newUser.email && newUser.password))
          throw this.systemMessage.error(502);
        break;

      case 'REGISTER':
        Helper.validBody(newUser);
        Helper.validBodyPut(newUser);
        break;

      case 'PATCH':
        Helper.validBody(newUser);
        break;
    }
  }

  static verifyEmail(newUser: any, users?: any, id?: string) {
    if (!newUser.email) return;
    if (!(newUser.email.trim() && newUser.email.includes('@')))
      throw this.systemMessage.error(508);

    if (id) {
      for (const user of users.values()) {
        if (user.verifyEmail(newUser.email.trim()) && !user.verifyID(id))
          throw this.systemMessage.error(503);
      }
      return;
    }

    for (const user of users.values())
      if (user.verifyEmail(newUser.email.trim()))
        throw this.systemMessage.error(503);
  }

  static verifyAge(newUser: any) {
    if (!newUser.age) return;
    if (newUser.age < 0) throw this.systemMessage.error(509);
  }

  static verifyID(id: string, users: any) {
    if (!users.has(id)) throw this.systemMessage.error(506);
  }
}

export class Process {
  private static systemMessage = new SystemMessage();

  static updateUser(id: string, user: any, users: any) {
    var newUser = users.get(id);

    newUser.replaceValues(user);
    return this.systemMessage.success(newUser.toJson());
  }

  static registerUser(newUser: any, users: any) {
    var user = new User(newUser);

    users.set(user.id, user);
    return this.systemMessage.success(user.toJson());
  }

  static getUser(id: any, users: any) {
    return this.systemMessage.success(users.get(id).toJson());
  }

  static getAllUser(users: any) {
    var populatedData = [];
    for (const user of users.values()) {
      populatedData.push(user.toJson());
    }

    return this.systemMessage.success(populatedData);
  }

  static overwriteUser(id: string, newUser: any, users: any) {
    var user = new User(newUser);
    user.id = id;
    users.set(newUser.id, user);
    return this.systemMessage.success(user.toJson());
  }

  static deleteUser(id: string, users: any) {
    users.delete(id);
    return this.systemMessage.success(103);
  }

  static loginUser(newUser: any, users: any) {
    for (const user of users.values())
      if (user.login(newUser.email, newUser.password))
        return this.systemMessage.success(user.toJson());

    throw this.systemMessage.error(505);
  }

  static searchInUser(query: any, users: any) {
    var result: string[] = [];

    for (const user of users.values())
      if (user.searchTerm(query)) result.push(user.toJson());

    if (!result.length) return this.systemMessage.error(result);

    return this.systemMessage.success(result);
  }

  static populateDatabase(): Map<string, User> {
    return Helper.populate();
  }
}
