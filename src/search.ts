import {
    btn,
    searchInput,
    unl,
    options,
    Datum,
    options2,
    options3,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    dataNotFound,
    fridayOutput,
  } from "./dom-utils";

  export function searchByName(data: any){
    let dataNotFound: boolean = true;
    for (let singleDay of data) {
      if(singleDay.name.includes(searchInput.value)){
        displayOutput(singleDay);
        
        
      }
      
  }
  }

  export function displayOutput(singleDay: any){
    console.log(singleDay.name)
        const startTime = new Date(singleDay.startTime);
        const outputElement = document.querySelector(".output") as HTMLUListElement;
        outputElement.style.display = "flex";
        const listOutput = unl.appendChild(document.createElement("li"));
          listOutput.innerHTML = `<p> <strong> ${startTime.toLocaleDateString(
            "de-DE",
            options
          )} Uhr: </strong> <br> ${singleDay.name} </p>`;
          listOutput.classList.add("outputList");
  
  
  }
  export function searchByDate(data: any) {
    let dataNotFound: boolean = true;
    for (let singleDay of data) {
      if(singleDay.startTime.includes(Datum.value)){
        displayOutput(singleDay);
        
        
      }
      
  }
  }


export function searchByDateAndName(data: any) {
    let dataNotFound: boolean = true;
  
    for (let singleDay of data) {
      if(singleDay.startTime.includes(Datum.value) && singleDay.name.includes(searchInput.value)){
        displayOutput(singleDay);
        
        
      }
      
  }
  }