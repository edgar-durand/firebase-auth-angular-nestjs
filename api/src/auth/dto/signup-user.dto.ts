import { PickType } from '@nestjs/swagger';
import { User } from '../../user/entity/User.entity';

export class SignUpUserDto extends PickType(User, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {}
