import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { IResponse } from "../interfaces/api-interfaces";
import { AuthGuard } from "../auth/auth.guard";

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @ApiOperation({
    summary: 'List all Users',
    description: 'Returns the list of all authenticated users.'
  })
  @ApiResponse({
    status: 200, description: 'Success-Response',
    schema: {
      example: {
        result: true,
        data: []
      }
    }
  })
  @ApiResponse({
    status: 404, description: 'Error-Response',
    schema: {
      example: {
        'result': false,
        'message': 'Error message'
      }
    }
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  list(): Promise<IResponse> {
    return this.userService.list();
  }
}
