import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
