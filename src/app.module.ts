import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { SeederService } from './seeder/seed';
import { User } from './user/user.entity';
import { Room } from './room/room.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Room]),
    AuthModule,
    UserModule,
    MessageModule,
    RoomModule,
  ],
  providers: [SeederService],
})
export class AppModule {}
