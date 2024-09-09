import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { Animal } from "src/models/animal.model";
import { Response } from "express";
import { ApiResponseType } from "src/types/Api";

@Controller("api/animals")
export class AnimalController {
	constructor(private readonly animalService: AnimalService) {}

	@Post()
	async saveNewAnimal(@Body() body: Animal, @Res() res: Response<ApiResponseType>) {
		try {
			const newAnimal = await this.animalService.saveNewAnimal(body);

			return res.status(HttpStatus.OK).json({
				status: "success",
				data: newAnimal,
			});
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Something went wrong" });
		}
	}

	@Get()
	async getAllAnimals(@Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.animalService.getAllAnimals();

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({
				status: "error",
				msg: "Something wrong",
			});
		}
	}

	@Get("owner/:id")
	async getAnimalsByOwner(@Param("id") id: string, @Res() res: Response<ApiResponseType>) {
		try {
			const data = await this.animalService.getAnimalsByOwner(id);

			return res.status(HttpStatus.OK).json({ status: "success", data });
		} catch (err) {
			throw new BadRequestException({ status: "error", msg: "Something went wrong" });
		}
	}
}
