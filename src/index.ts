import { growthrate, start, days, updateDaysView } from "./dom-utils";
import { calculateRate } from "./formula";




function startCalculator(){
// add initial Values
growthrate.value = "1.1";
start.value = "1";
days.value = "1";
//add Reactive Elements
days.addEventListener("input", updateDaysView);
days.addEventListener("input", calculateRate);
growthrate.addEventListener("input", calculateRate);
start.addEventListener("input", calculateRate);
}

startCalculator();

