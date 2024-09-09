import { Module } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { AnimalController } from "./animal.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Animal, AnimalModel } from "src/models/animal.model";

@Module({
	imports: [MongooseModule.forFeature([{ name: Animal.name, schema: AnimalModel }])],
	controllers: [AnimalController],
	providers: [AnimalService],
	exports: [AnimalService],
})
export class AnimalModule {}
