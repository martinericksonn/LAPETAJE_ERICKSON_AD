import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}


    @Post("/register")
    register(@Body() body:any){
        return this.userService.register(body);
    }
    
    @Get("/all")
    getAll(){
        return this.userService.getAllUser();
    }
    
    @Get("/:id")
    getUser(@Param("id") id:string){
        var parsedID = parseInt(id);
        return this.userService.getUser(parsedID);
    }
    
    @Patch("/:id")
    patchUser(@Param("id") id:string, @Body() body:any){
        var parsedID = parseInt(id);
        return this.userService.patchUser(parsedID,body);
    }
    
    @Put("/:id")
    putUser(@Param("id") id:string, @Body() body:any){
        var parsedID = parseInt(id);
        return this.userService.putUser(parsedID,body);
    }
    
}
    