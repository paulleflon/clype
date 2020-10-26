export function int(min: number, max: number): number {
	return Math.floor(Math.random() * max) + min;
}

export function pick<T = any>(arr: T[], size: number = 1): T | T[] {
	if (size < 1) size = 1;
	if (size == 1) return arr[int(0, arr.length)];
	var picked: T[] = [];
	for (var i = 0; i < size; i++) {
		const n = int(0, arr.length);
		picked.push(arr[n]);
		arr = arr.slice(0, n).concat(arr.slice(n + 1, arr.length - 1));
		if (arr.length === 0) break;
	}
	return picked;
}