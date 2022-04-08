import { chart, resetChart, updateChart } from "./chart";
import { result, start, growthrate, days } from "./dom-utils";

export function calculateRate() {
    resetChart();
    const daysValue = +days.value;
    const startValue = Number(start.value);
    const growthrateValue = +growthrate.value;

    result.innerHTML = Math.floor(
      Number(startValue) * Math.pow(growthrateValue, daysValue)
    ).toString();

    for(let i=1;i<=daysValue;i++){
        const res = Math.floor(
            startValue * Math.pow(growthrateValue,i)
            )
            updateChart(i, res)
    }

}
