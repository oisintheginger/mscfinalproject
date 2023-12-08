export function ColorGradeFunc(num, max) {
	let out = Math.min((num * 120) / max, 120);

	return `hsl(${out} 60% 30%)`;
}

export function BlueColorGradeFunc(num, max) {
	let saturation = 10 + 30 * (num / max).toFixed(0);
	let lightness = 30 + 6 * (num / max).toFixed(0);

	return `hsl(233 ${saturation}% ${lightness}%)`;
}
