import { z } from "zod";
import { GenerationContext, generate } from "./generate.js";
import { faker } from "@faker-js/faker";

export type ZockerOptions<Z extends z.ZodTypeAny> = {
	generators?: Map<z.ZodTypeAny, () => any>;
};

export type ZockerGeneratorOptions<Z extends z.ZodTypeAny> = {
	null_chance?: number;
	undefined_chance?: number;
	seed?: number;
	recursion_limit?: number;
};
export type Zocker<Z extends z.ZodTypeAny> = (
	options?: ZockerGeneratorOptions<Z>
) => z.infer<Z>;

/**
 * Create a Zocker-Function from a Zod-Schema that generates random test-data.
 * @param schema A Zod-Schema
 * @returns A Zocker-Function that can be used to generate random data that matches the schema.
 */
export function zocker<Z extends z.ZodSchema>(
	schema: Z,
	schema_options: ZockerOptions<Z> = {}
): Zocker<Z> {
	return function (generation_options = {}) {
		const seed = generation_options.seed ?? Math.random() * 1000_000;

		faker.seed(seed);

		const root_generation_context: GenerationContext<Z> = {
			generators: schema_options.generators || new Map(),
			instanceof_factories: new Map(),
			null_chance: generation_options.null_chance ?? 0.1,
			undefined_chance: generation_options.undefined_chance ?? 0.1,
			path: [],
			semantic_context: [],
			parent_schemas: new Map(),
			recursion_limit: generation_options.recursion_limit ?? 3,
			seed
		};

		return generate(schema, root_generation_context);
	};
}
