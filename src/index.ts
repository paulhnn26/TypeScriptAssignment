const days = document.getElementById("days") as HTMLInputElement;
const growthrate = document.getElementById("growthrate") as HTMLInputElement;;
const start = document.getElementById("start") as HTMLInputElement;
const result = document.getElementById("result") as HTMLSpanElement;
const daysView = document.getElementById("daysView") as HTMLSpanElement;

growthrate.value = "1.1";
start.value = "1";
days.value = "1";

days.addEventListener("input", updateDaysView);


days.addEventListener("input", calculateRate);
growthrate.addEventListener("input", calculateRate);
start.addEventListener("input", calculateRate);

function updateDaysView() {
    daysView.innerHTML = days.value;
}

function calculateRate() {
    result.innerHTML = Math.floor(
      Number(start.value) * Math.pow(+growthrate.value, +days.value)
    ).toString();
}