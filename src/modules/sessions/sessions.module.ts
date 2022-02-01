import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SessionsService } from './services/sessions.service';
import { SessionsController } from './controllers/sessions.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersRepository } from '../users/repositories/users.repository';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, JwtStrategy, UsersRepository, PrismaService],
})
export class SessionsModule {}
