#!/usr/bin/env node
import * as term from "./lib/terminal";
import { play, GameSettings } from "./game";
const args = require("./lib/args").default();

(async () => {
	const settings: GameSettings = {} as GameSettings;
	var words: number = -1;
	for (const arg in args) {
		switch (arg) {
			case "help":
			case "h":
				help();
				return;
			case "version":
			case "v":
				const version: string = require("../package.json").version;
				console.log("v" + version);
				return;
			case "words":
			case "w":
				words = (typeof args[arg].value === "number") ? args[arg].value : NaN;
				break;
			case "list":
			case "l":
				settings.list = args[arg].value.toString();
				break;
			default:
				help()
				return;
		}
	}
	var wait: boolean = false;
	term.clear();
	var _default: GameSettings = {} as GameSettings;
	try {
		_default = require("../settings.json");
	} catch (err) {
		term.write("Error with settings.json.");
		wait = true;
		_default = { list: "easy", words: 50 };
	}
	if (isNaN(words) || words < 0) {
		settings.words = _default.words;
	} else settings.words = words;
	if (settings.list === undefined) settings.list = _default.list;
	var list: string[] = [];
	try {
		list = require("../lists/" + settings.list + ".json");
	} catch (err) {
		term.write("Error with list file. Make sure it is a well formed JSON file. Using default.\n");
		list = require("../lists/" + _default.list + ".json");
		wait = true;
	}
	setTimeout(() => play(settings, list), (wait) ? 1000 : 0);
})();

function help(): void {
	console.log("       _");
	console.log("      | |");
	console.log("   ___| |_   _ _ __   ___ ");
	console.log("  / __| | | | | '_ \\ / _ \\");
	console.log(" | (__| | |_| | |_) |  __/");
	console.log("  \\___|_|\\__, | .__/ \\___|");
	console.log("          __/ | |");
	console.log("         |___/|_|");
	console.log("Usage: clype [options]");
	console.log("Options:");
	console.log("-                          play a game with default settings");
	console.log("-v, --version              print clype version");
	console.log("-h, --help                 print clype help");
	console.log("-w, --words [n]            play a game with n words to type")
	console.log("-l, --list [name]          play a game with the specified list of words");
	console.log("Default lists are 'easy', 'medium' and 'hard'.")
}