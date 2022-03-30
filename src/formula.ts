import {  resetChart, updateChart } from "./chart";
import { result, start, growthrate, days } from "./dom-utils";

export function calculateRate() {
    resetChart();
    const daysVal = +days.value
    const growthrateVal = +growthrate.value
    const startVal = +start.value
    result.innerHTML = Math.floor(
        startVal * Math.pow(growthrateVal,daysVal)
    ).toString();

    for(let i=1; i<=+daysVal; i++){
        const res = Math.floor(
            startVal * Math.pow(growthrateVal,i)
        )
        updateChart(i, res);
    }
    
}