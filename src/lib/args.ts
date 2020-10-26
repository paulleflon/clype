interface EnvArguments {
	[index: string]: { key: string, value?: any }
}
export default function args(): EnvArguments {
	var args: EnvArguments = {};
	const argv: string[] = process.argv.slice(2);
	var i: number = 0;
	while (i < argv.length) {
		const arg: string = argv[i];
		var key: string = "";
		if (arg.startsWith("-")) {
			key = arg.replace(/-+/gi, "");
			args[key] = { key: arg }
		}
		if (i + 1 >= argv.length) break;
		if (!argv[i + 1].startsWith("-")) {
			const value: any = argv[i + 1];
			if (!isNaN(parseInt(value))) args[key].value = parseInt(value);
			else if (value === "false" || value === "true") args[key].value = (value === "true");
			else args[key].value = value;
			i += 2;
			continue;
		}
		i++;
	}
	return args;

}

