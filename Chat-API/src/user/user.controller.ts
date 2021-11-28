import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() body: any) {
    return this.userService.register(body);
  }

  @Get('/all')
  getAll() {
    return this.userService.getAllUser();
  }

  // @Get('/:id')
  // getUser(@Param('id') id: string) {
  //   return this.userService.getUser(id);
  // }

  @Put('/:id')
  putUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.putUser(id, body);
  }

  @Patch('/:id')
  patchUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.patchUser(id, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('/login')
  userLogin(@Body() body: any) {
    return this.userService.loginUser(body);
  }

  @Get('/search/:term')
  searchTerm(@Param('term') term: string) {
    return this.userService.searchTerm(term);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserID(@Param('id') id: string) {
    return this.userService.getOne(id);
  }
}
