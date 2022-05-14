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
  import { lectureentry } from "./interfaces";


  export function fetching() {
    fetch("https://api.stuv.app/rapla/lectures/MOS-WON21?archived=true")
      .then((res) => res.json())
      .then((data: lectureentry[]) => {
        btn.addEventListener("click", searchLogic);
        function searchLogic() {
          deleteOutput();
          if (Datum.value === "" && searchInput.value === "") {
            alert("Bitte tätigen sie eine eingabe");
          } else if (Datum.value === "") {
            searchByName(data);
          } else if (searchInput.value === "") {
            searchByDate(data);
          } else if (Datum.value != "" && searchInput.value != "") {
            searchByDateAndName(data);
          }
        }
  
        return data;
      });
  }


  export function searchByName(data: any){
    let dataNotFound: boolean = true;
    for (let singleDay of data) {
      if(singleDay.name.includes(searchInput.value)){
        displayOutput(singleDay);
        
        
      }
      
  }
  }

  export function displayOutput(singleDay :any){
        const startTime :Date = new Date(singleDay.startTime);
        const outputElement = document.querySelector(".output") as HTMLUListElement;
        outputElement.style.display = "flex";
        
        const listOutput = unl.appendChild(document.createElement("li"));
          listOutput.innerHTML = `<p> <strong> ${startTime.toLocaleDateString(
            "de-DE",
            options
          )}-${new Date(singleDay.endTime).toLocaleString("de-DE", options3)} Uhr: </strong> <br> ${singleDay.name} </p>`;
          listOutput.classList.add("outputList");
  
  
  }
  export function searchByDate(data :lectureentry[]) {
    let dataNotFound: boolean = true;
    for (let singleDay of data) {
      if(singleDay.startTime.includes(Datum.value)){
        displayOutput(singleDay);
        
        
      }
      
  }
  }


export function searchByDateAndName(data :lectureentry[]) {
    let dataNotFound: boolean = true;
  
    for (let singleDay of data) {
      if(singleDay.startTime.includes(Datum.value) && singleDay.name.includes(searchInput.value)){
        displayOutput(singleDay);
        
        
      }
      
  }
  }
 export function deleteOutput() {
    document.querySelectorAll(".outputList").forEach((e) => e.remove());
  }