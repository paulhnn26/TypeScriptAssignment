export const days = document.getElementById("days") as HTMLInputElement;
export const growthrate = document.getElementById("growthrate") as HTMLInputElement;;
export const start = document.getElementById("start") as HTMLInputElement;
export const result = document.getElementById("result") as HTMLSpanElement;
export const daysView = document.getElementById("daysView") as HTMLSpanElement;
export const chartCanvas = document.getElementById('chart') as HTMLCanvasElement;

export function updateDaysView() {
    daysView.innerHTML = days.value;
}