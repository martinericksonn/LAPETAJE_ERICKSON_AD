import { Injectable } from '@nestjs/common';
import { SystemMessage, User } from './user.model';

@Injectable()
export class UserService {
    private users = new Map<number,User>();
    private systemMessage = new SystemMessage();

    private generateID():number{
        return 20000 + (10 * this.users.size);
    }
    
    private isCredentialsComplete(user:any,option:string):boolean{
        switch(option.toUpperCase()){
            case "REGISTER": return user.name && user.age && user.email && user.password;
            case "LOGIN" : return user.email && user.password;
        }
    }
    
    private isIdExist(id:number):boolean{
        return this.users.has(id);
    }
  
    private isEmailExist(newUser:any):boolean{
        for(const user of this.users.values())
            if(user.verifyEmail(newUser.email) && !user.verifyID(newUser.id))
                return true;      
        
        return false;
    }

    
    register(user:any):any{
        if(this.isEmailExist(user))
            return this.systemMessage.error(503);

        if(!this.isCredentialsComplete(user,"REGISTER"))
            return this.systemMessage.error(504);
        
        user.id = this.generateID();
        this.users.set(user.id,new User(user));   
        return this.systemMessage.success(101);
    }

    getUser(id: number):any {
        if(!this.isIdExist(id))
            return this.systemMessage.error(506);   

        return this.users.get(id).toJson();
    }

    getAllUser():any{
        var populatedData = [];

        for(const user of this.users.values())
            populatedData.push(user.toJson());     

        return populatedData;
    }


    putUser(id: number,user:any) {
        user.id = id;
        if(!this.isIdExist(id))
            return this.systemMessage.error(506);   

        if(this.isEmailExist(user))
            return this.systemMessage.error(504);

        if(!this.isCredentialsComplete(user,"REGISTER"))
            return this.systemMessage.error(502);

        this.users.set(user.id,new User(user));   
        return this.systemMessage.success(102);
    }
        
    patchUser(id: number, user: any) {
        user.id = id;
        if(!this.isIdExist(id))
            return this.systemMessage.error(506);  

        if(this.isEmailExist(user))
            return this.systemMessage.error(504);
        
        this.users.get(id).modifyUser(user);
        return this.systemMessage.success(102);
    }


    deleteUser(id: number):any {
        if(!this.isIdExist(id))
            return this.systemMessage.error(506);  
            
        this.users.delete(id);
        return this.systemMessage.success(103); 
    }

    userLogin(newUser: any) {
        if(!this.isCredentialsComplete(newUser,"LOGIN"))
             return this.systemMessage.error(502);
 
          for(const user of this.users.values())
              if(user.login(newUser.email,newUser.password))
                 return this.systemMessage.success(104);
          
          return this.systemMessage.error(505);
     }

    searchTerm(term:any){
        var resultData = [];
        for(const user of this.users.values())
            if (user.searchTerm(term.toLowerCase()))
                resultData.push(user.toJson())
                
        if (!(resultData.length > 1))
            return this.systemMessage.error(507);

        resultData.unshift({keyword:term,result:resultData.length})    
        return resultData;
    }
    
}

