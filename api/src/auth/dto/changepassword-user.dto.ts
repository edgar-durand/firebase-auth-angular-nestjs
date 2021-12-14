import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsDefined } from 'class-validator';

export class ChangePasswordUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'user email',
    maxLength: 80,
  })
  email: string;

  @IsDefined()
  @ApiProperty({ description: 'Old Password'})
  oldpassword: string;

  @IsDefined()
  @ApiProperty({ description: 'New Password'})
  newpassword: string;
}
