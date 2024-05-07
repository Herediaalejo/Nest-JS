import { Body, Controller, Delete, Get, Post, Put , Param, Patch} from "@nestjs/common"
import { LoginService } from "./resgistroUsuario.service"
import { CreateUser } from "./dto/create.dto";
import { UpdateUserDto } from "./dto/update.dto";

@Controller('/login')
export class LoginController {

    constructor(private loginService: LoginService) {}


    @Get(':id')
    getUsers(@Param('id')id:string){
        return this.loginService.GetOneUser(+id);
    }

    @Get()
    getAllUsers(){
        return this.loginService.GetAllUsers();
    }

    @Post()
    createUser(@Body() createUser : CreateUser){
        return this.loginService.SignUpUsers(createUser);
    }

    @Delete(":id")
    deletingUser(@Param('id')id:string){
        return this.loginService.DeleteUsers(+id);
    }

    @Patch(":id")
    updateUser(@Param('id')id:string, @Body() updateUserDto: UpdateUserDto){
        return this.loginService.UpdateUsers(+id,updateUserDto);
    }
}

