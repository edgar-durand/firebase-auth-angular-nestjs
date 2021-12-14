import { Logger, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { LoggerModule } from "./logger/logger.module";
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault()
      })
    }),
    ConfigModule.forRoot({
      envFilePath:
        String(process.env.NODE_ENV) === 'production'
          ? '.env'
          : '.env_local',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => {
        Logger.log({ 'DB_URL ': process.env.DB_URL })
        return {
          type: 'mysql',
          host: process.env.DB_URL,
          port: +process.env.DB_PORT,
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          synchronize: String(process.env.NODE_ENV) !== 'production',
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          logging: String(process.env.NODE_ENV) !== 'production' ? [] : ['query', 'error'],
        };
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
