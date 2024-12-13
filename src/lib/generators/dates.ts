import { faker } from "@faker-js/faker";
import { InvalidSchemaException } from "../exceptions.js";
import { Generator } from "../generate.js";
import { InstanceofGeneratorDefinition } from "../zocker.js";
import { z } from "zod";

const generate_date: Generator<z.ZodDate> = (date_schema, ctx) => {
	const min = get_date_check(date_schema, "min")?.value ?? null;
	const max = get_date_check(date_schema, "max")?.value ?? null;

	if (min && max && max < min)
		throw new InvalidSchemaException("max date is less than min date");

	return faker.date.between({
		from: min ?? '2020-01-01T00:00:00.000Z',
		to: max ?? '2050-01-01T00:00:00.000Z',
	});
};

function get_date_check<Kind extends z.ZodDateCheck["kind"]>(
	schema: z.ZodDate,
	kind: Kind
): Extract<z.ZodDateCheck, { kind: Kind }> | undefined {
	return schema._def.checks.find((check) => check.kind === kind) as
		| Extract<z.ZodDateCheck, { kind: Kind }>
		| undefined;
}

export const DateGenerator: InstanceofGeneratorDefinition<z.ZodDate> = {
	schema: z.ZodDate as any,
	generator: generate_date,
};