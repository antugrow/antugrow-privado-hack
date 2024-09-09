import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Animal } from "src/models/animal.model";

@Injectable()
export class AnimalService {
	constructor(@InjectModel(Animal.name) private readonly animalModel: Model<Animal>) {}

	async saveNewAnimal(info: Animal) {
		const newAnimal = this.animalModel.create(info);

		try {
			const savedAnimal = (await newAnimal).save();

			return (await savedAnimal).toObject();
		} catch (err) {
			throw new Error("Unable to save animal");
		}
	}

	async getAllAnimals() {
		return this.animalModel.find().exec();
	}

	async getAnimalsByOwner(ownerId: string) {
		return this.animalModel.find({ owner: ownerId }).exec();
	}

	async getAnimalInfoById(id: string) {
		return this.animalModel.findById(id).exec();
	}
}
