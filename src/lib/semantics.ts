export type SemanticFlag =
	| "unspecified"
	| "key"
	| "fullname"
	| "firstname"
	| "lastname"
	| "street"
	| "city"
	| "country"
	| "paragraph"
	| "sentence"
	| "word"
	| "phoneNumber"
	| "age"
	| "zip"
	| "jobtitle"
	| "color"
	| "color-hex"
	| "age"
	| "year"
	| "month"
	| "day-of-the-month"
	| "hour"
	| "minute"
	| "second"
	| "millisecond"
	| "weekday"
	| "birthday"

const paragraph_triggers = [
	"about",
	"description",
	"paragraph",
	"text",
	"body",
	"content"
];
const sentence_triggers = ["sentence", "line", "headline", "heading"];
const jobtitle_triggers = [
	"job",
	"title",
	"position",
	"role",
	"occupation",
	"profession",
	"career"
];

export function get_semantic_flag(str: string): SemanticFlag {
	str = str.toLowerCase().trim();

	if (str.includes("name")) {
		if (str.includes("first")) return "firstname";
		if (str.includes("last")) return "lastname";
		return "fullname";
	}

	if (str.includes("street")) return "street";
	if (str.includes("city")) return "city";
	if (str.includes("country")) return "country";

	if (paragraph_triggers.some((t) => str.includes(t))) return "paragraph";
	if (sentence_triggers.some((t) => str.includes(t))) return "sentence";
	if (str.includes("word")) return "word";

	if (jobtitle_triggers.some((t) => str.includes(t))) return "jobtitle";

	if (str.includes("phone")) return "phoneNumber";
	if (str.includes("age")) return "age";

	if (str.includes("hex")) return "color-hex";
	if (str.includes("color")) return "color";
	if (str.includes("zip")) return "zip";

	if (str.includes("week") && str.includes("day")) return "weekday";
	if (str.includes("birthday")) return "birthday";
	if (str.includes("year")) return "year";
	if (str.includes("month")) return "month";
	if (str.includes("day")) return "day-of-the-month";
	if (str.includes("hour")) return "hour";
	if (str.includes("minute")) return "minute";
	if (str.includes("second")) return "second";
	if (str.includes("millisecond")) return "millisecond";


	return "unspecified";
}
