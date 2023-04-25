import { GeneratorDefinition } from "./zocker.js";
import { z } from "zod";

import {
	StringGenerator,
	NumberGenerator,
	BigintGenerator,
	BooleanGenerator,
	DateGenerator,
	SymbolGenerator,
	OptionalGenerator,
	NullableGenerator,
	AnyGenerator,
	UnknownGenerator,
	EffectsGenerator,
	ArrayGenerator,
	TupleGenerator,
	RecordGenerator,
	MapGenerator,
	SetGenerator,
	ObjectGenerator,
	UnionGenerator,
	NativeEnumGenerator,
	EnumGenerator,
	DefaultGenerator,
	DiscriminatedUnionGenerator,
	PromiseGenerator,
	LazyGenerator,
	BrandedGenerator,

} from "./generators/index.js";

export const default_generators: GeneratorDefinition<any>[] = [
	StringGenerator(),
	NumberGenerator(),
	BigintGenerator(),
	BooleanGenerator(),
	DateGenerator(),
	SymbolGenerator(),
	OptionalGenerator(),
	NullableGenerator(),
	AnyGenerator(),
	UnknownGenerator(),
	EffectsGenerator(),
	ArrayGenerator(),
	TupleGenerator(),
	RecordGenerator(),
	MapGenerator(),
	SetGenerator(),
	ObjectGenerator(),
	UnionGenerator(),
	NativeEnumGenerator(),
	EnumGenerator(),
	DefaultGenerator(),
	DiscriminatedUnionGenerator(),
	PromiseGenerator(),
	LazyGenerator(),
	BrandedGenerator(),
	{
		schema: z.ZodVoid,
		generator: () => { },
		match: "instanceof"
	},
	{
		schema: z.ZodUndefined,
		generator: () => undefined,
		match: "instanceof"
	},
	{
		schema: z.ZodNull,
		generator: () => null,
		match: "instanceof"
	},
	{
		schema: z.ZodNaN,
		generator: () => NaN,
		match: "instanceof"
	},
	{
		schema: z.ZodLiteral,
		generator: (schema) => schema._def.value,
		match: "instanceof"
	}
];
