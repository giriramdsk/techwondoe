import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { TeamModule } from './team/team.module';
// import { AuthorizationModule } from './authorization/authorization.module';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // host: 'localhost', // Database host
      // port: 5432, // Database port
      // username: 'postgres', // Database username
      // password: 'Giriram', // Database password
      // database: 'techwonde', // Database name
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entity files location
      // synchronize: true, // Auto-create database tables (in development, use migrations in production)
    }),
    AuthModule,
    CompanyModule,
    TeamModule,
    // AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
