export class User{
    private id:number;
    private name:string;
    private age:number;
    private email: string;
    private password: string;

    constructor(user?:any , id?:number,name?:string,age?:number, email?:string,password?:string){
        if(user){
            this.id = user.id;
            this.name=user.name;
            this.age=user.age;
            this.email =user.email;
            this.password = user.password;
        }
        if(id){
            this.id=id;
            this.name=name;
            this.age=age;   
            this.email = email;
            this.password = password;
        }
    }

    verifyEmail (email:string):boolean{
        return this.email == email;
    }

    verifyID (id:number):boolean{
            return this.id == id;
    }

    modifyUser(user:any){
        this.id = user.id ? user.id: this.id ;
        this.name=user.name ? user.name: this.name;
        this.age=user.age ? user.age: this.age; 
        this.email =user.email ? user.email: this.email; 
        this.password = user.password ? user.password: this.password;
        console.log(this.password);
    }
    
    login(email:string, password:string):any{
        //return true or false
        return {
            toJson(){

            }
        };
    }

    log(){
        console.log(`${this.id} ${this.name} ${this.age} ${this.email} ${this.password}`);
    }


    toJson(){
        return {
            id: this.id,
            name:this.name,
            age: this.age,
            email: this.email
        }
    }
    
}