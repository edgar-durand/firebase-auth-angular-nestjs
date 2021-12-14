import { IsDefined, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @IsDefined()
  @ApiProperty({ description: 'First Name', example: 'James' })
  firstName: string;

  @IsDefined()
  @ApiProperty({ description: 'Last Name', example: 'Doe' })
  lastName: string;

  @ApiProperty({
    description: 'username',
    example: 'jdoe@example.com',
    maxLength: 80,
  })
  username?: string;

  @IsEmail()
  @ApiProperty({
    description: 'user email',
    example: 'jdoe@example.com',
    maxLength: 80,
  })
  email: string;

  roles: string[];

  @IsDefined()
  @ApiProperty({ description: 'Password', example: '12345678' })
  password: string;
}
