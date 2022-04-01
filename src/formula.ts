import { result, start, growthrate, days } from "./dom-utils";

export function calculateRate() {
    result.innerHTML = Math.floor(
      Number(start.value) * Math.pow(+growthrate.value, +days.value)
    ).toString();
}