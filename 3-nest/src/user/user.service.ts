import { Injectable } from '@nestjs/common';
import { startWith } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users = new Map<number,User>();

    private generateID():number{
        return 20000 + (10 * this.users.size);
    }
    
    private systemMessage(code:number):string{
        switch(code){
            //success
            case 101: return "Account has been successfully registered";
            case 102: return "Account credentials has been updated successfully";
            //errors
            case 502: return "Sorry missing credentials, please try again";
            case 503: return "This Email is already registered, try logging in";
            case 504: return "This Email is already registered, cannot update credentials";
            case 506: return "ID do not exist";
        }
    }
    
     IsJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    
    private isCredentialsComplete(user:any):boolean{
        return (user.name && user.age && user.email && user.password);
    }
    
    private isEmailRepeated(newUser:any):boolean{
        for(const user of this.users.values()){
            console.log(user.verifyEmail(newUser.email) + " " + !user.verifyID(newUser.id));
            if(user.verifyEmail(newUser.email) && !user.verifyID(newUser.id))
                return true;      

        }
        return false;
    }

    patchUser(id: number, user: any) {
        user.id = id;
        this.IsJsonString(user);
        if(!this.users.has(id))
            return JSON.stringify(this.systemMessage(506));   
        if(this.isEmailRepeated(user))
            return JSON.stringify(this.systemMessage(504));
        
        this.users.get(id).modifyUser(user);
        return JSON.stringify(this.systemMessage(102));
    }

    putUser(id: number,user:any) {
        user.id = id;

        if(!this.users.has(id))
            return JSON.stringify(this.systemMessage(506));   
        if(this.isEmailRepeated(user))
            return JSON.stringify(this.systemMessage(504));
        if(!this.isCredentialsComplete(user))
            return JSON.stringify(this.systemMessage(502));

        var newUser = new User(user);
        this.users.set(user.id,newUser);   
        return JSON.stringify(this.systemMessage(102));
    }

    getAllUser():any{
        var populatedData = [];  
        for(const user of this.users.values())
            populatedData.push(user.toJson());       
        return populatedData;
    }

    getUser(id: number):any {
        if(!this.users.has(id))
            return JSON.stringify(this.systemMessage(506));   

        return this.users.get(id).toJson();
    }

    logAllUsers(){
        for(const [key,user] of this.users.entries())
        user.log();
    }

    register(user:any):any{
        if(this.isEmailRepeated(user))
            return JSON.stringify(this.systemMessage(503));

        if(!this.isCredentialsComplete(user))
            return JSON.stringify(this.systemMessage(504));
        
        user.id = this.generateID();
        var newUser = new User(user);
        this.users.set(user.id,newUser);   
        return JSON.stringify(this.systemMessage(101));
    }

}

