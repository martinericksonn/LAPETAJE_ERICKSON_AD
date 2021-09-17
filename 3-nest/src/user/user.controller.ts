import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
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
        return this.userService.getUser(parseInt(id));
    }
    
    @Put("/:id")
    putUser(@Param("id") id:string, @Body() body:any){
        return this.userService.putUser(parseInt(id),body);
    }
    
    @Patch("/:id")
    patchUser(@Param("id") id:string, @Body() body:any){
        return this.userService.patchUser(parseInt(id),body);
    }
    
    @Delete("/:id")
    deleteUser(@Param("id") id:string){
        return this.userService.deleteUser(parseInt(id));
    }

    @Post("/login")
    userLogin(@Body() body:any){
        return this.userService.userLogin(body);
    }
    
    @Get("/search/:term")
    searchTerm(@Param("term") term:string){
        return this.userService.searchTerm(term);
    }
}
    