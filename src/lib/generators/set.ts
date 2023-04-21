import { z } from "zod";
import { faker } from "@faker-js/faker";
import { generate, GenerationContext } from "../generate.js";
import { RecursionLimitReachedException } from "../exceptions.js";

export function generate_set<Z extends z.ZodSet<any>>(
	schema: Z,
	generation_context: GenerationContext<Z>
): z.infer<Z> {
	const size = faker.datatype.number({ min: 0, max: 10 });

	const set: z.infer<Z> = new Set();

	try {
		for (let i = 0; i < size; i++) {
			const value = generate(schema._def.valueType, generation_context);
			set.add(value);
		}
	} catch (error) {
		if (error instanceof RecursionLimitReachedException) {
			return set;
		}
		throw error;
	}

	return set;
}
