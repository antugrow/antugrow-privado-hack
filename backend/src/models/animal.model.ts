import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.model";

@Schema({ timestamps: true })
export class Animal {
	@Prop({ type: String })
	breed: string;

	@Prop({ type: Date })
	birth_date: Date;

	@Prop({ type: mongoose.Types.ObjectId })
	owner: User;

	@Prop({ type: String })
	weight: string;
}

export const AnimalModel = SchemaFactory.createForClass(Animal);

export type AnimalDocument = HydratedDocument<Animal>;
