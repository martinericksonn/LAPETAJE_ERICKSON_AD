import { Helper } from './helper';
import { SystemMessage, User } from './user.model';

export class Process {
  private static systemMessage = new SystemMessage();

  static updateUser(id: string, user: any, users: any) {
    var newUser = users.get(id);
    newUser.replaceValues(user);
    newUser.toJson();
    return this.systemMessage.success(102, newUser.toJson());
  }

  static registerUser(newUser: any, users: any) {
    newUser.id = Helper.generateUID();

    var user = new User(newUser);
    users.set(newUser.id, user);
    return this.systemMessage.success(101, user.toJson());
  }

  static getUser(id: any, users: any) {
    return users.get(id).toJson();
  }

  static getAllUser(users: any) {
    var populatedData = [];
    for (const user of users.values()) {
      populatedData.push(user.toJson());
    }

    return populatedData;
  }

  static overwriteUser(id: string, newUser: any, users: any) {
    newUser.id = id;
    users.set(newUser.id, new User(newUser));
    return this.systemMessage.success(102);
  }

  static deleteUser(id: string, users: any) {
    users.delete(id);
    return this.systemMessage.success(103);
  }

  static LoginUser(newUser: any, users: any) {
    for (const user of users.values())
      if (user.login(newUser.email, newUser.password))
        return this.systemMessage.success(104);

    throw this.systemMessage.error(505);
  }

  static searchInUser(query: any, users: any) {
    var result = [];
    for (const user of users.values())
      if (user.searchTerm(query)) result.push(user.toJson());

    if (!result.length) throw this.systemMessage.error(507);

    result.unshift({ keyword: query, result: result.length });
    return result;
  }
}
