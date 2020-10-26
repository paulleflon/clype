export enum Colors {
	Black = "\u001b[30m",
	Red = "\u001b[31m",
	Green = "\u001b[32m",
	Yellow = "\u001b[33m",
	Blue = "\u001b[34m",
	Magenta = "\u001b[35m",
	Cyan = "\u001b[36m",
	White = "\u001b[37m",
	Reset = "\u001b[0m",
	BgBlack = "\u001b[40m",
	BgRed = "\u001b[41m",
	BgGreen = "\u001b[42m",
	BgYellow = "\u001b[43m",
	BgBlue = "\u001b[44m",
	BgMagenta = "\u001b[45m",
	BgCyan = "\u001b[46m",
	BgWhite = "\u001b[47m",
}

export function write(...str: string[]): void {
	for (const s of str) {
		process.stdout.write(s);
	}
}

export function writeColor(str: string, color: Colors, background?: Colors): void {
	write(color, background || "", str, Colors.Reset);
}

export function clear(): void {
	console.clear();
}

export function forward(n: number): void {
	write("\u001b[" + n + "C");
}

export function backward(n: number): void {
	write("\u001b[" + n + "D");
}

export function position(x: number, y: number): void {
	write("\u001b[" + x + ";" + y + "H");
}