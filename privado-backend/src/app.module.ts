import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MONGODB_URI } from "./env";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FarmModule } from './farm/farm.module';
import { AnimalModule } from './animal/animal.module';
import { FundingModule } from './funding/funding.module';
import { BadgeModule } from './badge/badge.module';

@Module({
	imports: [MongooseModule.forRoot(MONGODB_URI), UserModule, AuthModule, FarmModule, AnimalModule, FundingModule, BadgeModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
