import * as term from "./lib/terminal";
import { emitKeypressEvents } from "readline";
import { pick } from "./lib/random";

export interface GameSettings {
	list: string,
	words: number,
}
export function play(settings: GameSettings, list: string[]): void {
	term.clear();
	const stdin: NodeJS.ReadStream = process.stdin;
	emitKeypressEvents(stdin);
	stdin.setRawMode(true);
	var text: string = "";
	do {
		const picked: string | string[] = pick(list, settings.words - text.split(" ").length);
		text += (typeof picked === "object") ? picked.join(" ") : " " + picked;
	} while (text.split(" ").length < settings.words);
	var start: number;
	var totalEntries: number = 0;
	var incorrectEntries: number = 0;
	var typed: string = "";
	var i: number = 0;
	term.write(text);
	term.position(0, 0);
	stdin.on("keypress", function (str, key) {
		if (key.name === "c" && key.ctrl) {
			const duration: number = Date.now() - start;
			end(incorrectEntries, totalEntries, duration, text, typed);
		}
		if (!start && str.length === 1) start = Date.now();
		if (key.name === "backspace") {
			if (i == 0) return;
			i--;
			term.backward(1);
			term.writeColor(text[i], term.Colors.Reset);
			term.backward(1);
			typed = typed.slice(0, typed.length - 1);
			return;
		}
		if (str === text[i]) {
			term.writeColor(text[i], term.Colors.Green);
		} else {
			if (text[i] === " ") term.writeColor(text[i], term.Colors.Reset, term.Colors.BgRed);
			else term.writeColor(text[i], term.Colors.Red);
			incorrectEntries++;
		}
		totalEntries++;
		typed += str;
		i++;
		if (i === text.length) {
			const duration: number = Date.now() - start;
			end(incorrectEntries, totalEntries, duration, text, typed);
		}
	});
}

function accuracy(incorrect: number, total: number): number {
	return (((total - incorrect) / total) * 100);
}

function wpm(characters: number, duration: number, uncorrected: number): number {
	return ((characters / 5) - uncorrected) / duration;
}

function end(incorrectEntries: number, totalEntries: number, duration: number, text: string, typed: string) {
	term.clear();
	var uncorrected: number = 0;
	for (var j = 0; j < typed.length; j++) {
		if (typed[j] !== text[j]) uncorrected++;
	}
	const acc: number = accuracy(incorrectEntries, totalEntries);
	const _wpm: number = wpm(typed.length, duration / 60000, uncorrected);
	console.log("WPM : " + ((isNaN(_wpm)) ? 0 : _wpm.toFixed(2)));
	console.log("Accuracy : " + ((isNaN(acc)) ? 0 : acc.toFixed(2) + "%"));
	process.exit();
}