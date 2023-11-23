export function ColorGradeFunc(num, max) {
	let out = Math.min((num * 120) / max, 120);

	return `hsl(${out} 60% 30%)`;
}
